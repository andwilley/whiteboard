import { connect } from 'react-redux';
import AddSnivForm from '../components/AddSnivForm';
import * as Moment from 'moment';
import { IState, IAddUpdateSnivFormValues } from '../types/State';
import { actions } from '../actions';
const { setSnivForm } = actions;

const getAddUpdateSnivFormValues = (state: IState): IAddUpdateSnivFormValues => {
    return state.addUpdateSnivFormValues;
};

const mapStateToProps = (state: IState) => {
    return {
        formValues: getAddUpdateSnivFormValues(state),
        dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                           referenceDate: Moment.Moment | '') => (currentDate: Moment.Moment,
                                                                  selectedDate: Moment.Moment): boolean => {
            if (referenceDate === '') {
                return true;
            }
            if (beforeOrAfter === 'before') {
                return currentDate.isBefore(referenceDate);
            }
            return currentDate.isAfter(referenceDate);
        },
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
        onStartChange: (startTime: Moment.Moment) => {
            if (Moment.isMoment(startTime)) {
                dispatch(setSnivForm({start: startTime}));
            }
        },
        onEndChange: (endTime: Moment.Moment) => {
            if (Moment.isMoment(endTime)) {
                dispatch(setSnivForm({end: endTime}));
            }
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
