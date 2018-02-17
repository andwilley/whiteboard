import React from 'react';
import PropTypes from 'prop-types';

const parseRank = rank => {
    // rank = rank.toLowerCase();
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

const AddAircrewForm = ({ onSubmit, aircrewToUpd={quals: []} }) => {
    let rank, callsign, first, last;
    let seat = [];
    let quals = [];
    const qualsList = ["SL","DL","MC","NSI","FAI","MDTI","WTI","ACM","ODO","LAT","PMCF"];
    return (
    <form onSubmit={e => {
        e.preventDefault();
        if (!callsign.value.trim()) {
            return;
        }
        onSubmit({
            rank: parseRank(rank.value.trim()),
            callsign: callsign.value.trim(),
            first: first.value.trim(),
            last: last.value.trim(),
            seat: seat.filter(seat => seat.checked)[0].value,
            quals: quals.filter(qual => qual.checked).map(qual => qual.value),
        });
        rank.value = callsign.value = first.value = last.value = '';
        quals = quals.map(qual => qual.checked = false);
        seat = seat.map(seat => {
            if (seat.value === "pilot") {
                seat.checked = true;
                return seat;
            } else {
                seat.checked = false;
                return seat;
            }
        });
    }}><br />
        Add New Aircrew:<br />
        <input type="text" placeholder={"Callsign*"} name="callsign" ref={node => { callsign = node }} value={aircrewToUpd.callsign} required /><br />
        <input type="text" placeholder={"First"} name="first" ref={node => { first = node }} value={aircrewToUpd.first} /><br />
        <input type="text" placeholder={"Last"} name="last" ref={node => { last = node }} value={aircrewToUpd.last} /><br />
        <input type="text" placeholder={"Rank"} name="rank" ref={node => { rank = node }} value={aircrewToUpd.rank} /><br />
        <input type="radio" name="seat" ref={node => { seat.push(node) }} value="pilot" defaultChecked={aircrewToUpd.seat === "wso" ? "" : "defaultChecked"} />Pilot
        <input type="radio" name="seat" ref={node => { seat.push(node) }} value="wso" defaultChecked={aircrewToUpd.seat === "wso" ? "defaultChecked" : ""} />WSO<br />
        Quals:<br />
        { qualsList.map( qual => {
             return (<label key={qual}><input type="checkbox" name="quals" ref={(node) => {quals.push(node)}} value={qual} defaultChecked={aircrewToUpd.quals.indexOf(qual) > -1 ? "defaultChecked" : ""} />{qual}</label>);
        })}
        <br />
        <button type="Submit">
            { "Add Aircrew" }
        </button>
    </form>
)};

export default AddAircrewForm;   