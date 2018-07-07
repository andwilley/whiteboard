import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IFlights } from '../types/State';
import FlightBox from '../components/FlightBox';
import { errorLocs } from '../errors';
import { getEntityErrors } from '../reducers/errorReducer';
import { noteEntity } from '../whiteboard-constants';
const { addFlight, delFlight, delSortie, delNote } = actions;

const getDayId = (state: IState): string => {
    // slices of the state this needs for future optimization reference:
    // state.crewListUI.currentDay
    return state.crewListUI.currentDay;
};

const getDayFlights = (state: IState, currentDayId: string): IFlights[] => {
    // slices of the state this needs for future optimization reference:
    // state.flights.allIds
    return state.days.byId[currentDayId].flights.map(flightId => {
        return state.flights.byId[flightId];
    });
};

const mapStateToProps = (state: IState) => {
    const currentDayId = getDayId(state);
    return {
        dayId: currentDayId,
        flights: getDayFlights(state, currentDayId),
        errors: getEntityErrors(state.errors.byId,
                                state.days.byId[state.crewListUI.currentDay].errors,
                                errorLocs.FLIGHT),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddFlightClick: (dayId: string, sim: boolean) => {
            dispatch(addFlight(dayId, sim));
        },
        onDelFlightClick: (flight: IFlights, dayId: string) => (e: any) => {
            flight.sorties.forEach(sortieId =>
                dispatch(delSortie(sortieId, flight.id)));
            flight.notes.forEach(noteId =>
                dispatch(delNote({id: noteId, entity: noteEntity.FLIGHT_NOTE, entityId: flight.id})));
            dispatch(delFlight(flight.id, dayId));
        },
    };
};

const FlightBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlightBox);

export default FlightBoxContainer;
