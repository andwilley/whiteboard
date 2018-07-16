import { connect } from 'react-redux';
import AddUpdateAircrewForm from '../components/AddUpdateAircrewForm';
import { blankAddUpdateAircrewForm } from '../whiteboard-constants';
import { IState, IAddUpdateAircrewFormValues } from '../types/State';
import { actions } from '../actions';
const { addUpdateAircrew,
        addUpdateAircrewFormAddQual,
        addUpdateAircrewFormDelQual,
        setAircrewForm,
        addUpdateAircrewFormDisplay } = actions;

const getAddUpdateAircrewFormValues = (state: IState) => {
  return state.addUpdateAircrewFormValues;
};

const getQualsList = (state: IState): string[] => {
  return state.settings.qualsList;
};

const getAddUpdateAircrewFormDisplay = (state: IState): boolean => {
  return state.crewListUI.addUpdateAircrewFormDisplay;
};

const mapStateToProps = (state: IState) => {
  return {
    // need something to validate unique callsigns from server.
    addUpdateAircrewFormValues: getAddUpdateAircrewFormValues(state),
    qualsList: getQualsList(state),
    addUpdateAircrewFormDisplay: getAddUpdateAircrewFormDisplay(state),
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    onAddUpdateAircrewSubmit: (aircrew: IAddUpdateAircrewFormValues) => {
      if (aircrew.callsign === '') {
          return;
      }
      if (!aircrew.existingAircrewUnchanged) {
        dispatch(addUpdateAircrew(aircrew));
      }
      dispatch(setAircrewForm(blankAddUpdateAircrewForm));
      dispatch(addUpdateAircrewFormDisplay(false));
    },
    // need async action to validate unique callsign on server.
    onInputChange: (event: any) => {
      const target = event.target;
      const name: string = target.name;
      const value: string = target.value;
      dispatch(setAircrewForm({[name]: value}));
      dispatch(setAircrewForm({existingAircrewUnchanged: false}));
    },
    onToggleQual: (qual: string, selected: boolean) => (e: any) => {
      dispatch(selected ? addUpdateAircrewFormDelQual(qual) : addUpdateAircrewFormAddQual(qual));
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

const AddUpdateAircrewFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AddUpdateAircrewForm);

export default AddUpdateAircrewFormContainer;
