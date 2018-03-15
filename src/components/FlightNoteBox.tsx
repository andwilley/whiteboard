import * as React from 'react';
import Note from './Note';
import AddButton from './AddButton';

const FlightNoteBox: React.SFC = ({ codes }) => (
    <div>
        <Note />
        <AddButton
            onClick={() => alert('Add Flight Note')}
        />
    </div>
);

export default FlightNoteBox;
