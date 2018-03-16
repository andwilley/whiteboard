import * as React from 'react';
import { INotes } from '../types/State';

interface INoteProps {
    note: INotes; // should this be an array like aircrew?
}

const Note: React.SFC<INoteProps> = ({ note }) => {
    // create notes array of jsx elements
    return (
        <div>This is a Note: {note.content}</div>
    );
};

export default Note;
