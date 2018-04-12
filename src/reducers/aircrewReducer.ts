import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, IAircrew } from '../types/State';
import { actions, IAction } from '../actions';
import { noteEntity } from '../whiteboard-constants';

const aircrewById = (state: {[id: string]: IAircrew} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrew):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    rank: action.payload.rank,
                    first: action.payload.first,
                    last: action.payload.last,
                    callsign: action.payload.callsign,
                    seat: action.payload.seat,
                    quals: action.payload.quals,
                    flightPucks: [],
                    simPucks: [],
                    odos: 0,
                    snivs: [],
                    notes: [],
                },
            };
        case getType(actions.delAircrew):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            // why doesn't this work??? rest is returning the entire state...???
            // let { [action.id]: delcrew, ...rest } = state;
            return rest;
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== noteEntity.AIRCREW ||
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
            if (action.payload.entity !== 'aircrew') {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter(noteId => noteId !== action.payload.id),
                },
            };
        default:
            return state;
    }
};

const allAircrew = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrew):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        case getType(actions.delAircrew):
            return state.filter(item => item !== action.payload.id);
        default:
            return state;
    }
};

const aircrewReducer = combineReducers<IEntity<IAircrew>>({
   byId: aircrewById,
   allIds: allAircrew,
});

export default aircrewReducer;
