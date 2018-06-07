import { connect } from 'react-redux';
import AddSnivForm from '../components/AddSnivForm';
import * as Moment from 'moment';
import { IState, IAddUpdateSnivFormValues } from '../types/State';
import { actions, IAddUpdateSnivArgs } from '../actions';
const { setSnivForm, addUpdateSniv } = actions;

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
                return currentDate.isSameOrBefore(referenceDate);
            }
            return currentDate.isSameOrAfter(referenceDate);
        },
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSnivSubmit: (sniv: IAddUpdateSnivArgs) => (e: any) => {
            e.preventDefault();
            if (sniv.start === '' || sniv.end === '') {
                return;
            }
            console.log(sniv);
            dispatch(addUpdateSniv({
                snivId: sniv.snivId,
                aircrewIds: sniv.aircrewIds,
                start: sniv.start,
                end: sniv.end,
                message: sniv.message,
            }));
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
