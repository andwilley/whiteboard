import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { reducer } from './reducers/index'
import { addAircrew, delAircrew, updateAircrew, addAircrewQuals, delAircrewQuals, setCurrentDay, addDay, addFlight, delFlight } from './actions/index'
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
};

let runningState = reducer(INITIAL_STATE,addAircrew({
		callsign: 'Steamboat',
		id: 1,
		rank: 3,
		first: "Drew",
		last: "Willey",
		quals: ['FAI']}
));

// ************ test add crew
		
// runningState = reducer(runningState,addAircrew({
// 		callsign: 'Jambo',
// 		id: 2,
// 		rank: 3,
// 		first: "Alex",
// 		last: "Blank",
// 		quals: ['FAI']}
// ));

// runningState = reducer(runningState,addAircrew({
// 		callsign: 'Dump',
// 		id: 3,
// 		rank: 3,
// 		first: "Mark",
// 		last: "Infante",
// 		quals: ['FAI']}
// ));

// ****************** test del crew

// runningState = reducer(runningState,delAircrew(2));
// runningState = reducer(runningState,delAircrew(3));

// ****************** test update crew

// runningState = reducer(runningState,updateAircrew({
// 	id: 1,
// 	rank: 4,
// 	first: "Andrew",
// 	callsign: 'no one',
// }));

// ****************** test add / del quals

runningState = reducer(runningState,addAircrewQuals(
	1,
	["FAI","SL","DL"]
));

runningState = reducer(runningState,delAircrewQuals(
	1,
	["ML"]
));

// ********************* test set current day

runningState = reducer(runningState,setCurrentDay(
	'2018-01-09'
));

// ****************** test add day

runningState = reducer(runningState,addDay(
	'2018-01-24'
));

test('add crew reducer', () => {
	expect(runningState)
	.toEqual(nextState);
});