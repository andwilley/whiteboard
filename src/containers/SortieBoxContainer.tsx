import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState } from '../types/State';
import SortieBox from '../components/SortieBox';
const { addSortie } = actions;

interface SortieBoxContainerProps {
    flightId: string;
}

const getSortieIds = (state: IState, flightId: string): string[] => {
    // slices of the state this needs for future optimization reference:
    // state.flights.allIds
    return state.flights.byId[flightId].sorties;
};

const mapStateToProps = (state: IState, ownProps: SortieBoxContainerProps) => {
    return {
        sortieIds: getSortieIds(state, ownProps.flightId),
    };
};

const mapDispatchToProps = (dispatch: any) => {
    return {
        onAddSortieClick: (flightId: string) => {
            dispatch(addSortie(flightId));
        },
    };
};

const SortieBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortieBox);

export default SortieBoxContainer;
