import { connect } from 'react-redux'
import { addUpdateAircrew,
				 delAircrew,
				 addUpdateAircrewFormAddQual,
				 addUpdateAircrewFormDelQual,
				 setAircrewForm} from '../actions/index'
import CrewList from '../components/CrewList'

const blankForm = {
	id: "",
	callsign: "",
	first: "",
	last: "",
	rank: 0,
	seat: "pilot",
	quals: [],
	existingAircrewUnchanged: false,
	display: false,
};

const getDayPucks = (state) => {
	let crewId, eventType;
	let newPuck = {
		flight: 0,
		sim: 0,
		flightNote: 0
	};
	let pucks = {};
	const aircrewCurrentDayPucks = state.daysById[state.crewList.currentDay].flights
		.reduce((flightPucks,flightId) => {
			eventType = state.flightsById[flightId].sim ? "sim" : "flight";
			pucks = state.flightsById[flightId].sorties
				.reduce((sortiePucks, sortieId) => {
					crewId = state.sortiesById[sortieId].front.crewId;
					sortiePucks[crewId] = sortiePucks[crewId] ? 
						{
							...sortiePucks[crewId],
							[eventType]: sortiePucks[crewId][eventType] + 1,
						} :
						{
							...newPuck,
							[eventType]: 1,
						};
					crewId = state.sortiesById[sortieId].back.crewId;
					sortiePucks[crewId] = sortiePucks[crewId] ? 
						{
							...sortiePucks[crewId],
							[eventType]: sortiePucks[crewId][eventType] + 1,
						} :
						{
							...newPuck,
							[eventType]: 1,
						};
					return sortiePucks;
				},{});
			state.flightsById[flightId].notes.forEach(noteId => {
				state.notesById[noteId].aircrewRefIds.forEach(id => {
					pucks[id] = pucks[id] ?
						{
							...pucks[id],
							flightNote: pucks[id].flightNote + 1,
						} :
						{
							...newPuck,
							flightNote: 1,
						};
				});
			});
			Object.keys(pucks).forEach(key => {
				flightPucks[key] = flightPucks[key] ? 
					{
						flight: flightPucks[key].flight + pucks[key].flight,
						sim: flightPucks[key].sim + pucks[key].sim,
						flightNote: flightPucks[key].flightNote + pucks[key].flightNote,
					} :
					{
						...pucks[key],
					};
			});
			return flightPucks;
		},{});
	const aircrewDayNotePucks = state.daysById[state.crewList.currentDay].notes
		.reduce((dayNotePucks, noteId) => {
			state.notesById[noteId].aircrewRefIds.forEach(id => {
				dayNotePucks[id] = dayNotePucks[id] ? dayNotePucks[id] + 1 : 1;
			});
			return dayNotePucks;
		},{});
	// merge aircrewDayNotePucks with aircrewCurrentDayPucks. The keys won't necessarily be the same.
	return aircrewCurrentDayPucks;
};

const getAircrewList = state => {
  const aircrewDayPucks = getDayPucks(state);
  return state.allAircrew.map( aircrewId => {
  	const aircrewWithPucks = Object.assign({},state.aircrewById[aircrewId]);
  	aircrewWithPucks["pucks"] = aircrewDayPucks[aircrewId] ? aircrewDayPucks[aircrewId] : {flight: 0, sim: 0, flightNote: 0};
  	return aircrewWithPucks;
  });
};

const getAddUpdateAircrewFormValues = state => {
	return state.addUpdateAircrewFormValues;
};

const mapStateToProps = state => {
  return {
    aircrewList: getAircrewList(state),
    // need something to validate unique callsigns from server.
    addUpdateAircrewFormValues: getAddUpdateAircrewFormValues(state),
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
    onAddUpdateAircrewSubmit: aircrew => {
      if (aircrew.callsign === "") {
          return;
      }
    	if (!aircrew.existingAircrewUnchanged) {
    		dispatch(addUpdateAircrew(aircrew));
    	}
    	dispatch(setAircrewForm(blankForm));
    },
    // need async action to validate unique callsign on server.
    onInputChange: event => {
    	const target = event.target;
    	const name = target.name;
    	let value;
    	switch (name) {
    		case "quals":
    			value = target.value;
    			dispatch(target.checked ? addUpdateAircrewFormAddQual(value) : addUpdateAircrewFormDelQual(value));
    			break;
    		default:
    			value = target.value;
    			dispatch(setAircrewForm({[name]: value}));
    			break;
    	}
    	dispatch(setAircrewForm({"existingAircrewUnchanged":false}));
    },
    onAddAircrewFormButtonClick: () => {
    	dispatch(setAircrewForm({"display": true}));
    },
    onDelAircrewFormButtonClick: () => {
    	dispatch(setAircrewForm(blankForm));
    },
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrewList);

export default VisibleCrewList;