import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IFilters } from '../types/State';
import CrewSearchBox from '../components/CrewSearchBox';
import { getShowSnivs, getShowFilters } from '../reducers';
const { setAircrewSearchForm,
        addQualFilter,
        delQualFilter,
        addGroupFilter,
        delGroupFilter,
        toggleShowSnivs,
        toggleShowFilters } = actions;

const getQualsList = (state: IState): string[] => {
    return state.settings.qualsList;
};

const getGroupsList = (state: IState): string[] => {
    return state.groups.allIds.map(groupId => state.groups.byId[groupId].name);
};

const getFilters = (state: IState): IFilters => {
  // slices of the state this needs for future optimization reference:
  // state.crewListUI.filters
    return state.crewListUI.filters;
};

const mapStateToProps = (state: IState) => {
    return {
        qualsList: getQualsList(state),
        groupsList: getGroupsList(state),
        filters: getFilters(state),
        showSnivs: getShowSnivs(state),
        showFilters: getShowFilters(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onInputChange: (e: any) => {
            dispatch(setAircrewSearchForm({crewSearchInput: e.target.value}));
        },
        onToggleShowSnivs: (event: any) => {
            dispatch(toggleShowSnivs());
        },
        onToggleShowAvailable: (showAvailable: boolean) => (e: any) => {
            dispatch(setAircrewSearchForm({showAvailable}));
        },
        onToggleQual: (qual: string, selected: boolean) => (e: any) => {
            dispatch(selected ? delQualFilter(qual) : addQualFilter(qual));
        },
        onToggleGroup: (group: string, selected: boolean) => (e: any) => {
            dispatch(selected ? delGroupFilter(group) : addGroupFilter(group));
        },
        onClearButtonClick: () => {
            dispatch(setAircrewSearchForm({
                crewSearchInput: '',
                qualFilter: [],
                groupFilter: [],
                rankFilter: [],
            }));
        },
        onShowFilterClick: () => {
            dispatch(toggleShowFilters());
        },
    };
};

const CrewSearchBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CrewSearchBox);

export default CrewSearchBoxContainer;
