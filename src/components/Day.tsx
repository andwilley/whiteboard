import * as React from 'react';
import FlightBox from './FlightBox';
import DayNoteBox from './DayNoteBox';

const Day: React.SFC = () => (
    <div>
        <FlightBox />
        <DayNoteBox />
    </div>
);

export default Day;
