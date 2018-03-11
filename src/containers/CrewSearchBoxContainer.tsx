import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState } from '../types/State';
import { IFilters } from '../types/WhiteboardTypes';
import CrewSearchBox from '../components/CrewSearchBox';
const { setAircrewSearchForm,
        addQualFilter,
        delQualFilter } = actions;

const getCrewSearchInput = (state: IState): string => {
    return state.crewListUI.crewSearchInput;
};

const getQualsList = (state: IState): string[] => {
    return state.crewListUI.qualsList;
};

const getFilters = (state: IState): IFilters => {
    return {
        qualFilter: state.crewListUI.qualFilter,
        rankFilter: state.crewListUI.rankFilter,
    };
};

const mapStateToProps = (state: IState) => {
    return {
        crewSearchInput: getCrewSearchInput(state),
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
