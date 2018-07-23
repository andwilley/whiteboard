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
import * as flightsSelectors from './flightsReducer';
import * as sortieSelectors from './sortiesReducer';
import * as crewListUISelectors from './crewListUIReducer';
import * as errorsSelectors from './errorReducer';
import { createSelector } from 'reselect';

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

export const getCurrentDayFlightIds = (state: IState) => {
    return daysSelectors.getCurrentDayFlightIds(
        state.days.byId,
        getCurrentDayId(state)
    );
};

/**
 *
 * Flights Selectors
 *
 */

export const getCurrentDayFlights = createSelector(
    (state: IState) => state.flights.byId,
    getCurrentDayFlightIds,
    flightsSelectors.getCurrentDayFlights
);

/**
 *
 * Sortie Selectors
 *
 */

export const getSortie = (state: IState, sortieId: string) => {
    return sortieSelectors.getSortie(
        state.sorties.byId,
        sortieId
    );
};

export const getFrontSeatName = (state: IState, sortieId: string) => {
    return sortieSelectors.getFrontSeatName(
        getSortie(state, sortieId)
    );
};

export const getFrontSeatCodes = (state: IState, sortieId: string) => {
    return sortieSelectors.getFrontSeatCodes(
        getSortie(state, sortieId)
    );
};

export const getFrontSeatSymbols = (state: IState, sortieId: string) => {
    return sortieSelectors.getFrontSeatSymbols(
        getSortie(state, sortieId)
    );
};

export const getBackSeatName = (state: IState, sortieId: string) => {
    return sortieSelectors.getBackSeatName(
        getSortie(state, sortieId)
    );
};

export const getBackSeatCodes = (state: IState, sortieId: string) => {
    return sortieSelectors.getBackSeatCodes(
        getSortie(state, sortieId)
    );
};

export const getBackSeatSymbols = (state: IState, sortieId: string) => {
    return sortieSelectors.getBackSeatSymbols(
        getSortie(state, sortieId)
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
 * Settings Selectors
 *
 */

export const getSettings = (state: IState) => {
    return state.settings;
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

export const getActiveDayErrors = createSelector(
    getErrorsById,
    getCurrentDayObj,
    errorsSelectors.getActiveDayErrors
);
