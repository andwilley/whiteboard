import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { ISettings } from '../types/State';
import { actions, IAction } from '../actions';

const settingsReducer = (state = {
                            minutesBeforeBrief: 60,
                            minutesAfterLand: 60,
                            minutesBriefToTakeoff: 120,
                            minutesNoteDuration: 60,
                         },
                         action: IAction): ISettings => {
    switch (action.type) {
        default:
            return state;
    }
};

export default settingsReducer;