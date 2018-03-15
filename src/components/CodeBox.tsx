import * as React from 'react';

interface ICodeBoxProps {
    codes: string;
    loadout: string;
}

const CodeBox: React.SFC<ICodeBoxProps> = ({ codes, loadout }) => (
    <div>
        <input
            type="text"
            placeholder="Codes"
            name="codebox"
            value={codes}
        />
        <input
            type="text"
            placeholder="Loadout"
            name="codebox"
            value={loadout}
        />
    </div>
);

export default CodeBox;
