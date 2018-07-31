import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, ISnivs } from '../types/State';
import { actions, IAction } from '../actions';

const snivsById = (state: {[id: string]: ISnivs} = {}, action: IAction): {[id: string]: ISnivs} => {
    switch (action.type) {
        case getType(actions.addUpdateSniv):
            const {snivId, ...payload} = action.payload;
            return {
                ...state,
                [action.payload.snivId]: {
                    ...payload,
                    id: snivId,
                    dateAdded: action.payload.dateAdded || state[action.payload.snivId].dateAdded,
                },
            };
        case getType(actions.delSniv):
            if (action.payload.aircrewId) {
                return {
                    ...state,
                    [action.payload.snivId]: {
                        ...state[action.payload.snivId],
                        aircrewIds: state[action.payload.snivId].aircrewIds
                            .filter(aircrewId => aircrewId !== action.payload.aircrewId),
                    },
                };
            }
            const rest = Object.assign({}, state);
            delete rest[action.payload.snivId];
            return rest;
        default:
            return state;
    }
};

const allSnivs = (state: string[] = [], action: IAction): string[] => {
    switch (action.type) {
        case getType(actions.addUpdateSniv):
            if (state.indexOf(action.payload.snivId) > -1) {
                return state;
            }
            return state.concat(action.payload.snivId);
        case getType(actions.delSniv):
            if (action.payload.aircrewId) {
                return state;
            }
            return state.filter(id => id !== action.payload.snivId);
        default:
            return state;
    }
};

const snivsReducer = combineReducers<IEntity<ISnivs>>({
    byId: snivsById,
    allIds: allSnivs,
});

export default snivsReducer;

export const getSnivsById = (state: IEntity<ISnivs>) => {
    return state.byId;
};

export const getAllSnivs = (state: IEntity<ISnivs>) => {
    return state.allIds;
};
