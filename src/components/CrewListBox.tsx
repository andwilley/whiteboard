import * as React from 'react';
import CrewSearchBoxContainer from '../containers/CrewSearchBoxContainer';
import VisibleCrewList from '../containers/VisibleCrewList';

class CrewListBox extends React.PureComponent {
    render() {
        return (
            <nav className="col-md-2 d-none d-md-block bg-dark sidebar">
                <div className="sidebar-sticky">
                    <CrewSearchBoxContainer />
                    <VisibleCrewList />
                </div>
            </nav>
        );
    }
}

export default CrewListBox;
