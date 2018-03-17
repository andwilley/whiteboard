import * as React from 'react';
import Sortie from './Sortie';
import AddButton from './AddButton';

const SortieBox: React.SFC = () => (
    <div>
        <Sortie />
        <AddButton
            onClick={() => alert('Add Sortie')}
        />
    </div>
);

export default SortieBox;
