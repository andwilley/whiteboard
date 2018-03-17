import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState } from '../types/State';
import FlightBox from '../components/FlightBox';
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

const mapStateToProps = (state: IState) => {
    const currentDayId = getDayId(state);
    return {
        dayId: currentDayId,
        flightIds: getFlightIds(state, currentDayId),
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
