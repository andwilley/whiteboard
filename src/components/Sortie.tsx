import * as React from 'react';
import LoadoutBox from './CodeBox';
import CrewBox from './CrewBox';

interface ISortieProps {
    sortie: ISorties;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie }) => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Sortie</span>
        <loadoutBox
            codes={'FFAM101'}
            loadout={'ABLR'}
        />
        <CrewBox
            pilot={sortie.front.inputName}
            pilotCodes={sortie.front.codes}
            pilotSymbols={sortie.front.symbols}
            wso={sortie.back.inputName}
            wsoCodes={sortie.back.codes}
            wsoSymbols={sortie.back.symbols}
        />
    </div>
);

export default Sortie;
