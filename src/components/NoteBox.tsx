import * as React from 'react';
import Note from './Note';
import { INotes, IErrors } from '../types/State';
import AddButton from './AddButton';
import ErrorList from './ErrorList';

interface INoteBoxProps {
    notes: INotes[];
    errorLoc: string;
    errorLocId: string;
    onInputChange: (noteId: string) => (e: any) => void;
    onAddNoteClick: () => void;
    errors?: IErrors[];
}

const NoteBox: React.SFC<INoteBoxProps> = ({ notes, onInputChange, onAddNoteClick, errorLoc, errorLocId, errors }) => {
    const noteComponentsList = notes.map(note =>
        (
        <Note
            note={note}
            key={note.id}
            onInputChange={onInputChange(note.id)}
            errorLoc={errorLoc}
            errorLocId={errorLocId}
        />
        )
    );
    const noteErrors = errors ? errors : [];
    return (
        <div>
            {errors && <ErrorList errors={noteErrors} />}
            {noteComponentsList}
            <AddButton
                onClick={onAddNoteClick}
            />
        </div>
    );
};

export default NoteBox;
