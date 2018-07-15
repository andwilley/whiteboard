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
                <div className="col-1">
                    <IconButton
                        onClick={() => onAddSortieClick()}
                        icon="plus"
                        size={12}
                        svgClass="mt-3"
                    />
                </div>
            </div>
    );
};

export default SortieBox;
