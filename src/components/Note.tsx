import * as React from 'react';
import { INotes } from '../types/State';
import { errorTypes } from '../errors';
import { nameLocation, editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';

interface INoteProps {
    note: INotes;
    errorLoc: string;
    errorLocId: string;
    onInputChange: (e: any) => any;
}

const Note: React.SFC<INoteProps> = ({ note, onInputChange, errorLoc, errorLocId }) => {
    return (
        <FlexInputContainer
            placeHolder="time-time: Note text."
            name="flightNote"
            value={note.content}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc,
                errorLocId}}
            onChange={onInputChange}
            addNameIdTo={{nameLocation: nameLocation.NOTE, entityId: note.id}}
            element={editables.NOTE}
            entityId={note.id}
        />
    );
};

export default Note;
