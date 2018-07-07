import * as React from 'react';
import CrewSearchBoxContainer from '../containers/CrewSearchBoxContainer';
import VisibleCrewList from '../containers/VisibleCrewList';

const CrewListBox: React.SFC = () => (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
        <div className="sidebar-sticky">
            <CrewSearchBoxContainer />
            <VisibleCrewList />
        </div>
    </nav>
);

export default CrewListBox;
