import { connect } from 'react-redux';
import { IState, UNoteEntity } from '../types/State';
import Note from '../components/Note';
import { actions, IDelNoteArgs } from '../actions';
import { setErrorsOnFreshState } from './FlexInputContainer';
import { errorTypes } from '../errors';
import { getNoteById } from '../reducers';
import {
    DroppableProvided,
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps } from 'react-beautiful-dnd';
const { delNote, addUpdateNote } = actions;

interface INoteContainerProps {
    noteId: string;
    entityType: UNoteEntity;
    entityId: string;
    className?: string;
    isDragging?: boolean;
    draggableRef?: DroppableProvided['innerRef'];
    draggableProps?: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
}

const mapStateToProps = (state: IState, ownProps: INoteContainerProps) => {
    return {
        note: getNoteById(state, ownProps.noteId),
        className: ownProps.className,
        errorLoc: ownProps.entityType,
        errorLocId: ownProps.entityId,
        isDragging: ownProps.isDragging,
        draggableRef: ownProps.draggableRef,
        draggableProps: ownProps.draggableProps,
        dragHandleProps: ownProps.dragHandleProps,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: INoteContainerProps) => {
    return {
        onDelNoteClick: (args: IDelNoteArgs) => (e: any) => {
            dispatch(delNote(args));
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        onInputChange: (inputValue: string): void => {
            dispatch(addUpdateNote({
                id: ownProps.noteId,
                entity: ownProps.entityType,
                entityId: ownProps.entityId,
                content: inputValue,
            }));
        },
    };
};

export const NoteContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Note);
