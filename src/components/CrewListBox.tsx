import * as React from 'react';
import CrewSearchBoxContainer from '../containers/CrewSearchBoxContainer';
import VisibleCrewList from '../containers/VisibleCrewList';

const CrewListBox: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>CrewList</span>
        <CrewSearchBoxContainer />
        <VisibleCrewList />
    </div>
);

export default CrewListBox;
