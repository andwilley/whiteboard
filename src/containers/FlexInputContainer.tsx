import { connect } from 'react-redux';
import { actions } from '../actions';
import { seats } from '../whiteboard-constants'
import { IState, IFlightTimes, IAircrew, IEntity } from '../types/State';
import { IAction } from '../actions';
import FlexInput from '../components/FlexInput';
import validator from '../util/validator';
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
    validators?: string[];
    addNameIdTo?: {nameLocation: string, entityId: string};
}

const getAircrewList = (aircrew: IAircrewEntity): IAircrew[] => {
    return aircrew.allIds.map(id => aircrew.byId[id])
};

const getAircrewRefList = (state: IState, addNameIdTo): IAircrew[] => {
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

const getErrors = () => {
    /**
     * @param
     * @param
     * @returns {IErrors[]} Array of IErrrors objects sorted by error level.
     * 
     * Combines all the errors generated by:
     * the input validation
     * any scheduling conflicts
     * 
     * So it runs the val and runs the logic that checks for scheds conflicts, then aggregates the errors.
     */
     
};

const getActiveAircrewRefIds = (state) => {
    /**
     * @param {IState} state The application state (store.getState())
     * @returns {object} keyed by aircrewId with values set to an array of the timespans associated with each ref
     * This checks all the places aircrew Ids can be referenced in the current day, aggregates them into an object and 
     * includes the times they are scheduled for, so we can check for conflicts in another function.
     * Looks for names in:
     * state.days.byId[currentDay].flights (to find flights)
     *  for each state.flights.byId[flightId].sorties (to find sorties)
     *   for each state.sorites.byId[sortieId].front/back
     *  for each state.flights.byId[fligthId].notes
     * state.days.byId[currentDay].notes
     * state.notes.byId[.allIds]
     */
    const activeAircrewRefs = {};
    state.days.byId[state.crewListUI.currentDay].flights.forEach(flightId => {
        state.flights.byId[flightId].sorties.forEach(sortieId => {
            seats.forEach(seat => {
                state.sorties.byId[sortieId][seat].aircrewRefIds.forEach(aircrewId => {
                    const startTimeHr = state.flights.byId[flightId].times.brief.slice(0,2);
                    const startTimeMn = state.flights.byId[flightId].times.brief.slice(2,4);
                    const endTimeHr = state.flights.byId[flightId].times.land.slice(0,2);
                    const endTimeMn = state.flights.byId[flightId].times.land.slice(2,4);
                    const schedBlock = {
                        start: new Date(`${state.crewListUI.currentDay}T${startTimeHr}:${startTimeMn}:00.000Z`),
                        end: new Date(`${state.crewListUI.currentDay}T${endTimeHr}:${endTimeMn}:00.000Z`),
                    };
                    activeAircrewRefs[aircrewId] = activeAircrewRefs[aircrewId] ?
                        [...activeAircrewRefs[aircrewId], schedBlock] : [schedBlock];
                });
            });
        });
        state.flights.byId[flightId].notes.forEach(noteId => {
            state.notes.byId[noteId].content // need to parse this for dates
                                             // check for times at beginning. time, time-time, time time
                                             // if one time, assume 1 hour after (use imported var for settings later)
                                             // if two times, add actual sched block obj to that aircrewID
                                             // if no times, assume all day.
        });
    });
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

const getOnChangeWithNameMatch = (aircrewList: IAircrew[], dispatch: any, ownProps: IFlexInputContainerProps) => {
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
        locationSpecificDispatch = (matchedAircrewIds: string[]) => return;
    }
    let locationSpecificDispatch;
    switch (ownProps.addNameIdTo.nameLocation) {
        case nameLocation.FRONT_SEAT:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {
                return dispatch(actions.updateSeatCrewRefs(ownProps.addNameIdTo.entityId, 'front', matchedAircrewIds));
            };
        case nameLocation.BACK_SEAT:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {
                return dispatch(actions.updateSeatCrewRefs(ownProps.addNameIdTo.entityId, 'back', matchedAircrewIds));
            };
        case nameLocation.NOTE:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => {
                return dispatch(actions.(ownProps.addNameIdTo.entityId, matchedAircrewIds));
            };
        default:
            locationSpecificDispatch = (matchedAircrewIds: string[]) => return;
    }
    return (e) => {
        const matchedAircrewIds = nameMatch(aircrewList, e.target.value).map(aircrew => aircrew.id);
        locationSpecificDispatch(matchedAircrewIds);
        ownProps.onChange(e);
    };
};

const mapStateToProps = (state: IState, ownProps: IFlexInputContainerProps) => {
    return {
        aircrewList: ownProps.addNameIdTo ? getAircrewList(state.aircrew) : [],
        aircrewRefList: getAircrewRefIds(state, ownProps.addNameIdTo),
        errors: getErrors(state), // check for sched conflicts here (possibly rename this)
    };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    /**
     * Necessary because I need a slice of the state in the dispatch I'm wrapping here. Specifically, depending on
     * ownProps.addNameToId, I'm comparing the input value (about to be dispatched by ownProps.onChange) to all the
     * other aircrew (the state I need) to see if there are matches and dispatching to update the state if there are.
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
