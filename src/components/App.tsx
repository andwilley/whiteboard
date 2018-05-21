import * as React from 'react';
import CrewListBox from './CrewListBox';
import DayContainer from '../containers/DayContainer';
import '../style/App.css';
import SnivBox from './SnivBox';

const App = () => (
    <div>
        <CrewListBox />
        <SnivBox />
        <DayContainer />
    </div>
);

export default App;
