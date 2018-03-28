import * as React from 'react';
import FlexInputContainer, { nameLocation } from '../containers/FlexInputContainer';

interface ICrewBoxProps {
    sortieStrings: {
        sortieId: string;
        pilot: string;
        pilotCodes: string;
        pilotSymbols: string;
        wso: string;
        wsoCodes: string;
        wsoSymbols: string;
    };
    onInputChange: (e: any) => void;
}

const CrewBox: React.SFC<ICrewBoxProps> = ({ sortieStrings, onInputChange }) => (
    <div>
        <FlexInputContainer
            placeHolder="Pilot"
            name="pilot"
            value={sortieStrings.pilot}
            onChange={onInputChange}
            addNameIdTo={{nameLocation: nameLocation.FRONT_SEAT, entityId: sortieStrings.sortieId}}
        />
        <FlexInputContainer
            placeHolder="Pilot Codes"
            name="pilotCodes"
            value={sortieStrings.pilotCodes}
            onChange={onInputChange}
        />
        <FlexInputContainer
            placeHolder="Pilot Symbols"
            name="pilotSymbols"
            value={sortieStrings.pilotSymbols}
            onChange={onInputChange}
        />
        <FlexInputContainer
            placeHolder="WSO"
            name="wso"
            value={sortieStrings.wso}
            onChange={onInputChange}
            addNameIdTo={{nameLocation: nameLocation.BACK_SEAT, entityId: sortieStrings.sortieId}}
        />
        <FlexInputContainer
            placeHolder="WSO Codes"
            name="wsoCodes"
            value={sortieStrings.wsoCodes}
            onChange={onInputChange}
        />
        <FlexInputContainer
            placeHolder="WSO Symbols"
            name="wsoSymbols"
            value={sortieStrings.wsoSymbols}
            onChange={onInputChange}
        />
    </div>
);

export default CrewBox;
