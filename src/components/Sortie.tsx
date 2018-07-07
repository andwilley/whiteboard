import * as React from 'react';
import { ISorties } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';
import LoadoutBoxContainer from '../containers/LoadoutBoxContainer';
import DelButton from './DelButton';

interface ISortieProps {
    sortie: ISorties;
    flightId: string;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie, flightId, onDelSortieClick }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Sortie</span>
        <DelButton onClick={onDelSortieClick(sortie.id, flightId)}>
            Delete Sortie
        </DelButton>
        <LoadoutBoxContainer
            sortieId={sortie.id}
        />
        <br/>
        <CrewBoxContainer
            sortieId={sortie.id}
            flightId={flightId}
        />
    </div>
);

export default Sortie;
