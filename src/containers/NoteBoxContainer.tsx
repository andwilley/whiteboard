import { connect } from 'react-redux';
import { actions, IDelNoteArgs } from '../actions';
import { noteEntity, editables } from '../whiteboard-constants';
import { IState, INotes, IFlights, IDays, ISorties, IAircrew, UNoteEntity, IEntity } from '../types/State';
import NoteBox from '../components/NoteBox';
import { getFlightById, getDayById, getSortie, getCrewById, getNotesById } from '../reducers';
import { createSelector } from 'reselect';
import { setErrorsOnFreshState } from './FlexInputContainer';
import { errorTypes } from '../errors';
import { EditorState } from 'draft-js';
const { addUpdateNote, delNote } = actions;

interface INoteBoxContainerProps {
    className?: string;
    entityType: UNoteEntity;
    entityId: string;
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

const makeGetNotes = () => createSelector(
    getNoteEntitySelector,
    getNotesById,
    (notesEntity: IFlights | IDays | ISorties | IAircrew, notesById: IEntity<INotes>['byId']): INotes[] | undefined => {
        /**
         * @returns memoized array of note entities.
         *
         */
        if (notesEntity.notes.length === 0) {
            return undefined;
        }
        return notesEntity.notes.map(noteId => notesById[noteId]);
    }
);

const makeMapStateToProps = () => {
    const getNotes = makeGetNotes();
    const mapStateToProps = (state: IState, ownProps: INoteBoxContainerProps) => {
        return {
            // className: ownProps.className,
            notes: getNotes(state, ownProps),
            // errorLoc: ownProps.entityType,
            // errorLocId: ownProps.entityId,
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
        onDelNoteClick: (args: IDelNoteArgs) => (e: any) => {
            dispatch(delNote(args));
            dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
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
    makeMapStateToProps,
    mapDispatchToProps
)(NoteBox);

export default NoteBoxContainer;
