import * as React from 'react';
import { ISorties, IFlights } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';
import IconButton from './IconButton';
import HrNarrow from './HrNarrow';

interface ISortieProps {
    sortie: ISorties;
    flight: IFlights;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie, flight, onDelSortieClick }) => (
    <div className="wb-only-hover">
    <HrNarrow / >
    <div className="row">
        {/* {flight.sim
        ?   null
        :   <div className="col-10">
                <LoadoutBoxContainer
                    sortieId={sortie.id}
                />
            </div>} */}
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
