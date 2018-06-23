import * as React from 'react';
import * as Moment from 'moment';
import AddButton from './AddButton';
import DelButton from './DelButton';
import { errorLocs, errorTypes } from '../errors';
import * as Datetime from 'react-datetime';
import { getHighestErrorLevel } from '../errors';
import { editables, snivTimeTypes } from '../whiteboard-constants';
import { IAddUpdateSnivFormValues, IErrors } from '../types/State';
import FlexInputContainer from '../containers/FlexInputContainer';
import { IAddUpdateSnivArgs } from '../actions';

interface IAddSnivFormProps {
    formValues: IAddUpdateSnivFormValues;
    addUpdateSnivFormDisplay: boolean;
    errors: IErrors[];
    dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                       referenceDate: Moment.Moment | '') => (currentDate: Moment.Moment,
                                                              selectedDate: Moment.Moment) => boolean;
    onSnivSubmit: (obj: IAddUpdateSnivArgs) => (e: any) => void;
    onInputChange: () => void;
    onTimeInputChange: (timeType: 'start' | 'end',
                        compTime: Moment.Moment | '',
                        errors: IErrors[]) => (e: any) => void;
    onAircrewInputChange: () => void;
    onSnivFormAddButtonClick: () => void;
    onSnivFormDelButtonClick: () => void;
}

const AddSnivForm: React.SFC<IAddSnivFormProps> = ({formValues,
                                                    addUpdateSnivFormDisplay,
                                                    errors,
                                                    dateIsSelectable,
                                                    onSnivSubmit,
                                                    onInputChange,
                                                    onTimeInputChange,
                                                    onAircrewInputChange,
                                                    onSnivFormAddButtonClick,
                                                    onSnivFormDelButtonClick,
}) => {
    const timeFormat = 'HHmm';
    const onSubmit = onSnivSubmit({
        snivId: formValues.snivId,
        aircrewIds: formValues.aircrewRefIds,
        start: formValues.start,
        end: formValues.end,
        message: formValues.message,
    });
    const startErrorLevel = getHighestErrorLevel(errors.filter(error => {
        if (error.type === errorTypes.TIME_ORDER) {
            return error.meta.timeType === snivTimeTypes.SNIV_START;
        }
        return false;
    }));
    const startClassName = startErrorLevel ? `valError${startErrorLevel}` : '';
    const endErrorLevel = getHighestErrorLevel(errors.filter(error => {
        if (error.type === errorTypes.TIME_ORDER) {
            return error.meta.timeType === snivTimeTypes.SNIV_END;
        }
        return false;
    }));
    const endClassName = endErrorLevel ? `valError${endErrorLevel}` : '';
    const snivFormDisplayButton = addUpdateSnivFormDisplay ?
        (
        <div>
            <DelButton onClick={onSnivFormDelButtonClick}>
                Close This Form
            </DelButton>
        </div>
        ) :
        (
        <div>
            <AddButton onClick={onSnivFormAddButtonClick}>
                Add Sniv
            </AddButton>
        </div>
        );
    const snivForm = addUpdateSnivFormDisplay ?
        (
        <form onSubmit={onSubmit}>
            <FlexInputContainer
                placeHolder="Aircrew"
                name="aircrew"
                value={formValues.aircrew}
                onChange={onAircrewInputChange}
                errorConfig={{
                    show: [],
                    update: [],
                    errorLoc: errorLocs.CREWLIST,
                    errorLocId: '',
                }}
                element={editables.SNIV_FORM}
                entityId={''}
            />
            <Datetime
                timeFormat={timeFormat}
                inputProps={{
                    name: 'start',
                    placeholder: 'Start',
                }}
                isValidDate={dateIsSelectable('before', formValues.end)}
                value={formValues.start}
                className={startClassName}
                onChange={onTimeInputChange('start', formValues.end, errors)}
                timeConstraints={{minutes: {min: 0, max: 59, step: 15}}}
            />
            <Datetime
                timeFormat={timeFormat}
                inputProps={{
                    name: 'end',
                    placeholder: 'End',
                }}
                isValidDate={dateIsSelectable('after', formValues.start)}
                value={formValues.end || formValues.start}
                className={endClassName}
                onChange={onTimeInputChange('end', formValues.start, errors)}
                timeConstraints={{minutes: {min: 0, max: 59, step: 15}}}
            />
            <input
                type="text"
                name="message"
                placeholder="Message"
                value={formValues.message}
                onChange={onInputChange}
            /><br />
            <input
                type="hidden"
                name="snivId"
                value={formValues.snivId}
            />
            <button type="submit">
            Submit
            </button>
        </form>
    ) : null;
    return (
        <div>
            {snivFormDisplayButton}
            {snivForm}
        </div>
    );
};

export default AddSnivForm;
