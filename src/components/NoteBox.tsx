import * as React from 'react';
import { UNoteEntity } from '../types/State';
import IconButton from './IconButton';
import ErrorListContainer from '../containers/ErrorListContainer';
import { NoteContainer } from '../containers/NoteContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';

interface INoteBoxProps {
    className: string | undefined;
    noteIds: string[] | undefined;
    entityType: UNoteEntity;
    entityId: string;
    showErrors?: boolean;
    onAddNoteClick: () => void;
}

class NoteBox extends React.PureComponent<INoteBoxProps> {
    render() {
        const {
            className = '',
            noteIds = [],
            entityType,
            entityId,
            showErrors = false,
            onAddNoteClick,
        } = this.props;
        const noteComponentsList = noteIds.map((noteId, i) =>
            (
            <Draggable draggableId={noteId} index={i} type={entityType} key={noteId}>
                {(provided, snapshot) => (
                    <NoteContainer
                        className={className}
                        noteId={noteId}
                        entityType={entityType}
                        entityId={entityId}
                        isDragging={snapshot.isDragging}
                        draggableRef={provided.innerRef}
                        draggableProps={provided.draggableProps}
                        dragHandleProps={provided.dragHandleProps}
                    />
                )}
            </Draggable>
            )
        );
        return (
            <div>
                <IconButton
                    onClick={onAddNoteClick}
                    icon="plus"
                    size={10}
                    style={{
                        margin: '-20px 0px 0px 0px',
                    }}
                    svgClass="float-right"
                />
                <Droppable droppableId={entityId} type={entityType}>
                    {(provided, snapShot) => (
                        <div className="row wb-droppable-height" ref={provided.innerRef} {...provided.droppableProps}>
                            {noteComponentsList}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
                {showErrors && <ErrorListContainer className={className} errorLoc={entityType} errorLocId={entityId} />}
            </div>
        );
    }
}

export default NoteBox;
