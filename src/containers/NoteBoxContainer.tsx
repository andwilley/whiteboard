import { connect } from 'react-redux';
import { actions } from '../actions';
import { noteEntity } from '../whiteboard-constants';
import { IState, INotes } from '../types/State';
import NoteBox from '../components/NoteBox';
const { addUpdateNote } = actions;

interface INoteBoxContainerProps {
    entityType: string;
    entityId: string;
    errorLoc: string;
}

const getNotes = (entityType: string, entityId: string, state: IState): INotes[] => {
    /**
     * @param
     * @param
     * @param
     * @returns array of note entities.
     *
     * needs:
     * state.notes.byId
     * state.flights.byId
     * state.days.byId
     * state.sorties.byId
     *
     * could pass the actual entity to this so it can cache the value and just pass notes to this.
     *  - i.e. do the switch in mapStateToProps
     */
    let entity;
    switch (entityType) {
        case noteEntity.FLIGHT:
            entity = state.flights.byId[entityId];
            break;
        case noteEntity.DAY:
            entity = state.days.byId[entityId];
            break;
        case noteEntity.SORTIE:
            entity = state.sorties.byId[entityId];
            break;
        default:
            return [];
    }

    return entity.notes.map(noteId => state.notes.byId[noteId]);
};

const mapStateToProps = (state: IState, ownProps: INoteBoxContainerProps) => {
    return {
        notes: getNotes(ownProps.entityType, ownProps.entityId, state),
        errorLoc: ownProps.errorLoc,
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: INoteBoxContainerProps) => {
    return {
        onAddNoteClick: () => {
            dispatch(addUpdateNote({
                entity: ownProps.entityType,
                entityId: ownProps.entityId,
            }));
        },
        onInputChange: (noteId: string) => (e: any): void => {
            dispatch(addUpdateNote({
                id: noteId,
                entity: ownProps.entityType,
                entityId: ownProps.entityId,
                content: e.target.value,
            }));
        },
    };
};

const NoteBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteBox);

export default NoteBoxContainer;
