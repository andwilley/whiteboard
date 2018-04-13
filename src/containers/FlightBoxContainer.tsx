import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IErrors } from '../types/State';
import FlightBox from '../components/FlightBox';
import { errorLocs } from '../errors';
const { addFlight } = actions;

const getDayId = (state: IState): string => {
    // slices of the state this needs for future optimization reference:
    // state.crewListUI.currentDay
    return state.crewListUI.currentDay;
};

const getFlightIds = (state: IState, currentDayId: string): string[] => {
    // slices of the state this needs for future optimization reference:
    // state.flights.allIds
    return state.days.byId[currentDayId].flights;
};

const getFlightErrors = (errorsById: {[id: string]: IErrors}, activeIds: string[]) => {
    return activeIds.reduce((flightErrors, errorId) => {
        if (errorsById[errorId].location === errorLocs.FLIGHT) {
            flightErrors[errorsById[errorId].locationId] = flightErrors[errorsById[errorId].locationId] ?
            flightErrors[errorsById[errorId].locationId].concat(errorsById[errorId]) :
            [errorsById[errorId]];
        }
        return flightErrors;
    }, {});
};

const mapStateToProps = (state: IState) => {
    const currentDayId = getDayId(state);
    return {
        dayId: currentDayId,
        flightIds: getFlightIds(state, currentDayId),
        errors: getFlightErrors(state.errors.byId, state.errors.activeIds),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddFlightClick: (dayId: string, sim: boolean) => {
            dispatch(addFlight(dayId, sim));
        },
    };
};

const FlightBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlightBox);

export default FlightBoxContainer;
