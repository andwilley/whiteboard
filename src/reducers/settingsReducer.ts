import { getType } from 'typesafe-actions';
import { ISettings } from '../types/State';
import { qualsList } from '../whiteboard-constants';
import { actions, IAction } from '../actions';

const settingsReducer = (
    state: ISettings = {
        minutesBeforeBrief: 30,
        minutesAfterLand: 60,
        minutesAfterBoxTime: 30,
        minutesBriefToTakeoff: 120,
        minutesBriefToBoxTime: 60,
        minutesNoteDuration: 60,
        hotPitNoShorterThan: 45,
        hotPitNoLongerThan: 75,
        qualsList,
    },
    action: IAction): ISettings => {
    switch (action.type) {
        case getType(actions.addDay): // filler
        default:
            return state;
    }
};

export default settingsReducer;
