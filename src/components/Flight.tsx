import * as React from 'react';
import TimesBox from './TimesBox';
import SortieBox from './SortieBox';
import FlightNoteBox from './FlightNoteBox';

const Flight: React.SFC = () => (
    <div>
        <TimesBox />
        <SortieBox />
        <FlightNoteBox />
    </div>
);

export default Flight;
