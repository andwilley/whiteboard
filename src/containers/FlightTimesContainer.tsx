import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IFlightTimes } from '../types/State';
import FlightTimes from '../components/FlightTimes';
const { updateFlightTime } = actions;

interface IFlightTimesContainerProps {
    flightId: string;
}

const getFlightTimes = (state: IState, flightId: string): IFlightTimes => {
    // slices of the state this needs for future optimization reference:
    // state.flights.byId[flightId].times
    return state.flights.byId[flightId].times;
};

const mapStateToProps = (state: IState, ownProps: IFlightTimesContainerProps) => {
    return {
        times: getFlightTimes(state, ownProps.flightId),
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: IFlightTimesContainerProps) => {
    return {
        onInputChange: (timeType: string, time: string) => {
            if (!/^\d{0,4}$/.test(time)) {
                return;
            }
            dispatch(updateFlightTime(ownProps.flightId, timeType, time));
        },
    };
};

const FlightTimesContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(FlightTimes);

export default FlightTimesContainer;
