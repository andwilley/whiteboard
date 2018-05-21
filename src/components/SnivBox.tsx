import * as React from 'react';
import SnivListContainer from '../containers/SnivListContainer';
import AddButton from './AddButton';

const SnivBox: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Snivs</span>
        <SnivListContainer />
        <AddButton onClick={() => null}>
            Add Sniv
        </AddButton>
    </div>
);

export default SnivBox;
