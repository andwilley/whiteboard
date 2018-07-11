import * as React from 'react';

interface ISearchProps {
    inputValue: string;
    onInputChange: () => any;
    className?: string;
}

const Search: React.SFC<ISearchProps> = ({ inputValue, onInputChange, className = '' }) => (
    <input
        type="text"
        name="crewSearch"
        placeholder="Search"
        value={inputValue}
        onChange={onInputChange}
        className={className}
    />
);

export default Search;
