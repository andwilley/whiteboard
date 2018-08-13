import { DropResult, HookProvided, DragUpdate } from 'react-beautiful-dnd';
import { actions } from '../actions';
import { noteEntity } from '../whiteboard-constants';
import { setErrorsOnFreshState } from '../containers/FlexInputContainer';
import { errorTypes, errorLocs } from '../errors';

export const onDragEnd = (dispatch: any) => (result: DropResult, provided: HookProvided): void => {
    const { source, destination, type } = result;
    if (!destination) {
        return;
    }
    if (destination.droppableId === source.droppableId &&
        destination.index === source.index) {
            return;
    }
    switch (type) {
        case noteEntity.DAY_NOTE:
            dispatch(actions.reorderNotes(
                type,
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            ));
            break;
        case noteEntity.FLIGHT_NOTE:
            dispatch(actions.reorderNotes(
                type,
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            ));
            break;
        case errorLocs.SORTIE:
            dispatch(actions.reorderSorties(
                source.droppableId,
                destination.droppableId,
                source.index,
                destination.index
            ));
            break;
        default:
            return;
    }
    dispatch(setErrorsOnFreshState([errorTypes.SCHEDULE_CONFLICT]));
};

export const onDragUpdate = (update: DragUpdate, provided: HookProvided) => {
    console.log(
        'draggableId: ', update.draggableId,
        'draggable type: ', update.type,
        'source: ', update.source,
        'dest: ', update.destination
    );
};
