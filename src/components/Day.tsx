import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import { noteEntity } from '../whiteboard-constants';

const Day: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Day</span>
        <FlightBoxContainer />
        <NoteBoxContainer
            entityType={noteEntity.DAY}
            entityId={'2018-01-24'}
        />
    </div>
);

export default Day;
