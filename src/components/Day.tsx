import * as React from 'react';
import FlightBox from './FlightBox';
import DayNoteBox from './DayNoteBox';

const Day: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Day</span>
        <FlightBox />
        <DayNoteBox />
    </div>
);

export default Day;
