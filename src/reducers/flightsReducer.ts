import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, IFlights } from '../types/State';
import { actions, IAction } from '../actions';

const flightsById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    sim: action.payload.sim,
                    // flow: 'pit',
                    times: {
                        brief: '',
                        takeoff: '',
                        land: '',
                    },
                    airspace: [],
                    sorties: [],
                    notes: [],
                },
            };
        case getType(actions.delFlight):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.updateFlightTime):
            if (['brief', 'takeoff', 'land'].indexOf(action.payload.timeType) === -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    times: {
                        ...state[action.payload.id].times,
                        [action.payload.timeType]: action.payload.time,
                    },
                },
            };
        case getType(actions.toggleFlightType):
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    sim: !state[action.payload.id].sim,
                },
            };
        case getType(actions.addSortie):
            if (state[action.payload.flightId].sorties.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    sorties: state[action.payload.flightId].sorties.concat(action.payload.id),
                },
            };
        case getType(actions.delSortie):
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    sorties: state[action.payload.flightId].sorties
                        .filter((sortieId: number) => sortieId !== action.payload.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'flight' ||
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
            if (action.payload.entity !== 'flight') {
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
        case getType(actions.addAirspace):
            if (state[action.payload.flightId].airspace.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    airspace: state[action.payload.flightId].airspace.concat(action.payload.id),
                },
            };
        case getType(actions.delAirspace):
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    airspace: state[action.payload.flightId].airspace
                        .filter((airspaceId: number) => airspaceId !== action.payload.id),
                },
            };
        default:
            return state;
    }
};

const allFlights = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        case getType(actions.delFlight):
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

const flightsReducer = combineReducers<IEntity<IFlights>>({
    byId: flightsById,
    allIds: allFlights,
});

export default flightsReducer;
