import * as React from 'react';
import Note from './Note';
import AddButton from './AddButton';

const DayNoteBox: React.SFC = () => (
    <div>
        <Note />
        <AddButton
            onClick={() => alert('Add Day Note')}
        />
    </div>
);

export default DayNoteBox;
