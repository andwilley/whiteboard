import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, IDays } from '../types/State';
import { actions, IAction } from '../actions';
import { noteEntity } from '../whiteboard-constants';

const daysById = (state: {[id: string]: IDays} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addDay):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    // flow: {
                    // 	numJets: [],
                    // 	method: [],
                    // },
                    // sun: {
                    // 	rise: 0710,
                    // 	set: 2031,
                    // },
                    flights: [],
                    notes: [],
                    errors: [],
                },
            };
        case getType(actions.addFlight):
            if (state[action.payload.dayId].flights.indexOf(action.payload.flightId) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.dayId]: {
                    ...state[action.payload.dayId],
                    flights: state[action.payload.dayId].flights.concat(action.payload.flightId),
                },
            };
        case getType(actions.delFlight):
            return {
                ...state,
                [action.payload.dayId]: {
                    ...state[action.payload.dayId],
                    flights: state[action.payload.dayId].flights
                        .filter(flightId => flightId !== action.payload.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== noteEntity.DAY_NOTE ||
                state[action.payload.entityId].notes.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes.concat(action.payload.id),
                },
            };
        case getType(actions.delNote):
            if (action.payload.entity !== noteEntity.DAY_NOTE) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter((noteId: string) => noteId !== action.payload.id),
                },
            };
        case getType(actions.reorderNotes):
            if (action.payload.noteLoc !== noteEntity.DAY_NOTE ||
                action.payload.sourceLocId !== action.payload.destLocId) {
                return state;
            }
            const notesCopy = state[action.payload.sourceLocId].notes.concat();
            const moveNoteId = notesCopy.splice(action.payload.oldIndex, 1)[0];
            notesCopy.splice(action.payload.newIndex, 0, moveNoteId);
            return {
                ...state,
                [action.payload.sourceLocId]: {
                    ...state[action.payload.sourceLocId],
                    notes: notesCopy,
                },
            };
        default:
            return state;
    }
};

const allDays = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addDay):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        default:
            return state;
    }
};

const daysReducer = combineReducers<IEntity<IDays>>({
    byId: daysById,
    allIds: allDays,
});

export default daysReducer;

export const getDaysById = (state: IEntity<IDays>) => {
    return state.byId;
};

export const getDayById = (state: IEntity<IDays>['byId'], dayId: string) => {
    return state[dayId];
};

export const getCurrentDayObj = (state: IEntity<IDays>['byId'], dayId: string) => {
    return state[dayId];
};

export const getCurrentDayFlightIds = (state: IEntity<IDays>['byId'], currentDayId: string) => {
    return state[currentDayId].flights;
};

export const getCurrentDayNoteIds = (state: IEntity<IDays>['byId'], currentDayId: string) => {
    return state[currentDayId].notes;
};
