import * as React from 'react';
import { INotes } from '../types/State';
import { errorTypes } from '../errors';
import { UErrorLocs } from '../types/State';
import { editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';

interface INoteProps {
    note: INotes;
    errorLoc: UErrorLocs;
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
            element={editables.NOTE}
            entityId={note.id}
        />
    );
};

export default Note;
