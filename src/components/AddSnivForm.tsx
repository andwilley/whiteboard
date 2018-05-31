import * as React from 'react';
import { errorLocs } from '../errors';
import * as Datetime from 'react-datetime';
import { Moment } from 'moment';
import { editables } from '../whiteboard-constants';
import { IAddUpdateSnivFormValues } from '../types/State';
import FlexInputContainer from '../containers/FlexInputContainer';

interface IAddSnivFormProps {
    formValues: IAddUpdateSnivFormValues;
    dateIsSelectable: (beforeOrAfter: 'before' | 'after',
                       referenceDate: Moment | '') => (currentDate: Moment,
                                                       selectedDate: Moment) => boolean;
    onSubmit: () => void;
    onInputChange: () => void;
    onStartChange: () => void;
    onEndChange: () => void;
    onAircrewInputChange: () => void;
}

const AddSnivForm: React.SFC<IAddSnivFormProps> = ({formValues,
                                                    dateIsSelectable,
                                                    onSubmit,
                                                    onInputChange,
                                                    onStartChange,
                                                    onEndChange,
                                                    onAircrewInputChange,
}) => {
    const timeFormat = 'HHmm';
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
            Start:
            <Datetime
                timeFormat={timeFormat}
                inputProps={{
                    name: 'start',
                }}
                isValidDate={dateIsSelectable('before', formValues.end)}
                value={formValues.start}
                onChange={onStartChange}
            />
            End:
            <Datetime
                timeFormat={timeFormat}
                inputProps={{
                    name: 'end',
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
        </form>
    );
};

export default AddSnivForm;
