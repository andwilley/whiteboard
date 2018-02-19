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
	let crewId;
	let pucks = {};
	const aircrewPucks = state.daysById[state.crewList.currentDay].flights
		.reduce((flightPucks,flightId) => {
			pucks = state.flightsById[flightId].sorties
				.reduce((sortiePucks, sortieId) => {
					crewId = state.sortiesById[sortieId].front.crewId;
					sortiePucks[crewId] = sortiePucks[crewId] ? sortiePucks[crewId] + 1 : 1;
					crewId = state.sortiesById[sortieId].back.crewId;
					sortiePucks[crewId] = sortiePucks[crewId] ? sortiePucks[crewId] + 1 : 1;
					return sortiePucks;
				},{});
			Object.keys(pucks).map(key => {
				flightPucks[key] = flightPucks[key] ? flightPucks[key] + pucks[key] : pucks[key];
			});
			return flightPucks;
		},{});
	return aircrewPucks;
};

const getAircrewList = state => {
  return state.allAircrew.map( aircrewId => {
  	// this is not efficient. calc this outside of the aircrew loop. its going through each sortie as many times as there are aircrew.
  	// const aircrewPucks = state.daysById[state.crewList.currentDay].flights
  	// 	.reduce((flightPucks,flightId) => {
  	// 		flightPucks += state.flightsById[flightId].sorties
  	// 			.reduce((sortiePucks, sortieId) => {
  	// 				if (state.sortiesById[sortieId].front.crewId === aircrewId ||
  	// 					state.sortiesById[sortieId].back.crewId === aircrewId) {
  	// 					sortiePucks++;
  	// 				}
  	// 				return sortiePucks;
  	// 			},0);
  	// 		return flightPucks;
  	// 	},0);
  	const aircrewPucks = getDayPucks(state);
  	const aircrewWithPucks = state.aircrewById[aircrewId];
  	aircrewWithPucks["pucks"] = aircrewPucks[aircrewId] ? aircrewPucks[aircrewId] : 0;
  	return aircrewWithPucks;
  });
};

const getAddUpdateAircrewFormValues = state => {
	return state.addUpdateAircrewFormValues;
};

const mapStateToProps = state => {
  return {
    aircrewList: getAircrewList(state),
    addUpdateAircrewFormValues: getAddUpdateAircrewFormValues(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAircrewClick: aircrew => {
      // dispatch(something(id));
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