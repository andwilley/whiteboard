import * as React from 'react';

interface ISymbolsProps {
    symbols: string;
}

const Symbols: React.SFC<ISymbolsProps> = ({ symbols }) => (
    <div>
        <input
            type="text"
            placeholder="Symbols"
            name="symbols"
            value={symbols}
        />
    </div>
);

export default Symbols;
