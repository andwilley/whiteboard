import * as React from 'react';
import LoadoutBox from './LoadoutBox';
import { ISorties } from '../types/State';
import CrewBox from './CrewBox';

interface ISortieProps {
    sortie: ISorties;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Sortie</span>
        <LoadoutBox
            codes={'FFAM101'}
            loadout={'ABLR'}
        />
        <CrewBox
            pilot={sortie.front.inputName}
            pilotCodes={sortie.front.codes.toString()}
            pilotSymbols={sortie.front.symbols.toString()}
            wso={sortie.back.inputName}
            wsoCodes={sortie.back.codes.toString()}
            wsoSymbols={sortie.back.symbols.toString()}
        />
    </div>
);

export default Sortie;
