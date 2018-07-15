import * as React from 'react';
import Note from './Note';
import { INotes, IErrors, UNoteEntity } from '../types/State';
import IconButton from './IconButton';
import ErrorList from './ErrorList';
import { IDelNoteArgs } from '../actions';

interface INoteBoxProps {
    className?: string;
    errorListClassName?: string;
    notes: INotes[];
    errorLoc: UNoteEntity;
    errorLocId: string;
    onInputChange: (noteId: string) => (e: any) => void;
    onAddNoteClick: () => void;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
    errors?: IErrors[];
}

const NoteBox: React.SFC<INoteBoxProps> = ({
    className = '',
    notes,
    onInputChange,
    onAddNoteClick,
    onDelNoteClick,
    errorLoc,
    errorLocId,
    errors,
}) => {
    const noteComponentsList = notes.map(note =>
        (
        <Note
            className={className}
            note={note}
            key={note.id}
            onDelNoteClick={onDelNoteClick}
            onInputChange={onInputChange(note.id)}
            errorLoc={errorLoc}
            errorLocId={errorLocId}
        />
        )
    );
    const noteErrors = errors ? errors : [];
    return (
        <div>
            <IconButton
                onClick={onAddNoteClick}
                icon="plus"
                size={10}
                style={{
                    margin: '-20px 0px 0px 0px',
                }}
                svgClass="float-right"
            />
            <div className="row">
                {noteComponentsList}
            </div>
            <ErrorList className={className} errors={noteErrors} />
        </div>
    );
};

export default NoteBox;
