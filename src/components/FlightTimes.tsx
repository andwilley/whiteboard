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
    exactTimes: boolean;
    onInputChange: (timeType: string, time: string) => any;
}

class FlightTimes extends React.PureComponent<IFlightTimesProps> {
    render() {
        const { times, flightId, onInputChange, exactTimes } = this.props;
        const timeIsValid = {
            brief: true,
            takeoff: true,
            land: true,
        };
        Object.keys(times).forEach(time => {
            timeIsValid[time] = /^0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9]$/.test(times[time]);
        });
        return (
            <div className="row">
                <div className="col-4 pr-1">
                <FlexInputContainer
                    placeHolder="Brief"
                    name="flightTimes"
                    value={times.brief}
                    errorConfig={{
                        show: [errorTypes.TIME_ORDER],
                        update: [errorTypes.SCHEDULE_CONFLICT],
                        errorLoc: errorLocs.BRIEF,
                        errorLocId: flightId}}
                    onInputChange={(time: string) => onInputChange(timeTypes.BRIEF, time)}
                    element={editables.BRIEF}
                    entityId={flightId}
                    validatorFns={[is24HourTime()]}
                    restrictorFns={[restrictToTimeChars]}
                    className={exactTimes && !times.brief ? 'text-danger' : ''}
                />
                </div>
                <div className="col-4 pr-1 pl-1">
                <FlexInputContainer
                    placeHolder="Takeoff"
                    name="flightTimes"
                    value={times.takeoff}
                    errorConfig={{
                        show: [errorTypes.TIME_ORDER],
                        update: [errorTypes.SCHEDULE_CONFLICT],
                        errorLoc: errorLocs.TAKEOFF,
                        errorLocId: flightId}}
                    onInputChange={(time: string) => onInputChange(timeTypes.TAKEOFF, time)}
                    element={editables.TAKEOFF}
                    entityId={flightId}
                    validatorFns={[is24HourTime()]}
                    restrictorFns={[restrictToTimeChars]}
                />
                </div>
                <div className="col-4 pl-1">
                <FlexInputContainer
                    placeHolder="Land"
                    name="flightTimes"
                    value={times.land}
                    errorConfig={{
                        show: [errorTypes.TIME_ORDER],
                        update: [errorTypes.SCHEDULE_CONFLICT],
                        errorLoc: errorLocs.LAND,
                        errorLocId: flightId}}
                    onInputChange={(time: string) => onInputChange(timeTypes.LAND, time)}
                    element={editables.LAND}
                    entityId={flightId}
                    validatorFns={[is24HourTime()]}
                    restrictorFns={[restrictToTimeChars]}
                />
                </div>
            </div>
        );
    }
}

export default FlightTimes;
