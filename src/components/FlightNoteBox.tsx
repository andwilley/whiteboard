import * as React from 'react';
import Note from './Note';
import AddButton from './AddButton';

const FlightNoteBox: React.SFC = () => (
    <div>
        <Note
            note={{id: 'a1', content: 'Flight Note', aircrewRefIds: []}}
        />
        <AddButton
            onClick={() => alert('Add Flight Note')}
        />
    </div>
);

export default FlightNoteBox;
