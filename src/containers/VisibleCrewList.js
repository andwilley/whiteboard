// @flow

import { connect } from 'react-redux';
import { blankAddUpdateAircrewForm } from '../whiteboard-constants';
import { delAircrew,
				 setAircrewForm} from '../actions/index';
import CrewList from '../components/CrewList';

const getDayPucks = (state) => {
	let crewId, eventType;
	const seats = ["front", "back"];
	let newPuck = {
		flight: 0,
		sim: 0,
		flightNote: 0,
		dayNote: 0,
	};
	const aircrewCurrentDayPucks = state.daysById[state.crewList.currentDay].flights
		.reduce((flightPucks,flightId) => {
			eventType = state.flightsById[flightId].sim ? "sim" : "flight";
			state.flightsById[flightId].sorties.forEach(sortieId => {
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
			state.flightsById[flightId].notes.forEach(noteId => {
				state.notesById[noteId].aircrewRefIds.forEach(id => {
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
	},{});
	state.daysById[state.crewList.currentDay].notes.forEach(noteId => {
		state.notesById[noteId].aircrewRefIds.forEach(aircrewId => {
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

const getAircrewList = state => {
  const aircrewDayPucks = getDayPucks(state);
  return state.allAircrew.map( aircrewId => {
  	const aircrewWithPucks = Object.assign({},state.aircrewById[aircrewId]);
  	aircrewWithPucks["pucks"] = aircrewDayPucks[aircrewId] ? Object.assign({},aircrewDayPucks[aircrewId]) : {flight: 0, sim: 0, flightNote: 0, dayNote: 0};
  	return aircrewWithPucks;
  });
};

const getAddUpdateAircrewFormDisplay = state => {
	return state.addUpdateAircrewFormValues.display;
};

const mapStateToProps = state => {
  return {
    aircrewList: getAircrewList(state),
    addUpdateAircrewFormDisplay: getAddUpdateAircrewFormDisplay(state),
    // need something to validate unique callsigns from server async.
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAircrewClick: aircrew => {
      // dispatch(something(id)); not sure I'm going to need this. below is for test.
      alert(Object.keys(aircrew).map(key => key + ": " + aircrew[key]).join("\r"));
    },
    onXClick: id => {
    	dispatch(delAircrew(id));
    },
    onEditClick: aircrew => {
    	aircrew["existingAircrewUnchanged"] = true;
    	aircrew["display"] = true;
    	dispatch(setAircrewForm(aircrew));
    },
    onAddAircrewFormButtonClick: () => {
    	dispatch(setAircrewForm({"display": true}));
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