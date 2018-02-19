import React from 'react';
import PropTypes from 'prop-types';

const parseRank = rank => {
    const validRanks = {
        "second lieutenant": 1,
        "2nd lieutenant": 1,
        "2nd lt": 1,
        "2ndlt": 1,
        "2 lt": 1,
        "2lt": 1,
        "first lieutenant": 2,
        "1st lieutenant": 2,
        "1s tlt": 2,
        "1stlt": 2,
        "1 lt": 2,
        "1lt": 2,
        "captain": 3,
        "capt": 3,
        "cap": 3,
        "major": 4,
        "maj": 4,
        "lieutenant colonel": 5,
        "lt col": 5,
        "ltcol": 5,
        "lcol": 5,
        "colonel": 6,
        "col": 6,
        "brigadier general": 7,
        "bgen": 7,
        "major general": 8,
        "mgen": 8,
        "lieutenant general": 9,
        "lt gen": 9,
        "ltgen": 9,
        "lgen": 9,
        "general": 10,
        "gen": 10,
    };
    if (rank === parseInt(rank,10)) {
        return rank;
    }
    rank = rank.toLowerCase();
    if (validRanks[rank]) {
        return validRanks[rank];
    }
    const rankPattern = /^[Oo]?-?([1-9]|10)$/;
    const rankMatch = rank.match(rankPattern);
    if (rankMatch !== null) {
        return parseInt(rankMatch[1],10);
    }
    return 0;
};

const intToRank = rank => {
    if (rank !== parseInt(rank,10)) {
        return rank;
    }
    switch (rank) {
        case 1:
            return "1st Lieutenant";
        case 2:
            return "2nd Lieutenant";
        case 3:
            return "Captain";
        case 4:
            return "Major";
        case 5:
            return "Lieutenant Colonel";
        case 6:
            return "Colonel";
        case 7:
            return "Brigadier General";
        case 8:
            return "Major General";
        case 9:
            return "Lieutenant Geneneral";
        case 10:
            return "General";
        default:
            return "";
    }
};

const AddUpdateAircrewForm = ({ onInputChange, onSubmit, addUpdateAircrewFormValues }) => {
    const rankIsValid = addUpdateAircrewFormValues.rank === 0 ? true : parseRank(addUpdateAircrewFormValues.rank);
    return addUpdateAircrewFormValues.display ? (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit({
                id: addUpdateAircrewFormValues.id,
                callsign: addUpdateAircrewFormValues.callsign,
                first: addUpdateAircrewFormValues.first,
                last: addUpdateAircrewFormValues.last,
                rank: parseRank(addUpdateAircrewFormValues.rank),
                seat: addUpdateAircrewFormValues.seat,
                quals: addUpdateAircrewFormValues.quals,
                existingAircrewUnchanged: addUpdateAircrewFormValues.existingAircrewUnchanged,
            });
        }}>
            {addUpdateAircrewFormValues.id === "" ? "Add" : "Update"} Aircrew:<br />
            <input type="hidden" name="id" value={addUpdateAircrewFormValues.id} />
            <input type="text" placeholder="Callsign*" name="callsign" value={addUpdateAircrewFormValues.callsign} onChange={onInputChange} required />
            <input type="text" placeholder="First" name="first" value={addUpdateAircrewFormValues.first} onChange={onInputChange} />
            <input type="text" placeholder="Last" name="last" value={addUpdateAircrewFormValues.last} onChange={onInputChange} />
            <input type="text" placeholder="Rank" name="rank" style={{borderColor: rankIsValid ? "" : "red",}} value={intToRank(addUpdateAircrewFormValues.rank)} onChange={onInputChange} />
            <select type="select" name="seat" value={addUpdateAircrewFormValues.seat} onChange={onInputChange}>
                <option value="pilot">
                    Pilot
                </option>
                <option value="wso">
                    WSO
                </option>
            </select><br />
            { addUpdateAircrewFormValues.qualsList.map( qual => {
                return (<label htmlFor="qual" key={qual}><input type="checkbox" name="quals" value={qual} checked={addUpdateAircrewFormValues.quals.indexOf(qual) > -1 ? "checked" : ""} onChange={onInputChange} />{qual}</label>);
            })}<br />
            <button type="submit" disabled={addUpdateAircrewFormValues.callsign === "" ? "disabled" : ""}>{addUpdateAircrewFormValues.existingAircrewUnchanged ? "Clear" : "Submit"}</button>
        </form>
    ) :
    "";
};

export default AddUpdateAircrewForm;   