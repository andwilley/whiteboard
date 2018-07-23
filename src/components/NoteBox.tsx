import * as React from 'react';
import Note from './Note';
import { INotes, UNoteEntity } from '../types/State';
import IconButton from './IconButton';
import { IDelNoteArgs } from '../actions';
import ErrorListContainer from '../containers/ErrorListContainer';

interface INoteBoxProps {
    className?: string;
    errorListClassName?: string;
    notes: INotes[];
    errorLoc: UNoteEntity;
    errorLocId: string;
    onInputChange: (noteId: string) => (e: any) => void;
    onAddNoteClick: () => void;
    onDelNoteClick: (obj: IDelNoteArgs) => (e: any) => void;
}

const NoteBox: React.SFC<INoteBoxProps> = ({
    className = '',
    notes,
    onInputChange,
    onAddNoteClick,
    onDelNoteClick,
    errorLoc,
    errorLocId,
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
            <ErrorListContainer className={className} errorLoc={errorLoc} errorLocId={errorLocId} />
        </div>
    );
};

export default NoteBox;
