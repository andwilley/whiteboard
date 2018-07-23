import * as React from 'react';
import { IFlights } from '../types/State';
import IconButton from './IconButton';
import SortieContainer from '../containers/SortieContainer';

interface ISortieBoxProps {
    flightId: string;
    flight: IFlights;
    sortieIds: string[];
    onAddSortieClick: () => void;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const SortieBox: React.SFC<ISortieBoxProps> = ({ flight, sortieIds, onAddSortieClick, onDelSortieClick }) => {
    const sortieComponents = sortieIds.map(sortieId => (
        <SortieContainer key={sortieId} flight={flight} sortieId={sortieId} onDelSortieClick={onDelSortieClick} />
    ));
    return (
            <div>
                {sortieComponents}
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
