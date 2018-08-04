import { connect } from 'react-redux';
import { actions, IDelNoteArgs } from '../actions';
import { noteEntity } from '../whiteboard-constants';
import { IState, INotes, IFlights, IDays, ISorties, IAircrew, UNoteEntity, IEntity } from '../types/State';
import NoteBox from '../components/NoteBox';
import { getFlightById, getDayById, getSortie, getCrewById, getNotesById } from '../reducers';
import { createSelector } from 'reselect';
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
    makeMapStateToProps,
    mapDispatchToProps
)(NoteBox);

export default NoteBoxContainer;
