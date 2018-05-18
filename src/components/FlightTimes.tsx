import * as React from 'react';
import { IFlightTimes } from '../types/State';
import { errorTypes, errorLocs } from '../errors';
import { is24HourTime } from '../util/validator';
import FlexInputContainer from '../containers/FlexInputContainer';
import { editables, timeTypes } from '../whiteboard-constants';
import { restrictToTimeChars } from '../util/restrictor';

interface IFlightTimesProps {
    times: IFlightTimes;
    flightId: string;
    onInputChange: (timeType: string, time: string) => any;
}

const FlightTimes: React.SFC<IFlightTimesProps> = ({ times, flightId, onInputChange}) => {
    const timeIsValid = {
        brief: true,
        takeoff: true,
        land: true,
    };
    Object.keys(times).forEach(time => {
        timeIsValid[time] = /^0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9]$/.test(times[time]);
    });
    return (
        <form>
            <FlexInputContainer
                placeHolder="Brief Time"
                name="flightTimes"
                value={times.brief}
                errorConfig={{
                    show: [errorTypes.TIME_ORDER],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc: errorLocs.BRIEF,
                    errorLocId: flightId}}
                onChange={(time: string) => onInputChange(timeTypes.BRIEF, time)}
                element={editables.BRIEF}
                entityId={flightId}
                validatorFns={[is24HourTime()]}
                restrictorFns={[restrictToTimeChars]}
            />
            <FlexInputContainer
                placeHolder="Takeoff Time"
                name="flightTimes"
                value={times.takeoff}
                errorConfig={{
                    show: [errorTypes.TIME_ORDER],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc: errorLocs.TAKEOFF,
                    errorLocId: flightId}}
                onChange={(time: string) => onInputChange(timeTypes.TAKEOFF, time)}
                element={editables.TAKEOFF}
                entityId={flightId}
                validatorFns={[is24HourTime()]}
                restrictorFns={[restrictToTimeChars]}
            />
            <FlexInputContainer
                placeHolder="Land Time"
                name="flightTimes"
                value={times.land}
                errorConfig={{
                    show: [errorTypes.TIME_ORDER],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc: errorLocs.LAND,
                    errorLocId: flightId}}
                onChange={(time: string) => onInputChange(timeTypes.LAND, time)}
                element={editables.LAND}
                entityId={flightId}
                validatorFns={[is24HourTime()]}
                restrictorFns={[restrictToTimeChars]}
            />
        </form>
    );
};

export default FlightTimes;
