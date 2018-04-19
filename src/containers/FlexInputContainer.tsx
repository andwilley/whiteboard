import { connect } from 'react-redux';
import { actions } from '../actions';
import { seats } from '../whiteboard-constants';
import { errorLevels, errorTypes, errorLocs } from '../errors';
import { IState, IAircrew, IEntity, IErrors, IDays } from '../types/State';
import { IAddErrorArgs } from '../actions';
import FlexInput from '../components/FlexInput';
import { RGX_24HOUR_TIME, RGX_STARTS_WITH_TIME_BLOCK } from '../util/validator';
type IAircrewEntity = IEntity<IAircrew>;

export const nameLocation = {
    FRONT_SEAT: 'FRONT_SEAT',
    BACK_SEAT: 'BACK_SEAT',
    NOTE: 'NOTE',
};

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

interface IFlexInputContainerProps {
    placeHolder: string;
    name: string;
    value: string;
    onChange: (e: any) => any;
    errorConfig: {
        show: string[];
        update: string[];
        errorLoc: string;
        errorLocId: string;
    };
    validators?: string[];
    addNameIdTo?: {nameLocation: string; entityId: string};
}

interface ISchedBlock {
    start: Date;
    end: Date;
    location: string;
    locationId: string;
}

interface ISchedObject {
    [id: string]: ISchedBlock[];
}

const getAircrewList = (aircrew: IAircrewEntity): IAircrew[] => {
    return aircrew.allIds.map(id => aircrew.byId[id]);
};

const getAircrewRefList = (state: IState,
                           addNameIdTo: {nameLocation: string; entityId: string} | undefined
): IAircrew[] => {
    /**
     * @param {IState} state The application state
     * @param {nameLocation: string, entityId: string} addNameIdTo Object passed the container component with info
     * about applicable state slice.
     * @returns {IAircrew[]} Array of aircrew objects or empty array.
     *
     * This returns the aircrew that are referenced in the value of the input field for the presentational component to
     * display as required.
     *
     * State it needs:
     * state.aircrew.byId[addNameIdTo.entityId]
     * state.sorties.byId[addNameIdTo.entityId]
     * state.notes.byId[addNameIdTo.entityId]
     */
    if (!addNameIdTo) {
        return [];
    }
    switch (addNameIdTo.nameLocation) {
        case nameLocation.FRONT_SEAT:
            return state.sorties.byId[addNameIdTo.entityId].front.aircrewRefIds.map(id => state.aircrew.byId[id]);
        case nameLocation.BACK_SEAT:
            return state.sorties.byId[addNameIdTo.entityId].back.aircrewRefIds.map(id => state.aircrew.byId[id]);
        case nameLocation.NOTE:
            return state.notes.byId[addNameIdTo.entityId].aircrewRefIds.map(id => state.aircrew.byId[id]);
        default:
            return [];
    }
};

const getComponentErrors = (dayErrors: IErrors[],
                            errorLoc: string,
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
    return [...schedErrors];
};

const getDayErrors = (errorsById: { [id: string]: IErrors }, currentDay: IDays): IErrors[] => {
    /**
     * days.byId[currentDay].errors
     * state.errors.byId
     */
    const dayErrors = currentDay.errors.map(errorId => errorsById[errorId]).filter(error => error.display);
    return dayErrors;
};

const getSchedErrors = (dayErrors: IErrors[],
                        errorLoc: string,
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
                error.location === errorLoc &&
                error.locationId === errorLocId &&
                aircrewRefIds.indexOf(error.meta.aircrewId) > -1);
    });
    return schedErrors;
};

// const getValidationErrors = () => {
//     if (ownProps.validators.length > 0) {
//         /**
//          * Check the input against the provided validation functions
//          */
//     }
// };

interface IFindSchedErrorsReducePreviousValue {
    lastBlock: ISchedBlock;
    lastTime: Date;
}

const findSchedErrors = (state: IState): IAddErrorArgs[] => {
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
    const activeAircrewRefs = getActiveAircrewRefs(state);
    const emptyBlock = {
        start: new Date(0),
        end: new Date(0),
        location: '',
        locationId: '',
    };
    const errors: IAddErrorArgs[] = [];
    Object.keys(activeAircrewRefs).forEach(aircrewId => {
        activeAircrewRefs[aircrewId].sort((a: ISchedBlock, b: ISchedBlock) => {
            if (a.start < b.start) { return -1; }
            if (a.start > b.start) { return 1; }
            return 0;
        });
        activeAircrewRefs[aircrewId]
            .reduce((acc: IFindSchedErrorsReducePreviousValue, schedBlock: ISchedBlock) => {
            const actualFirst = (schedBlock.start < schedBlock.end) ? schedBlock.start : schedBlock.end;
            const actualLast = (schedBlock.start < schedBlock.end) ? schedBlock.end : schedBlock.start;
            if (actualFirst < acc.lastTime) {
                /** create an error for both locations */
                [acc.lastBlock, schedBlock].forEach(block => {
                    errors.push({
                        dayId: state.crewListUI.currentDay,
                        type: errorTypes.SCHEDULE_CONFLICT,
                        location: block.location,
                        locationId: block.locationId,
                        level: errorLevels.ERROR,
                        message: `${state.aircrew.byId[aircrewId].callsign} has a schedule conflict.`,
                        meta: {
                            aircrewId,
                        },
                    });
                });
            }
            acc.lastBlock = schedBlock;
            acc.lastTime = actualLast;
            return acc;
        }, {lastBlock: emptyBlock, lastTime: new Date(0)});
    });
    return errors;
};

const getSchedFromFlightTimes = (
    activeAircrewRefs: ISchedObject,
    state: IState,
    flightId: string,
    aircrewId: string
): ISchedObject => {
    /**
     * Assumes worst case for flights unless we can deduce it from the settings.
     * Crew in the seat for a sortie are assumed to be busy from brief to land with an offset on
     * either end (default 60 min) to account for prep and debrief.
     * If no brief time is given, its assumed to be the standard time from brief to takeoff (default
     * is 120 minutes) plus the offset. If no takeoff time is given, assume flight starts at 0000.
     * If no land time is given, assume flight lands at 2359. (may be smart to use a standard flight
     * duration for this, so we can go past midnight if thats when the flight takes off)
     *
     * NEEDS:
     * state.settings
     * state.flights
     * state.crewListUI.currentDay
     */
    let startTimeHr, startTimeMn, endTimeHr, endTimeMn;
    let startOffset = state.settings.minutesBeforeBrief * 60000;
    let endOffset = state.settings.minutesAfterLand * 60000;
    if (RGX_24HOUR_TIME.test(state.flights.byId[flightId].times.brief)) {
        startTimeHr = state.flights.byId[flightId].times.brief.slice(0, 2);
        startTimeMn = state.flights.byId[flightId].times.brief.slice(2, 4);
    } else if (RGX_24HOUR_TIME.test(state.flights.byId[flightId].times.takeoff)) {
        startTimeHr = state.flights.byId[flightId].times.takeoff.slice(0, 2);
        startTimeMn = state.flights.byId[flightId].times.takeoff.slice(2, 4);
        startOffset += state.settings.minutesBriefToTakeoff * 60000;
    } else {
        startTimeHr = '00';
        startTimeMn = '00';
        startOffset = 0;
    }
    if (RGX_24HOUR_TIME.test(state.flights.byId[flightId].times.land)) {
        endTimeHr = state.flights.byId[flightId].times.land.slice(0, 2);
        endTimeMn = state.flights.byId[flightId].times.land.slice(2, 4);
    } else {
        endTimeHr = '23';
        endTimeMn = '59';
        endOffset = 0;
    }
    const startDate = new Date(`${state.crewListUI.currentDay}T${startTimeHr}:${startTimeMn}:00.000`);
    const endDate = new Date(`${state.crewListUI.currentDay}T${endTimeHr}:${endTimeMn}:00.000`);
    const schedBlock = {
        start: new Date(startDate.getTime() - startOffset),
        end: new Date(endDate.getTime() + endOffset),
        location: errorLocs.FLIGHT,
        locationId: flightId,
    };
    activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
        [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
    return activeAircrewRefs;
};

const getSchedFromNotes = (
    activeAircrewRefs: ISchedObject,
    state: IState,
    noteId: string,
    aircrewId: string,
    flightNote: boolean = false,
    flightId: string = ''
): ISchedObject => {
    /**
     * Gets referenced aircrew start and end times from notes.
     * @param {ISchedBlock} activeAircrewRefs The working dict of refed aircrew and their scheduled times.
     * @param {IState} state The app state.
     * @param {string} noteId
     * @param {string} aircrewId
     * @param {?boolean} flightNote True if this is a flight note. Default: false.
     * @param {?string} flightId Needed if this is a flight note. Default: ''
     * @returns {ISchedBlock}
     * if times were specified, uses those. if start time but no end time, uses land time.
     * *** this doesn't check if land time comes after start time!!!!!!!!!
     * If no land time, uses stardard note duration (default 60 min).
     * If times aren't specified, uses flight times in the same way as above.
     * If flightNote is false, skips using flight times, defaults to length.
     *
     * NEEDS:
     * state.notes
     * state.flights
     * state.settings
     * state.crewListUI.currentDay
     */
    const noteTimes = RGX_STARTS_WITH_TIME_BLOCK.exec(state.notes.byId[noteId].content);
    let startTimeHr, startTimeMn, endTimeHr, endTimeMn;
    let endOffset = 0;
    if (noteTimes) {
        startTimeHr = noteTimes[1].slice(0, 2);
        startTimeMn = noteTimes[1].slice(2, 4);
        if (noteTimes[2]) {
            endTimeHr = noteTimes[2].slice(0, 2);
            endTimeMn = noteTimes[2].slice(2, 4);
        } else if (flightNote && RGX_24HOUR_TIME.test(state.flights.byId[flightId].times.land)) {
            endTimeHr = state.flights.byId[flightId].times.land.slice(0, 2);
            endTimeMn = state.flights.byId[flightId].times.land.slice(2, 4);
        } else {
            endOffset = state.settings.minutesNoteDuration * 60000;
        }
        const startDate = new Date(`${state.crewListUI.currentDay}T${startTimeHr}:${startTimeMn}:00.000`);
        const endDate = endOffset === 0 ?
            new Date(`${state.crewListUI.currentDay}T${endTimeHr}:${endTimeMn}:00.000`) :
            new Date(startDate.getTime() + endOffset);
        const schedBlock = {
            start: startDate,
            end: endDate,
            location: flightNote ? errorLocs.FLIGHT : errorLocs.DAY_NOTE,
            locationId: flightNote ? flightId : state.crewListUI.currentDay,
        };
        activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
            [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
    } else {
        if (flightNote) {
            activeAircrewRefs = getSchedFromFlightTimes(activeAircrewRefs, state, flightId, aircrewId);
        } else {
            const schedBlock = {
                start: new Date(`${state.crewListUI.currentDay}T00:00:00.000`),
                end: new Date(`${state.crewListUI.currentDay}T23:59:00.000`),
                location: flightNote ? errorLocs.FLIGHT : errorLocs.DAY_NOTE,
                locationId: flightNote ? flightId : state.crewListUI.currentDay,
            };
            activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
        }
    }
    return activeAircrewRefs;
};

const getActiveAircrewRefs = (state: IState): ISchedObject => {
    /**
     * @param {IState} state The application state (store.getState())
     * @returns {object} keyed by aircrewId with values set to an array of the timespans associated with each ref
     * This checks all the places aircrew Ids can be referenced in the current day, aggregates them into an object and
     * includes the times they are scheduled for, so we can check for conflicts in another function.
     * Looks for names in:
     * state.days.byId[currentDay].flights (to find flights)
     *  for each state.flights.byId[flightId].sorties (to find sorties)
     *   for each state.sorites.byId[sortieId].front/back (to read the seats)
     *  for each state.flights.byId[fligthId].notes (to find flight notes)
     * state.days.byId[currentDay].notes (to find day notes)
     * state.notes.byId[.allIds] (to read the notes)
     * NEEDS:
     * state.crewListUI.currentDay
     * state.days
     * state.flights
     * state.sorties
     * state.notes
     *
     * Optimization: as it is, this will run EVERY TIME THE STATE CHANGES, even if memoized.
     * For sure, just passing the needed slices will make the app faster. That way, for example, if crewList is
     * updated, this won't recalc. As of now, it will. However...
     * If all that changes is the one currently active value... it still updates because the value changed in
     * the state, even though an aircrewRef may not have changed. We update the aircrew ref every time anyway, so even
     * if a it is the same by value, it will be shallow compared and not the same every time in reselect.
     * We could break this up by section, get sorties, flight notes and day notes separately, so if say flight Notes
     * change, we don't have to recompute all the other ones, but we'd still have to go all the way through flight
     * Notes...
     */
    let activeAircrewRefs = {};
    state.days.byId[state.crewListUI.currentDay].flights.forEach(flightId => {
        state.flights.byId[flightId].sorties.forEach(sortieId => {
            seats.forEach(seat => {
                state.sorties.byId[sortieId][seat].aircrewRefIds.forEach((aircrewId: string) => {
                    /** Get all the referenced aircrew from sorties in the current day */
                    activeAircrewRefs = getSchedFromFlightTimes(activeAircrewRefs, state, flightId, aircrewId);
                });
            });
        });
        state.flights.byId[flightId].notes.forEach(noteId => {
            state.notes.byId[noteId].aircrewRefIds.forEach(aircrewId => {
                /** Get all the referenced aircrew from flight notes in the current day */
                activeAircrewRefs = getSchedFromNotes(activeAircrewRefs, state, noteId, aircrewId, true, flightId);
            });
        });
    });
    state.days.byId[state.crewListUI.currentDay].notes.forEach(noteId => {
        state.notes.byId[noteId].aircrewRefIds.forEach(aircrewId => {
            /** Get all the referenced aircrew from day notes in the current day */
            activeAircrewRefs = getSchedFromNotes(activeAircrewRefs, state, noteId, aircrewId);
        });
    });
    return activeAircrewRefs;
};

const nameMatch = (aircrewList: IAircrew[], inputValue: string): IAircrew[] => {
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
    return aircrewList.filter(aircrew => inputValue.toLowerCase().includes(aircrew.callsign.toLowerCase()));
};

const resetErrorsOnFreshState = (errorTypesToCheck: string[]) => {
    return (dispatch: any, getState: () => IState) => {
        const state = getState();
        /** clear and recalc schedule conflict errors */
        if (errorTypesToCheck.indexOf(errorTypes.SCHEDULE_CONFLICT) > -1) {
            state.days.byId[state.crewListUI.currentDay].errors.forEach(errorId => {
                if (state.errors.byId[errorId].type === errorTypes.SCHEDULE_CONFLICT) {
                    dispatch(actions.clearError(errorId, state.crewListUI.currentDay));
                }
            });
            const newErrors = findSchedErrors(state);
            newErrors.forEach(error => {
                dispatch(actions.addError(error));
            });
        }
    };
};

interface IGetOnChangeWithNameMatchArgs {
    aircrewList: IAircrew[];
    dispatch: any;
    ownProps: IFlexInputContainerProps;
    errorTypesToCheck: string[];
}

const getOnChangeWithNameMatch = (args: IGetOnChangeWithNameMatchArgs): ((val: string) => void) => {
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
    const { aircrewList, dispatch, ownProps } = args;
    const addNameIdTo = ownProps.addNameIdTo;
    let aircrewRefIdDispatch: (ids: string[]) => void;
    if (!addNameIdTo) {
        aircrewRefIdDispatch = (matchedAircrewIds: string[]) => { return; };
    } else {
        switch (addNameIdTo.nameLocation) {
            case nameLocation.FRONT_SEAT:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.updateSeatCrewRefs(addNameIdTo.entityId, 'front', matchedAircrewIds));
                };
                break;
            case nameLocation.BACK_SEAT:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.updateSeatCrewRefs(addNameIdTo.entityId, 'back', matchedAircrewIds));
                };
                break;
            case nameLocation.NOTE:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => {
                    dispatch(actions.updateNoteCrewRefs(addNameIdTo.entityId, matchedAircrewIds));
                };
                break;
            default:
                aircrewRefIdDispatch = (matchedAircrewIds: string[]) => { return; };
                break;
        }
    }
    return (val) => {
        /** update the aircrewRefs state for this input */
        const matchedAircrewIds = nameMatch(aircrewList, val).map(aircrew => aircrew.id);
        aircrewRefIdDispatch(matchedAircrewIds);
        /** run the original onChange passed to this container as a prop (update the input value) */
        ownProps.onChange(val);
        /** get the new errors and dispatch to state. */
        dispatch(resetErrorsOnFreshState(ownProps.errorConfig.update));
    };
};

interface IFlexInputStateProps {
    aircrewList: IAircrew[];
    aircrewRefList: IAircrew[];
    state: IState;
    errors: IErrors[];
}

const mapStateToProps = (state: IState, ownProps: IFlexInputContainerProps) => {
    const aircrewRefList = getAircrewRefList(state, ownProps.addNameIdTo);
    const aircrewRefIds = aircrewRefList.map(aircrew => aircrew.id);
    // and getValErrors here?
    const dayErrors = getDayErrors(state.errors.byId, state.days.byId[state.crewListUI.currentDay]);
    const componentErrors = getComponentErrors(
        dayErrors,
        ownProps.errorConfig.errorLoc,
        ownProps.errorConfig.errorLocId,
        ownProps.errorConfig.show,
        aircrewRefIds
    );
    return {
        aircrewList: ownProps.addNameIdTo ? getAircrewList(state.aircrew) : [],
        aircrewRefList,
        state,
        errors: componentErrors,
    };
};

const mergeProps = (stateProps: IFlexInputStateProps, dispatchProps: any, ownProps: IFlexInputContainerProps) => {
    /**
     * Necessary because I need a slice of the state in the dispatch I'm wrapping here. Specifically, depending on
     * ownProps.addNameIdTo, I'm comparing the input value (about to be dispatched by ownProps.onChange) to all the
     * other aircrew (the state I need) to see if there are matches and dispatching to update the state with the
     * referenced aircrewIds if there are.
     *
     * @property onChange The wrapped version overwrites the one passed to this container.
     * @property aircrewRefList is the list of aircrew objects whose Ids are refed in this component (in the future,
     * this will affect display at the presentational component level).
     *
     * Optimization: definitely don't want to pass the entire state here. Figure out the slices this function needs.
     */
    return Object.assign({}, ownProps, {
        onChange: getOnChangeWithNameMatch({
            aircrewList: stateProps.aircrewList,
            dispatch: dispatchProps.dispatch,
            ownProps: ownProps,
            errorTypesToCheck: ownProps.errorConfig.update,
        }),
        errors: stateProps.errors,
        aircrewRefList: stateProps.aircrewRefList,
    });
};

const FlexInputContainer = connect(
    mapStateToProps,
    ((dispatch: any) => { return { dispatch: dispatch }; }),
    mergeProps
)(FlexInput);

export default FlexInputContainer;
