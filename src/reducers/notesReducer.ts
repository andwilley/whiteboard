import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, INotes } from '../types/State';
import { actions, IAction } from '../actions';
import { RGX_STARTS_WITH_TIME_BLOCK } from '../util/regEx';

const notesById = (state: {[id: string]: INotes} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    content: action.payload.content,
                    aircrewRefIds: state[action.payload.id] ?
                        state[action.payload.id].aircrewRefIds : [],
                    // keep track of who added, edited, time added etc later
                },
            };
        case getType(actions.delNote):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.updateNoteCrewRefs):
            return {
                ...state,
                [action.payload.noteId]: {
                    ...state[action.payload.noteId],
                    aircrewRefIds: action.payload.aircrewIds,
                },
            };
        case getType(actions.delAircrew):
            const newNotesById = Object.assign({}, state);
            Object.keys(newNotesById).forEach(noteId => {
                newNotesById[noteId] = Object.assign({}, state[noteId], {
                    aircrewRefIds: state[noteId].aircrewRefIds.filter(aircrewId => aircrewId !== action.payload.id),
                });
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

const notesReducer = combineReducers<IEntity<INotes>>({
    byId: notesById,
    allIds: allNotes,
});

export default notesReducer;

export const getNotesById = (state: IEntity<INotes>) => {
    return state.byId;
};

export const getTimeFromNotes = (note: INotes) => {
    return RGX_STARTS_WITH_TIME_BLOCK.exec(note.content);
};
