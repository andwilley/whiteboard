import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';

const notesById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    content: action.payload.content,
                    aircrewRefIds: [],
                    // keep track of who added, edited, time added etc later
                },
            };
        case getType(actions.delNote):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.addCrewRefToNote):
            if (state[action.payload.noteId].aircrewRefIds.indexOf(action.payload.aircrewId) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.noteId]: {
                    ...state[action.payload.noteId],
                    aircrewRefIds: state[action.payload.noteId].aircrewRefIds.concat(action.payload.aircrewId),
                },
            };
        case getType(actions.delCrewRefFromNote):
            return {
                ...state,
                [action.payload.noteId]: {
                    ...state[action.payload.noteId],
                    aircrewRefIds: state[action.payload.noteId].aircrewRefIds
                        .filter((id: number) => id !== action.payload.aircrewId),
                },
            };
        case getType(actions.delAircrew):
            const newNotesById = Object.assign({}, state);
            Object.keys(newNotesById).forEach(noteId => {
                newNotesById[noteId] = Object.assign({}, state[noteId]);
                newNotesById[noteId].aircrewRefIds = newNotesById[noteId].aircrewRefIds
                    .filter((id: number) => id !== action.payload.id);
            });
            return newNotesById;
        default:
            return state;
    }
};

const allNotes = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        case getType(actions.delNote):
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

const notesReducer = combineReducers({
    byId: notesById,
    allIds: allNotes,
});

export default notesReducer;
