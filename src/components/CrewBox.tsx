import * as React from 'react';
import Symbols from './Symbols';

interface ICrewBoxProps {
    pilot: string;
    pilotSymbols: string;
    wso: string;
    wsoSymbols: string;
}

const CrewBox: React.SFC<ICrewBoxProps> = ({ pilot, wso, pilotSymbols, wsoSymbols }) => (
    <div>
        <input
            type="text"
            placeholder="Pilot"
            name="crew"
            value={pilot}
        />
        <Symbols
            symbols={pilotSymbols}
            seat="pilot"
        />
        <input
            type="text"
            placeholder="WSO"
            name="crew"
            value={wso}
        />
        <Symbols
            symbols={wsoSymbols}
            seat="wso"
        />
    </div>
);

export default CrewBox;
