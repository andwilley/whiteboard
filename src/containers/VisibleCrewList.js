import { connect } from 'react-redux'
import { addAircrew } from '../actions/index'
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
    onAircrewClick: id => {
      // dispatch(something(id));
      alert(id);
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