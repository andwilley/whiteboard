import { connect } from 'react-redux';
import { actions } from '../actions';
import { seats } from '../whiteboard-constants';
import { errorLevels, errorTypes, errorLocs } from '../errors';
import { IState, IFlightTimes, IAircrew, IEntity, IEntityWithActive, IErrors } from '../types/State';
import { IAction, IAddErrorArgs } from '../actions';
import FlexInput from '../components/FlexInput';
import validator, { R_24HourTime, R_startsWithTimeBlock } from '../util/validator';
type IAircrewEntity = IEntity<IAircrew>;
type IErrorEntityWithActive = IEntityWithActive<IErrors>;

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
    validators?: string[];
    addNameIdTo?: {nameLocation: string, entityId: string};
}

interface ISchedBlock {
    [id: string]: {
        start: Date;
        end: Date;
        location: string;
        locationId: string;
    }[];
}

const getAircrewList = (aircrew: IAircrewEntity): IAircrew[] => {
    return aircrew.allIds.map(id => aircrew.byId[id])
};

const getAircrewRefList = (state: IState, addNameIdTo: {nameLocation: string, entityId: string}): IAircrew[] => {
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
     * state.aircrew.byId
     * state.sorties.byId
     * state.notes.byId
     */
     if (!addNameIdTo) {
         return [];
     }
    switch(addNameIdTo.nameLocation) {
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

const getErrors = (errors: IErrorEntityWithActive, aircrewRefIds: string[]): IErrors[] => {
    /**
     * @param
     * @param
     * @returns {IErrors[]} an array of errors that apply to this input.
     * Finds the active errors with any of aircrewRefIds in the meta.
     * Also runs the val
     */
    schedErrors = aircrewRefIds.length > 0 ? errors.activeIds.filter(errorId => {
        return aircrewRefIds.indexOf(errors.byId[errorId].meta.aircrewId) > -1;
    }).map(errorId => errors.byId[errorId]) : [];
    return schedErrors;
}

const getValidationErrors = () {
    if (ownProps.validators.length > 0) {
        /**
         * Check the input against the provided validation functions
         */
    }
};

const getSchedErrors = (state: IState, aircrewRefIds: string[]): IAddErrorArgs[] => {
    /**
     * @param
     * @param
     * @returns {IAddErrorArgs[]} Array of IErrors objects sorted by error level.
     * 
     * Creates the errors generated by any scheduling conflicts
     * 
     * So it runs the val and runs the logic that checks for scheds conflicts, then aggregates the errors.
     */
    let errors = [];
    const activeAircrewRefs = getActiveAircrewRefs(state);
    aircrewRefIds.forEach(aircrewId => {
        if (activeAircrewRefs[aircrewId]) {
            activeAircrewRefs[aircrewId].sort((a, b) => {
                if (a.start < b.start) return -1;
                if (a.start > b.start) return 1;
                return 0;
            });
            activeAircrewRefs[aircrewId].reduce((lastTime, schedBlock) => {
                const actFirst = schedBlock.start < schedBlock.end ? schedBlock.start : schedBlock.end;
                const actLast = schedBlock.start < schedBlock.end ? schedBlock.end : schedBlock.start;
                if (actFirst < lastTime) {
                    errors.push({
                        type: errorTypes.SCHEDULE_CONFLICT,
                        location: schedBlock.location,
                        locationId: schedBlock.locationId,
                        level: errorLevels.ERROR,
                        message: `${state.aircrew.byId[aircrewId].callsign} has an event ending at 
                            ${lastTime.getTime()} and another starting at ${schedBlock.start.getTime()}.`,
                        meta: {
                            aircrewId,
                            dayId: state.crewListUI.currentDay,
                        },
                    });
                }
                lastTime = actLast;
            }, new Date(0));
        }
    });
    return errors;
};

const getSchedFromFlightTimes = (
    activeAircrewRefs: ISchedBlock,
    state: IState,
    flightId: string,
    aircrewId: string
): ISchedBlock => {
    /**
     * Assumes worst case for flights unless we can deduce it from the settings.
     * Crew in the seat for a sortie are assumed to be busy from brief to land with an offset on
     * either end (default 60 min) to account for prep and debrief.
     * If no brief time is given, its assumed to be the standard time from brief to takeoff (default
     * is 120 minutes) plus the offset. If no takeoff time is given, assume flight starts at 0000.
     * If no land time is given, assume flight lands at 2359. (may be smart to use a standard flight
     * duration for this, so we can go past midnight if thats when the flight takes off)
     */
    let startTimeHr, stateTimeMn, endTimeHr, endTimeMn;
    let startOffset = state.settings.minutesBeforeBrief*60000;
    let endOffset = state.settings.minutesAfterLand*60000;
    if (R_24HourTime.test(state.flights.byId[flightId].times.brief)) {
        startTimeHr = state.flights.byId[flightId].times.brief.slice(0,2);
        startTimeMn = state.flights.byId[flightId].times.brief.slice(2,4);
    } else if (R_24HourTime.test(state.flights.byId[flightId].times.takeoff)) {
        startTimeHr = state.flights.byId[flightId].times.takeoff.slice(0,2);
        startTimeMn = state.flights.byId[flightId].times.takeoff.slice(2,4);
        startOffset += state.settings.minutesBriefToTakeoff*60000;
    } else {
        startTimeHr = '00';
        startTimeMn = '00';
        startOffset = 0;
    }
    if (R_24HourTime.test(state.flights.byId[flightId].times.land)) {
        const endTimeHr = state.flights.byId[flightId].times.land.slice(0,2);
        const endTimeMn = state.flights.byId[flightId].times.land.slice(2,4);
    } else {
        startTimeHr = '23';
        startTimeMn = '59';
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
    activeAircrewRefs: ISchedBlock,
    state: IState,
    noteId: string,
    aircrewId: string,
    flightNote: boolean = false,
    flightId: string = ''
): ISchedBlock => {
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
     */
    const noteTimes = R_startsWithTimeBlock.exec(state.notes.byId[noteId].content);
    let startTimeHr, stateTimeMn, endTimeHr, endTimeMn;
    let endOffset = 0;
    if (noteTimes) {
        startTimeHr = noteTimes[1].slice(0,2);
        startTimeMn = noteTimes[1].slice(2,4);
        if (noteTimes[2]) {
            endTimeHr = noteTimes[2].slice(0,2);
            endTimeMn = noteTimes[2].slice(2,4);
        } else if (flightNote && R_24HourTime.test(state.flights.byId[flightId].times.land)) {
            endTimeHr = state.flights.byId[flightId].times.land.slice(0,2);
            endTimeMn = state.flights.byId[flightId].times.land.slice(2,4);
        } else {
            endOffset = state.settings.minutesNoteDuration*60000;
        }
        const startDate = new Date(`${state.crewListUI.currentDay}T${startTimeHr}:${startTimeMn}:00.000`);
        const endDate = endOffset === 0 ?
            new Date(`${state.crewListUI.currentDay}T${endTimeHr}:${endTimeMn}:00.000`) :
            new Date(startDate.getTime + state.settings.minutesNoteDuration);
        const schedBlock = {
            start: startDate,
            end: endDate,
            location: flightNote ? errorLocs.FLIGHT_NOTE : errorLocs.DAY_NOTE,
            locationId: flightNote ? flightId : state.crewListUI.dayId,
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
                location: flightNote ? errorLocs.FLIGHT_NOTE : errorLocs.DAY_NOTE,
                locationId: flightNote ? flightId : state.crewListUI.dayId,
            };
            activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
        }
    }
    return activeAircrewRefs;
};

const getActiveAircrewRefs = (state: IState): ISchedBlock => {
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
    const activeAircrewRefs = {};
    state.days.byId[state.crewListUI.currentDay].flights.forEach(flightId => {
        state.flights.byId[flightId].sorties.forEach(sortieId => {
            seats.forEach(seat => {
                state.sorties.byId[sortieId][seat].aircrewRefIds.forEach(aircrewId => {
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
    return aircrewList.filter(aircrew => inputValue.includes(aircrew.callsign));
};

const getOnChangeWithNameMatch = (
    state: IState,
    aircrewList: IAircrew[],
    aircrewRefList: IAircrew[],
    dispatch: any,
    ownProps: IFlexInputContainerProps
): ((e: any) => any) => {
    /** 
     * @param {function} dispatch
     * @param {IFlexInputContainerProps} ownProps Props passed to this container
     * @returns {function} If addNameIdTo is specified, returns updated onChange function. It wraps the onChange
     * function passed and:
     * compares the value being updated with all the aircrew names
     * and dispatches the Ids[] of matched aircrew to the specified state slice.
     * If not specified, returns the same onChange function.
     */
    if (!ownProps.addNameIdTo) {
        return ownProps.onChange;
        // locationSpecificDispatch = (matchedAircrewIds: string[]) => {return;}
    }
    let locationSpecificDispatch;
    switch (ownProps.addNameIdTo.nameLocation) {
        case nameLocation.FRONT_SEAT:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {
                dispatch(actions.updateSeatCrewRefs(ownProps.addNameIdTo.entityId, 'front', matchedAircrewIds));
            };
        case nameLocation.BACK_SEAT:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {
                dispatch(actions.updateSeatCrewRefs(ownProps.addNameIdTo.entityId, 'back', matchedAircrewIds));
            };
        case nameLocation.NOTE:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {
                dispatch(actions.(ownProps.addNameIdTo.entityId, matchedAircrewIds));
            };
        default:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {return;}
    }
    return (e) => {
        const matchedAircrewIds = nameMatch(aircrewList, e.target.value).map(aircrew => aircrew.id);
        locationSpecificDispatch(matchedAircrewIds);
        const errors = matchedAircrewIds.length > 0 ? getSchedErrors(state, matchedAircrewIds) : [];
        errors.forEach(error => {
            dispatch(actions.addError(error));
        };
        /** How do I clear errors here? */
        ownProps.onChange(e);
    };
};

const mapStateToProps = (state: IState, ownProps: IFlexInputContainerProps) => {
    const aircrewRefList = getAircrewRefList(state, ownProps.addNameIdTo);
    // I should do getErrors here
    // and getValErrors here
    return {
        aircrewList: ownProps.addNameIdTo ? getAircrewList(state.aircrew) : [],
        aircrewRefList,
        errors: getErrors(state.errors, aircrewRefList.map(aircrew => aircrew.id)), // and combine them all here
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    /**
     * Necessary because I need a slice of the state in the dispatch I'm wrapping here. Specifically, depending on
     * ownProps.addNameIdTo, I'm comparing the input value (about to be dispatched by ownProps.onChange) to all the
     * other aircrew (the state I need) to see if there are matches and dispatching to update the state with the
     * referenced aircrewIds if there are.
     * 
     * @property onChange The wrapped version overwrites the one passed to this container.
     * @property aircrewRefList is the list of aircrew objects whose Ids are refed in this component (in the future,
     * this will affect display at the presentational component level).
     */
    return Object.assign({}, ownProps, {
        onChange: getOnChangeWithNameMatch(stateProps.aircrewList, dispatchProps.dispatch, ownProps),
        aircrewRefList: stateProps.aircrewRefList,
    });
};

const FlexInputContainer = connect(
    mapStateToProps,
    ((dispatch) => {dispatch}),
    mergeProps
)(FlexInput);

export default FlexInputContainer;
