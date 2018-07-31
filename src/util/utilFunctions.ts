import * as Moment from 'moment';
import { RGX_24HOUR_TIME } from './regEx';
import { ISchedBlock } from '../types/WhiteboardTypes';
import { ISettings, IAircrew } from '../types/State';
import { errorLocs } from '../errors';

export const conv24HrTimeToMoment = (time: string, dayId: string): Moment.Moment => {
    if (!RGX_24HOUR_TIME.test(time)) {
        return Moment(NaN);
    }
    const timeDigits = time.replace(':', '');
    return Moment(`${dayId} ${timeDigits.slice(0, 2)}:${timeDigits.slice(2, 4)}:00.000`,
            'YYYY-MM-DD HH:mm:ss.SSS');
};

export const flightIsCrewHotPit = (block: ISchedBlock, scblock: ISchedBlock, settings: ISettings): boolean => {
    if (block.location !== errorLocs.FLIGHT || scblock.location !== errorLocs.FLIGHT) {
        return false;
    }
    const diff1 = Moment.duration(block.hardStart.diff(scblock.hardEnd));
    const diff2 = Moment.duration(scblock.hardStart.diff(block.hardEnd));
    if ((diff1 <= Moment.duration(settings.hotPitNoLongerThan, 'minutes') &&
        diff1 >= Moment.duration(settings.hotPitNoShorterThan, 'minutes')) ||
        (diff2 <= Moment.duration(settings.hotPitNoLongerThan, 'minutes') &&
        diff2 >= Moment.duration(settings.hotPitNoShorterThan, 'minutes'))) {
        return true;
    }
    return false;
};

type getErrorsCallback<T> = (
    errorArray: T[],
    block: ISchedBlock,
    compBlock: ISchedBlock,
    aircrew: IAircrew,
    currentDayId: string
) => T[];

export const getSchedErrorsFromSchedBlocks = (
    aircrewRefs: ISchedBlock[],
    aircrew: IAircrew,
    block: ISchedBlock,
    settings: ISettings,
    currentDayId: string,
    errorArray: any[],
    callback: getErrorsCallback<any>,
    ignoreSnivs: boolean = false
) => {
    for (const compBlock of aircrewRefs) {
        /**
         * Assumes start and end are actually in order ***!
         */
        if (flightIsCrewHotPit(block, compBlock, settings)) {
            continue;
        } else if (ignoreSnivs && (block.location === errorLocs.SNIVS && compBlock.location === errorLocs.SNIVS)) {
            continue;
        } else if (block.start >= compBlock.start && block.start <= compBlock.end) {
            errorArray = callback(errorArray, block, compBlock, aircrew, currentDayId);
        } else if (block.end >= compBlock.start && block.end <= compBlock.end) {
            errorArray = callback(errorArray, block, compBlock, aircrew, currentDayId);
        } else if (compBlock.start >= block.start && compBlock.start <= block.end) {
            errorArray = callback(errorArray, block, compBlock, aircrew, currentDayId);
        }
    }
    return errorArray;
};
