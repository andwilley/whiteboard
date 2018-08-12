import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState } from '../types/State';
import SortieBox from '../components/SortieBox';
import { setErrorsOnFreshState } from './FlexInputContainer';
import { errorTypes } from '../errors';
import { editables } from '../whiteboard-constants';
import { EditorState } from 'draft-js';
const { addSortie, delSortie } = actions;

interface ISortieBoxContainerProps {
    flightId: string;
}

const getSorties = (state: IState, flightId: string): string[] => {
    // slices of the state this needs for future optimization reference:
    // state.flights.allIds
    return state.flights.byId[flightId].sorties;
};

const mapStateToProps = (state: IState, ownProps: ISortieBoxContainerProps) => {
    return {
        sortieIds: getSorties(state, ownProps.flightId),
        flight: state.flights.byId[ownProps.flightId],
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: ISortieBoxContainerProps) => {
    return {
        onAddSortieClick: () => {
            const addSortieAction = addSortie(ownProps.flightId);
            dispatch(actions.batchActions(
                addSortieAction,
                actions.setEditorState(EditorState.createEmpty()),
                actions.setEditedElement(editables.FRONT_SEAT_NAME, addSortieAction.payload.sortieId)
            ));
        },
        onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => {
            dispatch(delSortie(sortieId, flightId));
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
        },
    };
};

const SortieBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SortieBox);

export default SortieBoxContainer;
