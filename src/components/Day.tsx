import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import { noteEntity } from '../whiteboard-constants';
import { IErrors } from '../types/State';
import ErrorList from './ErrorList';
import NavBar from './NavBar';
import DayHeaderContainer from '../containers/DayHeaderContainer';

interface IDayProps {
    dayId: string;
    dayErrors: {[id: string]: IErrors[]};
    noteErrors: {[id: string]: IErrors[]};
}

const Day: React.SFC<IDayProps> = ({ dayId, dayErrors, noteErrors }) => (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4 wb-main">
        <NavBar />
        <DayHeaderContainer />
        <FlightBoxContainer />
        <div className="col-12">
            <hr />
            <h5>Notes</h5>
            <NoteBoxContainer
                className="text-dark"
                entityType={noteEntity.DAY_NOTE}
                entityId={dayId}
                errors={noteErrors[dayId] ? noteErrors[dayId] : []}
            />
            <ErrorList errors={dayErrors[dayId] ? dayErrors[dayId] : []} />
        </div>
        <div className="footer pt-5">
            Whiteboard is one of many collaborative efforts by Steamboat Willey and Tummy's Mom.
        </div>
    </main>
);

export default Day;
