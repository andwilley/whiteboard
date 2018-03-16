import * as React from 'react';

interface ISymbolsProps {
    symbols: string;
    seat: string;
}

const Symbols: React.SFC<ISymbolsProps> = ({ symbols, seat }) => (
    <div>
        <input
            type="text"
            placeholder="Symbols"
            name={`${seat}Symbols`}
            value={symbols}
        />
    </div>
);

export default Symbols;
