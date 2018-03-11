import * as React from 'react';
import Search from './Search';
import QualBox from './QualBox';
import { IFilters } from '../types/WhiteboardTypes';

interface ISearchBoxProps {
    crewSearchInput: string;
    qualsList: string[];
    filters: IFilters;
    onInputChange: () => any;
    onClearButtonClick: () => any;
}

const CrewSearchBox: React.SFC<ISearchBoxProps> = ({
        crewSearchInput,
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
                inputValue={crewSearchInput}
                onInputChange={onInputChange}
            /><br />
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
