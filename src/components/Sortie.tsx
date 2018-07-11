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
    <div>
    <hr / >
    <div className="row">
        <div className="col-10">
            <LoadoutBoxContainer
                sortieId={sortie.id}
            />
        </div>
        <div className="col-2">
            <IconButton
                onClick={onDelSortieClick(sortie.id, flightId)}
                icon="trash"
                size={10}
                svgClass="float-right mt-1"
            />
        </div>
    </div>
        <CrewBoxContainer
            sortieId={sortie.id}
            flightId={flightId}
        />
    </div>
);

export default Sortie;
