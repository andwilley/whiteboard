import * as React from 'react';
import { INotes, UNoteEntity } from '../types/State';
import { errorTypes } from '../errors';
import { editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';
import IconButton from './IconButton';
import { IDelNoteArgs } from '../actions';
import {
    DroppableProvided,
    DraggableProvidedDragHandleProps,
    DraggableProvidedDraggableProps } from 'react-beautiful-dnd';

interface INoteProps {
    className?: string;
    note: INotes;
    errorLoc: UNoteEntity;
    errorLocId: string;
    isDragging?: boolean;
    draggableRef?: DroppableProvided['innerRef'];
    draggableProps?: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
    onInputChange: (e: any) => any;
}

const Note: React.SFC<INoteProps> = ({
    className = '',
    note,
    onDelNoteClick,
    onInputChange,
    errorLoc,
    errorLocId,
    isDragging = false,
    draggableRef,
    draggableProps,
    dragHandleProps,
}) => {
    return (
        <div
            className={`col-md-12 wb-only-hover${isDragging ? ' wb-is-dragging' : ''}`}
            ref={draggableRef}
            {...draggableProps}
        >
            <IconButton
                icon="drag-handle"
                hover="only-hover-hold-space"
                size={14}
                viewBox={'0 0 20 20'}
                style={{
                    margin: '3px 0px 0px -14px',
                }}
                svgClass="float-left"
                dragHandleProps={dragHandleProps}
            />
            <FlexInputContainer
                placeHolder="Note text."
                name="flightNote"
                value={note.content}
                className={className}
                errorConfig={{
                    show: [errorTypes.SCHEDULE_CONFLICT],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc,
                    errorLocId}}
                onInputChange={onInputChange}
                element={editables.NOTE}
                entityId={note.id}
            />
            <IconButton
                onClick={onDelNoteClick({id: note.id, entity: errorLoc, entityId: errorLocId})}
                icon="trash"
                hover="only-hover"
                style={{
                    margin: '-18px 0px 0px 0px',
                }}
                svgClass="float-right"
            />
        </div>
    );
};

export default Note;
