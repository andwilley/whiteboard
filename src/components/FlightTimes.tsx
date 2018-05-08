import * as React from 'react';
import { IFlightTimes } from '../types/State';
import { errorTypes } from '../errors';
import { is24HourTime } from '../util/validator';
import FlexInputContainer from '../containers/FlexInputContainer';
import { editables } from '../whiteboard-constants';
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
    // This val needs improvement. Consider edge cases:
    // night flight over midnight.
    // boxes shouldn't be red as you're entering data for the first time
    // if (times.brief >= times.takeoff) {
    //     timeIsValid.brief = false;
    //     timeIsValid.takeoff = false;
    // }
    // if (times.brief >= times.land) {
    //     timeIsValid.brief = false;
    //     timeIsValid.land = false;
    // }
    // if (times.takeoff >= times.land) {
    //     timeIsValid.takeoff = false;
    //     timeIsValid.land = false;
    // }
    return (
        <form>
            <FlexInputContainer
                placeHolder="Brief Time"
                name="flightTimes"
                value={times.brief}
                errorConfig={{
                    show: [],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc: '',
                    errorLocId: ''}}
                onChange={(time: string) => onInputChange('brief', time)}
                element={editables.BRIEF}
                entityId={flightId}
                validators={[is24HourTime()]}
                restrictorFns={[restrictToTimeChars]}
            />
            <FlexInputContainer
                placeHolder="Takeoff Time"
                name="flightTimes"
                value={times.takeoff}
                errorConfig={{
                    show: [],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc: '',
                    errorLocId: ''}}
                onChange={(time: string) => onInputChange('takeoff', time)}
                element={editables.TAKEOFF}
                entityId={flightId}
                validators={[is24HourTime()]}
                restrictorFns={[restrictToTimeChars]}
            />
            <FlexInputContainer
                placeHolder="Land Time"
                name="flightTimes"
                value={times.land}
                errorConfig={{
                    show: [],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc: '',
                    errorLocId: ''}}
                onChange={(time: string) => onInputChange('land', time)}
                element={editables.LAND}
                entityId={flightId}
                validators={[is24HourTime()]}
                restrictorFns={[restrictToTimeChars]}
            />
        </form>
    );
};

export default FlightTimes;
