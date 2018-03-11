import * as React from 'react';
import CrewSearchBoxContainer from '../containers/CrewSearchBoxContainer';
import VisibleCrewList from '../containers/VisibleCrewList';

const CrewListBox: React.SFC = () => (
    <div>
        <CrewSearchBoxContainer />
        <VisibleCrewList />
    </div>
);

export default CrewListBox;
