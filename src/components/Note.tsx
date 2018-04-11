import * as React from 'react';
import { INotes } from '../types/State';
import { errorTypes, errorLocs } from '../errors';
import FlexInputContainer, { nameLocation } from '../containers/FlexInputContainer';

interface INoteProps {
    note: INotes;
    onInputChange: (e: any) => any;
}

const Note: React.SFC<INoteProps> = ({ note, onInputChange }) => {
    return (
        <FlexInputContainer
            placeHolder="time-time: Note text."
            name="flightNote"
            value={note.content}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc: errorLocs.FLIGHT_NOTE,
                errorLocId: note.id}}
            onChange={onInputChange}
            addNameIdTo={{
                nameLocation: nameLocation.NOTE,
                entityId: note.id,
            }}
        />
    );
};

export default Note;
