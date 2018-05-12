import * as React from 'react';
import Sortie from './Sortie';
import { ISorties } from '../types/State';
import AddButton from './AddButton';

interface ISortieBoxProps {
    flightId: string;
    sorties: ISorties[];
    onAddSortieClick: () => void;
}

const SortieBox: React.SFC<ISortieBoxProps> = ({ flightId, sorties, onAddSortieClick }) => {
    const sortieComponents = sorties.map(sortie => (<Sortie key={sortie.id} sortie={sortie} flightId={flightId} />));
    return (
        <div>
            {sortieComponents}
            <AddButton onClick={() => onAddSortieClick()}>
                Sortie
            </AddButton>
        </div>
    );
};

export default SortieBox;
