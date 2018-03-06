import { connect } from 'react-redux';
import { blankAddUpdateAircrewForm } from '../whiteboard-constants';
import actions, { delAircrew,
         setAircrewForm } from '../actions';
import CrewList from '../components/CrewList';

const getDayPucks = (state: any) => {
  let crewId: number, eventType: string;
  const seats = ['front', 'back'];
  const newPuck = {
    flight: 0,
    sim: 0,
    flightNote: 0,
    dayNote: 0,
  };
  const aircrewCurrentDayPucks = state.daysById[state.crewList.currentDay].flights
    .reduce((flightPucks: any, flightId: number) => {
      eventType = state.flightsById[flightId].sim ? 'sim' : 'flight';
      state.flightsById[flightId].sorties.forEach((sortieId: number) => {
        seats.forEach(seat => {
          crewId = state.sortiesById[sortieId][seat].crewId;
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
      });
      state.flightsById[flightId].notes.forEach((noteId: number) => {
        state.notesById[noteId].aircrewRefIds.forEach((id: number) => {
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
  state.daysById[state.crewList.currentDay].notes.forEach((noteId: number) => {
    state.notesById[noteId].aircrewRefIds.forEach((aircrewId: number) => {
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

const getAircrewList = (state: any) => {
  const aircrewDayPucks = getDayPucks(state);
  return state.allAircrew.map( (aircrewId: number) => {
    const aircrewWithPucks = Object.assign({}, state.aircrewById[aircrewId]);
    aircrewWithPucks.pucks = aircrewDayPucks[aircrewId] ?
      Object.assign({}, aircrewDayPucks[aircrewId]) :
      {flight: 0, sim: 0, flightNote: 0, dayNote: 0};
    return aircrewWithPucks;
  });
};

const getAddUpdateAircrewFormDisplay = (state: any) => {
  return state.addUpdateAircrewFormValues.display;
};

const mapStateToProps = (state: any) => {
  return {
    aircrewList: getAircrewList(state),
    addUpdateAircrewFormDisplay: getAddUpdateAircrewFormDisplay(state),
    // need something to validate unique callsigns from server async.
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAircrewClick: (aircrew: any) => {
      // dispatch(something(id)); not sure I'm going to need this. below is for test.
      alert(Object.keys(aircrew).map(key => `${key}: ${aircrew[key]}`).join('\r'));
    },
    onXClick: (id: number) => {
      dispatch(delAircrew(id));
    },
    onEditClick: (aircrew: any) => {
      aircrew.existingAircrewUnchanged = true;
      aircrew.display = true;
      dispatch(setAircrewForm(aircrew));
    },
    onAddAircrewFormButtonClick: () => {
      dispatch(setAircrewForm({display: true}));
    },
    onDelAircrewFormButtonClick: () => {
      dispatch(setAircrewForm(blankAddUpdateAircrewForm));
    },
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrewList);

export default VisibleCrewList;
