import * as Moment from 'moment';
import { RGX_24HOUR_TIME } from '../util/regEx';

export const conv24HrTimeToMoment = (time: string, dayId: string): Moment.Moment => {
    if (!RGX_24HOUR_TIME.test(time)) {
        throw(new TypeError('time parameter must be a valid 24 time string to convert to a Moment.'));
    }
    const timeDigits = time.replace(':', '');
    return Moment(`${dayId} ${timeDigits.slice(0, 2)}:${timeDigits.slice(2, 4)}:00.000`,
            'YYYY-MM-DD HH:mm:ss.SSS');
};
