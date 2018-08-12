import * as React from 'react';
import { UNoteEntity } from '../types/State';
import IconButton from './IconButton';
import ErrorListContainer from '../containers/ErrorListContainer';
import { NoteContainer } from '../containers/NoteContainer';

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
        const noteComponentsList = noteIds.map(noteId =>
            (
            <NoteContainer
                className={className}
                noteId={noteId}
                key={noteId}
                entityType={entityType}
                entityId={entityId}
            />
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
                <div className="row">
                    {noteComponentsList}
                </div>
                {showErrors && <ErrorListContainer className={className} errorLoc={entityType} errorLocId={entityId} />}
            </div>
        );
    }
}

export default NoteBox;
