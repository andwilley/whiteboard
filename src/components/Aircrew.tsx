import * as React from 'react';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';

interface IAircrewProps {
    aircrew: IAircrewWithPucks;
    onAircrewClick: () => any;
    onXClick: () => any;
    onEditClick: () => any;
}

const Aircrew: React.SFC<IAircrewProps> = ({ aircrew, onAircrewClick, onXClick, onEditClick }) => {
    const totalPucks = aircrew.pucks ? (aircrew.pucks.flight +
                                          aircrew.pucks.sim +
                                          aircrew.pucks.flightNote +
                                          aircrew.pucks.dayNote)
                                        : 0;
    const aircrewStyle: React.CSSProperties = { cursor: 'pointer',
                                                textDecoration: totalPucks === 0 ? '' : 'line-through' };
    return (
        <li>
            <span
                style={aircrewStyle}
                onClick={onAircrewClick}
            >
                {aircrew.callsign}
            </span>
            {aircrew.pucks.flight > 0 &&
                <span> F({aircrew.pucks.flight}) </span>}
            {aircrew.pucks.sim > 0 &&
                <span> S({aircrew.pucks.sim}) </span>}
            {(aircrew.pucks.flightNote + aircrew.pucks.dayNote) > 0 &&
                <span> N({aircrew.pucks.flightNote + aircrew.pucks.dayNote}) </span>}
            <span style={{cursor: 'pointer'}} onClick={onEditClick}> [EDIT] </span>
            <span style={{cursor: 'pointer'}} onClick={onXClick}> {'[X]'} </span>
        </li>
    );
};

export default Aircrew;
