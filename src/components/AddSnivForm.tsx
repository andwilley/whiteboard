import * as React from 'react';
import * as Datetime from 'react-datetime';
import { errorLocs } from '../errors';
import { editables } from '../whiteboard-constants';
import { IAddUpdateSnivFormValues } from '../types/State';
import FlexInputContainer from '../containers/FlexInputContainer';

interface IAddSnivFormProps {
    formValues: IAddUpdateSnivFormValues;
    onSubmit: () => void;
    onInputChange: () => void;
    onAircrewInputChange: () => void;
}

const AddSnivForm: React.SFC<IAddSnivFormProps> = ({formValues,
                                                    onSubmit,
                                                    onInputChange,
                                                    onAircrewInputChange,
}) => {
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
                timeFormat={'HHMM'}
                input={false}
                value={formValues.start}
                onChange={onInputChange}
            /><br />
            <input
                type="text"
                placeholder="End"
                name="end"
                value={formValues.end}
                onChange={onInputChange}
            /><br />
            <input
                type="text"
                placeholder="Message"
                name="message"
                value={formValues.message}
                onChange={onInputChange}
            /><br />
        </form>
    );
};

export default AddSnivForm;
