import * as React from 'react';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import { ISnivs } from '../types/State';

interface IAircrewProps {
    aircrew: IAircrewWithPucks;
    snivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: () => any;
    onXClick: () => any;
    onEditClick: () => any;
}

const Aircrew: React.SFC<IAircrewProps> = ({ aircrew,
                                             snivs,
                                             showSnivs,
                                             dayId,
                                             onAircrewClick,
                                             onXClick,
                                             onEditClick }) => {
    const totalPucks = aircrew.pucks ? (aircrew.pucks.flight +
                                          aircrew.pucks.sim +
                                          aircrew.pucks.flightNote +
                                          aircrew.pucks.dayNote)
                                        : 0;
    const aircrewStyle: React.CSSProperties = { cursor: 'pointer',
                                                textDecoration: totalPucks === 0 ? '' : 'line-through' };
    const snivComponentList = snivs.map(sniv => {
        return (
            <li key={sniv.id}>
                <span>{sniv.dates[dayId].start.toLocaleTimeString('en-US', {hour12: false}).slice(0, 5)}</span>-
                <span>{sniv.dates[dayId].end.toLocaleTimeString('en-US', {hour12: false}).slice(0, 5)}</span>{': '}
                <span>{sniv.message}</span>
            </li>
        );
    });
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
            {showSnivs && <ul>{snivComponentList}</ul>}
        </li>
    );
};

export default Aircrew;
