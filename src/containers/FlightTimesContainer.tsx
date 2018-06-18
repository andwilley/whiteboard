import { connect } from 'react-redux';
import { actions, IAddErrorArgs } from '../actions';
import { errorTypes, errorLevels, errorMessages } from '../errors';
import { IState, IFlightTimes, IErrors } from '../types/State';
import FlightTimes from '../components/FlightTimes';
import { RGX_24HOUR_TIME } from '../util/regEx';
import { UTimeTypes } from '../types/State';
import { timeTypes } from '../whiteboard-constants';
import { getActiveDayErrors } from '../reducers/errorReducer';
const { updateFlightTime, addError, delError } = actions;

interface IFlightTimesContainerProps {
    flightId: string;
}

const getFlightTimes = (state: IState, flightId: string): IFlightTimes => {
    // slices of the state this needs for future optimization reference:
    // state.flights.byId[flightId].times
    return state.flights.byId[flightId].times;
};

const getTimeType = (index: number): UTimeTypes => {
    switch (index) {
        case 0:
            return timeTypes.BRIEF;
        case 1:
            return timeTypes.TAKEOFF;
        case 2:
            return timeTypes.LAND;
        default:
            throw new RangeError('timeType index out of range.');
    }
};

const compareTimeOrder = (brief: string, takeoff: string, land: string): UTimeTypes[] => {
    /**
     * return an array of timeType strings that are out of order.
     * should use Dates, not strings for comparison.
     * This code is poorly written and will probably be confusing or embarassing
     * if someone else sees it.
     * Update this to use moments!
     */
    interface ITimeAndTimeType {
        time: string;
        timeType: UTimeTypes;
    }

    interface IErrorTimeTypesObject {
        prevTimes: ITimeAndTimeType[];
        errorTimeTypes: UTimeTypes[];
    }

    const errorTimeTypes = [brief, takeoff, land]
        /** turn these values into useful named objects */
        .map((time, index) => {
            return {
                time: time.replace(':', ''),
                timeType: getTimeType(index),
            };
        })
        /** filter out any times that aren't valid (we don't care about these right now) */
        .filter(time => RGX_24HOUR_TIME.test(time.time))
        /** compare each to the previous times and add the time name to return array if it's smaller */
        .reduce((errorTimesObject: IErrorTimeTypesObject, time) => {
            errorTimesObject.prevTimes.forEach(prevTime => {
                if (prevTime.time >= time.time) {
                    if (errorTimesObject.errorTimeTypes.indexOf(prevTime.timeType) === -1) {
                        errorTimesObject.errorTimeTypes.push(prevTime.timeType);
                    }
                    if (errorTimesObject.errorTimeTypes.indexOf(time.timeType) === -1) {
                        errorTimesObject.errorTimeTypes.push(time.timeType);
                    }
                }
            });
            errorTimesObject.prevTimes.push(time);
            return errorTimesObject;
        }, {prevTimes: [], errorTimeTypes: []});
    return errorTimeTypes.errorTimeTypes;
};

const getTimeErrors = (times: IFlightTimes,
                       timeType: string,
                       input: string,
                       dayId: string,
                       flightId: string
): IAddErrorArgs[] => {
    switch (timeType) {
        case timeTypes.BRIEF:
            return compareTimeOrder(input, times.takeoff, times.land).map(errorTimeType => {
                return {
                    dayId,
                    type: errorTypes.TIME_ORDER,
                    location: errorTimeType,
                    locationId: flightId,
                    level: errorLevels.CAUT,
                    message: errorMessages.TIME_ORDER,
                    meta: {
                        timeType: timeTypes.BRIEF,
                    },
                };
            });
        case timeTypes.TAKEOFF:
            return compareTimeOrder(times.brief, input, times.land).map(errorTimeType => {
                return {
                    dayId,
                    type: errorTypes.TIME_ORDER,
                    location: errorTimeType,
                    locationId: flightId,
                    level: errorLevels.CAUT,
                    message: errorMessages.TIME_ORDER,
                    meta: {
                        timeType: timeTypes.TAKEOFF,
                    },
                };
            });
        case timeTypes.LAND:
            return compareTimeOrder(times.brief, times.takeoff, input).map(errorTimeType => {
                return {
                    dayId,
                    type: errorTypes.TIME_ORDER,
                    location: errorTimeType,
                    locationId: flightId,
                    level: errorLevels.CAUT,
                    message: errorMessages.TIME_ORDER,
                    meta: {
                        timeType: timeTypes.LAND,
                    },
                };
            });
        default:
            return [];
    }
};

interface IFlightTimesContainerStateProps {
    times: IFlightTimes;
    flightId: string;
    dayId: string;
    errors: IErrors[];
}

const mapStateToProps = (state: IState, ownProps: IFlightTimesContainerProps) => {
    return {
        times: getFlightTimes(state, ownProps.flightId),
        flightId: ownProps.flightId,
        dayId: state.crewListUI.currentDay,
        errors: getActiveDayErrors(state.errors.byId, state.days.byId[state.crewListUI.currentDay]),
    };
};

const mergeProps = (stateProps: IFlightTimesContainerStateProps,
                    dispatchProps: {dispatch: any},
                    ownProps: IFlightTimesContainerProps
) => {
    return {
        times: stateProps.times,
        flightId: stateProps.flightId,
        onInputChange: (timeType: UTimeTypes, time: string) => {
            /** delete the old errors */
            stateProps.errors.forEach(error => {
                if (error.type === errorTypes.TIME_ORDER &&
                    error.locationId === stateProps.flightId) {
                    dispatchProps.dispatch(delError(error.id, stateProps.dayId));
                }
            });
            /** set the new ones */
            const timeErrors = getTimeErrors(stateProps.times, timeType, time, stateProps.dayId, stateProps.flightId);
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
