import * as React from 'react';
import { IAddUpdateAircrewFormValues } from '../types/State';
import IconButton from './IconButton';
import QualBox from './QualBox';

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
        'hinge': 4,
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
    onToggleQual: (qual: string, selected: boolean) => (e: any) => void;
    onAddUpdateAircrewSubmit: (crew: IAddUpdateAircrewFormValues) => any;
    addUpdateAircrewFormValues: IAddUpdateAircrewFormValues;
    qualsList: string[];
    addUpdateAircrewFormDisplay: boolean;
    onAddAircrewFormButtonClick: () => void;
    onDelAircrewFormButtonClick: () => void;
}

const AddUpdateAircrewForm: React.SFC<IAddUpdateAircrewFormProps> = ({
    onInputChange,
    onToggleQual,
    onAddUpdateAircrewSubmit,
    addUpdateAircrewFormValues,
    qualsList,
    addUpdateAircrewFormDisplay,
    onAddAircrewFormButtonClick,
    onDelAircrewFormButtonClick,
}) => {
    const rankIsValid = addUpdateAircrewFormValues.rank === 0 ? true : parseRank(addUpdateAircrewFormValues.rank);
    const callsignInputRef = React.createRef<HTMLInputElement>();
    const onSubmit = (e: any) => {
        e.preventDefault();
        // focus the first input for quick entry
        if (callsignInputRef.current) {
            callsignInputRef.current.focus();
        }
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
    const addUpdateAircrewFormDisplayButton = addUpdateAircrewFormDisplay ?
        (
        <ul className="nav flex-column">
            <li className="nav-item wb-nav-item text-light">
                Add Aircrew
                <IconButton
                    onClick={() => onDelAircrewFormButtonClick()}
                    icon="chevron-top"
                    svgClass="float-right mt-1 mr-1"
                    size={12}
                />
            </li>
        </ul>
        ) :
        (
        <ul className="nav flex-column">
            <li className="nav-item wb-nav-item text-light">
                Add Aircrew
                <IconButton
                    onClick={() => onAddAircrewFormButtonClick()}
                    icon="chevron-bottom"
                    svgClass="float-right mt-1 mr-1"
                    size={12}
                />
            </li>
        </ul>
        );
    const addAircrewForm = addUpdateAircrewFormDisplay ?
        (
        <form className="col-12 mt-2 mb-3" onSubmit={e => onSubmit(e)}>
            <input
                type="hidden"
                name="id"
                value={addUpdateAircrewFormValues.id}
            />
            <input
                type="text"
                placeholder="Callsign*"
                className="form-control mt-1"
                name="callsign"
                value={addUpdateAircrewFormValues.callsign}
                onChange={onInputChange}
                required={true}
                autoFocus={true}
                ref={callsignInputRef}
            />
            <input
                type="text"
                placeholder="First"
                className="form-control mt-1"
                name="first"
                value={addUpdateAircrewFormValues.first}
                onChange={onInputChange}
            />
            <input
                type="text"
                placeholder="Last"
                className="form-control mt-1"
                name="last"
                value={addUpdateAircrewFormValues.last}
                onChange={onInputChange}
            />
            <input
                type="text"
                placeholder="Rank"
                className="form-control mt-1"
                name="rank"
                style={{borderColor: rankIsValid ? '' : 'red' }}
                value={intToRank(addUpdateAircrewFormValues.rank)}
                onChange={onInputChange}
            />
            <select
                name="seat"
                className="form-control mt-1"
                value={addUpdateAircrewFormValues.seat}
                onChange={onInputChange}
            >
                <option value="pilot">
                    Pilot
                </option>
                <option value="wso">
                    WSO
                </option>
            </select>
            <QualBox
                qualsList={qualsList}
                onToggleQual={onToggleQual}
                filters={addUpdateAircrewFormValues.quals}
                className="mt-2 mb-2"
            />
            <button
                type="submit"
                className={`btn ${addUpdateAircrewFormValues.callsign === '' ? 'btn-secondary' : 'btn-primary'}`}
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
