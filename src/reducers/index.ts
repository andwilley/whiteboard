import { combineReducers } from 'redux';
import { IState, UErrorLocs, ISnivs, IEntity } from '../types/State';
import { createSelector } from 'reselect';

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

import * as aircrewSelectors from './aircrewReducer';
import * as groupsSelectors from './groupsReducer';
import * as daysSelectors from './daysReducer';
import * as flightsSelectors from './flightsReducer';
import * as snivsSelectors from './snivReducer';
import * as sortieSelectors from './sortiesReducer';
import * as notesSelectors from './notesReducer';
import * as crewListUISelectors from './crewListUIReducer';
import * as errorsSelectors from './errorReducer';
import * as editorSelectors from './editorStateReducer';
import { enableBatching } from '../util/utilFunctions';

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

export default enableBatching(whiteboardApp);

/**
 *
 * Aircrew Selectors
 *
 */

export const getAircrew = (state: IState) => {
    return state.aircrew;
};

export const getAircrewById = (state: IState) => {
    return aircrewSelectors.getAircrewById(getAircrew(state));
};

export const getAircrewIds = (state: IState) => {
    return aircrewSelectors.getAircrewIds(getAircrew(state));
};

export const getAllAircrew = (state: IState) => {
    return aircrewSelectors.getAllAircrew(getAircrew(state));
};

export const getCrewById = (state: IState, aircrewId: string) => {
    return aircrewSelectors.getCrewById(getAircrewById(state), aircrewId);
};

/**
 *
 * Group Selectors
 *
 */

export const getGroups = (state: IState) => {
    return state.groups;
};

export const getAllGroupIds = (state: IState) => {
    return groupsSelectors.getAllGroupIds(getGroups(state));
};

export const getAllGroups = (state: IState) => {
    return groupsSelectors.getAllGroups(getGroups(state));
};

/**
 *
 * Days Selectors
 *
 */

export const getDaysById = (state: IState) => {
    return daysSelectors.getDaysById(state.days);
};

export const getDayById = (state: IState, dayId: string) => {
    return daysSelectors.getDayById(getDaysById(state), dayId);
};

export const getCurrentDayObj = (state: IState) => {
    return daysSelectors.getCurrentDayObj(
        getDaysById(state),
        getCurrentDayId(state)
    );
};

export const getCurrentDayFlightIds = (state: IState) => {
    return daysSelectors.getCurrentDayFlightIds(
        getDaysById(state),
        getCurrentDayId(state)
    );
};

export const getCurrentDayNoteIds = (state: IState) => {
    return daysSelectors.getCurrentDayNoteIds(
        getDaysById(state),
        getCurrentDayId(state)
    );
};

/**
 *
 * Flights Selectors
 *
 */

export const getFlightsById = (state: IState) => {
    return flightsSelectors.getFlightsById(state.flights);
};

export const getFlightById = (state: IState, flightId: string) => {
    return flightsSelectors.getFlightById(getFlightsById(state), flightId);
};

export const getCurrentDayFlights = createSelector(
    getFlightsById,
    getCurrentDayFlightIds,
    flightsSelectors.getCurrentDayFlights
);

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

export const getFilters = (state: IState) => {
    return crewListUISelectors.getFilters(state.crewListUI);
};

export const getShowFilters = (state: IState) => {
    return crewListUISelectors.getShowFilters(state.crewListUI);
};

export const getShowAvailable = (state: IState) => {
    return crewListUISelectors.getShowAvailable(getFilters(state));
};

/**
 *
 * Sniv Selectors
 *
 */

export const getSnivs = (state: IState) => {
    return state.snivs;
};

export const getSnivsById = (state: IState) => {
    return snivsSelectors.getSnivsById(getSnivs(state));
};

export const getAllSnivIds = (state: IState) => {
    return snivsSelectors.getAllSnivIds(getSnivs(state));
};

export const getAllSnivs = (state: IState) => {
    return snivsSelectors.getAllSnivs(getSnivs(state));
};

export const makeGetAircrewDaySnivs = () => createSelector(
    getSnivsById,
    getAllSnivIds,
    getCurrentDayId,
    (state: IState, aircrewId: string) => aircrewId,
    (snivsById: IEntity<ISnivs>['byId'], allSnivs: string[], currentDayId: string, aircrewId: string): ISnivs[] => {
        return allSnivs.reduce((filteredIds: ISnivs[], currId) => {
            if (snivsById[currId].aircrewIds.indexOf(aircrewId) > -1 && snivsById[currId].dates[currentDayId]) {
                filteredIds = filteredIds.concat(snivsById[currId]);
            }
            return filteredIds;
        }, []);
    }
);

/**
 *
 * Sortie Selectors
 *
 */

export const getSorties = (state: IState) => {
    return state.sorties;
};

export const getSortiesById = (state: IState) => {
    return sortieSelectors.getSortiesById(state.sorties);
};

export const getAllSortieIds = (state: IState) => {
    return sortieSelectors.getAllSortieIds(getSorties(state));
};

export const getSortieList = createSelector(
    getSortiesById,
    (__: IState, sortieIds: string[]) => sortieIds,
    sortieSelectors.getSortieList
);

export const getAllSortieList = (state: IState) => {
    return getSortieList(state, getAllSortieIds(state));
};

export const getSortieCrewRefsBySortieId = (state: IState) => {
    return sortieSelectors.getSortieCrewRefsBySortieId(getAllSortieList(state));
};

export const getSortie = (state: IState, sortieId: string) => {
    return sortieSelectors.getSortie(
        getSortiesById(state),
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
 * Notes Selectors
 *
 */

export const getNotes = (state: IState) => {
    return state.notes;
};

export const getNotesById = (state: IState) => {
    return notesSelectors.getNotesById(getNotes(state));
};

export const getNoteById = (state: IState, noteId: string) => {
    return notesSelectors.getNoteById(getNotes(state), noteId);
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

export const getAllErrorIds = (state: IState) => {
    return errorsSelectors.getAllErrorIds(getErrors(state));
};

export const getAllErrors = createSelector(
    getErrors,
    errorsSelectors.getAllErrors
);

export const getEntityErrors = (state: IState, errorLoc: UErrorLocs) => {
    return errorsSelectors.getEntityErrors(
        getErrorsById(state),
        getAllErrorIds(state),
        errorLoc
    );
};

/**
 *
 * Editor Selectors
 *
 */

export const getElementBeingEdited = (state: IState) => {
    return editorSelectors.getElementBeingEdited(state.editor);
};
