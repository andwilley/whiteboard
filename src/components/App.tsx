import * as React from 'react';
import CrewListBox from './CrewListBox';
import DayContainer from '../containers/DayContainer';
import '../style/App.css';
import NavBar from './NavBar';

const App = () => (
    <div>
        <NavBar />
        <div className="container-fluid">
            <div className="row">
                <CrewListBox />
                <DayContainer />
            </div>
        </div>
    </div>
);

export default App;
