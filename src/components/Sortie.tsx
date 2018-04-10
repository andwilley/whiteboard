import * as React from 'react';
import LoadoutBox from './LoadoutBox';
import { ISorties } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';

interface ISortieProps {
    sortie: ISorties;
    flightId: string;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie, flightId }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Sortie</span>
        <LoadoutBox
            codes={'FFAM101'}
            loadout={'ABLR'}
        />
        <CrewBoxContainer
            sortieId={sortie.id}
            flightId={flightId}
        />
    </div>
);

export default Sortie;
