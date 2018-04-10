import { connect } from 'react-redux';
import { actions } from '../actions';
import { IState } from '../types/State';
import NoteBox from '../components/NoteBox';
const { addUpdateNote } = actions;

interface INoteBoxContainerProps {
    entityType: string;
    entityId: string;
}

const getNotes = () => {
    // write this
};

const mapStateToProps = (state: IState, ownProps: INoteBoxContainerProps) => {
    return {
        notes: getNotes(),
    };
};

const mapDispatchToProps = (dispatch: any, ownProps: INoteBoxContainerProps) => {
    const getNoteActionProps = (content: string) => {
        return {
            entity: ownProps.entityType,
            entityId: ownProps.entityId,
            content,
        };
    };
    return {
        onAddNoteClick: () => {
            dispatch(addUpdateNote(getNoteActionProps('')));
        },
        onInputChange: (e: any) => {
            dispatch(addUpdateNote(getNoteActionProps(e.target.value)));
        },
    };
};

const NoteBoxContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(NoteBox);

export default NoteBoxContainer;
