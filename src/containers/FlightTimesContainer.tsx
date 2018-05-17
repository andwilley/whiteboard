import { connect } from 'react-redux';
import { actions, IAddErrorArgs } from '../actions';
import { errorLocs, errorTypes, errorLevels } from '../errors';
import { IState, IFlightTimes } from '../types/State';
import FlightTimes from '../components/FlightTimes';
import { ITimeTypes } from '../types/WhiteboardTypes';
import { timeTypes } from '../whiteboard-constants';
const { updateFlightTime, addError } = actions;

interface IFlightTimesContainerProps {
    flightId: string;
}

const getFlightTimes = (state: IState, flightId: string): IFlightTimes => {
    // slices of the state this needs for future optimization reference:
    // state.flights.byId[flightId].times
    return state.flights.byId[flightId].times;
};

const compareTimeOrder = (brief: string, takeoff: string, land: string): ITimeTypes[] => {
    /**
     * return an array of the times that are out of order.
     */
    return [];
};

const getTimeErrors = (times: IFlightTimes, timeType: string, input: string): IAddErrorArgs[] => {
    switch (timeType) {
        case timeTypes.BRIEF:
            return compareTimeOrder(input, times.takeoff, times.land).map(errorTimeType => {
                return {
                    dayId: '',
                    type: errorTypes.TIME_ORDER,
                    location: errorLocs.FLIGHT,
                    locationId: '',
                    level: errorLevels.CAUT,
                    message: '',
                    meta: {},
                };
            });
        case timeTypes.TAKEOFF:
            return compareTimeOrder(input, times.takeoff, times.land).map(errorTimeType => {
                return {
                    dayId: '',
                    type: errorTypes.TIME_ORDER,
                    location: errorLocs.FLIGHT,
                    locationId: '',
                    level: errorLevels.CAUT,
                    message: '',
                    meta: {},
                };
            });
        case timeTypes.LAND:
            return compareTimeOrder(input, times.takeoff, times.land).map(errorTimeType => {
                return {
                    dayId: '',
                    type: errorTypes.TIME_ORDER,
                    location: errorLocs.FLIGHT,
                    locationId: '',
                    level: errorLevels.CAUT,
                    message: '',
                    meta: {},
                };
            });
        default:
            return [];
    }
};

interface IFlightTimesContainerStateProps {
    times: IFlightTimes;
    flightId: string;
}

const mapStateToProps = (state: IState, ownProps: IFlightTimesContainerProps) => {
    return {
        times: getFlightTimes(state, ownProps.flightId),
        flightId: ownProps.flightId,
    };
};

const mergeProps = (stateProps: IFlightTimesContainerStateProps,
                    dispatchProps: {dispatch: any},
                    ownProps: IFlightTimesContainerProps
) => {
    return {
        ...stateProps,
        onInputChange: (timeType: string, time: string) => {
            const timeErrors = getTimeErrors(stateProps.times, timeType, time);
            if (timeErrors.length > 0) {
                timeErrors.forEach(timeError => dispatchProps.dispatch(addError(timeError)));
            }
            dispatchProps.dispatch(updateFlightTime(ownProps.flightId, timeType, time));
        },
    };
};

const FlightTimesContainer = connect(
    mapStateToProps,
    ((dispatch: any) => { return { dispatch: dispatch }; }),
    mergeProps
)(FlightTimes);

export default FlightTimesContainer;
