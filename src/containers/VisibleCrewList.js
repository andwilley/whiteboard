import { connect } from 'react-redux'
import { addUpdateAircrew,
				 delAircrew,
				 addUpdateAircrewFormInputChange,
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

const getAircrewList = (state) => {
  return state.allAircrew.map( aircrew => state.aircrewById[aircrew]);
};

const getAddUpdateAircrewFormValues = (state) => {
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
    			dispatch(addUpdateAircrewFormInputChange(name, value));
    			break;
    	}
    	dispatch(addUpdateAircrewFormInputChange("existingAircrewUnchanged",false));
    },
    onAddAircrewFormButtonClick: () => {
    	dispatch(addUpdateAircrewFormInputChange("display", true));
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