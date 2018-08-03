import { connect } from 'react-redux';
import Aircrew from '../components/Aircrew';
import * as Moment from 'moment';
import * as _ from 'lodash';
import { ISchedBlock, IActiveRefsAndBlock, IPucks } from '../types/WhiteboardTypes';
import { errorLocs, errorTypes } from '../errors';
import { IState, ISettings, IAircrew, ISnivs, IEntity } from '../types/State';
import getActiveAircrewRefs from '../util/getActiveAircrewRefs';
import {
    getCrewById,
    makeGetAircrewDaySnivs,
    getCurrentDayId,
    getShowSnivs,
    getSettings,
    getAircrewById,
    getShowAvailable} from '../reducers';
import { getSchedErrorsFromSchedBlocks } from '../util/utilFunctions';
import { actions } from '../actions';
import { setErrorsOnFreshState } from './FlexInputContainer';
import { createSelector } from 'reselect';

const {
    delAircrew,
    setAircrewForm,
    delSniv,
    addUpdateAircrewFormDisplay,
    addUpdateSnivFormDisplay,
    setSnivForm,
} = actions;

interface IAircrewContainerProps {
    aircrewId: string;
}

const newPuck: IPucks = {
    flight: 0,
    sim: 0,
    flightNote: 0,
    simNote: 0,
    dayNote: 0,
  };

const getAircrewPucks = _.memoize(
    (schedBlocks: ISchedBlock[] = []): IPucks => {
        return schedBlocks.reduce((aircrewPucks, block) => {
            switch (block.location) {
                case errorLocs.FLIGHT:
                    aircrewPucks.flight++;
                    break;
                case errorLocs.FLIGHT_NOTE:
                    aircrewPucks.flightNote++;
                    break;
                case errorLocs.SIM:
                    aircrewPucks.sim++;
                    break;
                case errorLocs.SIM_NOTE:
                    aircrewPucks.simNote++;
                    break;
                case errorLocs.DAY_NOTE:
                    aircrewPucks.dayNote++;
                    break;
                default:
                    break;
            }
            return aircrewPucks;
        }, {...newPuck});
    },
    (...args) => {
        return JSON.stringify(args[0]);
    }
);

export interface ICrewDayAcc {
    start: Moment.Moment;
    flightEnd: Moment.Moment;
    workDayEnd: Moment.Moment;
    res: {
        workDay: number;
        legalCrewDay: number;
    };
}

const makeGetCrewDay = _.memoize((aircrewRefs: ISchedBlock[] = []): ICrewDayAcc['res'] => {
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
},
(...args) => {
    return JSON.stringify(args[0]);
});

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

interface IAicrewContainerStateProps {
    aircrew: IAircrew;
    pucks: IPucks;
    state: IState;
    crewDayAndWorkDay: ICrewDayAcc['res'];
    snivs: ISnivs[] | undefined;
    dayId: string;
    showSnivs: boolean;
    showOnlyAvailable: boolean;
    unavailable: boolean;
}

const mapStateToProps = (state: IState, ownProps: IAircrewContainerProps): IAicrewContainerStateProps => {
    const activeAircrewRefsAndBlock = getActiveAircrewRefs(state);
    const aircrewRefs = activeAircrewRefsAndBlock.activeAircrewRefs[ownProps.aircrewId];
    const aircrew = getCrewById(state, ownProps.aircrewId);
    const currentDayId = getCurrentDayId(state);
    const settings = getSettings(state);
    const snivs = makeGetAircrewDaySnivs()(state, ownProps.aircrewId);
    const crewDayAndWorkDay = makeGetCrewDay(aircrewRefs);
    return {
        aircrew: getCrewById(state, ownProps.aircrewId),
        pucks: getAircrewPucks(aircrewRefs),
        state,
        crewDayAndWorkDay,
        snivs: snivs.length > 0 ? snivs : undefined,
        dayId: currentDayId,
        showSnivs: getShowSnivs(state),
        showOnlyAvailable: getShowAvailable(state),
        unavailable: aircrewIsUnavailable(activeAircrewRefsAndBlock, aircrew, currentDayId, settings),
    };
};

interface IAicrewContainerDispatchProps {
    onAircrewClick: (aircrew: IAircrew) => (e: any) => void;
    onAircrewXClick: (id: string, snivs: ISnivs[]) => (e: any) => void;
    onAircrewEditClick: (aircrew: IAircrew) => (e: any) => void;
    onSnivXClick: (snivId: string, aircrewId?: string) => (e: any) => void;
    onSnivEditClick: (state: IState) => (snivs: ISnivs) => (e: any) => void;
}

const mapDispatchToProps = (dispatch: any): IAicrewContainerDispatchProps => {
    return {
        onAircrewClick: (aircrew: IAircrew) => (e: any) => {
            // dispatch(something(id)); not sure I'm going to need this. below is for test.
            alert(Object.keys(aircrew).map(key => `${key}: ${aircrew[key]}`).join('\r'));
        },
        onAircrewXClick: (id: string, snivs: ISnivs[]) => (e: any) => {
            dispatch(delAircrew(id));
            dispatch(setAircrewForm({ id: '' }));
            // clear snivs for the aircrew we're deleting
            snivs.forEach(sniv => {
                if (sniv.aircrewIds.indexOf(id) > -1) {
                    dispatch(delSniv(sniv.id, sniv.aircrewIds.length > 1 ? id : undefined));
                }
            });
            // clear and reset the schedConflict errors
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        onAircrewEditClick: (aircrew: IAircrew) => (e: any) => {
            dispatch(setAircrewForm({ existingAircrewUnchanged: true }));
            dispatch(setAircrewForm(aircrew));
            dispatch(addUpdateAircrewFormDisplay(true));
        },
        onSnivXClick: (snivId: string, aircrewId?: string) => (e: any) => {
            dispatch(delSniv(snivId, aircrewId));
            dispatch(setSnivForm({ snivId: '' }));
            // clear and reset the schedConflict errors
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        onSnivEditClick: createSelector(
            getAircrewById,
            (aircrewById: IEntity<IAircrew>['byId']) => (sniv: ISnivs) => (e: any) => {
            const snivedAircrewCallsigns = sniv.aircrewIds.reduce((resultString, currentAicrewId, currentIndex) => {
                const spaceOrNot = currentIndex === 0 ? '' : ', ';
                return `${resultString}${spaceOrNot}${aircrewById[currentAicrewId].callsign}`;
            }, '');
            dispatch(setSnivForm({
                snivId: sniv.id,
                aircrew: snivedAircrewCallsigns,
                aircrewRefIds: sniv.aircrewIds,
                start: sniv.start,
                end: sniv.end,
                message: sniv.message,
            }));
            dispatch(addUpdateSnivFormDisplay(true));
        }),
    };
};

const mergeProps = (
    stateProps: IAicrewContainerStateProps,
    dispatchProps: IAicrewContainerDispatchProps,
    ownProps: IAircrewContainerProps
) => {
    const { state, ...mergeStateProps } = stateProps;
    return {
        ...mergeStateProps,
        ...dispatchProps,
        onSnivEditClick: dispatchProps.onSnivEditClick(state),
    };
};

const AircrewContainer = connect(
    mapStateToProps,
    mapDispatchToProps,
    mergeProps
)(Aircrew);

export default AircrewContainer;
