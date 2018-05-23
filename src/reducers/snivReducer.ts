import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, ISnivs } from '../types/State';
import { actions, IAction } from '../actions';

const snivsById = (state: {[id: string]: ISnivs} = {}, action: IAction) => {
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
            const rest = Object.assign({}, state);
            delete rest[action.payload.snivId];
            return rest;
        default:
            return state;
    }
};

const allSnivs = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateSniv):
            if (state.indexOf(action.payload.snivId) > -1) {
                return state;
            }
            return state.concat(action.payload.snivId);
        case getType(actions.delSniv):
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
