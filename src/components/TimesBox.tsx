import * as React from 'react';
import FlightTimesBox from './FlightTimesBox';
// import AirspaceBox from './AirspaceBox';
// import AddButton from './AddButton';

const TimesBox: React.SFC = () => (
    <div>
        <FlightTimesBox />
        {/*<AirspaceBox />
        <AddButton
            onClick={() => alert('Add Airspace')}
        />*/}
    </div>
);

export default TimesBox;
