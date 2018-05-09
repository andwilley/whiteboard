import * as React from 'react';
import FlightBoxContainer from '../containers/FlightBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import { noteEntity } from '../whiteboard-constants';
import { IErrors } from '../types/State';
import ErrorList from './ErrorList';
import TabKeyNav from './TabKeyNav';

interface IDayProps {
    dayId: string;
    dayErrors: {[id: string]: IErrors[]};
    noteErrors: {[id: string]: IErrors[]};
}

const Day: React.SFC<IDayProps> = ({ dayId, dayErrors, noteErrors }) => (
    <TabKeyNav>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Day</span>
        <ErrorList errors={dayErrors[dayId] ? dayErrors[dayId] : []} />
        <FlightBoxContainer />
        <NoteBoxContainer
            entityType={noteEntity.DAY}
            entityId={dayId}
            errors={noteErrors[dayId] ? noteErrors[dayId] : []}
        />
    </TabKeyNav>
);

export default Day;
