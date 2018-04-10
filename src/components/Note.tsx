import * as React from 'react';
import { INotes } from '../types/State';
import { errorTypes, errorLocs } from '../errors';
import FlexInputContainer from '../containers/FlexInputContainer';

interface INoteProps {
    note: INotes;
    onInputChange: (e: any) => any;
}

const Note: React.SFC<INoteProps> = ({ note, onInputChange }) => {
    return (
        <FlexInputContainer
            placeHolder="Flight Note"
            name="flightNote"
            value={note.content}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc: errorLocs.FLIGHT_NOTE,
                errorLocId: note.id}}
            onChange={onInputChange}
        />
    );
};

export default Note;
