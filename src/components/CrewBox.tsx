import * as React from 'react';

interface ICrewBoxProps {
    pilot: string;
    pilotCodes: string;
    pilotSymbols: string;
    wso: string;
    wsoCodes: string;
    wsoSymbols: string;
}

const CrewBox: React.SFC<ICrewBoxProps> = ({ pilot, wso, pilotSymbols, wsoSymbols, pilotCodes, wsoCodes }) => (
    <div>
        <input
            type="text"
            placeholder="Pilot"
            name="crew"
            value={pilot}
        />
        <input
            type="text"
            placeholder="Pilot Codes"
            name="crew"
            value={pilotCodes}
        />
        <input
            type="text"
            placeholder="Pilot Symbols"
            name="crew"
            value={pilotSymbols}
        />
        <input
            type="text"
            placeholder="WSO"
            name="crew"
            value={wso}
        />
        <input
            type="text"
            placeholder="WSO Codes"
            name="crew"
            value={wsoCodes}
        />
        <input
            type="text"
            placeholder="WSO Symbols"
            name="crew"
            value={wsoSymbols}
        />
    </div>
);

export default CrewBox;
