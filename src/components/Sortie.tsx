import * as React from 'react';
import { ISorties, IFlights } from '../types/State';
import CrewBoxContainer from '../containers/CrewBoxContainer';
import LoadoutBoxContainer from '../containers/LoadoutBoxContainer';
import IconButton from './IconButton';

interface ISortieProps {
    sortie: ISorties;
    flight: IFlights;
    onDelSortieClick: (sortieId: string, flightId: string) => (e: any) => void;
}

const Sortie: React.SFC<ISortieProps> = ({ sortie, flight, onDelSortieClick }) => (
    <div>
    <hr / >
    <div className="row">
        {flight.sim
        ?   null
        :   <div className="col-10">
                <LoadoutBoxContainer
                    sortieId={sortie.id}
                />
            </div>}
        <div className={`col-2${flight.sim ? ' offset-10 sim-sortie-icon' : ''}`}>
            <IconButton
                onClick={onDelSortieClick(sortie.id, flight.id)}
                icon="trash"
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
