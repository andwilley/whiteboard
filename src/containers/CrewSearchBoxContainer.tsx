import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, IFilters } from '../types/State';
import CrewSearchBox from '../components/CrewSearchBox';
const { setAircrewSearchForm,
        addQualFilter,
        delQualFilter } = actions;

const getQualsList = (state: IState): string[] => {
    return state.crewListUI.qualsList;
};

const getFilters = (state: IState): IFilters => {
  // slices of the state this needs for future optimization reference:
  // state.crewListUI.filters
    return state.crewListUI.filters;
};

const mapStateToProps = (state: IState) => {
    return {
        qualsList: getQualsList(state),
        filters: getFilters(state),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onInputChange: (event: any) => {
            const target = event.target;
            const name: string = target.name;
            const value: string = target.value;
            switch (name) {
                case 's_quals':
                    dispatch(target.checked ? addQualFilter(value) : delQualFilter(value));
                    break;
                case 'showAvailable':
                    dispatch(setAircrewSearchForm({showAvailable: value === 'true' ? true : false}));
                    break;
                default:
                    dispatch(setAircrewSearchForm({crewSearchInput: value}));
                    break;
            }
        },
        onClearButtonClick: () => {
            dispatch(setAircrewSearchForm({
                crewSearchInput: '',
                qualFilter: [],
                rankFilter: [],
            }));
        },
    };
};

const CrewSearchBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(CrewSearchBox);

export default CrewSearchBoxContainer;
