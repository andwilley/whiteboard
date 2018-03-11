import * as React from 'react';

interface ISearchProps {
    inputValue: string;
    onInputChange: () => any;
}

const Search: React.SFC<ISearchProps> = ({ inputValue, onInputChange }) => (
    <input
        type="text"
        name="crewSearch"
        placeholder="Search"
        value={inputValue}
        onChange={onInputChange}
    />
);

export default Search;
