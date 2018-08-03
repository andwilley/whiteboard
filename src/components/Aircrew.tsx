import * as React from 'react';
import { ISnivs, IAircrew } from '../types/State';
import { IPucks } from '../types/WhiteboardTypes';
import IconButton from './IconButton';
import { ICrewDayAcc } from '../containers/AircrewContainer';

interface IAircrewProps {
    aircrew: IAircrew;
    pucks: IPucks;
    crewDayAndWorkDay: ICrewDayAcc['res'];
    unavailable: boolean;
    snivs: ISnivs[] | undefined;
    showSnivs: boolean;
    showOnlyAvailable: boolean;
    dayId: string;
    onAircrewClick: (aircrew: IAircrew) => (e: any) => void;
    onAircrewXClick: (id: string, snivs: ISnivs[]) => (e: any) => void;
    onAircrewEditClick: (aircrew: IAircrew) => (e: any) => void;
    onSnivXClick: (snivId: string, aircrewId?: string) => (e: any) => void;
    onSnivEditClick: (snivs: ISnivs) => (e: any) => void;
}

class Aircrew extends React.PureComponent<IAircrewProps> {
    // componentWillReceiveProps(nextProps: any) {
    //     Object.keys(nextProps)
    //       .filter(key => {
    //         return nextProps[key] !== this.props[key];
    //       })
    //       .map(key => {
    //         console.log(
    //           `${nextProps.aircrew.callsign} changed property:`,
    //           key,
    //           'from',
    //           this.props[key],
    //           'to',
    //           nextProps[key]
    //         );
    //       });
    //   }
    render() {
        const {
            aircrew,
            pucks,
            crewDayAndWorkDay,
            unavailable,
            snivs = [],
            showSnivs,
            showOnlyAvailable,
            dayId,
            onAircrewClick,
            onAircrewXClick,
            onAircrewEditClick,
            onSnivXClick,
            onSnivEditClick,
        } = this.props;
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
        return showOnlyAvailable && unavailable ? null : (
            <div>
            <li className="nav-item wb-nav-item d-flex text-light wb-only-hover">
                <span className="mr-auto">
                <span
                    style={aircrewStyle}
                    onClick={onAircrewClick(aircrew)}
                    className={aircrewClass}
                >
                    {aircrew.callsign}
                </span>
                {pucks.flight > 0 &&
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
                        {pucks.flight}
                    </IconButton>)}
                {pucks.sim > 0 &&
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
                        {pucks.sim}
                    </IconButton>)}
                {(pucks.flightNote + pucks.simNote + pucks.dayNote) > 0 &&
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
                        {pucks.flightNote + pucks.simNote + pucks.dayNote}
                    </IconButton>)}
                {(Object.keys(pucks).some(key => pucks[key] > 0)) &&
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
                {(pucks.flight > 0 && crewDayAndWorkDay.legalCrewDay > 0) &&
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
                    onClick={onAircrewEditClick(aircrew)}
                    icon="pencil"
                    size={12}
                    hover="only-hover"
                    svgClass="crew-icons"
                />
                <IconButton
                    onClick={onAircrewXClick(aircrew.id, snivs)}
                    icon="trash"
                    size={12}
                    hover="only-hover"
                    svgClass="crew-icons"
                />
            </li>
            {showSnivs && snivComponentList}
            </div>
        );
    }
}

export default Aircrew;
