import * as React from 'react';
import { ISnivs } from '../types/State';
import { IAddUpdateSnivArgs } from '../actions';
import { IAircrewWithPucks } from '../types/WhiteboardTypes';
import IconButton from './IconButton';
import { ICrewDayAcc } from '../containers/VisibleCrewList';

interface IAircrewProps {
    aircrew: IAircrewWithPucks;
    crewDayAndWorkDay: ICrewDayAcc['res'];
    unavailable: boolean;
    snivs: ISnivs[];
    showSnivs: boolean;
    dayId: string;
    onAircrewClick: () => any;
    onAircrewXClick: () => any;
    onAircrewEditClick: () => any;
    onSnivXClick: (snivId: string, aircrewId?: string) => any;
    onSnivEditClick: (sniv: IAddUpdateSnivArgs) => any;
}

const Aircrew: React.SFC<IAircrewProps> = ({
    aircrew,
    crewDayAndWorkDay,
    unavailable,
    snivs,
    showSnivs,
    dayId,
    onAircrewClick,
    onAircrewXClick,
    onAircrewEditClick,
    onSnivXClick,
    onSnivEditClick,
}) => {
    // const totalPucks = aircrew.pucks ? (aircrew.pucks.flight +
                                        //   aircrew.pucks.sim +
                                        //   aircrew.pucks.flightNote +
                                        //   aircrew.pucks.dayNote)
                                        // : 0;
    const aircrewStyle: React.CSSProperties = { cursor: 'pointer',
                                                color: unavailable ? 'red' : 'inherit' };
    const snivComponentList = snivs.map(sniv => {
        const delSnivButtons = sniv.aircrewIds.length > 1 ?
        (
            <span>
                <span onClick={onSnivXClick(sniv.id, aircrew.id)}>[X] </span>
                <span onClick={onSnivXClick(sniv.id)}>[XX]</span>
            </span>
        ) :
        (
            <span>
                <span onClick={onSnivXClick(sniv.id)}>[X]</span>
            </span>
        );
        return (
            <li className="nav-item wb-nav-item text-light" key={sniv.id}>
                <span>{sniv.dates[dayId].start.format('HHmm')}</span>-
                <span>{sniv.dates[dayId].end.format('HHmm')}</span>{': '}
                <span>{sniv.message} </span>
                <span onClick={onSnivEditClick(sniv)}>[Edit] </span>
                {delSnivButtons}
            </li>
        );
    });
    return (
        <li className="nav-item wb-nav-item text-light">
            <span
                style={aircrewStyle}
                onClick={onAircrewClick}
            >
                {aircrew.callsign}
            </span>
            {aircrew.pucks.flight > 0 &&
                (<IconButton
                    icon="plane"
                    size={12}
                    svgClass="crew-icons"
                    style={{
                        margin: '0 2px 0 8px',
                    }}
                    pointer={false}
                    viewBox="0 0 21 22"
                >
                    {aircrew.pucks.flight}
                </IconButton>)}
            {aircrew.pucks.sim > 0 &&
                (<IconButton
                    icon="controller"
                    size={12}
                    svgClass="crew-icons"
                    style={{
                        margin: '0 2px 0 8px',
                    }}
                    pointer={false}
                    viewBox="0 0 512 512"
                >
                    {aircrew.pucks.sim}
                </IconButton>)}
            {(aircrew.pucks.flightNote + aircrew.pucks.simNote + aircrew.pucks.dayNote) > 0 &&
                (<IconButton
                    icon="paperclip"
                    size={12}
                    svgClass="crew-icons"
                    style={{
                        margin: '0 2px 0 8px',
                    }}
                    pointer={false}
                >
                    {aircrew.pucks.flightNote + aircrew.pucks.simNote + aircrew.pucks.dayNote}
                </IconButton>)}
            {(Object.keys(aircrew.pucks).some(key => aircrew.pucks[key] > 0)) &&
                (<IconButton
                    icon="clock"
                    size={12}
                    svgClass="crew-icons"
                    style={{
                        margin: '0 2px 0 8px',
                    }}
                    pointer={false}
                >
                    {crewDayAndWorkDay.workDay.toFixed(1)}
                </IconButton>)}
            {(aircrew.pucks.flight > 0 && crewDayAndWorkDay.legalCrewDay > 0) &&
                (<IconButton
                    icon="warning"
                    size={12}
                    svgClass="crew-icons"
                    style={{
                        margin: '0 2px 0 8px',
                    }}
                    pointer={false}
                >
                    {crewDayAndWorkDay.legalCrewDay.toFixed(1)}
                </IconButton>)}
            <IconButton
                onClick={onAircrewXClick}
                icon="trash"
                size={12}
                svgClass="float-right crew-icons"
            /><IconButton
                onClick={onAircrewEditClick}
                icon="pencil"
                size={12}
                svgClass="float-right crew-icons"
            />
            {showSnivs && <ul className="nav flex-column">{snivComponentList}</ul>}
        </li>
    );
};

export default Aircrew;
