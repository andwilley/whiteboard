import * as React from 'react';
import { ISorties } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';
import LoadoutBoxContainer from '../containers/LoadoutBoxContainer';
import IconButton from './IconButton';

interface ISortieProps {
    sortie: ISorties;
    flightId: string;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie, flightId, onDelSortieClick }) => (
    <div className="col-md-12">
        <div className="row">
            <IconButton
                onClick={onDelSortieClick(sortie.id, flightId)}
                icon="trash"
                size={10}
            />
        </div>
        <div className="row">
        <LoadoutBoxContainer
            sortieId={sortie.id}
        />
        </div>
        <CrewBoxContainer
            sortieId={sortie.id}
            flightId={flightId}
        />
    </div>
);

export default Sortie;
