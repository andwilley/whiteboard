import * as React from 'react';
import { ISnivs } from '../types/State';
import { IAddUpdateSnivArgs } from '../actions';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';

interface IAircrewProps {
    aircrew: IAircrewWithPucks;
    snivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: () => any;
    onAircrewXClick: () => any;
    onAircrewEditClick: () => any;
    onSnivXClick: (snivId: string, aircrewId?: string) => any;
    onSnivEditClick: (sniv: IAddUpdateSnivArgs) => any;
}

const Aircrew: React.SFC<IAircrewProps> = ({ aircrew,
                                             snivs,
                                             showSnivs,
                                             dayId,
                                             onAircrewClick,
                                             onAircrewXClick,
                                             onAircrewEditClick,
                                             onSnivXClick,
                                             onSnivEditClick,
}) => {
    const totalPucks = aircrew.pucks ? (aircrew.pucks.flight +
                                          aircrew.pucks.sim +
                                          aircrew.pucks.flightNote +
                                          aircrew.pucks.dayNote)
                                        : 0;
    const aircrewStyle: React.CSSProperties = { cursor: 'pointer',
                                                textDecoration: totalPucks === 0 ? '' : 'line-through' };
    const snivComponentList = snivs.map(sniv => {
        const delSnivButtons = sniv.aircrewIds.length > 1 ?
        (
            <span>
                <span onClick={onSnivXClick(sniv.id, aircrew.id)}>[X]</span>
                <span onClick={onSnivXClick(sniv.id)}>[XX]</span>
            </span>
        ) :
        (
            <span>
                <span onClick={onSnivXClick(sniv.id)}>[X]</span>
            </span>
        );
        return (
            <li key={sniv.id}>
                <span>{sniv.dates[dayId].start.format('HHmm')}</span>-
                <span>{sniv.dates[dayId].end.format('HHmm')}</span>{': '}
                <span>{sniv.message}</span>
                <span onClick={onSnivEditClick(sniv)}>[Edit]</span>
                {delSnivButtons}
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
            <span style={{cursor: 'pointer'}} onClick={onAircrewEditClick}> [EDIT] </span>
            <span style={{cursor: 'pointer'}} onClick={onAircrewXClick}> {'[X]'} </span>
            {showSnivs && <ul>{snivComponentList}</ul>}
        </li>
    );
};

export default Aircrew;
