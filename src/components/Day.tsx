import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import { noteEntity } from '../whiteboard-constants';
import NavBar from './NavBar';
import DayHeaderContainer from '../containers/DayHeaderContainer';
import ErrorListContainer from '../containers/ErrorListContainer';
import { errorLocs } from '../errors';

interface IDayProps {
    dayId: string;
}

const Day: React.SFC<IDayProps> = ({ dayId }) => (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 wb-main">
        <NavBar />
        <DayHeaderContainer />
        <div className="col-12">
            <h5>Flights</h5>
            <FlightBoxContainer sim={false} />
            <hr />
            <h5>Simulators</h5>
            <FlightBoxContainer sim={true} />
        </div>
        <div className="col-12">
            <hr />
            <h5>Notes</h5>
            <NoteBoxContainer
                className="text-dark"
                entityType={noteEntity.DAY_NOTE}
                entityId={dayId}
                showErrors={true}
            />
            <ErrorListContainer errorLoc={errorLocs.DAY} errorLocId={dayId} />
        </div>
        <div className="footer pt-5">
            Whiteboard is one of many collaborative efforts by Steamboat Willey and Tummy's Mom.
        </div>
    </main>
);

export default Day;
