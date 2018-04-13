import * as React from 'react';
import TimesBox from './TimesBox';
import { IErrors } from '../types/State';
import { noteEntity } from '../whiteboard-constants';
import SortieBoxContainer from '../containers/SortieBoxContainer';
import NoteBoxContainer from '../containers/NoteBoxContainer';
import ErrorList from './ErrorList';

interface IFlightProps {
    flightId: string;
    errors: IErrors[];
}

const Flight: React.SFC<IFlightProps> = ({ flightId, errors }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Flight</span>
        <TimesBox
            flightId={flightId}
        />
        <SortieBoxContainer flightId={flightId} />
        <NoteBoxContainer
            entityId={flightId}
            entityType={noteEntity.FLIGHT}
        />
        <ErrorList errors={errors} />
    </div>
);

export default Flight;
