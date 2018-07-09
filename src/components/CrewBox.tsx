import * as React from 'react';
import { errorTypes, errorLocs } from '../errors';
import { editables } from '../whiteboard-constants';
import FlexInputContainer from '../containers/FlexInputContainer';
import { noDuplicateCodes } from '../util/restrictor'; // restrictToSymbols, noDuplicateChars,
import { trCodeList } from '../util/validator';

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
    <div className="row">
        <div className="col-6">
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
                element={editables.FRONT_SEAT_NAME}
                entityId={sortieStrings.sortieId}
            />
            <FlexInputContainer
                placeHolder="Codes"
                name="pilotCodes"
                value={sortieStrings.pilotCodes}
                onChange={onInputChange.onPilotCodeChange}
                errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
                element={editables.FRONT_SEAT_CODE}
                entityId={sortieStrings.sortieId}
                validatorFns={[trCodeList()]}
                restrictorFns={[noDuplicateCodes]}
            />
            {/* <FlexInputContainer
                placeHolder="Pilot Symbols"
                name="pilotSymbols"
                value={sortieStrings.pilotSymbols}
                onChange={onInputChange.onPilotSymbolChange}
                errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
                element={editables.FRONT_SEAT_SYMBOL}
                entityId={sortieStrings.sortieId}
                restrictorFns={[restrictToSymbols, noDuplicateChars]}
            /> */}
        </div>
        <div className="col-6">
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
                element={editables.BACK_SEAT_NAME}
                entityId={sortieStrings.sortieId}
            />
            <FlexInputContainer
                placeHolder="Codes"
                name="wsoCodes"
                value={sortieStrings.wsoCodes}
                onChange={onInputChange.onWSOCodeChange}
                errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
                element={editables.BACK_SEAT_CODE}
                entityId={sortieStrings.sortieId}
                validatorFns={[trCodeList()]}
                restrictorFns={[noDuplicateCodes]}
            />
            {/* <FlexInputContainer
                placeHolder="WSO Symbols"
                name="wsoSymbols"
                value={sortieStrings.wsoSymbols}
                onChange={onInputChange.onWSOSymbolChange}
                errorConfig={{show: [], update: [], errorLoc: errorLocs.FLIGHT, errorLocId: flightId}}
                element={editables.BACK_SEAT_SYMBOL}
                entityId={sortieStrings.sortieId}
                restrictorFns={[restrictToSymbols, noDuplicateChars]}
            /> */}
        </div>
    </div>
);

export default CrewBox;
