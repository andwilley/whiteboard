import * as React from 'react';
import SnivListContainer from '../containers/SnivListContainer';
import IconButton from './IconButton';

const SnivBox: React.SFC = () => (
    <div>
        <SnivListContainer />
        <IconButton onClick={() => null}>
            Add Sniv
        </IconButton>
    </div>
);

export default SnivBox;
