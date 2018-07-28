import * as React from 'react';
import Note from './Note';
import { INotes, UNoteEntity } from '../types/State';
import IconButton from './IconButton';
import { IDelNoteArgs } from '../actions';
import ErrorListContainer from '../containers/ErrorListContainer';

interface INoteBoxProps {
    className: string | undefined;
    notes: INotes[] | undefined;
    entityType: UNoteEntity;
    entityId: string;
    onInputChange: (noteId: string) => (e: any) => void;
    onAddNoteClick: () => void;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
}

class NoteBox extends React.PureComponent<INoteBoxProps> {
    render() {
        const {
            className = '',
            notes = [],
            entityType,
            entityId,
            onInputChange,
            onAddNoteClick,
            onDelNoteClick,
        } = this.props;
        const noteComponentsList = notes.map(note =>
            (
            <Note
                className={className}
                note={note}
                key={note.id}
                onDelNoteClick={onDelNoteClick}
                onInputChange={onInputChange(note.id)}
                errorLoc={entityType}
                errorLocId={entityId}
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
                <ErrorListContainer className={className} errorLoc={entityType} errorLocId={entityId} />
            </div>
        );
    }
}

export default NoteBox;
