import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, ISnivs } from '../types/State';
import { actions, IAction } from '../actions';

const snivsById = (state: {[id: string]: ISnivs} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateSniv):
            return {
                ...state,
                [action.payload.snivId]: {
                    ...action.payload,
                    id: action.payload.id || state[action.payload.snivId].id,
                    dateAdded: action.payload.dateAdded || state[action.payload.snivId].dateAdded,
                },
            };
        case getType(actions.delSniv):
            return state;
        default:
            return state;
    }
};

const allSnivs = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateSniv):
            return state;
        case getType(actions.delSniv):
            return state;
        default:
            return state;
    }
};

export const snivsReducer = combineReducers<IEntity<ISnivs>>({
    byId: snivsById,
    allIds: allSnivs,
});
