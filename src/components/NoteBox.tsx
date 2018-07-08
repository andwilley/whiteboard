import * as React from 'react';
import Note from './Note';
import { INotes, IErrors, UNoteEntity } from '../types/State';
import AddButton from './IconButton';
import ErrorList from './ErrorList';
import { IDelNoteArgs } from '../actions';

interface INoteBoxProps {
    notes: INotes[];
    errorLoc: UNoteEntity;
    errorLocId: string;
    onInputChange: (noteId: string) => (e: any) => void;
    onAddNoteClick: () => void;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
    errors?: IErrors[];
}

const NoteBox: React.SFC<INoteBoxProps> = ({
    notes,
    onInputChange,
    onAddNoteClick,
    onDelNoteClick,
    errorLoc,
    errorLocId,
    errors,
}) => {
    const noteComponentsList = notes.map(note =>
        (
        <Note
            note={note}
            key={note.id}
            onDelNoteClick={onDelNoteClick}
            onInputChange={onInputChange(note.id)}
            errorLoc={errorLoc}
            errorLocId={errorLocId}
        />
        )
    );
    const noteErrors = errors ? errors : [];
    return (
        <div>
            <div>
                <h6 className="sidebar-heading text-muted">Notes</h6>
                <AddButton onClick={onAddNoteClick}>
                    {`${errorLoc}`}
                </AddButton>
            </div>
            <div className="row">
                <ErrorList errors={noteErrors} />
                {noteComponentsList}
            </div>
        </div>
    );
};

export default NoteBox;
