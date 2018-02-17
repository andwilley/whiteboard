import { connect } from 'react-redux'
import { addAircrew, delAircrew } from '../actions/index'
import CrewList from '../components/CrewList'

const getAircrewList = (aircrewById, allAircrew) => {
  return allAircrew.map( aircrew => aircrewById[aircrew]);
};

const mapStateToProps = state => {
  return {
    aircrewList: getAircrewList(state.aircrewById, state.allAircrew),
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
    onAddButtonSubmit: input => {
    	dispatch(addAircrew(input));
    },
  };
};

const VisibleCrewList = connect(
  mapStateToProps,
  mapDispatchToProps
)(CrewList)

export default VisibleCrewList