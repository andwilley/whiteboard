import * as React from 'react';
import * as Moment from 'moment';
import IconButton from './IconButton';
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
    dayId: string;
    dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                       referenceDate: Moment.Moment | string) => (currentDate: Moment.Moment,
                                                                  selectedDate: Moment.Moment) => boolean;
    onSnivSubmit: (obj: IAddUpdateSnivArgs) => (e: any) => void;
    onInputChange: () => void;
    onTimeInputChange: (timeType: 'start' | 'end',
                        compTime: Moment.Moment | string,
                        errors: IErrors[],
                        dayId: string) => (e: any) => void;
    onAircrewInputChange: () => void;
    onSnivFormAddButtonClick: () => void;
    onSnivFormDelButtonClick: () => void;
}

const AddSnivForm: React.SFC<IAddSnivFormProps> = ({
    formValues,
    dayId,
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
        <ul className="nav flex-column">
            <li className="nav-item wb-nav-item text-light">
                Add Sniv
                <IconButton
                    onClick={onSnivFormDelButtonClick}
                    icon="chevron-top"
                    svgClass="float-right mt-1 mr-1"
                    size={12}
                />
            </li>
        </ul>
        ) :
        (
        <ul className="nav flex-column">
            <li className="nav-item wb-nav-item text-light">
                Add Sniv
                <IconButton
                    onClick={onSnivFormAddButtonClick}
                    icon="chevron-bottom"
                    svgClass="float-right mt-1 mr-1"
                    size={12}
                />
            </li>
        </ul>
        );
    const snivForm = addUpdateSnivFormDisplay ?
        (
        <form className="col-12 mt-2" onSubmit={onSubmit}>
            <FlexInputContainer
                placeHolder="Aircrew"
                name="aircrew"
                value={formValues.aircrew}
                className="form-control"
                wrapperClassName="px-0 mt-1 border-left-0"
                onInputChange={onAircrewInputChange}
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
                className={`mt-1 ${startClassName}`}
                onChange={onTimeInputChange('start', formValues.end, errors, dayId)}
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
                className={`mt-1 ${endClassName}`}
                onChange={onTimeInputChange('end', formValues.start, errors, dayId)}
                timeConstraints={{minutes: {min: 0, max: 59, step: 15}}}
            />
            <input
                type="text"
                name="message"
                className="form-control mt-1"
                placeholder="Message"
                value={formValues.message}
                onChange={onInputChange}
            /><br />
            <input
                type="hidden"
                name="snivId"
                value={formValues.snivId}
            />
            <button className="btn btn-primary" type="submit">
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
