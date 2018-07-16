import * as Moment from 'moment';
import { connect } from 'react-redux';
import AddSnivForm from '../components/AddSnivForm';
import { blankSnivForm, snivTimeTypes } from '../whiteboard-constants';
import { IErrors, IState, IAddUpdateSnivFormValues } from '../types/State';
import { errorTypes, errorLocs, errorLevels, errorMessages } from '../errors';
import { actions, IAddUpdateSnivArgs, IAddErrorArgs } from '../actions';
import { setErrorsOnFreshState } from './FlexInputContainer';
import { RGX_24HOUR_TIME } from '../util/regEx';
import { conv24HrTimeToMoment } from '../types/utilFunctions';
const { setSnivForm, addUpdateSniv, addUpdateSnivFormDisplay, addError } = actions;

const getAddUpdateSnivFormValues = (state: IState): IAddUpdateSnivFormValues => {
    return state.addUpdateSnivFormValues;
};

const getAddUpdateSnivFormDisplay = (state: IState): boolean => {
    return state.crewListUI.addUpdateSnivFormDisplay;
};

const snivTimesAreInOrder = (startTime: Moment.Moment | string, endTime: Moment.Moment | string): boolean => {
    if (typeof startTime === 'string' || typeof endTime === 'string') {
        return false;
    }
    return endTime.isSameOrAfter(startTime);
};

const getSnivOrderError = (snivTimeType: 'start' | 'end'): IAddErrorArgs => {
    return {
        // dayId doesn't apply to the sniv form
        dayId: '',
        type: errorTypes.TIME_ORDER,
        location: errorLocs.SNIV_FORM,
        // locationId doesn't apply to the sniv form
        locationId: '',
        level: errorLevels.CAUT,
        message: errorMessages.TIME_ORDER,
        meta: {
            timeType: snivTimeType === 'start' ? snivTimeTypes.SNIV_START : snivTimeTypes.SNIV_END,
        },
    };
};

const getSnivFormErrors = (state: IState): IErrors[] => {
    return state.errors.activeIds.filter(errorId => {
        return state.errors.byId[errorId].location === errorLocs.SNIV_FORM;
    }).map(errorId => state.errors.byId[errorId]);
};

const clearSnivFormErrors = (errors: IErrors[], dispatch: any) => {
    errors.forEach(error => {
        if (error.type === errorTypes.TIME_ORDER) {
            dispatch(actions.clearError(error.id, ''));
        }
    });
};

const mapStateToProps = (state: IState) => {
    return {
        formValues: getAddUpdateSnivFormValues(state),
        addUpdateSnivFormDisplay: getAddUpdateSnivFormDisplay(state),
        errors: getSnivFormErrors(state),
        dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                           referenceDate: Moment.Moment | '') => (currentDate: Moment.Moment,
                                                                  selectedDate: Moment.Moment): boolean => {
            if (referenceDate === '') {
                return true;
            }
            if (beforeOrAfter === 'before') {
                return currentDate.isSameOrBefore(referenceDate, 'day');
            }
            return currentDate.isSameOrAfter(referenceDate, 'day');
        },
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onSnivSubmit: (sniv: IAddUpdateSnivArgs) => (e: any) => {
            e.preventDefault();
            if ((typeof sniv.start === 'string' && !RGX_24HOUR_TIME.test(sniv.start)) ||
                (typeof sniv.end === 'string' && !RGX_24HOUR_TIME.test(sniv.end)) ||
                sniv.aircrewIds.length === 0 ||
                (typeof sniv.start !== 'string' && sniv.start.isAfter(sniv.end))) {
                return;
            }
            dispatch(addUpdateSniv({
                snivId: sniv.snivId,
                aircrewIds: sniv.aircrewIds,
                start: sniv.start,
                end: sniv.end,
                message: sniv.message,
            }));
            dispatch(setSnivForm(blankSnivForm));
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
        onAircrewInputChange: (input: string) => {
            dispatch(setSnivForm({aircrew: input}));
        },
        onTimeInputChange: (startOrEnd: 'start' | 'end',
                            compTime: Moment.Moment | string,
                            errors: IErrors[]
        ) => (refTime: Moment.Moment | string) => {
            /**
             * @param {'start' | 'end'} startOrEnd label of the element calling the function
             * @param {Moment} compTime moment to compare this elements time to when this element changes
             * @param {Moment} refTime moment that has been updated in element calling the function
             * @return {void} just dispatches required actions.
             */
            if (typeof compTime === 'string' && RGX_24HOUR_TIME.test(compTime)) {
                compTime = conv24HrTimeToMoment(compTime, Moment().format('YYYY-MM-DD'));
            }
            if (typeof refTime === 'string' && RGX_24HOUR_TIME.test(refTime)) {
                refTime = conv24HrTimeToMoment(refTime, Moment().format('YYYY-MM-DD'));
            }
            const timesAreValid = Moment.isMoment(refTime) && Moment.isMoment(compTime);
            clearSnivFormErrors(errors, dispatch);
            switch (startOrEnd) {
                case 'start':
                    dispatch(setSnivForm({start: refTime}));
                    if (timesAreValid && !snivTimesAreInOrder(refTime, compTime)) {
                        dispatch(addError(getSnivOrderError('start')));
                    }
                    break;
                case 'end':
                    dispatch(setSnivForm({end: refTime}));
                    if (timesAreValid && !snivTimesAreInOrder(compTime, refTime)) {
                        dispatch(addError(getSnivOrderError('end')));
                    }
                    break;
                default:
                    return;
            }
        },
        onInputChange: (e: any) => {
            dispatch(setSnivForm({[e.target.name]: e.target.value}));
        },
        onSnivFormAddButtonClick: () => {
            dispatch(addUpdateSnivFormDisplay(true));
        },
        onSnivFormDelButtonClick: () => {
            dispatch(setSnivForm(blankSnivForm));
            dispatch(addUpdateSnivFormDisplay(false));
        },
    };
};

const AddSnivFormContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddSnivForm);

export default AddSnivFormContainer;
