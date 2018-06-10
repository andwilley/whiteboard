import { connect } from 'react-redux';
import CrewList from '../components/CrewList';
import { seats } from '../whiteboard-constants';
import { actions, IAddUpdateSnivArgs } from '../actions';
import { getShowSnivs } from '../reducers/crewListUIReducer';
import { IEntity, IState, IAircrew, IFilters, ISnivs } from '../types/State';
import { IAircrewWithPucks, IAircrewDayPucks } from '../types/WhiteboardTypes';
const { delAircrew, delSniv, setAircrewForm, setSnivForm, addUpdateAircrewFormDisplay } = actions;
type IAircrewEntity = IEntity<IAircrew>;

const newPuck = {
  flight: 0,
  sim: 0,
  flightNote: 0,
  dayNote: 0,
};

const getDayPucks = (state: IState): IAircrewDayPucks => {
  // slices of the state this needs for future optimization reference:
  // state.days.byId[~currentDay]:
  //    state.days.byId[~currentDay].flights
  //    state.days.byId[~currentDay].notes
  // state.flights.byId
  // state.notes.byId
  let crewIds: string[], eventType: string;
  const aircrewCurrentDayPucks = state.days.byId[state.crewListUI.currentDay].flights
    .reduce((flightPucks: IAircrewDayPucks, flightId: string) => {
      eventType = state.flights.byId[flightId].sim ? 'sim' : 'flight';
      state.flights.byId[flightId].sorties.forEach((sortieId: string) => {
        seats.forEach(seat => {
          crewIds = state.sorties.byId[sortieId][seat].aircrewRefIds;
          if (crewIds.length > 0) {
            crewIds.forEach(crewId => {
              flightPucks[crewId] = flightPucks[crewId] ?
                {
                  ...flightPucks[crewId],
                  [eventType]: flightPucks[crewId][eventType] + 1,
                } :
                {
                  ...newPuck,
                  [eventType]: 1,
                };
            });
          }
        });
      });
      state.flights.byId[flightId].notes.forEach((noteId: string) => {
        state.notes.byId[noteId].aircrewRefIds.forEach((id: string) => {
          flightPucks[id] = flightPucks[id] ?
            {
              ...flightPucks[id],
              flightNote: flightPucks[id].flightNote + 1,
            } :
            {
              ...newPuck,
              flightNote: 1,
            };
        });
      });
      return flightPucks;
    },
            {});
  state.days.byId[state.crewListUI.currentDay].notes.forEach((noteId: string) => {
    state.notes.byId[noteId].aircrewRefIds.forEach((aircrewId: string) => {
      aircrewCurrentDayPucks[aircrewId] = aircrewCurrentDayPucks[aircrewId] ?
        {
          ...aircrewCurrentDayPucks[aircrewId],
          dayNote: aircrewCurrentDayPucks[aircrewId].dayNote + 1,
        } :
        {
          ...newPuck,
          dayNote: 1,
        };
    });
  });
  return aircrewCurrentDayPucks;
};

const getFilteredAircrewIds = (aircrew: IAircrewEntity,
                               filters: IFilters,
                               aircrewDayPucks: IAircrewDayPucks): string[] => {
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
    if (filters.showAvailable) {
      if (Object.keys(aircrewDayPucks).indexOf(aircrewId) > -1) {
        return false;
      }
    }
    return true;
  });
  return filteredAircrewIds;
};

const getAircrewList = (state: IState): IAircrewWithPucks[] => {
  // slices of the state this needs for future optimization reference:
  // state.aircrew
  // state.crewListUI.filters
  // anything getDayPucks needs (see above)
  const aircrewDayPucks = getDayPucks(state);
  const filteredAircrewIds = getFilteredAircrewIds(state.aircrew, state.crewListUI.filters, aircrewDayPucks);
  return filteredAircrewIds.map( (aircrewId: string): IAircrewWithPucks => {
    const aircrewWithPucks: IAircrewWithPucks = Object.assign({}, state.aircrew.byId[aircrewId], {pucks: newPuck});
    aircrewWithPucks.pucks = aircrewDayPucks[aircrewId] ?
      Object.assign({}, aircrewDayPucks[aircrewId]) :
      newPuck;
    return aircrewWithPucks;
  });
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

const mapStateToProps = (state: IState) => {
  return {
    aircrewList: getAircrewList(state),
    daySnivs: getDaySnivs(state),
    showSnivs: getShowSnivs(state),
    dayId: getDayId(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAircrewClick: (aircrew: IAircrewWithPucks) => {
      // dispatch(something(id)); not sure I'm going to need this. below is for test.
      alert(Object.keys(aircrew).map(key => `${key}: ${aircrew[key]}`).join('\r'));
    },
    onAircrewXClick: (id: string) => {
      dispatch(delAircrew(id));
      dispatch(setAircrewForm({id: ''}));
    },
    onAircrewEditClick: (aircrew: IAircrewWithPucks) => {
      dispatch(setAircrewForm({existingAircrewUnchanged: true}));
      dispatch(setAircrewForm(aircrew));
      dispatch(addUpdateAircrewFormDisplay(true));
    },
    onSnivXClick: (snivId: string, aircrewId?: string) => (e: any) => {
      dispatch(delSniv(snivId, aircrewId));
      dispatch(setSnivForm({snivId: ''}));
    },
    onSnivEditClick: (sniv: IAddUpdateSnivArgs) => (e: any) => {
      dispatch(setSnivForm(sniv));
      dispatch(addUpdateAircrewFormDisplay(true));
    },
    // need something to validate unique callsigns from server async.
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrewList);

export default VisibleCrewList;
