import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { IEntity, ISorties } from '../types/State';
import { noteEntity } from '../whiteboard-constants';

const sortiesById = (state: {[id: string]: ISorties} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
        case getType(actions.addSortie):
            return {
                ...state,
                [action.payload.sortieId]: {
                    id: action.payload.sortieId,
                    front: {
                        inputName: '',
                        aircrewRefIds: [],
                        codes: [],
                        symbols: '',
                    },
                    back: {
                        inputName: '',
                        aircrewRefIds: [],
                        codes: [],
                        symbols: '',
                    },
                    loadout: '',
                    notes: [],
                },
            };
        case getType(actions.delSortie):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.delAircrew):
            const newSortiesById = Object.assign({}, state);
            Object.keys(newSortiesById).forEach(sortieId => {
                if (newSortiesById[sortieId].front.aircrewRefIds.indexOf(action.payload.id) > -1) {
                    newSortiesById[sortieId] = Object.assign({}, newSortiesById[sortieId], {
                        front: {
                            ...state[sortieId].front,
                            aircrewRefIds: state[sortieId].front.aircrewRefIds.filter(aircrewId => {
                                return aircrewId !== action.payload.id;
                            }),
                        },
                    });
                }
                if (newSortiesById[sortieId].back.aircrewRefIds.indexOf(action.payload.id) > -1) {
                    newSortiesById[sortieId] = Object.assign({}, newSortiesById[sortieId], {
                        back: {
                            ...state[sortieId].back,
                            aircrewRefIds: state[sortieId].back.aircrewRefIds.filter(aircrewId => {
                                return aircrewId !== action.payload.id;
                            }),
                        },
                    });
                }
            });
            return newSortiesById;
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== noteEntity.SORTIE_NOTE ||
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
            if (action.payload.entity !== noteEntity.SORTIE_NOTE) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter(noteId => noteId !== action.payload.id),
                },
            };
        case getType(actions.updatePuckName):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        inputName: action.payload.name,
                    },
                },
            };
        case getType(actions.updateSeatCrewRefs):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        aircrewRefIds: action.payload.aircrewIds,
                    },
                },
            };
        case getType(actions.updatePuckCode):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        codes: action.payload.codes,
                    },
                },
            };
        case getType(actions.updatePuckSymbol):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        symbols: action.payload.symbols,
                    },
                },
            };
        case getType(actions.updateLoadout):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    loadout: action.payload.input,
                },
            };
        default:
            return state;
    }
};

const allSorties = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            /** add first sortie by default. */
        case getType(actions.addSortie):
            return state.concat(action.payload.sortieId);
        case getType(actions.delSortie):
            return state.filter(sortieId => sortieId !== action.payload.id);
        default:
            return state;
    }
};

const sortiesReducer = combineReducers<IEntity<ISorties>>({
    byId: sortiesById,
    allIds: allSorties,
});

export default sortiesReducer;

export const getSortiesById = (state: IEntity<ISorties>) => {
    return state.byId;
};

export const getSortie = (state: IEntity<ISorties>['byId'], sortieId: string) => {
    return state[sortieId];
};

export const getFrontSeatName = (state: ISorties) => {
    return state.front.inputName;
};

export const getFrontSeatCodes = (state: ISorties) => {
    return state.front.codes.join(' ');
};

export const getFrontSeatSymbols = (state: ISorties) => {
    return state.front.symbols;
};

export const getBackSeatName = (state: ISorties) => {
    return state.back.inputName;
};

export const getBackSeatCodes = (state: ISorties) => {
    return state.back.codes.join(' ');
};

export const getBackSeatSymbols = (state: ISorties) => {
    return state.back.symbols;
};
