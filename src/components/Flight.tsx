import * as React from 'react';
import TimesBox from './TimesBox';
import SortieBox from './SortieBox';
import FlightNoteBox from './FlightNoteBox';

interface IFlightProps {
    flightId: string;
}

const Flight: React.SFC<IFlightProps> = ({ flightId }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Flight</span>
        <TimesBox />
        <SortieBox />
        <FlightNoteBox />
    </div>
);

export default Flight;
