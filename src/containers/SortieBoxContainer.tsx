import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState, ISorties } from '../types/State';
import SortieBox from '../components/SortieBox';
const { addSortie } = actions;

interface ISortieBoxContainerProps {
    flightId: string;
}

const getSorties = (state: IState, flightId: string): ISorties[] => {
    // slices of the state this needs for future optimization reference:
    // state.flights.allIds
    state.flights.byId[flightId].sorties.map(sortieId => {
        console.log(`sortie: ${state.sorties.byId[sortieId]}`); return;
    });
    return state.flights.byId[flightId].sorties.map(sortieId => state.sorties.byId[sortieId]);
};

const mapStateToProps = (state: IState, ownProps: ISortieBoxContainerProps) => {
    return {
        sorties: getSorties(state, ownProps.flightId),
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: ISortieBoxContainerProps) => {
    return {
        onAddSortieClick: () => {
            dispatch(addSortie(ownProps.flightId));
        },
    };
};

const SortieBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortieBox);

export default SortieBoxContainer;