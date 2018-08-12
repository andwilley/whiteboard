import { connect } from 'react-redux';
import { actions } from '../actions';
import { noteEntity, editables } from '../whiteboard-constants';
import { IState, IFlights, IDays, ISorties, IAircrew, UNoteEntity } from '../types/State';
import NoteBox from '../components/NoteBox';
import { getFlightById, getDayById, getSortie, getCrewById } from '../reducers';
import { EditorState } from 'draft-js';
const { addUpdateNote } = actions;

interface INoteBoxContainerProps {
    className?: string;
    entityType: UNoteEntity;
    entityId: string;
    showErrors?: boolean;
}

const getNoteEntitySelector = (
    state: IState,
    props: INoteBoxContainerProps
): IFlights | IDays | ISorties | IAircrew => {
    switch (props.entityType) {
        case noteEntity.FLIGHT_NOTE:
            return getFlightById(state, props.entityId);
        case noteEntity.DAY_NOTE:
            return getDayById(state, props.entityId);
        case noteEntity.SORTIE_NOTE:
            return getSortie(state, props.entityId);
        case noteEntity.AIRCREW_NOTE:
            return getCrewById(state, props.entityId);
        default:
            throw(new TypeError(`Note entityType: ${props.entityType} is not valid.`));
    }
};

const getNoteIds = (notesEntity: IFlights | IDays | ISorties | IAircrew): string[] | undefined => {
    /**
     * @returns memoized array of note entities.
     *
     */
    if (notesEntity.notes.length === 0) {
        return undefined;
    }
    return notesEntity.notes;
};

const makeMapStateToProps = () => {
    const mapStateToProps = (state: IState, ownProps: INoteBoxContainerProps) => {
        return {
            noteIds: getNoteIds(getNoteEntitySelector(state, ownProps)),
            ...ownProps,
        };
    };
    return mapStateToProps;
};

const mapDispatchToProps = (dispatch: any, ownProps: INoteBoxContainerProps) => {
    return {
        onAddNoteClick: () => {
            const addNoteAction = addUpdateNote({
                entity: ownProps.entityType,
                entityId: ownProps.entityId,
            });
            dispatch(actions.batchActions(
                addNoteAction,
                actions.setEditorState(EditorState.createEmpty()),
                actions.setEditedElement(editables.NOTE, addNoteAction.payload.id)
            ));
        },
    };
};

const NoteBoxContainer = connect(
    makeMapStateToProps,
    mapDispatchToProps
)(NoteBox);

export default NoteBoxContainer;
