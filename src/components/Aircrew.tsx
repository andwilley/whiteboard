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
    const aircrewStyle: React.CSSProperties = { cursor: 'pointer' };
    const aircrewClass = unavailable ? 'text-danger' : '';
    const snivComponentList = snivs.map(sniv => {
        const delSnivButtons =
        (
            <span className="mt-1">
                {sniv.aircrewIds.length > 1 ?
                <IconButton
                    onClick={onSnivXClick(sniv.id, aircrew.id)}
                    icon="trash"
                    hover="only-hover"
                    svgClass="crew-icons float-right"
                    size={12}
                /> : null}
                <IconButton
                    onClick={onSnivXClick(sniv.id)}
                    icon="trash"
                    hover="only-hover"
                    svgClass="crew-icons float-right"
                    size={12}
                />
            </span>
        );
        return (
            <li className="nav-item wb-nav-item d-flex ml-2 text-light wb-only-hover" key={sniv.id}>
                <span className="mr-auto">
                    <span>{sniv.dates[dayId].start.format('HHmm')}</span>-
                    <span>{sniv.dates[dayId].end.format('HHmm')}</span>{': '}
                    <span>{sniv.message} </span>
                </span>
                    <span className="mt-1">
                        <IconButton
                            onClick={onSnivEditClick(sniv)}
                            icon="pencil"
                            size={12}
                            hover="only-hover"
                            svgClass="crew-icons float-right"
                        />
                    </span>
                {delSnivButtons}
            </li>
        );
    });
    let crewDayClass = '';
    let workDayClass = '';
    if (crewDayAndWorkDay) {
        crewDayClass = crewDayAndWorkDay.legalCrewDay >= 12
            ?   ' text-danger'
            :   crewDayAndWorkDay.legalCrewDay >= 10
            ?   ' text-warning'
            :   '';
        workDayClass = crewDayAndWorkDay.workDay >= 11
            ?   ' text-danger'
            :   crewDayAndWorkDay.workDay >= 9
            ?   ' text-warning'
            :   '';
    }
    return (
        <div>
        <li className="nav-item wb-nav-item d-flex text-light wb-only-hover">
            <span className="mr-auto">
            <span
                style={aircrewStyle}
                onClick={onAircrewClick}
                className={aircrewClass}
            >
                {aircrew.callsign}
            </span>
            {aircrew.pucks.flight > 0 &&
                (<IconButton
                    icon="plane"
                    size={12}
                    svgClass="crew-icons"
                    className="d-inline-block"
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
                    size={14}
                    svgClass="crew-icons"
                    className="d-inline-block"
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
                    className="d-inline-block"
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
                    className={`d-inline-block${workDayClass}`}
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
                    className={`d-inline-block${crewDayClass}`}
                    style={{
                        margin: '0 2px 0 8px',
                    }}
                    pointer={false}
                >
                    {crewDayAndWorkDay.legalCrewDay.toFixed(1)}
                </IconButton>)}
            </span>
            <IconButton
                onClick={onAircrewEditClick}
                icon="pencil"
                size={12}
                hover="only-hover"
                svgClass="crew-icons"
            />
            <IconButton
                onClick={onAircrewXClick}
                icon="trash"
                size={12}
                hover="only-hover"
                svgClass="crew-icons"
            />
        </li>
        {showSnivs && snivComponentList}
        </div>
    );
};

export default Aircrew;
