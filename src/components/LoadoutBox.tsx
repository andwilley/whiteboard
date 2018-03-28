import * as React from 'react';

interface ICodeBoxProps {
    codes: string;
    loadout: string;
}

const CodeBox: React.SFC<ICodeBoxProps> = ({ codes, loadout }) => (
    <input
        type="text"
        placeholder="Loadout"
        name="codebox"
        value={loadout}
    />
);

export default CodeBox;
