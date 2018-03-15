import * as React from 'react';
import INotes from '../types/State';

interface INoteProps {
    notes: {[id: string]: INotes}; // should this be an array like aircrew?
}

const Note: React.SFC<INoteProps> = ({ notes }) => {
    // create notes array of jsx elements
    return (
        <div>This is a Note</div>
    );
}

export default Note;
