import * as React from 'react';
import Sortie from './Sortie';
import { ISorties, IFlights } from '../types/State';
import IconButton from './IconButton';

interface ISortieBoxProps {
    flightId: string;
    flight: IFlights;
    sorties: ISorties[];
    onAddSortieClick: () => void;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const SortieBox: React.SFC<ISortieBoxProps> = ({ flight, sorties, onAddSortieClick, onDelSortieClick }) => {
    const sortieComponents = sorties.map(sortie => (
        <Sortie key={sortie.id} sortie={sortie} flight={flight} onDelSortieClick={onDelSortieClick} />
    ));
    return (
            <div>
                {sortieComponents}
                <IconButton
                    onClick={() => onAddSortieClick()}
                    icon="plus"
                    size={12}
                />
            </div>
    );
};

export default SortieBox;
