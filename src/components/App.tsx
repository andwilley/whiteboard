import * as React from 'react';
import CrewListBox from './CrewListBox';
import DayContainer from '../containers/DayContainer';
import '../style/App.css';

const App = () => (
    <div>
        <div className="container-fluid">
            <div className="row">
                <CrewListBox />
                <DayContainer />
            </div>
        </div>
    </div>
);

export default App;
