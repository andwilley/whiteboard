import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, ISorties } from '../types/State';
import { actions, IAction } from '../actions';

const sortiesById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
        case getType(actions.addSortie):
            return {
                ...state,
                [action.payload.sortieId]: {
                    id: action.payload.sortieId,
                    front: {
                        inputName: '',
                        aircrewRefId: null,
                        codes: [],
                        symbols: [],
                    },
                    back: {
                        inputName: '',
                        aircrewRefId: null,
                        codes: [],
                        symbols: [],
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
                newSortiesById[sortieId] = Object.assign({}, state[sortieId]);
                if (action.payload.id === newSortiesById[sortieId].front.crewId) {
                    newSortiesById[sortieId].front = Object.assign({}, state[sortieId].front, {
                            inputName: '',
                            crewId: null,
                        }
                    );
                }
                if (action.payload.id === newSortiesById[sortieId].back.crewId) {
                    newSortiesById[sortieId].back = Object.assign({}, state[sortieId].back, {
                            inputName: '',
                            crewId: null,
                        }
                    );
                }
            });
            return newSortiesById;
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'sortie' ||
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
            if (action.payload.entity !== 'sortie') {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter((noteId: number) => noteId !== action.payload.id),
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

const allSorties = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
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
