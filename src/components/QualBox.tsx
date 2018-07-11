import * as React from 'react';
import { IFilters } from '../types/State';

interface IQualBoxProps {
    qualsList: string[];
    onInputChange: () => any;
    filters: IFilters;
}

const QualBox: React.SFC<IQualBoxProps> = ({ qualsList, onInputChange, filters }) => {
    const qualCheckboxList = qualsList.map( (qual: string) => (
        <li className="nav-item pl-3" key={`s_${qual}`}>
            <label htmlFor="s_qual">
                <input
                    type="checkbox"
                    name="s_quals"
                    value={qual}
                    checked={filters.qualFilter.indexOf(qual) > -1 ? true : false}
                    onChange={onInputChange}
                />
                {qual}
            </label>
        </li>
    ));
    return (
        <ul className="nav flex-column">
            {qualCheckboxList}
        </ul>
    );
};

export default QualBox;
