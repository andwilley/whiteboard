import { connect } from 'react-redux';
import { actions, IDelNoteArgs } from '../actions';
import { noteEntity } from '../whiteboard-constants';
import { IState, INotes, IFlights, IDays, ISorties, IAircrew, IErrors, UNoteEntity } from '../types/State';
import NoteBox from '../components/NoteBox';
const { addUpdateNote, delNote } = actions;

interface INoteBoxContainerProps {
    entityType: UNoteEntity;
    entityId: string;
    errors?: IErrors[];
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
    let entity: IFlights | IDays | ISorties | IAircrew;
    switch (entityType) {
        case noteEntity.FLIGHT_NOTE:
            entity = state.flights.byId[entityId];
            break;
        case noteEntity.DAY_NOTE:
            entity = state.days.byId[entityId];
            break;
        case noteEntity.SORTIE_NOTE:
            entity = state.sorties.byId[entityId];
            break;
        case noteEntity.AIRCREW_NOTE:
            entity = state.aircrew.byId[entityId];
            break;
        default:
            return [];
    }

    return entity.notes.map(noteId => state.notes.byId[noteId]);
};

const mapStateToProps = (state: IState, ownProps: INoteBoxContainerProps) => {
    return {
        notes: getNotes(ownProps.entityType, ownProps.entityId, state),
        errorLoc: ownProps.entityType,
        errorLocId: ownProps.entityId,
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
        onDelNoteClick: (args: IDelNoteArgs) => (e: any) => {
            dispatch(delNote(args));
        },
        onInputChange: (noteId: string) => (inputValue: string): void => {
            dispatch(addUpdateNote({
                id: noteId,
                entity: ownProps.entityType,
                entityId: ownProps.entityId,
                content: inputValue,
            }));
        },
    };
};

const NoteBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteBox);

export default NoteBoxContainer;
