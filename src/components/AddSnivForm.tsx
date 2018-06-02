import * as React from 'react';
import { errorLocs } from '../errors';
import * as Datetime from 'react-datetime';
import { Moment } from 'moment';
import { editables } from '../whiteboard-constants';
import { IAddUpdateSnivFormValues } from '../types/State';
import FlexInputContainer from '../containers/FlexInputContainer';
import { IAddUpdateSnivArgs } from '../actions';

interface IAddSnivFormProps {
    formValues: IAddUpdateSnivFormValues;
    dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                       referenceDate: Moment | '') => (currentDate: Moment,
                                                       selectedDate: Moment) => boolean;
    onSnivSubmit: (obj: IAddUpdateSnivArgs) => (e: any) => void;
    onInputChange: () => void;
    onStartChange: () => void;
    onEndChange: () => void;
    onAircrewInputChange: () => void;
}

const AddSnivForm: React.SFC<IAddSnivFormProps> = ({formValues,
                                                    dateIsSelectable,
                                                    onSnivSubmit,
                                                    onInputChange,
                                                    onStartChange,
                                                    onEndChange,
                                                    onAircrewInputChange,
}) => {
    const timeFormat = 'HHmm';
    const onSubmit = onSnivSubmit({
        snivId: '',
        aircrewIds: formValues.aircrewRefIds,
        start: formValues.start,
        end: formValues.end,
        message: formValues.message,
    });
    return (
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
                value=""
            />
            <button type="submit">
            Submit
            </button>
        </form>
    );
};

export default AddSnivForm;
