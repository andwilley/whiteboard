import * as React from 'react';
import { IAddUpdateSnivFormValues } from '../types/State';
import FlexInputContainer from '../containers/FlexInputContainer';
import { editables } from '../whiteboard-constants';
import { errorLocs } from '../errors';

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
            <input
                type="text"
                placeholder="Start"
                name="start"
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
