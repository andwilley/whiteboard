import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IFlights, ISettings } from '../types/State';
import FlightBox from '../components/FlightBox';
import { errorLocs, errorTypes } from '../errors';
import { getEntityErrors } from '../reducers/errorReducer';
import { noteEntity } from '../whiteboard-constants';
import * as Moment from 'moment';
import { RGX_24HOUR_TIME } from '../util/regEx';
import { setErrorsOnFreshState } from './FlexInputContainer';
const { addFlight, delFlight, delSortie, delNote, toggleFlightExactTimes } = actions;

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

const getFlightsOnly = (flights: IFlights[]): IFlights[] => {
    return flights.filter(flight => !flight.sim);
};

const getSimsFromFlights = (flights: IFlights[]): IFlights[] => {
    return flights.filter(flight => flight.sim);
};

const orderFlights = (flights: IFlights[], currentDayId: string, settings: ISettings): IFlights[] => {
    /**
     * sort by takeoff, then land times
     * this is nasty, clean it up.
     */
    const sortedFlights = flights.concat().sort((a, b) => {
        const takeoffA = RGX_24HOUR_TIME.test(a.times.takeoff) ?
            Moment(`${currentDayId} ${a.times.takeoff.slice(0, 2)}:${a.times.takeoff.slice(2, 4)}:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS') :
            Moment(`${currentDayId} 23:59:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS');
        const takeoffB = RGX_24HOUR_TIME.test(b.times.takeoff) ?
            Moment(`${currentDayId} ${b.times.takeoff.slice(0, 2)}:${b.times.takeoff.slice(2, 4)}:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS') :
            Moment(`${currentDayId} 23:59:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS');
        const landA = RGX_24HOUR_TIME.test(a.times.land) ?
            Moment(`${currentDayId} ${a.times.land.slice(0, 2)}:${a.times.land.slice(2, 4)}:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS') :
            Moment(`${currentDayId} 23:59:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS');
        const landB = RGX_24HOUR_TIME.test(b.times.land) ?
            Moment(`${currentDayId} ${b.times.land.slice(0, 2)}:${b.times.land.slice(2, 4)}:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS') :
            Moment(`${currentDayId} 23:59:00.000`,
                'YYYY-MM-DD HH:mm:ss.SSS');
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
};

const mapStateToProps = (state: IState) => {
    const currentDayId = getDayId(state);
    const flightsAndSims = orderFlights(
        getDayFlights(state, currentDayId),
        state.crewListUI.currentDay,
        state.settings
    );
    return {
        dayId: currentDayId,
        flights: getFlightsOnly(flightsAndSims),
        sims: getSimsFromFlights(flightsAndSims),
        errors: getEntityErrors(state.errors.byId,
                                state.days.byId[state.crewListUI.currentDay].errors,
                                errorLocs.FLIGHT),
        settings: state.settings,
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
