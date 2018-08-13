import * as React from 'react';
import { ISorties, IFlights } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';
import IconButton from './IconButton';
import HrNarrow from './HrNarrow';
import {
    DroppableProvided,
    DraggableProvidedDraggableProps,
    DraggableProvidedDragHandleProps } from 'react-beautiful-dnd';

interface ISortieProps {
    sortie: ISorties;
    flight: IFlights;
    isDragging?: boolean;
    draggableRef?: DroppableProvided['innerRef'];
    draggableProps?: DraggableProvidedDraggableProps;
    dragHandleProps?: DraggableProvidedDragHandleProps | null;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const Sortie: React.SFC<ISortieProps> = ({
    sortie,
    flight,
    onDelSortieClick,
    isDragging = false,
    draggableRef,
    draggableProps,
    dragHandleProps }) => (
    <div
        className={`wb-only-hover bg-white${isDragging ? ' wb-is-dragging' : ''}`}
        ref={draggableRef}
        {...draggableProps}
    >
        <HrNarrow / >
        <div className="row">
            <IconButton
                icon="drag-handle"
                hover="only-hover"
                size={14}
                viewBox={'0 0 20 20'}
                style={{
                    margin: '12px 0px -26px 0px',
                    zIndex: 10,
                }}
                svgClass="float-left"
                dragHandleProps={dragHandleProps}
            />
            <div className={`col-2 offset-10 sim-sortie-icon`}>
                <IconButton
                    onClick={onDelSortieClick(sortie.id, flight.id)}
                    icon="trash"
                    hover="only-hover"
                    size={10}
                    svgClass="float-right mt-1"
                />
            </div>
        </div>
        <CrewBoxContainer
            sortieId={sortie.id}
            flightId={flight.id}
        />
    </div>
);

export default Sortie;
