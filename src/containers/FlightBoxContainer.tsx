import { connect } from 'react-redux';
import { actions, IAction } from '../actions';
import { IState, IFlights } from '../types/State';
import FlightBox from '../components/FlightBox';
import { errorTypes } from '../errors';
import { noteEntity, editables } from '../whiteboard-constants';
import { RGX_24HOUR_TIME } from '../util/regEx';
import { setErrorsOnFreshState } from './FlexInputContainer';
import { conv24HrTimeToMoment } from '../util/utilFunctions';
import { getCurrentDayId, getSettings, getCurrentDayFlights } from '../reducers';
import { createSelector } from 'reselect';
import { EditorState } from 'draft-js';
const { addFlight, delFlight, delSortie, delNote, toggleFlightExactTimes } = actions;

interface IFlightBoxContainerProps {
    sim: boolean;
}

const orderFlights = createSelector(
    getCurrentDayFlights,
    getCurrentDayId,
    (flights: IFlights[], currentDayId: string): IFlights[] => {
    /**
     * sort by takeoff, then land times
     */
    const endOfCurrentDay = conv24HrTimeToMoment('2359', currentDayId);
    const sortedFlights = flights.concat().sort((a, b) => {
        const takeoffA = RGX_24HOUR_TIME.test(a.times.takeoff) ?
            conv24HrTimeToMoment(a.times.takeoff, currentDayId) :
            endOfCurrentDay;
        const takeoffB = RGX_24HOUR_TIME.test(b.times.takeoff) ?
            conv24HrTimeToMoment(b.times.takeoff, currentDayId) :
            endOfCurrentDay;
        const landA = RGX_24HOUR_TIME.test(a.times.land) ?
            conv24HrTimeToMoment(a.times.land, currentDayId) :
            endOfCurrentDay;
        const landB = RGX_24HOUR_TIME.test(b.times.land) ?
            conv24HrTimeToMoment(b.times.land, currentDayId) :
            endOfCurrentDay;
        if (takeoffA.isBefore(takeoffB)) {
            return -1;
        }
        if (takeoffA.isAfter(takeoffB)) {
            return 1;
        }
        if (landA.isBefore(landB)) {
            return -1;
        }
        if (landA.isAfter(landB)) {
            return 1;
        }
        return 0;
    });
    return sortedFlights;
});

const getFlightsOnly = createSelector(
    orderFlights,
    (flights: IFlights[]): IFlights[] => {
    return flights.filter(flight => !flight.sim);
});

const getSimsFromFlights = createSelector(
    orderFlights,
    (flights: IFlights[]): IFlights[] => {
    return flights.filter(flight => flight.sim);
});

const mapStateToProps = (state: IState, ownProps: IFlightBoxContainerProps) => {
    const currentDayId = getCurrentDayId(state);
    return {
        dayId: currentDayId,
        flights: ownProps.sim ? getSimsFromFlights(state) : getFlightsOnly(state),
        settings: getSettings(state),
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: IFlightBoxContainerProps) => {
    return {
        onAddFlightClick: (dayId: string) => {
            const addFlightAction = addFlight(dayId, ownProps.sim);
            dispatch(actions.batchActions(
                addFlightAction,
                actions.setEditorState(EditorState.createEmpty()),
                actions.setEditedElement(editables.TAKEOFF, addFlightAction.payload.flightId)
            ));
        },
        onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => {
            const delFlightActions: IAction[] = [];
            flight.sorties.forEach(sortieId =>
                delFlightActions.push(delSortie(sortieId, flight.id)));
            flight.notes.forEach(noteId =>
                delFlightActions.push(delNote({id: noteId, entity: noteEntity.FLIGHT_NOTE, entityId: flight.id})));
            delFlightActions.push(delFlight(flight.id, dayId));
            dispatch(actions.batchActions(...delFlightActions));
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        onExactTimesToggle: (flightId: string) => (e: any) => {
            dispatch(toggleFlightExactTimes(flightId));
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
    };
};

const FlightBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlightBox);

export default FlightBoxContainer;
