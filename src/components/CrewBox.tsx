import * as React from 'react';
import { errorTypes } from '../errors';
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
            errorTypes={[errorTypes.SCHEDULE_CONFLICT]}
            addNameIdTo={{nameLocation: nameLocation.FRONT_SEAT, entityId: sortieStrings.sortieId}}
        />
        <FlexInputContainer
            placeHolder="Pilot Codes"
            name="pilotCodes"
            value={sortieStrings.pilotCodes}
            onChange={onInputChange}
            errorTypes={[]}
        />
        <FlexInputContainer
            placeHolder="Pilot Symbols"
            name="pilotSymbols"
            value={sortieStrings.pilotSymbols}
            onChange={onInputChange}
            errorTypes={[]}
        />
        <FlexInputContainer
            placeHolder="WSO"
            name="wso"
            value={sortieStrings.wso}
            onChange={onInputChange}
            errorTypes={[errorTypes.SCHEDULE_CONFLICT]}
            addNameIdTo={{nameLocation: nameLocation.BACK_SEAT, entityId: sortieStrings.sortieId}}
        />
        <FlexInputContainer
            placeHolder="WSO Codes"
            name="wsoCodes"
            value={sortieStrings.wsoCodes}
            onChange={onInputChange}
            errorTypes={[]}
        />
        <FlexInputContainer
            placeHolder="WSO Symbols"
            name="wsoSymbols"
            value={sortieStrings.wsoSymbols}
            onChange={onInputChange}
            errorTypes={[]}
        />
    </div>
);

export default CrewBox;
