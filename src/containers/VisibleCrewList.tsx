import { connect } from 'react-redux';
import CrewList from '../components/CrewList';
import * as Moment from 'moment';
import { getErrors } from '../reducers/errorReducer';
import { getAircrewById } from '../reducers/aircrewReducer';
import { getShowSnivs } from '../reducers/crewListUIReducer';
import { setErrorsOnFreshState, flightIsCrewHotPit } from '../containers/FlexInputContainer';
import { IEntity, IState, IAircrew, IFilters, ISnivs, IErrors, IEntityWithActive, ISettings } from '../types/State';
import { IAircrewWithPucks,
         IAircrewDayPucks,
         ISchedObject,
         IPucks,
         IActiveRefsAndBlock } from '../types/WhiteboardTypes';
import { actions } from '../actions';
import { errorTypes, errorLocs } from '../errors';
import getActiveAircrewRefs from '../util/getActiveAircrewRefs';
const { delAircrew,
        delSniv,
        setAircrewForm,
        setSnivForm,
        addUpdateAircrewFormDisplay,
        addUpdateSnivFormDisplay,
        } = actions;
type IAircrewEntity = IEntity<IAircrew>;

const newPuck: IPucks = {
  flight: 0,
  sim: 0,
  flightNote: 0,
  simNote: 0,
  dayNote: 0,
};

const getDayPucks = (schedBlocks: ISchedObject): IAircrewDayPucks => {
  const aircrewPucks: IAircrewDayPucks = {};
  Object.keys(schedBlocks).forEach(aircrewId => {
    aircrewPucks[aircrewId] = Object.assign({}, newPuck);
    schedBlocks[aircrewId].forEach(block => {
      switch (block.location) {
        case errorLocs.FLIGHT:
          aircrewPucks[aircrewId].flight++;
          break;
        case errorLocs.FLIGHT_NOTE:
          aircrewPucks[aircrewId].flightNote++;
          break;
        case errorLocs.SIM:
          aircrewPucks[aircrewId].sim++;
          break;
        case errorLocs.SIM_NOTE:
          aircrewPucks[aircrewId].simNote++;
          break;
        case errorLocs.DAY_NOTE:
          aircrewPucks[aircrewId].dayNote++;
          break;
        default:
          break;
      }
    });
  });
  return aircrewPucks;
};

const getFilteredAircrewIds = (
  aircrew: IAircrewEntity,
  filters: IFilters,
  unavailableAircrewIds: string[],
  aircrewDayPucks: IAircrewDayPucks
): string[] => {
  // slices of the state this needs for future optimization reference:
  // state.aircrew
  // state.crewListUI.filters
  const filteredAircrewIds = aircrew.allIds.filter((aircrewId: string) => {
    if (filters.qualFilter.length === 0 &&
        filters.rankFilter.length === 0 &&
        filters.crewSearchInput === '' &&
        filters.showAvailable === false) {
        return true;
    }
    /** filter out aircrew without selected quals */
    if (filters.qualFilter.length > 0) {
        let allQualsMatch = true;
        filters.qualFilter.forEach((qual: string) => {
            if (aircrew.byId[aircrewId].quals.indexOf(qual) === -1) {
                allQualsMatch = false;
            }
        });
        if (!allQualsMatch) {
            return false;
        }
    }
    /** filter out aircrew that aren't the selected rank */
    if (filters.rankFilter.length > 0) {
      let matchRank = false;
      filters.rankFilter.forEach((rank: number) => {
        if (aircrew.byId[aircrewId].rank === rank) {
          matchRank = true;
        }
      });
      if (!matchRank) {
        return false;
      }
    }
    /** filter based on the search bar input for the crew list */
    const crewSearchInput = filters.crewSearchInput.toLowerCase();
    if (crewSearchInput !== '') {
      const callsign = aircrew.byId[aircrewId].callsign.toLowerCase();
      const first = aircrew.byId[aircrewId].first.toLowerCase();
      const last = aircrew.byId[aircrewId].last.toLowerCase();
      const searchMatch = callsign.includes(crewSearchInput) ||
                          first.includes(crewSearchInput) ||
                          `${first} ${last}`.includes(crewSearchInput) ||
                          `${last} ${first}`.includes(crewSearchInput) ||
                          `${last}, ${first}`.includes(crewSearchInput);
      if (!searchMatch) {
        return false;
      }
    }
    /** return false for any aircrew that cannot fill the selected spot */
    if (filters.showAvailable) {
      if (unavailableAircrewIds.indexOf(aircrewId) > -1) {
        return false;
      }
    }
    /** return false for any aircrew that are scheduled (other than a sniv) */
    // if (filters.showUnscheduled && aircrewDayPucks[aircrewId]) {
    //   for (const key of Object.keys(aircrewDayPucks[aircrewId])) {
    //     if (aircrewDayPucks[aircrewId][key] > 0) {
    //       return false;
    //     }
    //   }
    // }
    return true;
  });
  return filteredAircrewIds;
};

const getAircrewList = (
  activeAircrewRefs: ISchedObject,
  aircrew: IEntity<IAircrew>,
  unavailableAircrewIds: string[],
  filters: IFilters
): IAircrewWithPucks[] => {
  // slices of the state this needs for future optimization reference:
  // state.aircrew
  // state.crewListUI.filters
  // anything getDayPucks needs (see above)
  const aircrewDayPucks = getDayPucks(activeAircrewRefs);
  const filteredAircrewIds = getFilteredAircrewIds(aircrew, filters, unavailableAircrewIds, aircrewDayPucks);
  return filteredAircrewIds.map((aircrewId): IAircrewWithPucks => {
    const aircrewWithPucks: IAircrewWithPucks = Object.assign({},
                                                              aircrew.byId[aircrewId],
                                                              {pucks: Object.assign({}, newPuck)});
    aircrewWithPucks.pucks = aircrewDayPucks[aircrewId] ?
      Object.assign({}, aircrewDayPucks[aircrewId]) :
      Object.assign({}, newPuck);
    return aircrewWithPucks;
  });
};

const getCrewDay = (activeAircrewRefs: ISchedObject): {[key: string]: {workDay: string, legalCrewDay: string}} => {
  const crewDays = {};
  Object.keys(activeAircrewRefs).forEach(aircrewId => {
    crewDays[aircrewId] = activeAircrewRefs[aircrewId]
      .reduce((acc: {start: Moment.Moment, end: Moment.Moment}, block) => {
        // get the total expected work day, as well as legal crew day.
      }, {start: Moment(NaN), end: Moment(NaN)});
  });
};

const getUnavailableAircrewIds = (activeRefsAndBlock: IActiveRefsAndBlock,
                                  aircrewIds: string[],
                                  settings: ISettings): string[] => {
  const unavailableAircrewIds: string[] = [];
  const timeBlock = activeRefsAndBlock.activeTimeblock;
  Object.keys(activeRefsAndBlock.activeAircrewRefs).forEach(aircrewId => {
    if (aircrewIds.indexOf(aircrewId) > -1 && timeBlock) {
      activeRefsAndBlock.activeAircrewRefs[aircrewId]
        .forEach(block => {
          /**
           * This logic is duplicated from FlexInputContainer findSchedErrors() ***!
           * Assumes start and end are actually in order ***!
           */
          if (flightIsCrewHotPit(block, timeBlock, settings)) {
            return;
          } else if (block.start >= timeBlock.start && block.start <= timeBlock.end) {
            unavailableAircrewIds.push(aircrewId);
          } else if (block.end >= timeBlock.start && block.end <= timeBlock.end) {
            unavailableAircrewIds.push(aircrewId);
          } else if (timeBlock.start >= block.start && timeBlock.start <= block.end) {
            unavailableAircrewIds.push(aircrewId);
          }
        });
    }
  });
  return unavailableAircrewIds;
};

const getDaySnivs = (state: IState): ISnivs[] => {
  return state.snivs.allIds.reduce((filteredIds: ISnivs[], currId) => {
    if (state.snivs.byId[currId].dates[state.crewListUI.currentDay]) {
      filteredIds = filteredIds.concat(state.snivs.byId[currId]);
    }
    return filteredIds;
  }, []);
};

const getDayId = (state: IState): string => {
  return state.crewListUI.currentDay;
};

// const clearSchedErrors = (errors: IEntityWithActive<IErrors>, aircrewId: string): void => {
  /**
   * clear any errors referencing delete aircrew or deleted snivs.
   */
// };

interface IVisibleCrewListStateProps {
  aircrewById: {[key: string]: IAircrew};
  errors: IEntityWithActive<IErrors>;

  aircrewList: IAircrewWithPucks[];
  unavailableAircrewIds: string[];
  daySnivs: ISnivs[];
  showSnivs: boolean;
  dayId: string;
}

const mapStateToProps = (state: IState): IVisibleCrewListStateProps => {
  const activeRefsAndBlock = getActiveAircrewRefs(
    state.days.byId[state.crewListUI.currentDay],
    state.editor.elementBeingEdited,
    state.settings,
    state.flights.byId,
    state.sorties.byId,
    state.notes.byId,
    state.snivs
  );
  const unavailableAircrewIds = getUnavailableAircrewIds(activeRefsAndBlock, state.aircrew.allIds, state.settings);
  const aircrewList = getAircrewList(
    activeRefsAndBlock.activeAircrewRefs,
    state.aircrew,
    unavailableAircrewIds,
    state.crewListUI.filters
  );
  return {
    aircrewById: getAircrewById(state),
    errors: getErrors(state),

    aircrewList,
    unavailableAircrewIds,
    daySnivs: getDaySnivs(state),
    showSnivs: getShowSnivs(state),
    dayId: getDayId(state),
  };
};

const mergeProps = (stateProps: IVisibleCrewListStateProps, dispatchProps: any) => {
  const { dispatch } = dispatchProps;
  return {
    aircrewList: stateProps.aircrewList,
    unavailableAircrewIds: stateProps.unavailableAircrewIds,
    daySnivs: stateProps.daySnivs,
    showSnivs: stateProps.showSnivs,
    dayId: stateProps.dayId,
    onAircrewClick: (aircrew: IAircrewWithPucks) => {
      // dispatch(something(id)); not sure I'm going to need this. below is for test.
      alert(Object.keys(aircrew).map(key => `${key}: ${aircrew[key]}`).join('\r'));
    },
    onAircrewXClick: (id: string) => {
      dispatch(delAircrew(id));
      dispatch(setAircrewForm({id: ''}));
      // clear snivs for the aircrew we're deleting
      stateProps.daySnivs.forEach(sniv => {
        if (sniv.aircrewIds.indexOf(id) > -1) {
            dispatch(delSniv(sniv.id, sniv.aircrewIds.length > 1 ? id : undefined));
        }
      });
      // clear and reset the schedConflict errors
      dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
    },
    onAircrewEditClick: (aircrew: IAircrewWithPucks) => {
      dispatch(setAircrewForm({existingAircrewUnchanged: true}));
      dispatch(setAircrewForm(aircrew));
      dispatch(addUpdateAircrewFormDisplay(true));
    },
    onSnivXClick: (snivId: string, aircrewId?: string) => (e: any) => {
      dispatch(delSniv(snivId, aircrewId));
      dispatch(setSnivForm({snivId: ''}));
      // clear and reset the schedConflict errors
      dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
    },
    onSnivEditClick: (sniv: ISnivs) => (e: any) => {
      const snivedAircrewCallsigns = sniv.aircrewIds.reduce((resultString, currentAicrewId, currentIndex) => {
        const spaceOrNot = currentIndex === 0 ? '' : ', ';
        return `${resultString}${spaceOrNot}${stateProps.aircrewById[currentAicrewId].callsign}`;
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
    },
    // need something to validate unique callsigns from server async.
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  ((dispatch: any) => { return { dispatch: dispatch }; }),
  mergeProps
)(CrewList);

export default VisibleCrewList;
