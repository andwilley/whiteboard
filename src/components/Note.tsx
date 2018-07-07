import * as React from 'react';
import { INotes, UNoteEntity } from '../types/State';
import { errorTypes } from '../errors';
import { editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';
import DelButton from './DelButton';
import { IDelNoteArgs } from '../actions';

interface INoteProps {
    note: INotes;
    errorLoc: UNoteEntity;
    errorLocId: string;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
    onInputChange: (e: any) => any;
}

const Note: React.SFC<INoteProps> = ({ note, onDelNoteClick, onInputChange, errorLoc, errorLocId }) => {
    return (
        <div>
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
            <DelButton onClick={onDelNoteClick({id: note.id, entity: errorLoc, entityId: errorLocId})}>
                Delete Note
            </DelButton>
        </div>
    );
};

export default Note;
