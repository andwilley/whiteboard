import * as React from 'react';
import Sortie from './Sortie';
import AddButton from './AddButton';

interface ISortieBoxProps {
    flightId: string;
    sorties: ISorties[];
    onAddSortieClick: (flightId: string) => void;
}

const SortieBox: React.SFC<ISortieBoxProps> = ({ flightId, sorties, onAddSortieClick }) => {
    const sortieComponents = sorties.map(id => (<Sortie key={id} sortie={sortie} />));
    return (
        <div>
            {sortieComponents}
            <AddButton
                onClick={() => onAddSortieClick(flightId)}
            />
        </div>
    );
};

export default SortieBox;
