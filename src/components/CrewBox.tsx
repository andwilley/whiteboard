import * as React from 'react';
import { errorTypes, errorLocs } from '../errors';
import { nameLocation, editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';

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
    onInputChange: {
        onPilotNameChange: (val: string) => void;
        onPilotCodeChange: (val: string) => void;
        onPilotSymbolChange: (val: string) => void;
        onWSONameChange: (val: string) => void;
        onWSOCodeChange: (val: string) => void;
        onWSOSymbolChange: (val: string) => void;
    };
}

const CrewBox: React.SFC<ICrewBoxProps> = ({ sortieStrings, flightId, onInputChange }) => (
    <div>
        <FlexInputContainer
            placeHolder="Pilot"
            name="pilot"
            value={sortieStrings.pilot}
            onChange={onInputChange.onPilotNameChange}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc: errorLocs.FLIGHT,
                errorLocId: flightId,
            }}
            addNameIdTo={{nameLocation: nameLocation.FRONT_SEAT_NAME, entityId: sortieStrings.sortieId}}
            element={editables.FRONT_SEAT_NAME}
            entityId={sortieStrings.sortieId}
        />
        <FlexInputContainer
            placeHolder="Pilot Codes"
            name="pilotCodes"
            value={sortieStrings.pilotCodes}
            onChange={onInputChange.onPilotCodeChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
            element={editables.FRONT_SEAT_CODE}
            entityId={sortieStrings.sortieId}
        />
        {/* <FlexInputContainer
            placeHolder="Pilot Symbols"
            name="pilotSymbols"
            value={sortieStrings.pilotSymbols}
            onChange={onInputChange.onPilotSymbolChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
        /> */}
        <FlexInputContainer
            placeHolder="WSO"
            name="wso"
            value={sortieStrings.wso}
            onChange={onInputChange.onWSONameChange}
            errorConfig={{
                show: [errorTypes.SCHEDULE_CONFLICT],
                update: [errorTypes.SCHEDULE_CONFLICT],
                errorLoc: errorLocs.FLIGHT,
                errorLocId: flightId,
            }}
            addNameIdTo={{nameLocation: nameLocation.BACK_SEAT_NAME, entityId: sortieStrings.sortieId}}
            element={editables.BACK_SEAT_NAME}
            entityId={sortieStrings.sortieId}
        />
        <FlexInputContainer
            placeHolder="WSO Codes"
            name="wsoCodes"
            value={sortieStrings.wsoCodes}
            onChange={onInputChange.onWSOCodeChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
            element={editables.BACK_SEAT_CODE}
            entityId={sortieStrings.sortieId}
        />
        {/* <FlexInputContainer
            placeHolder="WSO Symbols"
            name="wsoSymbols"
            value={sortieStrings.wsoSymbols}
            onChange={onInputChange.onWSOSymbolChange}
            errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
        /> */}
    </div>
);

export default CrewBox;
