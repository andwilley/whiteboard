import { combineReducers } from 'redux';
import { IState } from '../types/State';

import addUpdateAircrewFormValuesReducer from './addUpdateAircrewFormValuesReducer';
import aircrewReducer from './aircrewReducer';
import crewListUIReducer from './crewListUIReducer';
import daysReducer from './daysReducer';
import flightsReducer from './flightsReducer';
import notesReducer from './notesReducer';
import sortiesReducer from './sortiesReducer';
import airspaceReducer from './airspaceReducer';

console.log('test');

export const whiteboardApp = combineReducers<IState>({
    aircrew: aircrewReducer,
    days: daysReducer,
    flights: flightsReducer,
    sorties: sortiesReducer,
    notes: notesReducer,
    airspace: airspaceReducer,
    crewListUI: crewListUIReducer,
    addUpdateAircrewFormValues: addUpdateAircrewFormValuesReducer,
});
