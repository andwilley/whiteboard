import * as React from 'react';
import { INotes, UNoteEntity } from '../types/State';
import { errorTypes } from '../errors';
import { editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';
import IconButton from './IconButton';
import { IDelNoteArgs } from '../actions';

interface INoteProps {
    className?: string;
    note: INotes;
    errorLoc: UNoteEntity;
    errorLocId: string;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
    onInputChange: (e: any) => any;
}

const Note: React.SFC<INoteProps> = ({ className = '', note, onDelNoteClick, onInputChange, errorLoc, errorLocId }) => {
    return (
        <div className="col-md-12 wb-only-hover">
            <FlexInputContainer
                placeHolder="Note text."
                name="flightNote"
                value={note.content}
                className={className}
                errorConfig={{
                    show: [errorTypes.SCHEDULE_CONFLICT],
                    update: [errorTypes.SCHEDULE_CONFLICT],
                    errorLoc,
                    errorLocId}}
                onInputChange={onInputChange}
                element={editables.NOTE}
                entityId={note.id}
            />
            <IconButton
                onClick={onDelNoteClick({id: note.id, entity: errorLoc, entityId: errorLocId})}
                icon="trash"
                hover="only-hover"
                style={{
                    margin: '-18px 0px 0px 0px',
                }}
                svgClass="float-right"
            />
        </div>
    );
};

export default Note;
