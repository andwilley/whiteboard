import { getType } from 'typesafe-actions';
import { ISettings } from '../types/State';
import { actions, IAction } from '../actions';

const settingsReducer = (state: ISettings = {
                            minutesBeforeBrief: 60,
                            minutesAfterLand: 60,
                            minutesBriefToTakeoff: 120,
                            minutesNoteDuration: 60,
                            hotPitNoShorterThan: 45,
                            hotPitNoLongerThan: 75,
                         },
                         action: IAction): ISettings => {
    switch (action.type) {
        case getType(actions.addDay): // filler
        default:
            return state;
    }
};

export default settingsReducer;
