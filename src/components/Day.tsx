import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import { noteEntity } from '../whiteboard-constants';
import { IErrors } from '../types/State';
import ErrorList from './ErrorList';
import NavBar from './NavBar';

interface IDayProps {
    dayId: string;
    dayErrors: {[id: string]: IErrors[]};
    noteErrors: {[id: string]: IErrors[]};
}

const Day: React.SFC<IDayProps> = ({ dayId, dayErrors, noteErrors } ) => (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <NavBar />
        <div
            className={`d-flex justify-content-between flex-wrap flex-md-nowrap
                align-items-center pt-3 pb-2 mb-3 border-bottom`}
        >
            <h1 className="h2">{dayId}</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <button className="btn btn-sm btn-outline-secondary">Share</button>
                        <button className="btn btn-sm btn-outline-secondary">Export</button>
                    </div>
                <button className="btn btn-sm btn-outline-secondary dropdown-toggle">
                <span data-feather="calendar" />
                This week
                </button>
                </div>
        </div>
        <FlightBoxContainer />
        <div className="col-12">
            <NoteBoxContainer
                entityType={noteEntity.DAY_NOTE}
                entityId={dayId}
                errors={noteErrors[dayId] ? noteErrors[dayId] : []}
            />
            <ErrorList errors={dayErrors[dayId] ? dayErrors[dayId] : []} />
        </div>
    </main>
);

export default Day;
