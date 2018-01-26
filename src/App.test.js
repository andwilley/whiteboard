import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { whiteboardApp } from './reducers/index'
import { addAircrew, delAircrew, updateAircrew, addAircrewQuals, delAircrewQuals, setCurrentDay, addDay, addFlight, delFlight, updateFlightTime, toggleFlightType, addUpdateNote, delNote } from './actions/index'
import { INITIAL_STATE } from './reducers/initialstate'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

const nextState = {
	aircrewById: {
		1: {
			id: 1,
			rank: 3,
			first: "Drew",
			last: "Willey",
			callsign: "Steamboat",
			quals: ['FAI','SL','DL'],
			flightPucks: [],
			simPucks: [],
			snivs: {},
			odos: 0,
		},
		// 2: {
		// 	id: 2,
		// 	rank: 3,
		// 	first: "Alex",
		// 	last: "Blank",
		// 	callsign: "Jambo",
		// 	quals: ['FAI'],
		// 	flightPucks: [],
		// 	simPucks: [],
		// 	snivs: {},
		// 	odos: 0,
		// },
	},
	allAircrew: [1],
	crewList: {
		currentDay: '2018-01-09',
	},
	daysById: {
		'2018-01-24': {
			id: '2018-01-24',
			crewPucked: [],									// by aircrew.<id> as they are added to sorties, used by crewList filters
			// flow: {
			// 	numJets: [],
			// 	method: [],
			// },
			// sun: {
			// 	rise: 0710,
			// 	set: 2031,
			// },
			flights: [],
			notes: [],
		},
	},
	allDays: ['2018-01-24'],
	flightsById: {
		1: {
			id: 1,
			sim: true,
			// flow: "pit",
			times: {
				brief: '0900',
				takeoff: null,
				land: null,
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
		// 2: {
		// 	id: 2,
		// 	sim: false,
		// 	// flow: "pit",
		// 	times: {
		// 		brief: null,
		// 		takeoff: null,
		// 		land: null,
		// 	},
		// 	airspace: [],
		// 	sorties: [],
		// 	notes: [],
		// },
	},
	allFlights: [1],
	notesById: {
		1: {
			id: 1,
			content: '0800: test',
		},
	},
	allNotes: [1],
};

let runningState = whiteboardApp(INITIAL_STATE,addAircrew({
		callsign: 'Steamboat',
		id: 1,
		rank: 3,
		first: "Drew",
		last: "Willey",
		quals: ['FAI']}
));

// ************ test add crew
		
// runningState = whiteboardApp(runningState,addAircrew({
// 		callsign: 'Jambo',
// 		id: 2,
// 		rank: 3,
// 		first: "Alex",
// 		last: "Blank",
// 		quals: ['FAI']}
// ));

// runningState = whiteboardApp(runningState,addAircrew({
// 		callsign: 'Dump',
// 		id: 3,
// 		rank: 3,
// 		first: "Mark",
// 		last: "Infante",
// 		quals: ['FAI']}
// ));

// ****************** test del crew

// runningState = whiteboardApp(runningState,delAircrew(2));
// runningState = whiteboardApp(runningState,delAircrew(3));

// ****************** test update crew

// runningState = whiteboardApp(runningState,updateAircrew({
// 	id: 1,
// 	rank: 4,
// 	first: "Andrew",
// 	callsign: 'no one',
// }));

// ****************** test add / del quals

runningState = whiteboardApp(runningState,addAircrewQuals(
	1,
	["FAI","SL","DL"]
));

runningState = whiteboardApp(runningState,delAircrewQuals(
	1,
	["ML"]
));

// ********************* test set current day

runningState = whiteboardApp(runningState,setCurrentDay(
	'2018-01-09'
));

// ****************** test add day

runningState = whiteboardApp(runningState,addDay(
	'2018-01-24'
));

// *********************** test add flight

runningState = whiteboardApp(runningState,addFlight(
	1,
));

runningState = whiteboardApp(runningState,addFlight(
	2,
));

// ********************* test del flight

runningState = whiteboardApp(runningState,delFlight(
	2,
));

// ******************** test update flight times

runningState = whiteboardApp(runningState,updateFlightTime(
	1,
	'brief',
	'0900',
));

// ************************ test toggle sim

runningState = whiteboardApp(runningState,toggleFlightType(
	1,
));

// ******************** test add / del note

runningState = whiteboardApp(runningState,addUpdateNote(
	1,
	'test',
));

runningState = whiteboardApp(runningState,addUpdateNote(
	2,
	'test',
));

runningState = whiteboardApp(runningState,addUpdateNote(
	1,
	'0800: test',
));

runningState = whiteboardApp(runningState,delNote(
	2,
));

test('add crew reducer', () => {
	expect(runningState)
	.toEqual(nextState);
});