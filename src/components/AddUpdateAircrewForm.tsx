import * as React from 'react';
import AddButton from './AddButton';
import DelButton from './DelButton';
import { IAddUpdateAircrewFormValues } from '../types/State';

const parseRank = (rank: string | number): number => {
    const validRanks = {
        'second lieutenant': 1,
        '2nd lieutenant': 1,
        '2nd lt': 1,
        '2ndlt': 1,
        '2 lt': 1,
        '2lt': 1,
        '2nd': 1,
        'first lieutenant': 2,
        '1st lieutenant': 2,
        '1st lt': 2,
        '1stlt': 2,
        '1 lt': 2,
        '1lt': 2,
        '1st': 2,
        'captain': 3,
        'capt': 3,
        'cap': 3,
        'major': 4,
        'maj': 4,
        'lieutenant colonel': 5,
        'lt col': 5,
        'ltcol': 5,
        'lcol': 5,
        'colonel': 6,
        'col': 6,
        'brigadier general': 7,
        'bgen': 7,
        'major general': 8,
        'mgen': 8,
        'lieutenant general': 9,
        'lt gen': 9,
        'ltgen': 9,
        'lgen': 9,
        'general': 10,
        'gen': 10,
    };
    if (typeof rank === 'number') {
        return rank;
    }
    rank = rank.toLowerCase();
    if (validRanks[rank]) {
        return validRanks[rank];
    }
    const rankPattern = /^[Oo]?-?([1-9]|10)$/;
    const rankMatch = rank.match(rankPattern);
    if (rankMatch !== null) {
        return parseInt(rankMatch[1], 10);
    }
    return 0;
};

const intToRank = (rank: string | number): string => {
    if (typeof rank !== 'number') {
        return rank;
    }
    switch (rank) {
        case 1:
            return '1st Lieutenant';
        case 2:
            return '2nd Lieutenant';
        case 3:
            return 'Captain';
        case 4:
            return 'Major';
        case 5:
            return 'Lieutenant Colonel';
        case 6:
            return 'Colonel';
        case 7:
            return 'Brigadier General';
        case 8:
            return 'Major General';
        case 9:
            return 'Lieutenant Geneneral';
        case 10:
            return 'General';
        default:
            return '';
    }
};

interface IAddUpdateAircrewFormProps {
    onInputChange: () => any;
    onAddUpdateAircrewSubmit: (crew: IAddUpdateAircrewFormValues) => any;
    addUpdateAircrewFormValues: IAddUpdateAircrewFormValues;
    qualsList: string[];
    addUpdateAircrewFormDisplay: boolean;
    onAddAircrewFormButtonClick: () => void;
    onDelAircrewFormButtonClick: () => void;
}

const AddUpdateAircrewForm: React.SFC<IAddUpdateAircrewFormProps> = ({ onInputChange,
                                                                       onAddUpdateAircrewSubmit,
                                                                       addUpdateAircrewFormValues,
                                                                       qualsList,
                                                                       addUpdateAircrewFormDisplay,
                                                                       onAddAircrewFormButtonClick,
                                                                       onDelAircrewFormButtonClick,
}) => {
    const rankIsValid = addUpdateAircrewFormValues.rank === 0 ? true : parseRank(addUpdateAircrewFormValues.rank);
    const onSubmit = (e: any) => {
        e.preventDefault();
        onAddUpdateAircrewSubmit({
            id: addUpdateAircrewFormValues.id,
            callsign: addUpdateAircrewFormValues.callsign.trim(),
            first: addUpdateAircrewFormValues.first.trim(),
            last: addUpdateAircrewFormValues.last.trim(),
            rank: parseRank(addUpdateAircrewFormValues.rank),
            seat: addUpdateAircrewFormValues.seat,
            quals: addUpdateAircrewFormValues.quals,
            existingAircrewUnchanged: addUpdateAircrewFormValues.existingAircrewUnchanged,
        });
    };
    const qualCheckboxList = qualsList.map( (qual: string) => (
        <label htmlFor="qual" key={qual}>
            <input
                type="checkbox"
                name="quals"
                value={qual}
                checked={addUpdateAircrewFormValues.quals.indexOf(qual) > -1 ? true : false}
                onChange={onInputChange}
            />
            {qual}
        </label>
    ));
    const addUpdateAircrewFormDisplayButton = addUpdateAircrewFormDisplay ?
        (
        <div>
            <DelButton onClick={() => onDelAircrewFormButtonClick()}>
                Close This Form
            </DelButton>
        </div>
        ) :
        (
        <div>
            <AddButton onClick={() => onAddAircrewFormButtonClick()}>
                Add Aircrew
            </AddButton>
        </div>
        );
    const addAircrewForm = addUpdateAircrewFormDisplay ?
        (
        <form onSubmit={e => onSubmit(e)}>
            {addUpdateAircrewFormValues.id === '' ? 'Add' : 'Update'} Aircrew:<br />
            <input
                type="hidden"
                name="id"
                value={addUpdateAircrewFormValues.id}
            />
            <input
                type="text"
                placeholder="Callsign*"
                name="callsign"
                value={addUpdateAircrewFormValues.callsign}
                onChange={onInputChange}
                required={true}
                autoFocus={true}
            /><br />
            <input
                type="text"
                placeholder="First"
                name="first"
                value={addUpdateAircrewFormValues.first}
                onChange={onInputChange}
            /><br />
            <input
                type="text"
                placeholder="Last"
                name="last"
                value={addUpdateAircrewFormValues.last}
                onChange={onInputChange}
            /><br />
            <input
                type="text"
                placeholder="Rank"
                name="rank"
                style={{borderColor: rankIsValid ? '' : 'red' }}
                value={intToRank(addUpdateAircrewFormValues.rank)}
                onChange={onInputChange}
            /><br />
            <select name="seat" value={addUpdateAircrewFormValues.seat} onChange={onInputChange}>
                <option value="pilot">
                    Pilot
                </option>
                <option value="wso">
                    WSO
                </option>
            </select><br />
            {qualCheckboxList}<br />
            <button
                type="submit"
                disabled={addUpdateAircrewFormValues.callsign === '' ? true : false}
            >
                {addUpdateAircrewFormValues.existingAircrewUnchanged ? 'Clear' : 'Submit'}
            </button>
        </form>
    ) : null;
    return (
        <div>
            {addUpdateAircrewFormDisplayButton}
            {addAircrewForm}
        </div>
    );
};

export default AddUpdateAircrewForm;
