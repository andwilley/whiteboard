import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import DayNoteBox from './DayNoteBox';

const Day: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Day</span>
        <FlightBoxContainer />
        <DayNoteBox />
    </div>
);

export default Day;
