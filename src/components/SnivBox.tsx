import * as React from 'react';
import SnivListContainer from '../containers/SnivListContainer';
import IconButton from './IconButton';

const SnivBox: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Snivs</span>
        <SnivListContainer />
        <IconButton onClick={() => null}>
            Add Sniv
        </IconButton>
    </div>
);

export default SnivBox;
