import * as React from 'react';
import FlightTimesBox from './FlightTimesBox';
// import AirspaceBox from './AirspaceBox';
// import AddButton from './AddButton';

const TimesBox: React.SFC = () => (
    <div>
        <FlightTimesBox
            briefTime={'0900'}
            takeoffTime={'1100'}
            landTime={'1215'}
        />
        {/*<AirspaceBox />
        <AddButton
            onClick={() => alert('Add Airspace')}
        />*/}
    </div>
);

export default TimesBox;
