import { connect } from 'react-redux';
import Aircrew from '../components/Aircrew';
import * as Moment from 'moment';
import { ICrewDayAcc } from './VisibleCrewList';
import { ISchedBlock, IActiveRefsAndBlock } from '../types/WhiteboardTypes';
import { errorLocs } from '../errors';
import { IState, ISettings, IAircrew } from '../types/State';
import getActiveAircrewRefs from '../util/getActiveAircrewRefs';
import { getCrewById, makeGetAircrewDaySnivs, getCurrentDayId, getShowSnivs, getSettings } from '../reducers';
import { getSchedErrorsFromSchedBlocks } from '../util/utilFunctions';

interface IAircrewContainerProps {
    aircrewId: string;
}

const getCrewDay = (aircrewRefs: ISchedBlock[]): ICrewDayAcc['res'] => {
    let setOnce = true;
    const crewDay = aircrewRefs
        .reduce((acc: ICrewDayAcc, block, i) => {
            if (block.location === errorLocs.SNIVS) {
                return acc;
            }
            if (i === 0) {
                acc.start = block.start;
                acc.workDayEnd = block.end;
            }
            if (setOnce && errorLocs.FLIGHT) {
                acc.flightEnd = block.hardEnd;
                setOnce = false;
            }
            if (block.start.isBefore(acc.start)) {
                acc.start = block.start;
            }
            if (block.end.isAfter(acc.workDayEnd)) {
                acc.workDayEnd = block.end;
            }
            if (block.location === errorLocs.FLIGHT && block.hardEnd.isAfter(acc.flightEnd)) {
                acc.flightEnd = block.hardEnd;
            }
            if (acc.start.isValid() && acc.flightEnd.isValid()) {
                acc.res.legalCrewDay = Moment.duration(acc.flightEnd.diff(acc.start)).asHours();
            }
            if (acc.start.isValid() && acc.workDayEnd.isValid()) {
                acc.res.workDay = Moment.duration(acc.workDayEnd.diff(acc.start)).asHours();
            }
            return acc;
        },
        {start: Moment(NaN),
            flightEnd: Moment(NaN),
            workDayEnd: Moment(NaN),
            res: {
                workDay: 0,
                legalCrewDay: 0,
            },
        }).res;
    return crewDay;
};

const pushIdOntoUnavailableIds = (
    errorArray: string[],
    block: ISchedBlock,
    conflictsWithBlock: ISchedBlock,
    aircrew: IAircrew,
    currentDayId: string
): string[] => {
    return [...errorArray, aircrew.id];
};

const aircrewIsUnavailable = (
    activeRefsAndBlock: IActiveRefsAndBlock,
    aircrew: IAircrew,
    currentDayId: string,
    settings: ISettings
): boolean => {
    const timeBlock = activeRefsAndBlock.activeTimeblock;
    let unavailableAircrewIds: string[] = [];
    if (activeRefsAndBlock.activeAircrewRefs[aircrew.id] && timeBlock) {
        unavailableAircrewIds = getSchedErrorsFromSchedBlocks(
            activeRefsAndBlock.activeAircrewRefs[aircrew.id],
            aircrew,
            timeBlock,
            settings,
            currentDayId,
            unavailableAircrewIds,
            pushIdOntoUnavailableIds
        );
        // if (flightIsCrewHotPit(block, timeBlock, settings)) {
        //     return;
        // } else if (block.start >= timeBlock.start && block.start <= timeBlock.end) {
        //     unavailableAircrewIds.push(aircrewId);
        // } else if (block.end >= timeBlock.start && block.end <= timeBlock.end) {
        //     unavailableAircrewIds.push(aircrewId);
        // } else if (timeBlock.start >= block.start && timeBlock.start <= block.end) {
        //     unavailableAircrewIds.push(aircrewId);
        // }
    }
    return unavailableAircrewIds.length > 0;
};

const mapStateToProps = (state: IState, ownProps: IAircrewContainerProps) => {
    const activeAircrewRefsAndBlock = getActiveAircrewRefs(state);
    const aircrewRefs = activeAircrewRefsAndBlock.activeAircrewRefs[ownProps.aircrewId] || [];
    const aircrew = getCrewById(state, ownProps.aircrewId);
    const currentDayId = getCurrentDayId(state);
    const settings = getSettings(state);
    return {
        aircrew: {...aircrew, pucks: {}},
        crewDayAndWorkDay: getCrewDay(aircrewRefs),
        snivs: makeGetAircrewDaySnivs()(state, ownProps.aircrewId),
        dayId: currentDayId,
        showSnivs: getShowSnivs(state),
        unavailable: aircrewIsUnavailable(activeAircrewRefsAndBlock, aircrew, currentDayId, settings),
    };
};

const mapDispatchToProps = (state: IState) => {
    return {
        // props
    };
};

const AircrewContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Aircrew);

export default AircrewContainer;
