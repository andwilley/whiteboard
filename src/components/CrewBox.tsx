import * as React from 'react';
import { errorTypes, errorLocs } from '../errors';
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
    flightId: string;
    onInputChange: (e: any) => void;
}

const CrewBox: React.SFC<ICrewBoxProps> = ({ sortieStrings, flightId, onInputChange }) => (
    <div>
        <FlexInputContainer
            placeHolder="Pilot"
            name="pilot"
            value={sortieStrings.pilot}
            onChange={onInputChange}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc: errorLocs.FLIGHT,
                errorLocId: flightId,
            }}
            addNameIdTo={{nameLocation: nameLocation.FRONT_SEAT, entityId: sortieStrings.sortieId}}
        />
        <FlexInputContainer
            placeHolder="Pilot Codes"
            name="pilotCodes"
            value={sortieStrings.pilotCodes}
            onChange={onInputChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
        />
        {/* <FlexInputContainer
            placeHolder="Pilot Symbols"
            name="pilotSymbols"
            value={sortieStrings.pilotSymbols}
            onChange={onInputChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
        /> */}
        <FlexInputContainer
            placeHolder="WSO"
            name="wso"
            value={sortieStrings.wso}
            onChange={onInputChange}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc: errorLocs.FLIGHT,
                errorLocId: flightId,
            }}
            addNameIdTo={{nameLocation: nameLocation.BACK_SEAT, entityId: sortieStrings.sortieId}}
        />
        <FlexInputContainer
            placeHolder="WSO Codes"
            name="wsoCodes"
            value={sortieStrings.wsoCodes}
            onChange={onInputChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
        />
        {/* <FlexInputContainer
            placeHolder="WSO Symbols"
            name="wsoSymbols"
            value={sortieStrings.wsoSymbols}
            onChange={onInputChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
        /> */}
    </div>
);

export default CrewBox;
