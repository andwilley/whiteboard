import * as React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import { IAircrewWithPucks, IFilters } from '../types/WhiteboardTypes';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

interface ICrewListProps {
    aircrewList: IAircrewWithPucks[];
    filters: IFilters;
    crewSearchValue: string;
    addUpdateAircrewFormDisplay: boolean;
    onAircrewClick: (crew: IAircrewWithPucks) => any;
    onXClick: (id: string) => any;
    onEditClick: (crew: IAircrewWithPucks) => any;
    onAddAircrewFormButtonClick: () => any;
    onDelAircrewFormButtonClick: () => any;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    filters,
    crewSearchValue,
    addUpdateAircrewFormDisplay,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
    }) => {
    const filteredAircrewList = aircrewList.filter((aircrew: IAircrewWithPucks) => {
        if (filters.qualFilter.length === 0 && filters.rankFilter.length === 0 && crewSearchValue === '') {
            return true;
        }
        if (filters.qualFilter.length > 0) {
            let allQualsMatch = true;
            filters.qualFilter.forEach((qual: string) => {
                if (aircrew.quals.indexOf(qual) === -1) {
                    allQualsMatch = false;
                }
            });
            if (!allQualsMatch) {
                return false;
            }
        }
        if (filters.rankFilter.length > 0) {
            let matchRank = false;
            filters.rankFilter.forEach((rank: number) => {
                if (aircrew.rank === rank) {
                    matchRank = true;
                }
            });
            if (!matchRank) {
                return false;
            }
        }
        if (crewSearchValue !== '') {
            const callsign = aircrew.callsign.toLowerCase();
            const first = aircrew.first.toLowerCase();
            const last = aircrew.last.toLowerCase();
            const searchMatch = callsign.includes(crewSearchValue) ||
                                first.includes(crewSearchValue) ||
                                `${first} ${last}`.includes(crewSearchValue) ||
                                `${last} ${first}`.includes(crewSearchValue) ||
                                `${last}, ${first}`.includes(crewSearchValue);
            if (!searchMatch) {
                return false;
            }
        }
        return true;
    });
    const aircrewCompList = filteredAircrewList.map((aircrew: IAircrewWithPucks) => (
        <Aircrew
            key={aircrew.id}
            aircrew={aircrew}
            onAircrewClick={() => onAircrewClick(aircrew)}
            onXClick={() => onXClick(aircrew.id)}
            onEditClick={() => onEditClick(aircrew)}
        />
    ));
    const formDisplayButton = addUpdateAircrewFormDisplay ?
                (
                <div>
                    <DelButton onClick={() => onDelAircrewFormButtonClick()} />
                    <AddUpdateAircrewFormContainer />
                </div>
                ) :
                (
                <div>
                    <AddButton onClick={() => onAddAircrewFormButtonClick()} />
                </div>
                );
    return (
        <div>
            <ul>
                {aircrewCompList}
            </ul>
            {formDisplayButton}
        </div>
    );
};

export default CrewList;
