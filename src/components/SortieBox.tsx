import * as React from 'react';
import Sortie from './Sortie';
import { ISorties } from '../types/State';
import IconButton from './IconButton';

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
        <div className="col-md-12">
            <div className="row">
                {sortieComponents}
                <IconButton
                    onClick={() => onAddSortieClick()}
                    icon="plus"
                    size={12}
                />
            </div>
        </div>
    );
};

export default SortieBox;
