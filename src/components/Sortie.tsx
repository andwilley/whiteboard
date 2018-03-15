import * as React from 'react';
import CodeBox from './CodeBox';
import CrewBox from './CrewBox';
import Symbols from './Symbols';

const Sortie: React.SFC = () => (
    <div>
        <CodeBox />
        <CrewBox />
        <Symbols />
    </div>
);

export default Sortie;
