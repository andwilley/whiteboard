import { combineReducers } from 'redux';
// import { getType } from 'typesafe-actions';
import { IEntity, IGroups } from '../types/State';
import { IAction } from '../actions';
import { createSelector } from 'reselect';

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

export const getGroupsById = (state: IEntity<IGroups>) => {
    return state.byId;
};

export const getAllGroupIds = (state: IEntity<IGroups>) => {
    return state.allIds;
};

export const getAllGroups = createSelector(
    getGroupsById,
    getAllGroupIds,
    (groupById, allGroup) => {
    return allGroup.map(groupId => groupById[groupId]);
});
