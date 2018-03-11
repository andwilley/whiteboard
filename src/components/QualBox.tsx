import * as React from 'react';
import { IFilters } from '../types/WhiteboardTypes';

interface IQualBoxProps {
    qualsList: string[];
    onInputChange: () => any;
    filters: IFilters;
}

const QualBox: React.SFC<IQualBoxProps> = ({ qualsList, onInputChange, filters }) => {
    const qualCheckboxList = qualsList.map( (qual: string) => (
        <label htmlFor="s_qual" key={`s_${qual}`}>
            <input
                type="checkbox"
                name="s_quals"
                value={qual}
                checked={filters.qualFilter.indexOf(qual) > -1 ? true : false}
                onChange={onInputChange}
            />
            {qual}
        </label>
    ));
    return (
        <div>
            {qualCheckboxList}
        </div>
    );
};

export default QualBox;
