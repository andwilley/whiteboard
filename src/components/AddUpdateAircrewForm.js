import React from 'react';
import PropTypes from 'prop-types';

const parseRank = rank => {
    const validRanks = {
        "second lieutenant": 1,
        "2nd lieutenant": 1,
        "2ndlt": 1,
        "2lt": 1,
        "first lieutenant": 2,
        "1st lieutenant": 2,
        "1stlt": 2,
        "1lt": 2,
        "captain": 3,
        "capt": 3,
        "cap": 3,
        "major": 4,
        "maj": 4,
        "lieutenant colonel": 5,
        "ltcol": 5,
        "lcol": 5,
        "colonel": 6,
        "col": 6,
        "brigadier general": 7,
        "bgen": 7,
        "major general": 8,
        "mgen": 8,
        "lieutenant general": 9,
        "lgen": 9,
    };
    if (rank === parseInt(rank,10)) {
        return rank;
    }
    rank = rank.toLowerCase();
    if (validRanks[rank]) {
        return validRanks[rank];
    }
    const rankPattern = /[Oo]?-?([1-9])/;
    const rankMatch = rank.match(rankPattern);
    if (rankMatch !== null) {
        return parseInt(rankMatch[1],10);
    }
    return 0;
};

const intToRank = intRank => {
    switch (intRank) {
        case 1:
            return "1stLt";
        case 2:
            return "2ndLt";
        case 3:
            return "Capt";
        case 4:
            return "Maj";
        case 5:
            return "LtCol";
        case 6:
            return "Col";
        case 7:
            return "BGen";
        case 8:
            return "MGen";
        case 9:
            return "LGen";
        case 10:
            return "Gen";
        default:
            return "";
    }
};

const AddUpdateAircrewForm = ({ onInputChange, onSubmit, aircrewFormValues }) => {
    const rankIsValid = aircrewFormValues.rank === 0 ? true : parseRank(aircrewFormValues.rank);
    return (
        <form onSubmit={e => {
            e.preventDefault();
            onSubmit({
                id: aircrewFormValues.id,
                callsign: aircrewFormValues.callsign,
                first: aircrewFormValues.first,
                last: aircrewFormValues.last,
                rank: aircrewFormValues.rank,
                seat: aircrewFormValues.seat,
                quals: aircrewFormValues.quals,
            });
            // reset form values
        }}><br />
            Add or Update Aircrew:<br />
            <input type="hidden" name="id" value={aircrewFormValues.id} />
            <input type="text" placeholder="Callsign*" name="callsign" value={aircrewFormValues.callsign} onChange={onInputChange} required />
            <input type="text" placeholder="First" name="first" value={aircrewFormValues.first} onChange={onInputChange} />
            <input type="text" placeholder="Last" name="last" value={aircrewFormValues.last} onChange={onInputChange} />
            <input type="text" placeholder="Rank" name="rank" style={{borderColor: rankIsValid ? "" : "red",}} value={aircrewFormValues.rank === 0 ? "" : aircrewFormValues.rank} onChange={onInputChange} />
            <select type="select" name="seat" value={aircrewFormValues.seat} onChange={onInputChange}>
                <option value="pilot">
                    Pilot
                </option>
                <option value="wso">
                    WSO
                </option>
            </select><br />
            { aircrewFormValues.qualsList.map( qual => {
                return (<label htmlFor="qual" key={qual}><input type="checkbox" name="quals" value={qual} checked={aircrewFormValues.quals.indexOf(qual) > -1 ? "checked" : ""} onChange={onInputChange} />{qual}</label>);
            })}<br />
            <button type="submit" disabled={aircrewFormValues.callsign === "" ? "disabled" : ""}>Submit</button>
        </form>
    );
};

export default AddUpdateAircrewForm;   