import React from 'react';
import PropTypes from 'prop-types';

const AddAircrewForm = ({ onSubmit }) => {
    let rank, callsign, first, last;
    let quals = [];
    const qualsList = ["SL","DL","MC","FAI","MDTI","WTI","ACM","ODO","LAT","PMCF"]
    return (
    <form onSubmit={e => {
        e.preventDefault();
        if (!callsign.value.trim()) {
            return;
        }
        onSubmit({
            rank: rank.value.trim(),
            callsign: callsign.value.trim(),
            first: first.value.trim(),
            last: last.value.trim(),
            quals: quals.filter(qual => qual.checked).map(qual => qual.value),
        });
        rank.value = callsign.value = first.value = last.value = '';
        quals = quals.map(qual => qual.checked = false);
    }}>
        <input type="text" placeholder={"Callsign"} ref={node => { callsign = node }} required />
        <input type="text" placeholder={"Rank"} ref={node => { rank = node }} />
        <input type="text" placeholder={"First"} ref={node => { first = node }} />
        <input type="text" placeholder={"Last"} ref={node => { last = node }} />
        { qualsList.map( qual => {
             return (<label key={qual}><input type="checkbox" name="quals" ref={(node) => {quals.push(node)}} value={qual} />{qual}</label>);
        })}
        <button type="Submit">
            { "Add Aircrew" }
        </button>
    </form>
)};

export default AddAircrewForm;   