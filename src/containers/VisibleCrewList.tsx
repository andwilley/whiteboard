import { connect } from 'react-redux';
import { blankAddUpdateAircrewForm } from '../whiteboard-constants';
import { actions } from '../actions';
import { IState, IAddUpdateAircrewFormValues } from '../reducers/State';
import CrewList from '../components/CrewList';
const { delAircrew, setAircrewForm, addUpdateAircrewFormDisplay } = actions;

const getDayPucks = (state: IState) => {
  let crewId: number, eventType: string;
  const seats = ['front', 'back'];
  const newPuck = {
    flight: 0,
    sim: 0,
    flightNote: 0,
    dayNote: 0,
  };
  const aircrewCurrentDayPucks = state.days.byId[state.crewListUI.currentDay].flights
    .reduce((flightPucks: any, flightId: string) => {
      eventType = state.flights.byId[flightId].sim ? 'sim' : 'flight';
      state.flights.byId[flightId].sorties.forEach((sortieId: string) => {
        seats.forEach(seat => {
          crewId = state.sorties.byId[sortieId][seat].crewId;
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

const getAircrewList = (state: IState) => {
  const aircrewDayPucks = getDayPucks(state);
  return state.aircrew.allIds.map( (aircrewId: string) => {
    const aircrewWithPucks = Object.assign({}, state.aircrew.byId[aircrewId]);
    aircrewWithPucks.pucks = aircrewDayPucks[aircrewId] ?
      Object.assign({}, aircrewDayPucks[aircrewId]) :
      {flight: 0, sim: 0, flightNote: 0, dayNote: 0};
    return aircrewWithPucks;
  });
};

const getAddUpdateAircrewFormDisplay = (state: IState) => {
  return state.crewListUI.addUpdateAircrewFormDisplay;
};

const mapStateToProps = (state: IState) => {
  return {
    aircrewList: getAircrewList(state),
    addUpdateAircrewFormDisplay: getAddUpdateAircrewFormDisplay(state),
    // need something to validate unique callsigns from server async.
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAircrewClick: (aircrew: IAddUpdateAircrewFormValues) => {
      // dispatch(something(id)); not sure I'm going to need this. below is for test.
      alert(Object.keys(aircrew).map(key => `${key}: ${aircrew[key]}`).join('\r'));
    },
    onXClick: (id: string) => {
      dispatch(delAircrew(id));
      dispatch(setAircrewForm({id: ''}));
    },
    onEditClick: (aircrew: IAddUpdateAircrewFormValues) => {
      aircrew.existingAircrewUnchanged = true;
      dispatch(setAircrewForm(aircrew));
      dispatch(addUpdateAircrewFormDisplay(true));
    },
    onAddAircrewFormButtonClick: () => {
      dispatch(addUpdateAircrewFormDisplay(true));
    },
    onDelAircrewFormButtonClick: () => {
      dispatch(setAircrewForm(blankAddUpdateAircrewForm));
      dispatch(addUpdateAircrewFormDisplay(false));
    },
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrewList);

export default VisibleCrewList;
