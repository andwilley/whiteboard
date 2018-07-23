import { connect } from 'react-redux';
import Sortie from '../components/Sortie';
import { getSortie } from '../reducers';
import { IState, IFlights } from '../types/State';

interface ISortieContainerProps {
    key: string;
    sortieId: string;
    flight: IFlights;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const mapStateToProps = (state: IState, ownProps: ISortieContainerProps) => {
    return {
        flight: ownProps.flight,
        sortie: getSortie(state, ownProps.sortieId),
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: ISortieContainerProps) => {
    return {
        onDelSortieClick: ownProps.onDelSortieClick,
    };
};

const SortieContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Sortie);

export default SortieContainer;
