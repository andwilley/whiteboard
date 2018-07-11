import * as React from 'react';
import Search from './Search';
import QualBox from './QualBox';
import { IFilters } from '../types/State';
import IconButton from './IconButton';

interface ISearchBoxProps {
    qualsList: string[];
    filters: IFilters;
    showSnivs: boolean;
    showFilters: boolean;
    onInputChange: () => any;
    onClearButtonClick: () => any;
    onShowFilterClick: () => any;
}

const CrewSearchBox: React.SFC<ISearchBoxProps> = ({
    qualsList,
    filters,
    showSnivs,
    showFilters,
    onInputChange,
    onClearButtonClick,
    onShowFilterClick,
}) => {
    const onClearButtonClicked = (e: any) => {
        e.preventDefault();
        onClearButtonClick();
    };
    return (
        <div>
            <nav className="navbar navbar-dark wb-navbar fixed-top bg-dark flex-md-nowrap p-0 shadow">
                <Search
                    inputValue={filters.crewSearchInput}
                    onInputChange={onInputChange}
                    className="form-control form-control-dark col-sm-3 col-md-2 w-100"
                />
            </nav>
            {showFilters ?
                <ul className="nav flex-column">
                    <li className="nav-item wb-nav-item text-light">
                        Filters
                        <IconButton
                            onClick={onShowFilterClick}
                            icon="chevron-top"
                            svgClass="float-right mt-1 mr-1"
                            size={12}
                        />
                    </li>
                    <li className="nav-item wb-nav-item text-light">
                        <label htmlFor="showAvailable">
                            <input
                                type="checkbox"
                                name="showAvailable"
                                value={filters.showAvailable ? 'false' : 'true'}
                                checked={filters.showAvailable ? true : false}
                                onChange={onInputChange}
                            />
                            Show Only Available Aircrew
                        </label>
                    </li>
                    <li className="nav-item wb-nav-item text-light">
                        <label htmlFor="showSnivs">
                            <input
                                type="checkbox"
                                name="showSnivs"
                                value={showSnivs ? 'false' : 'true'}
                                checked={showSnivs ? true : false}
                                onChange={onInputChange}
                            />
                            Show Snivs
                        </label>
                    </li>
                    <QualBox
                        qualsList={qualsList}
                        onInputChange={onInputChange}
                        filters={filters}
                    />
                    <button className="btn btn-secondary" onClick={onClearButtonClicked}>Clear</button>
                </ul>
                :
                <ul className="nav flex-column">
                    <li className="nav-item wb-nav-item text-light">
                        Filters
                        <IconButton
                            onClick={onShowFilterClick}
                            icon="chevron-bottom"
                            svgClass="float-right mt-1 mr-1"
                            size={12}
                        />
                    </li>
                </ul>}
        </div>);
};

export default CrewSearchBox;
