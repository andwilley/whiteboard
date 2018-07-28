import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { IEditor } from '../types/State';
import { EditorState } from 'draft-js';

const editorStateReducer = (state: IEditor = {
                                editorState: EditorState.createEmpty(),
                                elementBeingEdited: {
                                    element: null,
                                    entityId: null,
                                    timeblock: null,
                                },
                            },
                            action: IAction) => {
    switch (action.type) {
        case getType(actions.setEditorState):
            return {
                ...state,
                editorState: action.payload.editorState,
            };
        case getType(actions.setEditedElement):
            return {
                ...state,
                elementBeingEdited: {
                    ...state.elementBeingEdited,
                    element: action.payload.editable,
                    entityId: action.payload.entityId,
                },
            };
        case getType(actions.setEditedElementTimeblock):
            return {
                ...state,
                elementBeingEdited: {
                    ...state.elementBeingEdited,
                    timeblock: action.payload.timeblock,
                },
            };
        default:
            return state;
    }
};

export default editorStateReducer;

export const getElementBeingEdited = (state: IEditor) => {
    return state.elementBeingEdited;
};
