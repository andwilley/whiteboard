import * as React from 'react';
import { IFlights } from '../types/State';
import IconButton from './IconButton';
import SortieContainer from '../containers/SortieContainer';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { errorLocs } from '../errors';

interface ISortieBoxProps {
    flightId: string;
    flight: IFlights;
    sortieIds: string[];
    onAddSortieClick: () => void;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const SortieBox: React.SFC<ISortieBoxProps> = ({ flight, sortieIds, onAddSortieClick, onDelSortieClick }) => {
    const sortieComponents = sortieIds.map((sortieId, i) => (
        <Draggable draggableId={sortieId} index={i} type={errorLocs.SORTIE} key={sortieId}>
            {(provided, snapshot) => (
                <SortieContainer
                    key={sortieId}
                    flight={flight}
                    sortieId={sortieId}
                    isDragging={snapshot.isDragging}
                    onDelSortieClick={onDelSortieClick}
                    draggableRef={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                />
            )}
        </Draggable>
    ));
    return (
        <div>
            <Droppable droppableId={`${errorLocs.FLIGHT}:${flight.id}`} type={errorLocs.SORTIE}>
                {(provided, snapshot) => (
                    <div className="wb-droppable-height" ref={provided.innerRef} {...provided.droppableProps}>
                        {sortieComponents}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
            <div className="col-1">
                <IconButton
                    onClick={() => onAddSortieClick()}
                    icon="plus"
                    size={12}
                    svgClass="mt-3"
                />
            </div>
        </div>
    );
};

export default SortieBox;
