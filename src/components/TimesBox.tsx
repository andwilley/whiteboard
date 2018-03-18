import * as React from 'react';
import FlightTimesContainer from '../containers/FlightTimesContainer';
// import AirspaceBox from './AirspaceBox';
// import AddButton from './AddButton';

interface ITimesBoxProps {
    flightId: string;
}

const TimesBox: React.SFC<ITimesBoxProps> = ({ flightId }) => (
    <div>
        <FlightTimesContainer
            flightId={flightId}
        />
        {/*<AirspaceBox />
        <AddButton
            onClick={() => alert('Add Airspace')}
        />*/}
    </div>
);

export default TimesBox;
