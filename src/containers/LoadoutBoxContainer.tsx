import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState } from '../types/State';
import LoadoutBox from '../components/LoadoutBox';
const { updateLoadout } = actions;

interface ILoadoutBoxContainerProps {
    sortieId: string;
}

const getLoadout = (state: IState, sortieId: string) => {
    return state.sorties.byId[sortieId].loadout;
};

const mapStateToProps = (state: IState, ownProps: ILoadoutBoxContainerProps) => {
    return {
        loadout: getLoadout(state, ownProps.sortieId),
        sortieId: ownProps.sortieId,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: ILoadoutBoxContainerProps) => {
    return {
        onChange: (input: string) => {
            dispatch(updateLoadout(ownProps.sortieId, input));
        },
    };
};

const LoadoutBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoadoutBox);

export default LoadoutBoxContainer;
