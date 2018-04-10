import * as React from 'react';
import Note from './Note';
import { INotes } from '../types/State';
import AddButton from './AddButton';

interface INoteBoxProps {
    notes: INotes[];
    onInputChange: (e: any) => void;
    onAddNoteClick: () => void;
}

const NoteBox: React.SFC<INoteBoxProps> = ({ notes, onInputChange, onAddNoteClick }) => {
    const noteComponentsList = notes.map(note => (<Note note={note} key={note.id} onInputChange={onInputChange} />));
    return (
        <div>
            {noteComponentsList}
            <AddButton
                onClick={() => alert('Add Flight Note')}
            />
        </div>
    );
};

export default NoteBox;
