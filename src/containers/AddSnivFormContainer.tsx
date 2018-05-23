import { connect } from 'react-redux';
import AddSnivForm from '../components/AddSnivForm';
import { IState, IAddUpdateSnivFormValues } from '../types/State';
import { actions } from '../actions';
const { setSnivForm } = actions;

const getAddUpdateSnivFormValues = (state: IState): IAddUpdateSnivFormValues => {
    return state.addUpdateSnivFormValues;
};

const mapStateToProps = (state: IState) => {
    return {
        formValues: getAddUpdateSnivFormValues(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: () => {
            dispatch({type: ''});
        },
        onAircrewInputChange: (input: string) => {
            dispatch(setSnivForm({aircrew: input}));
        },
        onInputChange: (e: any) => {
            dispatch(setSnivForm({[e.target.name]: e.target.value}));
        },
    };
};

const AddSnivFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSnivForm);

export default AddSnivFormContainer;
