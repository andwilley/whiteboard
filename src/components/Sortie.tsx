import * as React from 'react';
import { ISorties } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';
import LoadoutBoxContainer from '../containers/LoadoutBoxContainer';

interface ISortieProps {
    sortie: ISorties;
    flightId: string;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie, flightId }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Sortie</span>
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
