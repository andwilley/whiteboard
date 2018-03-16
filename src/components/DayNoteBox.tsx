import * as React from 'react';
import Note from './Note';
import AddButton from './AddButton';

const DayNoteBox: React.SFC = () => (
    <div>
        <Note
            note={{id: 'a1', content: 'Day Note', aircrewRefIds: []}}
        />
        <AddButton
            onClick={() => alert('Add Day Note')}
        />
    </div>
);

export default DayNoteBox;
