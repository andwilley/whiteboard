import * as React from 'react';
import CodeBox from './CodeBox';
import CrewBox from './CrewBox';

const Sortie: React.SFC = () => (
    <div style={{border: '1px solid black', marginTop: '20px'}}>
        <span style={{position: 'relative', top: '-10px', left: '10px', background: 'white'}}>Sortie</span>
        <CodeBox
            codes={'FFAM101'}
            loadout={'ABLR'}
        />
        <CrewBox
            pilot={'Beef'}
            pilotSymbols={'@#'}
            wso={'Cox'}
            wsoSymbols={'@#'}
        />
    </div>
);

export default Sortie;
