import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, IDays } from '../types/State';
import { actions, IAction } from '../actions';

const daysById = (state = {}, action: IAction) => {
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
                        .filter((flightId: number) => flightId !== action.payload.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'day' ||
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
            if (action.payload.entity !== 'day') {
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
        default:
            return state;
    }
};

const allDays = (state = [], action: IAction) => {
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
