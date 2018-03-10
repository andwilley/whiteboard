import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';

const airspaceById = (state = {}, action: IAction) => {
    // add these cases to sortiesById as well
    switch (action.type) {
        case getType(actions.addAirspace):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    name: '',
                    start: '',
                    end: '',
                },
            };
        case getType(actions.delAirspace):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.updateAirspace):
            // handle this input better?
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    [action.payload.field]: action.payload.input,
                },
            };
        default:
            return state;
    }
};

const allAirspace = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addAirspace):
            return state.concat(action.payload.id);
        case getType(actions.delAirspace):
            return state.filter(sortieId => sortieId !== action.payload.id);
        default:
            return state;
    }
};

const airspaceReducer = combineReducers({
    byId: airspaceById,
    allIds: allAirspace,
});

export default airspaceReducer;
