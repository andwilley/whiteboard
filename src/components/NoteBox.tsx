import * as React from 'react';
import Note from './Note';
import { INotes } from '../types/State';
import AddButton from './AddButton';

interface INoteBoxProps {
    notes: INotes[];
    onInputChange: (noteId: string) => (e: any) => void;
    onAddNoteClick: () => void;
}

const NoteBox: React.SFC<INoteBoxProps> = ({ notes, onInputChange, onAddNoteClick }) => {
    const noteComponentsList = notes.map(note =>
        (<Note note={note} key={note.id} onInputChange={onInputChange(note.id)} />));
    return (
        <div>
            {noteComponentsList}
            <AddButton
                onClick={onAddNoteClick}
            />
        </div>
    );
};

export default NoteBox;
