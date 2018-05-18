import * as React from 'react';
import FlexInputContainer from '../containers/FlexInputContainer';
import { editables } from '../whiteboard-constants';
import { errorLocs } from '../errors';

interface ILoadoutBoxProps {
    loadout: string;
    sortieId: string;
    onChange: (e: any) => void;
}

const LoadoutBox: React.SFC<ILoadoutBoxProps> = ({ loadout, sortieId, onChange }) => (
    <FlexInputContainer
        placeHolder="Loadout"
        name="loadout"
        value={loadout}
        onChange={onChange}
        errorConfig={{
            show: [],
            update: [],
            errorLoc: errorLocs.FLIGHT,
            errorLocId: ''}}
        element={editables.LOADOUT}
        entityId={sortieId}
    />
);

export default LoadoutBox;
