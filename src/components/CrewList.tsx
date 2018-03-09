import * as React from 'react';
import Aircrew from './Aircrew';
import AddButton from '../components/AddButton';
import DelButton from '../components/DelButton';
import { IAircrew, IAddUpdateAircrewFormValues } from '../reducers/State';
import AddUpdateAircrewFormContainer from '../containers/AddUpdateAircrewFormContainer';

interface ICrewListProps {
    aircrewList: IAircrew[];
    addUpdateAircrewFormDisplay: boolean;
    onAircrewClick: (id: IAddUpdateAircrewFormValues) => any;
    onXClick: (id: string) => any;
    onEditClick: (crew: IAddUpdateAircrewFormValues) => any;
    onAddAircrewFormButtonClick: () => any;
    onDelAircrewFormButtonClick: () => any;
}

const CrewList: React.SFC<ICrewListProps> = ({
    aircrewList,
    addUpdateAircrewFormDisplay,
    onAircrewClick,
    onXClick,
    onEditClick,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
    }) => {
    const aircrewCompList = aircrewList.map((aircrew: any) => (
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
