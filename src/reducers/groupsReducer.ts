import { combineReducers } from 'redux';
// import { getType } from 'typesafe-actions';
import { IEntity, IGroups } from '../types/State';
import { IAction } from '../actions';

const groupsById = (state: {[id: string]: IGroups} = {}, action: IAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

const allGroups = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        default:
            return state;
    }
};

const groupsReducer = combineReducers<IEntity<IGroups>>({
    byId: groupsById,
    allIds: allGroups,
});

export default groupsReducer;
