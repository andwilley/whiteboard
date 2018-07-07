import * as React from 'react';
import Sortie from './Sortie';
import { ISorties } from '../types/State';
import AddButton from './AddButton';

interface ISortieBoxProps {
    flightId: string;
    sorties: ISorties[];
    onAddSortieClick: () => void;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const SortieBox: React.SFC<ISortieBoxProps> = ({ flightId, sorties, onAddSortieClick, onDelSortieClick }) => {
    const sortieComponents = sorties.map(sortie => (
        <Sortie key={sortie.id} sortie={sortie} flightId={flightId} onDelSortieClick={onDelSortieClick} />
    ));
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
