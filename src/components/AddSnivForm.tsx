import * as React from 'react';
import { Moment } from 'moment';
import AddButton from './AddButton';
import DelButton from './DelButton';
import { errorLocs } from '../errors';
import * as Datetime from 'react-datetime';
import { editables } from '../whiteboard-constants';
import { IAddUpdateSnivFormValues } from '../types/State';
import FlexInputContainer from '../containers/FlexInputContainer';
import { IAddUpdateSnivArgs } from '../actions';

interface IAddSnivFormProps {
    formValues: IAddUpdateSnivFormValues;
    addUpdateSnivFormDisplay: boolean;
    dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                       referenceDate: Moment | '') => (currentDate: Moment,
                                                       selectedDate: Moment) => boolean;
    onSnivSubmit: (obj: IAddUpdateSnivArgs) => (e: any) => void;
    onInputChange: () => void;
    onStartChange: () => void;
    onEndChange: () => void;
    onAircrewInputChange: () => void;
    onSnivFormAddButtonClick: () => void;
    onSnivFormDelButtonClick: () => void;
}

const AddSnivForm: React.SFC<IAddSnivFormProps> = ({formValues,
                                                    addUpdateSnivFormDisplay,
                                                    dateIsSelectable,
                                                    onSnivSubmit,
                                                    onInputChange,
                                                    onStartChange,
                                                    onEndChange,
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
                onChange={onStartChange}
                timeConstraints={{minutes: {min: 0, max: 59, step: 15}}}
            />
            <Datetime
                timeFormat={timeFormat}
                inputProps={{
                    name: 'end',
                    placeholder: 'End',
                }}
                isValidDate={dateIsSelectable('after', formValues.start)}
                value={formValues.end}
                onChange={onEndChange}
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
