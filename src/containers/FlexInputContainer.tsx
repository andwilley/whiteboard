import * as React from 'react';
import * as Moment from 'moment';
import { actions } from '../actions';
import { connect } from 'react-redux';
import * as cuid from 'cuid';
import FlexInput from '../components/FlexInput';
import { UEditables, ISchedObject } from '../types/WhiteboardTypes';
import { ISchedBlock } from '../types/WhiteboardTypes';
import { nameLocation, builtInGroupNames } from '../whiteboard-constants';
import validator, { ValidatorFn } from '../util/validator';
import restrictor, { RestrictorFn } from '../util/restrictor';
import { getActiveDayErrors } from '../reducers/errorReducer';
import getActiveAircrewRefs from '../util/getActiveAircrewRefs';
import { EditorState, ContentState, CompositeDecorator, ContentBlock, SelectionState } from 'draft-js';
import { errorLevels, errorTypes, errorLocs, errorMessages } from '../errors';
import { IState,
         IAircrew,
         IEntity,
         IErrors,
         IElementBeingEdited,
         UErrorTypes,
         UErrorLocs,
         IGroups,
         ISettings} from '../types/State';
import { IAddErrorArgs } from '../actions';

type IAircrewEntity = IEntity<IAircrew>;

/**
 * This component is responsible for displaying all the input elements, their errors from validation and does the
 * searching and comparison for aircrew names in input text. It accepts the unique input attributes as its "ownProps"
 * and passes most of them right on to the presentational component FlexInput. The heavy lifting of this component is
 * recognizing aircrew names in the input value, dispatching an action to add the aircrew Id to the correct part of
 * the state, dispatching the action passed to it by the parent component to update the value of the field, getting
 * the value of the field and any referenced aircrew Ids saved in the state, checking if the refIds for this input
 * are in conflict with other refs to that same aircrewID, and to pass that info on to the presentational
 * component to dictate its display.
 */

interface IErrorConfig {
    show: UErrorTypes[];
    update: UErrorTypes[];
    errorLoc: UErrorLocs;
    errorLocId: string;
}

interface IFlexInputContainerProps {
    placeHolder: string;
    className?: string;
    name: string;
    value: string;
    onChange: (e: any) => any;
    errorConfig: IErrorConfig;
    element: UEditables;
    entityId: string;
    validatorFns?: ValidatorFn[];
    restrictorFns?: RestrictorFn[];
}

const getAircrewList = (aircrew: IAircrewEntity): IAircrew[] => {
    return aircrew.allIds.map(id => aircrew.byId[id]);
};

const getAircrewRefList = (state: IState,
                           element: UEditables,
                           entityId: string
): IAircrew[] => {
    /**
     * @param {IState} state The application state
     * @param {UEditables} element element location
     * @param {string} entityId id of the element above
     * @returns {IAircrew[]} Array of aircrew objects or empty array.
     *
     * This returns the aircrew that are referenced in the value of the input field for the presentational component to
     * display as required.
     *
     * State it needs:
     * state.aircrew.byId[entityId]
     * state.sorties.byId[entityId]
     * state.notes.byId[entityId]
     */
    switch (element) {
        case nameLocation.FRONT_SEAT_NAME:
            return state.sorties.byId[entityId].front.aircrewRefIds.map(id => state.aircrew.byId[id]);
        case nameLocation.BACK_SEAT_NAME:
            return state.sorties.byId[entityId].back.aircrewRefIds.map(id => state.aircrew.byId[id]);
        case nameLocation.NOTE:
            return state.notes.byId[entityId].aircrewRefIds.map(id => state.aircrew.byId[id]);
        case nameLocation.SNIV_FORM:
            return state.addUpdateSnivFormValues.aircrewRefIds.map(id => state.aircrew.byId[id]);
        default:
            return [];
    }
};

const getComponentErrors = (dayErrors: IErrors[],
                            errorLoc: UErrorLocs,
                            errorLocId: string,
                            errorTypesToGet: string[],
                            aircrewRefIds: string[]
): IErrors[] => {
    /**
     * Should collect all the errors specified in errorsTypes.show from ownProps.
     * Right now, there is only one error type.
     * Passes shown errors to component
     */
    const schedErrors = errorTypesToGet.indexOf(errorTypes.SCHEDULE_CONFLICT) > -1 ?
        getSchedErrors(dayErrors, errorLoc, errorLocId, aircrewRefIds) : [];
    const timeOrderErrors = errorTypesToGet.indexOf(errorTypes.TIME_ORDER) > -1 ?
        getTimeOrderErrors(dayErrors, errorLoc, errorLocId) : [];
    return [...schedErrors, ...timeOrderErrors];
};

const getSchedErrors = (dayErrors: IErrors[],
                        errorLoc: UErrorLocs,
                        errorLocId: string,
                        aircrewRefIds: string[]
): IErrors[] => {
    /**
     * @param
     * @param
     * @returns {IErrors[]} an array of errors that apply to this input.
     * Finds the active errors with any of aircrewRefIds for this input in the meta.
     * Also runs the val??? Might screw with memoization.
     */
    const schedErrors = dayErrors.filter(error => {
        return (error.type === errorTypes.SCHEDULE_CONFLICT &&
                // error.location === errorLoc &&
                error.locationId === errorLocId &&
                aircrewRefIds.indexOf(error.meta.aircrewId) > -1);
    });
    return schedErrors;
};

const getTimeOrderErrors = (dayErrors: IErrors[], errorLoc: UErrorLocs, errorLocId: string): IErrors[] => {
    return dayErrors.filter(error => {
        return (error.type === errorTypes.TIME_ORDER &&
                error.location === errorLoc &&
                error.locationId === errorLocId);
    });
};

const getValidationErrors = (text: string, validatorFns?: ValidatorFn[]) => {
    if (!validatorFns || validatorFns.length === 0) {
        return [];
    }
    return validator(text, ...validatorFns);
};

export const flightIsCrewHotPit = (block: ISchedBlock, scblock: ISchedBlock, settings: ISettings): boolean => {
    if (block.location !== errorLocs.FLIGHT || scblock.location !== errorLocs.FLIGHT) {
        return false;
    }
    const diff1 = Moment.duration(block.hardStart.diff(scblock.hardEnd));
    const diff2 = Moment.duration(scblock.hardStart.diff(block.hardEnd));
    if ((diff1 <= Moment.duration(settings.hotPitNoLongerThan, 'minutes') &&
        diff1 >= Moment.duration(settings.hotPitNoShorterThan, 'minutes')) ||
        (diff2 <= Moment.duration(settings.hotPitNoLongerThan, 'minutes') &&
        diff2 >= Moment.duration(settings.hotPitNoShorterThan, 'minutes'))) {
        return true;
    }
    return false;
};

const pushBlockAsError = (
    errorArray: IAddErrorArgs[],
    block: ISchedBlock,
    conflictsWithBlock: ISchedBlock,
    aircrew: IAircrew,
    currentDayId: string
): void => {
    let message = '';
    switch (conflictsWithBlock.location) {
        case errorLocs.FLIGHT:
            message = errorMessages.FLIGHT_CONFLICT;
            break;
        case errorLocs.SIM:
            message = errorMessages.SIM_CONFLICT;
            break;
        case errorLocs.FLIGHT_NOTE:
            message = errorMessages.FLIGHT_NOTE_CONFLICT;
            break;
        case errorLocs.SIM_NOTE:
            message = errorMessages.SIM_NOTE_CONFLICT;
            break;
        case errorLocs.SNIVS:
            message = errorMessages.SNIV_CONFLICT;
            break;
        case errorLocs.DAY_NOTE:
            message = errorMessages.NOTE_CONFLICT;
            break;
        default:
            message = 'is scheduled at this time.';
            break;
    }
    errorArray.push({
        dayId: currentDayId,
        type: errorTypes.SCHEDULE_CONFLICT,
        location: block.location,
        locationId: block.locationId,
        level: errorLevels.WARN,
        message: `${aircrew.callsign} ${message}`,
        meta: {
            aircrewId: aircrew.id,
        },
    });
};

const findSchedErrors = (activeAircrewRefs: ISchedObject,
                         currentDayId: string,
                         aircrewById: {[key: string]: IAircrew},
                         settings: ISettings
): IAddErrorArgs[] => {
    /**
     * @param
     * @param
     * @returns {IAddErrorArgs[]} Array of IErrors objects sorted by error level.
     * Creates the errors generated by any scheduling conflicts
     *
     * So it runs the logic that checks for scheds conflicts, then aggregates the errors.
     *
     * Uses:
     * whatever getActiveAircrewRefs uses
     * state.crewList.currentDay
     * state.aircrew.byId
     */

    const errors: IAddErrorArgs[] = [];
    Object.keys(activeAircrewRefs).forEach(aircrewId => {
        activeAircrewRefs[aircrewId]
            .reduce((schedConflictArray: ISchedBlock[], block: ISchedBlock) => {
                /**
                 * for each aircrew that is scheduled, go through each sched block.
                 * for each block, check schedConflictArray to see if any block conflicts with its time slot.
                 * if a block conflicts, push an error onto errors for each block.
                 * - blocks conflict if either:
                 *   - start time is inside or equal to the schedConflictArray block values
                 *   - end time is inside or equal to the schedConflictArray block values
                 *   - schedConflictArray start time is between or equal to the compared block
                 * if both blocks are snivs, ignore the error.
                 * add the new sched block to schedConflicArray and repeat for the next block.
                 *
                 * This logic is duplicated in VisibleCrewList ***!
                 * Assumes start and end are actually in order ***!
                 */
                schedConflictArray.forEach(scblock => {
                    if ((block.location === errorLocs.SNIVS && scblock.location === errorLocs.SNIVS) ||
                        flightIsCrewHotPit(block, scblock, settings)) {
                        return;
                    } else if (block.start >= scblock.start && block.start <= scblock.end) {
                        pushBlockAsError(errors, block, scblock, aircrewById[aircrewId], currentDayId);
                        pushBlockAsError(errors, scblock, block, aircrewById[aircrewId], currentDayId);
                    } else if (block.end >= scblock.start && block.end <= scblock.end) {
                        pushBlockAsError(errors, block, scblock, aircrewById[aircrewId], currentDayId);
                        pushBlockAsError(errors, scblock, block, aircrewById[aircrewId], currentDayId);
                    } else if (scblock.start >= block.start && scblock.start <= block.end) {
                        pushBlockAsError(errors, block, scblock, aircrewById[aircrewId], currentDayId);
                        pushBlockAsError(errors, scblock, block, aircrewById[aircrewId], currentDayId);
                    }
                });
                return schedConflictArray.concat(block);
            }, []);
    });
    return errors;
};

const getGroupRefsFromInput = (inputValue: string, groupList: IGroups[]): IGroups[] => {
    return groupList.filter(group => {
        return inputValue.includes(group.name);
    });
};

const getUniqueAircrewIdsFromGroups = (groupRefs: IGroups[]): string[] => {
    const uniqueAircrewIds: string[] = [];
    groupRefs.forEach(group => {
        group.aircrewIds.forEach(aircrewId => {
            if (uniqueAircrewIds.indexOf(aircrewId) === -1) {
                uniqueAircrewIds.push(aircrewId);
            }
        });
    });
    return uniqueAircrewIds;
};

const nameMatch = (
    aircrewList: IAircrew[],
    groupList: IGroups[],
    inputValue: string
): IAircrew[] => {
    /**
     * @param {IAircrew[]} aircrewList Array containing full list of aircrew objects.
     * @param {string} inputValue The actual value of the input field
     * @returns {IAircrew[]} Array of aircrew objects with name fields tha match the input
     *
     * Finds the aircrew that are referenced in this input.
     *
     * Should I use first or even last name? First is not likely to be unique. Maybe if I had a way to suggest name
     * matches instead of assume a match. Also, first and last can be ''. I'd have to check for that first. I think
     * includes would return true
     *
     * This is its own function because I think this will become more complex later.
     */
    const groupRefs = getGroupRefsFromInput(inputValue, groupList);
    const groupAircrewRefsIds = getUniqueAircrewIdsFromGroups(groupRefs);
    return aircrewList.filter(aircrew => {
        return inputValue.toLowerCase().includes(aircrew.callsign.toLowerCase()) ||
            (groupAircrewRefsIds.indexOf(aircrew.id) > -1);
    });
};

export const setErrorsOnFreshState = (errorTypesToCheck: string[]) => {
    return (dispatch: any, getState: () => IState) => {
        const state = getState();
        /** clear and recalc schedule conflict errors */
        if (errorTypesToCheck.indexOf(errorTypes.SCHEDULE_CONFLICT) > -1) {
            state.days.byId[state.crewListUI.currentDay].errors.forEach(errorId => {
                if (state.errors.byId[errorId].type === errorTypes.SCHEDULE_CONFLICT) {
                    dispatch(actions.clearError(errorId, state.crewListUI.currentDay));
                }
            });
            const activeRefsAndBlock = getActiveAircrewRefs(state.days.byId[state.crewListUI.currentDay],
                                                            state.editor.elementBeingEdited,
                                                            state.settings,
                                                            state.flights.byId,
                                                            state.sorties.byId,
                                                            state.notes.byId,
                                                            state.snivs);
            const newErrors = findSchedErrors(activeRefsAndBlock.activeAircrewRefs,
                                              state.crewListUI.currentDay,
                                              state.aircrew.byId,
                                              state.settings);
            newErrors.forEach(error => {
                dispatch(actions.addError(error));
            });
            dispatch(actions.setEditedElementTimeblock(activeRefsAndBlock.activeTimeblock));
        }
    };
};

interface IGetOnChangeWithNameMatchArgs {
    aircrewList: IAircrew[];
    groupList: IGroups[];
    dispatch: any;
    hasNames: boolean;
    element: UEditables;
    entityId: string;
    errorConfig: IErrorConfig;
    onChange: (e: any) => any;
}

const getOnChangeWithNameMatch = ({
    aircrewList,
    groupList,
    dispatch,
    hasNames,
    element,
    entityId,
    errorConfig,
    onChange,
}: IGetOnChangeWithNameMatchArgs): ((editorState: EditorState) => void) => {
    /**
     * @param {object}
     * @returns {function} If addNameIdTo is specified, returns updated onChange function.
     * It wraps the onChange function passed and:
     * clears the old errors,
     * compares the value being updated with all the aircrew names,
     * finds scheduling conflicts and dispatches appropriate errors,
     * and dispatches the Ids[] of matched aircrew to the specified state slice.
     * If not specified, returns the same onChange function.
     */
    let aircrewRefIdDispatch: (ids: string[]) => void;
    if (!hasNames) {
        aircrewRefIdDispatch = (matchedAircrewIds: string[]) => { return; };
    } else {
        switch (element) {
            case nameLocation.FRONT_SEAT_NAME:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.updateSeatCrewRefs(entityId, 'front', matchedAircrewIds));
                };
                break;
            case nameLocation.BACK_SEAT_NAME:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.updateSeatCrewRefs(entityId, 'back', matchedAircrewIds));
                };
                break;
            case nameLocation.NOTE:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.updateNoteCrewRefs(entityId, matchedAircrewIds));
                };
                break;
            case nameLocation.SNIV_FORM:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.setSnivForm({aircrewRefIds: matchedAircrewIds}));
                };
                break;
            default:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => { return; };
                break;
        }
    }
    return (editorState) => {
        /** update the aircrewRefs state for this input */
        const matchedAircrew = nameMatch(
            aircrewList,
            groupList,
            editorState.getCurrentContent().getPlainText()
        );
        const matchedAircrewIds = matchedAircrew.map(aircrew => aircrew.id);
        aircrewRefIdDispatch(matchedAircrewIds);
        /** update the editor state and reset the decorators for the editor */
        const decorator = getDecorators(matchedAircrew, groupList);
        const newEditorState = EditorState.set(editorState, {decorator});
        dispatch(actions.setEditorState(newEditorState));
        /** run the original onChange passed to this container as a prop (update the input value) */
        onChange(editorState.getCurrentContent().getPlainText());
        /** get the new errors and dispatch to state. */
        dispatch(setErrorsOnFreshState(errorConfig.update));
    };
};

const getEditorState = (state: IState) => {
    return state.editor.editorState;
};

const getElementBeingEdited = (state: IState) => {
    return state.editor.elementBeingEdited;
};

const isInputActive = (state: IState, ownProps: IFlexInputContainerProps) => {
    if (ownProps.element === state.editor.elementBeingEdited.element &&
        ownProps.entityId === state.editor.elementBeingEdited.entityId) {
            return true;
    }
    return false;
};

const nameStrategy = (name: string) => (
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
) => {
    const text = contentBlock.getText().toLowerCase();
    const start = text.indexOf(name.toLowerCase());
    if (start > -1) {
        callback(start, start + name.length);
    }
};

const nameSpan = (id: string) => (props: any) => {
    return (
        <span
            className="text-primary"
            data-offset-key={props.dataOffsetKey}
            onClick={onXClick(id)}
        >
            {props.children}
        </span>
    );
};

const onXClick = (id: string) => (e: any) => {
    alert(id);
};

const getDecorators = (aircrewRefList: IAircrew[], groupRefList: IGroups[]): CompositeDecorator => {
    let decorators = aircrewRefList.map(aircrew => {
        return {
            strategy: nameStrategy(aircrew.callsign),
            component: nameSpan(aircrew.id),
        };
    });
    decorators = decorators.concat(groupRefList.map(group => {
        return {
            strategy: nameStrategy(group.name),
            component: nameSpan(group.id),
        };
    }));
    const compositeDecorators = new CompositeDecorator(decorators);
    return compositeDecorators;
};

const doesInputHaveNames = (editable: UEditables) => {
    return (Object.values(nameLocation).indexOf(editable) > -1);
};

const getGroupList = (groups: IEntity<IGroups>, aircrewIds: string[]): IGroups[] => {
    const userGroups = groups.allIds.map(groupId => groups.byId[groupId]);
    const builtInGroups = builtInGroupNames.map(name => {
        return {
            id: cuid(),
            name: name,
            aircrewIds,
        };
    });
    return userGroups.concat(builtInGroups);
};

interface IFlexInputStateProps {
    aircrewList: IAircrew[];
    groupList: IGroups[];
    aircrewRefList: IAircrew[];
    state: IState;
    errors: IErrors[];
    editorState: EditorState;
    elementBeingEdited: IElementBeingEdited;
    isInputActive: boolean;
    hasNames: boolean;
}

const mapStateToProps = (state: IState, ownProps: IFlexInputContainerProps): IFlexInputStateProps => {
    const hasNames = doesInputHaveNames(ownProps.element);
    const aircrewRefList = hasNames ? getAircrewRefList(state, ownProps.element, ownProps.entityId) : [];
    const aircrewRefIds = aircrewRefList.map(aircrew => aircrew.id);
    const dayErrors = getActiveDayErrors(state.errors.byId, state.days.byId[state.crewListUI.currentDay]);
    const componentErrors = getComponentErrors(
        dayErrors,
        ownProps.errorConfig.errorLoc,
        ownProps.errorConfig.errorLocId,
        ownProps.errorConfig.show,
        aircrewRefIds
    );
    return {
        aircrewList: hasNames ? getAircrewList(state.aircrew) : [],
        groupList: hasNames ? getGroupList(state.groups, state.aircrew.allIds) : [],
        aircrewRefList,
        state,
        errors: componentErrors,
        editorState: getEditorState(state),
        elementBeingEdited: getElementBeingEdited(state),
        isInputActive: isInputActive(state, ownProps),
        hasNames,
    };
};

const mergeProps = (stateProps: IFlexInputStateProps, dispatchProps: any, ownProps: IFlexInputContainerProps) => {
    /**
     * Necessary because I need a slice of the state in the dispatch I'm wrapping here. Specifically, depending on
     * ownProps.addNameIdTo, I'm comparing the input value (about to be dispatched by ownProps.onChange) to all the
     * other aircrew (the state I need) to see if there are matches and dispatching to update the state with the
     * referenced aircrewIds if there are.
     * @param stateProps Object returned by mapStateToProps above
     * @param dispatchProps The redux dispatch function (passed in connect below)
     * @param ownProps The props passed into this element at render (the container)
     * @returns Final props object to FlexInput for rendering.
     *
     * Optimization: definitely don't want to pass the entire state here. Figure out the slices this function needs.
     */
    const decorators = getDecorators(stateProps.aircrewRefList, stateProps.groupList);
    /** handle text insert and paste. function signatures are different, but function is the same. */
    const restrictorFn = ownProps.restrictorFns && ownProps.restrictorFns.length > 0 ?
        restrictor(...ownProps.restrictorFns) : null;
    const inputRestrictor = restrictorFn ?
        {
            textInput: restrictorFn,
            pasteInput: (text: string, html: string, editorState: EditorState) =>
                restrictorFn(text, editorState),
        } : undefined;
    return Object.assign({}, ownProps, {
        onChange: getOnChangeWithNameMatch({
            aircrewList: stateProps.aircrewList,
            groupList: stateProps.groupList,
            dispatch: dispatchProps.dispatch,
            hasNames: stateProps.hasNames,
            element: ownProps.element,
            entityId: ownProps.entityId,
            errorConfig: ownProps.errorConfig,
            onChange: ownProps.onChange,
        }),
        onClick: () => {
            if (stateProps.isInputActive) {
                return;
            }
            /** cursor to end of text on mount */
            const contentState = ContentState.createFromText(ownProps.value);
            const initEditorState = EditorState.createWithContent(contentState, decorators);
            const blockMap = contentState.getBlockMap();
            const key = blockMap.first().getKey();
            const offset = blockMap.first().getLength();
            const selectionState = new SelectionState({
                anchorKey: key,
                anchorOffset: offset,
                focusKey: key,
                focusOffset: offset,
            });
            const editorState = EditorState.forceSelection(initEditorState, selectionState);
            /** set and dispatch editorState and elementBeingEdited */
            dispatchProps.dispatch(actions.setEditorState(editorState));
            dispatchProps.dispatch(actions.setEditedElement(ownProps.element, ownProps.entityId));
            dispatchProps.dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        onBlur: (e: any) => {
            dispatchProps.dispatch(actions.setEditedElement(null, null));
            dispatchProps.dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        className: ownProps.className,
        errors: stateProps.errors,
        aircrewRefList: stateProps.aircrewRefList,
        editorState: stateProps.editorState,
        showEditor: stateProps.isInputActive,
        restrictor: inputRestrictor,
        validationErrors: getValidationErrors(stateProps.isInputActive ?
                                                stateProps.editorState.getCurrentContent().getPlainText() :
                                                ownProps.value,
                                              ownProps.validatorFns),
    });
};

const FlexInputContainer = connect(
    mapStateToProps,
    ((dispatch: any) => { return { dispatch: dispatch }; }),
    mergeProps
)(FlexInput);

export default FlexInputContainer;
