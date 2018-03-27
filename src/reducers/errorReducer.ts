import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, IErrors } from '../types/State';
import { actions, IAction } from '../actions';

const errorsById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addError):
            return {
                ...state,
                [action.payload.errorId]: {
                    id: action.payload.errorId,
                    time: action.payload.time,
                    type: action.payload.type,
                    location: action.payload.location,
                    locationId: action.payload.locationId,
                    level: action.payload.level,
                    message: action.payload.message,
                    display: true,
                    active: true,
                    meta: action.meta,
                },
            };
        case getType(actions.toggleShowError):
            return {
                ...state,
                [action.payload.errorId]: {
                    ...state[action.payload.errorId],
                    display: !state[action.payload.errorId].display,
                    meta: {
                        ...state[action.payload.errorId].meta,
                        timeHiddenToggled: state[action.payload.errorId].meta.timeHiddenToggled ?
                            state[action.payload.errorId].meta.concat(action.meta.timeHiddenToggled) :
                            [action.meta.timeHiddenToggled],
                    },
                }
            };
        case getType(actions.clearError):
            return {
                ...state,
                [action.payload.errorId]: {
                    ...state[action.payload.errorId],
                    active: false,
                    meta: {
                        ...state[action.payload.errorId].meta,
                        timeInactive: action.meta.timeInactive,
                    },
                }
            };
        case getType(actions.delError):
            const rest = Object.assign({}, state);
            delete rest[action.payload.errorId];
            return rest;
        default:
            return state;
    }
};

const activeErrors = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addError):
            if (state.indexOf(action.payload.errorId) > -1) {
                return state;
            }
            return state.concat(action.payload.errorId);
        case getType(actions.delError):
        case getType(actions.clearError):
            return state.filter(id => id !== action.payload.errorId);
        default:
            return state;
    }
};

const allErrors = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addError):
            if (state.indexOf(action.payload.errorId) > -1) {
                return state;
            }
            return state.concat(action.payload.errorId);
        case getType(action.delError):
            return state.filter(id => id !== action.payload.errorId);
        default:
            return state;
    }
};

const errorReducer = combineReducers<IEntity<IErrors>>({
    byId: errorsById,
    activeIds: activeErrors,
    allIds: allErrors,
});

export default errorReducer;
