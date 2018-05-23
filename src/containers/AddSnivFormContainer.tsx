import { connect } from 'react-redux';
import { IState, IAddSnivFormValues } from '../types/State';
import AddSnivForm from '../components/AddSnivForm';

const getAddSnivFormValues = (state: IState): IAddSnivFormValues => {
    return state.addSnivFormValues;
};

const mapStateToProps = (state: IState) => {
    return {
        formValues: getAddSnivFormValues(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSubmit: () => {
            dispatch();
        },
        onInputChange: () => {
            dispatch();
        },
        onAircrewInputChange: () => {
            dispatch();
        },
    };
};

const AddSnivFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSnivForm);

export default AddSnivFormContainer;
