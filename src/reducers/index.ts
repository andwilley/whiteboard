import { combineReducers } from 'redux';
import { IState, UErrorLocs } from '../types/State';

import addUpdateAircrewFormValuesReducer from './addUpdateAircrewFormValuesReducer';
import aircrewReducer from './aircrewReducer';
import groupsReducer from './groupsReducer';
import crewListUIReducer from './crewListUIReducer';
import daysReducer from './daysReducer';
import flightsReducer from './flightsReducer';
import notesReducer from './notesReducer';
import sortiesReducer from './sortiesReducer';
import airspaceReducer from './airspaceReducer';
import settingsReducer from './settingsReducer';
import errorReducer from './errorReducer';
import editorStateReducer from './editorStateReducer';
import snivsReducer from './snivReducer';
import addUpdateSnivFormValuesReducer from './addUpdateSnivFormValuesReducer';

import * as daysSelectors from './daysReducer';
import * as crewListUISelectors from './crewListUIReducer';
import * as errorsSelectors from './errorReducer';

const whiteboardApp = combineReducers<IState>({
    aircrew: aircrewReducer,
    groups: groupsReducer,
    days: daysReducer,
    flights: flightsReducer,
    snivs: snivsReducer,
    sorties: sortiesReducer,
    notes: notesReducer,
    airspace: airspaceReducer,
    crewListUI: crewListUIReducer,
    addUpdateAircrewFormValues: addUpdateAircrewFormValuesReducer,
    addUpdateSnivFormValues: addUpdateSnivFormValuesReducer,
    settings: settingsReducer,
    errors: errorReducer,
    editor: editorStateReducer,
});

export default whiteboardApp;

/**
 *
 * Days Selectors
 *
 */

export const getDaysById = (state: IState) => {
    return daysSelectors.getDaysById(state.days);
};

export const getCurrentDayObj = (state: IState) => {
    return daysSelectors.getCurrentDayObj(
        getDaysById(state),
        getCurrentDayId(state)
    );
};

/**
 *
 * CrewList UI Selectors
 *
 */

export const getCurrentDayId = (state: IState) => {
    return crewListUISelectors.getCurrentDayId(state.crewListUI);
};

export const getShowSnivs = (state: IState) => {
    return crewListUISelectors.getShowSnivs(state.crewListUI);
};

export const getShowFilters = (state: IState) => {
    return crewListUISelectors.getShowFilters(state.crewListUI);
};

/**
 *
 * Error Selectors
 *
 */

export const getErrors = (state: IState) => {
    return state.errors;
};

export const getErrorsById = (state: IState) => {
    return errorsSelectors.getErrorsById(getErrors(state));
};

export const getActiveErrorIds = (state: IState) => {
    return errorsSelectors.getActiveErrorIds(state.errors);
};

export const getEntityErrors = (state: IState, errorLoc: UErrorLocs) => {
    return errorsSelectors.getEntityErrors(
        getErrorsById(state),
        getActiveErrorIds(state),
        errorLoc
    );
};

export const getActiveDayErrors = (state: IState) => {
    return errorsSelectors.getActiveDayErrors(
        getErrorsById(state),
        getCurrentDayObj(state)
    );
};
