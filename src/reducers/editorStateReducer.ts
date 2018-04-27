import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { IEditor } from '../types/State';
import { EditorState } from 'draft-js';

const editorStateReducer = (state: IEditor = {
                                editorState: EditorState.createEmpty(),
                                elementBeingEdited: {
                                    element: null,
                                    entityId: null,
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
                    element: action.payload.editable,
                    entityId: action.payload.entityId,
                },
            };
        default:
            return state;
    }
};

export default editorStateReducer;
