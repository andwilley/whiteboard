import { connect } from 'react-redux';
import Sortie from '../components/Sortie';
import { getSortie } from '../reducers';
import { IState, IFlights } from '../types/State';
import {
    DroppableProvided,
    DraggableProvidedDraggableProps,
    DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface ISortieContainerProps {
    sortieId: string;
    flight: IFlights;
    isDragging?: boolean;
    draggableRef?: DroppableProvided['innerRef'];
    draggableProps?: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const mapStateToProps = (state: IState, ownProps: ISortieContainerProps) => {
    return {
        flight: ownProps.flight,
        sortie: getSortie(state, ownProps.sortieId),
        isDragging: ownProps.isDragging,
        draggableRef: ownProps.draggableRef,
        draggableProps: ownProps.draggableProps,
        dragHandleProps: ownProps.dragHandleProps,
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
