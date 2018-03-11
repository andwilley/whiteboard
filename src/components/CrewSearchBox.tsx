import * as React from 'react';
import Search from './Search';
import QualBox from './QualBox';
import { IFilters } from '../types/State';

interface ISearchBoxProps {
    qualsList: string[];
    filters: IFilters;
    onInputChange: () => any;
    onClearButtonClick: () => any;
}

const CrewSearchBox: React.SFC<ISearchBoxProps> = ({
        qualsList,
        filters,
        onInputChange,
        onClearButtonClick }) => {
    const onClearButtonClicked = (e: any) => {
        e.preventDefault();
        onClearButtonClick();
    };
    return (
        <form>
            <Search
                inputValue={filters.crewSearchInput}
                onInputChange={onInputChange}
            /><br />
            <input
                type="checkbox"
                name="showAvailable"
                value={filters.showAvailable ? 'false' : 'true'}
                checked={filters.showAvailable ? true : false}
                onChange={onInputChange}
            />Show Only Available Aircrew<br />
            <QualBox
                qualsList={qualsList}
                onInputChange={onInputChange}
                filters={filters}
            />
            <button onClick={onClearButtonClicked}>Clear</button>
        </form>
    );
};

export default CrewSearchBox;
