import { connect } from 'react-redux';
import AddUpdateAircrewForm from '../components/AddUpdateAircrewForm';
import { blankAddUpdateAircrewForm } from '../whiteboard-constants';
import { addUpdateAircrew,
         addUpdateAircrewFormAddQual,
         addUpdateAircrewFormDelQual,
         setAircrewForm } from '../actions/index';

const getAddUpdateAircrewFormValues = (state: any) => {
  return state.addUpdateAircrewFormValues;
};

const mapStateToProps = (state: any) => {
  return {
    // need something to validate unique callsigns from server.
    addUpdateAircrewFormValues: getAddUpdateAircrewFormValues(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddUpdateAircrewSubmit: (aircrew: any) => {
      if (aircrew.callsign === '') {
          return;
      }
      if (!aircrew.existingAircrewUnchanged) {
        dispatch(addUpdateAircrew(aircrew));
      }
      dispatch(setAircrewForm(blankAddUpdateAircrewForm));
    },
    // need async action to validate unique callsign on server.
    onInputChange: (event: any) => {
      const target = event.target;
      const name = target.name;
      let value;
      switch (name) {
        case 'quals':
          value = target.value;
          dispatch(target.checked ? addUpdateAircrewFormAddQual(value) : addUpdateAircrewFormDelQual(value));
          break;
        default:
          value = target.value;
          dispatch(setAircrewForm({[name]: value}));
          break;
      }
      dispatch(setAircrewForm({existingAircrewUnchanged : false}));
    },
  };
};

const AddUpdateAircrewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdateAircrewForm);

export default AddUpdateAircrewFormContainer;
