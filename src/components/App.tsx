import * as React from 'react';
import CrewListBox from './CrewListBox';
import DayContainer from '../containers/DayContainer';
import '../style/App.css';

const App = () => (
    <div>
        <div className="container-fluid  wb-bg-med">
            <div className="row">
                <CrewListBox />
                <DayContainer />
            </div>
        </div>
    </div>
);

export default App;
