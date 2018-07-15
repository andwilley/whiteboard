import * as React from 'react';
import Search from './Search';
import QualBox from './QualBox';
import { IFilters } from '../types/State';
import IconButton from './IconButton';

interface ISearchBoxProps {
    qualsList: string[];
    groupsList: string[];
    filters: IFilters;
    showSnivs: boolean;
    showFilters: boolean;
    onInputChange: (e: any) => void;
    onToggleQual: (qual: string, selected: boolean) => (e: any) => void;
    onToggleGroup: (group: string, selected: boolean) => (e: any) => void;
    onToggleShowSnivs: () => void;
    onToggleShowAvailable: (show: boolean) => (e: any) => void;
    onClearButtonClick: () => void;
    onShowFilterClick: () => void;
}

const CrewSearchBox: React.SFC<ISearchBoxProps> = ({
    qualsList,
    groupsList,
    filters,
    showSnivs,
    showFilters,
    onInputChange,
    onToggleShowSnivs,
    onToggleShowAvailable,
    onToggleQual,
    onToggleGroup,
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
            <ul className="nav flex-column">
                <li className="nav-item wb-nav-item text-light">
                    <span
                        className={`sidebar-heading mt-4 ml-1 mb-1 text-muted h6`}
                    >
                        Filters
                    </span>
                    <IconButton
                        onClick={onShowFilterClick}
                        icon={showFilters ? 'chevron-top' : 'chevron-bottom'}
                        svgClass="float-right mt-1 mr-1"
                        size={12}
                    />
                </li>
                {showFilters ?
                (<div>
                    <li className="nav-item wb-nav-item text-light">
                        <span
                            className={`text-light wb-pointer badge badge-pill${filters.showAvailable ?
                                ' wb-badge-selected' : ''}`}
                            onClick={onToggleShowAvailable(!filters.showAvailable)}
                        >
                            Show Only Available Aircrew
                        </span>
                        <span
                            className={`text-light wb-pointer badge badge-pill${showSnivs ?
                                ' wb-badge-selected' : ''}`}
                            onClick={onToggleShowSnivs}
                        >
                            Show Snivs
                        </span>
                    </li>
                    <li className="nav-item wb-nav-item text-light">
                        <QualBox
                            qualsList={qualsList}
                            onToggleQual={onToggleQual}
                            filters={filters.qualFilter}
                        />
                    </li>
                    <li className="nav-item wb-nav-item text-light">
                        <QualBox
                            qualsList={groupsList}
                            onToggleQual={onToggleGroup}
                            filters={filters.groupFilter}
                        />
                    </li>
                    <li className="nav-item wb-nav-item text-light">
                        <button className="btn btn-secondary mt-2" onClick={onClearButtonClicked}>Clear</button>
                    </li>
                </div>
                ) :
                (
                    <li className="nav-item wb-nav-item text-light">
                        <QualBox
                            qualsList={filters.qualFilter}
                            onToggleQual={onToggleQual}
                            filters={filters.qualFilter}
                        />
                        <QualBox
                            qualsList={filters.groupFilter}
                            onToggleQual={onToggleGroup}
                            filters={filters.groupFilter}
                        />
                    </li>
                )}
            </ul>
        </div>);
};

export default CrewSearchBox;
