import { connect } from 'react-redux'
import { addUpdateAircrew,
				 delAircrew,
				 addUpdateAircrewFormInputChange,
				 addUpdateAircrewFormAddQual,
				 addUpdateAircrewFormDelQual,
				 setAircrewForm} from '../actions/index'
import CrewList from '../components/CrewList'

const getAircrewList = (state) => {
  return state.allAircrew.map( aircrew => state.aircrewById[aircrew]);
};

const getAircrewFormValues = (state) => {
	return state.aircrewFormValues;
};

const mapStateToProps = state => {
  return {
    aircrewList: getAircrewList(state),
    aircrewFormValues: getAircrewFormValues(state),
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
    	dispatch(setAircrewForm(aircrew));
    },
    onAddUpdateAircrewSubmit: aircrew => {
    	dispatch(addUpdateAircrew(aircrew));
    	dispatch(setAircrewForm({
    		id: "",
				callsign: "",
				first: "",
				last: "",
				rank: 0,
				seat: "pilot",
				quals: [],
    	}))
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
    },
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrewList);

export default VisibleCrewList;