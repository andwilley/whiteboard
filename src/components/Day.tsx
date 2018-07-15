import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import { noteEntity } from '../whiteboard-constants';
import { IErrors } from '../types/State';
import ErrorList from './ErrorList';
import NavBar from './NavBar';
import IconButton from './IconButton';

interface IDayProps {
    dayId: string;
    totalFlightTime: string;
    totalSorties: string;
    dayErrors: {[id: string]: IErrors[]};
    noteErrors: {[id: string]: IErrors[]};
}

const Day: React.SFC<IDayProps> = ({ dayId, totalFlightTime, totalSorties, dayErrors, noteErrors } ) => (
    <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
        <NavBar />
        <div
            className={`d-flex justify-content-between flex-wrap flex-md-nowrap
                align-items-center pt-3 pb-2 mb-3 border-bottom`}
        >
            <h1 className="h2">{dayId}</h1>
                <div className="btn-toolbar mb-2 mb-md-0">
                    <div className="btn-group mr-2">
                        <IconButton
                            icon="plane"
                            viewBox="0 0 21 22"
                            pointer={false}
                            size={18}
                            className="h5"
                            style={{
                                margin: '.5rem .1rem 0 0',
                            }}
                        >
                        {totalSorties}
                        </IconButton>
                        <IconButton
                            icon="clock"
                            pointer={false}
                            size={18}
                            className="h5"
                            style={{
                                margin: '.5rem .1rem 0 .6rem',
                            }}
                        >
                        {totalFlightTime}
                        </IconButton>
                        {/* <button className="btn btn-sm btn-outline-secondary">{totalFlightTime}</button>
                        <button className="btn btn-sm btn-outline-secondary">{totalSorties}</button> */}
                    </div>
                </div>
        </div>
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
            A footer.
        </div>
    </main>
);

export default Day;
