import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { whiteboardApp } from './reducers/index'
import { addAircrew, delAircrew, updateAircrew, addAircrewQuals, delAircrewQuals, setCurrentDay, addDay, addFlight, delFlight, updateFlightTime, toggleFlightType, addUpdateNote, delNote, addSortie, delSortie, updatePuckName, updatePuckCode, updatePuckSymbol } from './actions/index'
// import { INITIAL_STATE } from './reducers/initialstate'

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });
let runningState;
let nextState;

const nextState1 = {
	aircrewById: {
		1: {
			id: 1,
			rank: 3,
			first: "Drew",
			last: "Willey",
			callsign: "Steamboat",
			quals: ['FAI'],
			flightPucks: [],
			simPucks: [],
			snivs: {},
			odos: 0,
			notes: [],
		},
	},
	allAircrew: [1],
	daysById: {},
	allDays: [],
	flightsById: {},
	allFlights: [],
	notesById: {},
	allNotes: [],
	crewList: {},
	sortiesById: {},
	allSorties: [],
};
const nextState335 = {
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
			notes: [1],
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

const runningState1 = whiteboardApp({},addAircrew({
		callsign: 'Steamboat',
		id: 1,
		rank: 3,
		first: "Drew",
		last: "Willey",
		quals: ['FAI']}
));

test('add crew steam', () => {
	expect(runningState1)
	.toEqual(nextState1);
});

// ************ test add crew
		
let runningState2 = whiteboardApp(runningState1,addAircrew({
	callsign: 'Jambo',
	id: 2,
	rank: 3,
	first: "Alex",
	last: "Blank",
	quals: ['FAI']}
));

let nextState2 = {
	...nextState1,
	aircrewById: {
		...nextState1.aircrewById,
		[2]: {
			id: 2,
			rank: 3,
			first: "Alex",
			last: "Blank",
			callsign: "Jambo",
			quals: ['FAI'],
			flightPucks: [],
			simPucks: [],
			snivs: {},
			odos: 0,
			notes: [],
		},
	},
	allAircrew: nextState1.allAircrew.concat(2),
};

test('add crew jambo', () => {
	expect(runningState2)
	.toEqual(nextState2);
});

// ****************** test del crew

let runningState3 = whiteboardApp(runningState2,addAircrew({
		callsign: 'Dump',
		id: 3,
		rank: 3,
		first: "Mark",
		last: "Infante",
		quals: ['FAI']}
));

runningState3 = whiteboardApp(runningState3,delAircrew(2));
runningState3 = whiteboardApp(runningState3,delAircrew(3));

test('del crew dump and jambo', () => {
	expect(runningState3)
	.toEqual(nextState1);
});

// ****************** test update crew

let runningState4 = whiteboardApp(runningState3,updateAircrew({
	id: 1,
	rank: 4,
	first: "Andrew",
	callsign: 'no one',
}));

let nextState4 = {
	...nextState1,
	aircrewById: {
		...nextState1.aircrewById,
		[1]: {
			...nextState1.aircrewById[1],
			rank: 4,
			first: "Andrew",
			callsign: 'no one',
		}
	}
}

test('update crew steam', () => {
	expect(runningState4)
	.toEqual(nextState4);
});

// ****************** test add / del quals

let runningState5 = whiteboardApp(runningState4,addAircrewQuals(
	1,
	["FAI","SL","DL","MC","MC"]
));

runningState5 = whiteboardApp(runningState5,delAircrewQuals(
	1,
	["ML"]
));

runningState5 = whiteboardApp(runningState5,delAircrewQuals(
	1,
	["DL","MC"]
));

let nextState5 = {
	...nextState4,
	aircrewById: {
		...nextState4.aircrewById,
		[1]: {
			...nextState4.aircrewById[1],
			quals: nextState4.aircrewById[1].quals.concat(["SL"]),
		}
	}
}

test('add del quals steam', () => {
	expect(runningState5)
	.toEqual(nextState5);
});

// ********************* test set current day

const runningState6 = whiteboardApp(runningState5,setCurrentDay(
	'2018-01-09'
));

const nextState6 = {
	...nextState5,
	crewList: {
		currentDay: '2018-01-09',
	}
}

test('set current day', () => {
	expect(runningState6)
	.toEqual(nextState6);
});

// ****************** test add day

let runningState144 = {};																			// get rid of this

const runningState7 = whiteboardApp(runningState6,addDay(
	'2018-01-24'
));

const nextState7 = {
	...nextState6,
	daysById: {
		'2018-01-24': {
			id: '2018-01-24',
			crewPucked: [],
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

test('add day', () => {
	expect(runningState7)
	.toEqual(nextState7);
});

// *********************** test add flight

let runningState8 = whiteboardApp(runningState7,addFlight(
	1,
	'2018-01-24'
));

runningState8 = whiteboardApp(runningState8,addFlight(
	2,
	'2018-01-24'
));

const nextState8 =  {
	...nextState7,
	daysById: {
		...nextState7.daysById,
		'2018-01-24': {
			...nextState7.daysById['2018-01-24'],
			flights: [1,2]
		},
	},
	flightsById: {
		1: {
			id: 1,
			sim: false,
			// flow: "pit",
			times: {
				brief: null,
				takeoff: null,
				land: null,
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
		2: {
			id: 2,
			sim: false,
			// flow: "pit",
			times: {
				brief: null,
				takeoff: null,
				land: null,
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
	},
	allFlights: [1,2],
}

test('add flights', () => {
	expect(runningState8)
	.toEqual(nextState8);
});

// ********************* test del flight

const runningState9 = whiteboardApp(runningState8,delFlight(
	2,
	'2018-01-24'
));

const nextState9 = {
	...nextState8,
	daysById: {
		...nextState8.daysById,
		'2018-01-24': {
			...nextState8.daysById['2018-01-24'],
			flights: [1],
		},
	},
	'flightsById': {
		1: {
			id: 1,
			sim: false,
			// flow: "pit",
			times: {
				brief: null,
				takeoff: null,
				land: null,
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
	},
	'allFlights': [1]
}

test('del flights', () => {
	expect(runningState9)
	.toEqual(nextState9);
});

// ******************** test update flight times

const runningState10 = whiteboardApp(runningState9,updateFlightTime(
	1,
	'takeoff',
	'0900',
));

const nextState10 = {
	...nextState9,
	'flightsById': {
		1: {
			id: 1,
			sim: false,
			// flow: "pit",
			times: {
				brief: null,
				takeoff: '0900',
				land: null,
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
	},
}

test('update flight times', () => {
	expect(runningState10)
	.toEqual(nextState10);
});

// ************************ test toggle sim

const runningState11 = whiteboardApp(runningState10,toggleFlightType(
	1,
));

const nextState11 = {
	...nextState10,
	'flightsById': {
		...nextState10.flightsById,
		1: {
			...nextState10.flightsById[1],
			sim: true,
		},
	},
}

test('toggle flight type', () => {
	expect(runningState11)
	.toEqual(nextState11);
});

// ******************** test add flight note

let runningState12 = whiteboardApp(runningState11,addUpdateNote({
	id: 1,
	entity: 'flight',
	entityId: '1',
}));

runningState12 = whiteboardApp(runningState12,addUpdateNote({
	id: 2,
	entity: 'flight',
	entityId: '1',
	content: 'nothing',
}));

const nextState12 = {
	...nextState11,
	flightsById: {
		...nextState11.flightsById,
		1: {
			...nextState11.flightsById[1],
			notes: [1,2],
		},
	},
	notesById: {
		1: {
			id: 1,
			content: ''
		},
		2: {
			id: 2,
			content: 'nothing'
		},
	},
	allNotes: [1,2],
}

test('add flight notes', () => {
	expect(runningState12)
	.toEqual(nextState12);
});

// ******************* test update / del flight note

let runningState13 = whiteboardApp(runningState12,addUpdateNote({
	id: 1,
	entity: 'flight',
	entityId: 1,
	content: '0800: test',
}));

runningState13 = whiteboardApp(runningState13,delNote({
	id: 2,
	entity: 'flight',
	entityId: 1,
}));

const nextState13 = {
	...nextState12,
	flightsById: {
		...nextState12.flightsById,
		1: {
			...nextState12.flightsById[1],
			notes: [1],
		},
	},
	notesById: {
		1: {
			id: 1,
			content: '0800: test'
		},
	},
	allNotes: [1],
}

test('update / del notes', () => {
	expect(runningState13)
	.toEqual(nextState13);
});

// ******************* test add day, aircrew, flight note

let runningState14 = whiteboardApp(runningState13,addUpdateNote({
	id: 3,
	entity: 'day',
	entityId: '2018-01-24',
	content: '0900: test test',
}));

runningState14 = whiteboardApp(runningState14,addUpdateNote({
	id: 4,
	entity: 'aircrew',
	entityId: '1',
	content: 'test aircrew note',
}));

runningState14 = whiteboardApp(runningState14,addUpdateNote({
	id: 5,
	entity: 'flight',
	entityId: '1',
	content: 'test flight note',
}));

const nextState14 = {
	...nextState13,
	'aircrewById': {
		...nextState13.aircrewById,
		[1]: {
			...nextState13.aircrewById[1],
			notes: [4],
		},
	},
	'flightsById': {
		...nextState13.flightsById,
		[1]: {
			...nextState13.flightsById[1],
			notes: nextState13.flightsById[1].notes.concat([5]),
		},
	},
	'daysById': {
		...nextState13.daysById,
		'2018-01-24': {
			...nextState13.daysById['2018-01-24'],
			notes: nextState13.daysById['2018-01-24'].notes.concat(3),
		},
	},
	'allNotes': [1,3,4,5],
	'notesById': {
		...nextState13.notesById,
		3: {
			id: 3,
			content: '0900: test test',
		},
		4: {
			id: 4,
			content: 'test aircrew note',
		},
		5: {
			id: 5,
			content: 'test flight note',
		},
	}
}

test('add day notes', () => {
	expect(runningState14)
	.toEqual(nextState14);
});

// ******************* test update day note

const runningState15 = whiteboardApp(runningState14,addUpdateNote({
	id: 3,
	entity: 'day',
	entityId: '2018-01-24',
	content: '1000: testing',
}));

const nextState15 = {
	...nextState14,
	'notesById': {
		...nextState14.notesById,
		3: {
			...nextState14.notesById[3],
			content: '1000: testing',
		}
	}
}

test('update day notes', () => {
	expect(runningState15)
	.toEqual(nextState15);
});


// ******************* test del day note

const runningState16 = whiteboardApp(runningState15,delNote({
	id: 3,
	entity: 'day',
	entityId: '2018-01-24',
}));


const newNotes = Object.assign({}, nextState15.notesById);
delete newNotes[3];
const nextState16 = {
	...nextState15,
	'notesById': {
		...newNotes
	},
	'allNotes': nextState15.allNotes.filter(noteId => noteId != 3),
	'daysById': {
		...nextState15.daysById,
		'2018-01-24': {
			...nextState15.daysById['2018-01-24'],
			notes: nextState15.daysById['2018-01-24'].notes.filter(noteId => noteId != 3)
		}
	}
}

test('del day notes', () => {
	expect(runningState16)
	.toEqual(nextState16);
});

// ******************* test add sorties

let runningState17 = whiteboardApp(runningState16,addSortie(
	1,
	1
));

runningState17 = whiteboardApp(runningState17,addSortie(
	2,
	1
));

const nextState17 = {
	...nextState16,
	'flightsById': {
		...nextState16.flightsById,
		1: {
			...nextState16.flightsById[1],
			sorties: [1,2],
		}
	},
	'sortiesById': {
		1: {
			id: 1,
			front: {
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			back: {
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			loadout: "",
			notes: [],
		},
		2: {
			id: 2,
			front: {
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			back: {
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			loadout: "",
			notes: [],
		},
	},
	'allSorties': [1,2],
};

test('add sortie', () => {
	expect(runningState17)
	.toEqual(nextState17);
});

// ******************* test del sorties

const runningState18 = whiteboardApp(runningState17,delSortie(
	2,
	1
));

const nextState18 = {
	...nextState17,
	'flightsById': {
		...nextState17.flightsById,
		1: {
			...nextState17.flightsById[1],
			sorties: [1],
		}
	},
	'sortiesById': {
		1: {
			id: 1,
			front: {
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			back: {
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			loadout: "",
			notes: [],
		},
	},
	'allSorties': [1],
};

test('del sortie', () => {
	expect(runningState18)
	.toEqual(nextState18);
});

// ************************ test add del sortie notes

let runningState19 = whiteboardApp(runningState18,addUpdateNote({
	id: 6,
	entity: 'sortie',
	entityId: '1',
	content: 'test sortie note',
}));

runningState19 = whiteboardApp(runningState19,addUpdateNote({
	id: 7,
	entity: 'sortie',
	entityId: '1',
	content: 'another test sortie note',
}));

runningState19 = whiteboardApp(runningState19,addUpdateNote({
	id: 6,
	entity: 'sortie',
	entityId: '1',
	content: 'changed note text',
}));

runningState19 = whiteboardApp(runningState19,delNote({
	id: 7,
	entity: 'sortie',
	entityId: '1',
}));

const nextState19 = {
	...nextState18,
	'sortiesById': {
		...nextState18.sortiesById,
		1: {
			...nextState18.sortiesById[1],
			notes: nextState18.sortiesById[1].notes.concat([6]),
		},
	},
	'allNotes': nextState18.allNotes.concat([6]),
	'notesById': {
		...nextState18.notesById,
		6: {
			id: 6,
			content: 'changed note text',
		},
	}
}

test('add del sortie note', () => {
	expect(runningState19)
	.toEqual(nextState19);
});

// *********************** test update puck name/code/symbol

let runningState20 = whiteboardApp(runningState19,updatePuckName({
	sortieId: 1,
	crewPosition: 'front',
	name: 'steam',
}));

runningState20 = whiteboardApp(runningState20,updatePuckCode({
	sortieId: 1,
	crewPosition: 'front',
	codes: '2305,2402, hjk6301',
}));

runningState20 = whiteboardApp(runningState20,updatePuckSymbol({
	sortieId: 1,
	crewPosition: 'front',
	symbols: '# $%, @,ten=my++*',
}));

const nextState20 = {
	...nextState19,
	"sortiesById": {
		...nextState19.sortiesById,
		1: {
			...nextState19.sortiesById[1],
			front: {
				inputName: 'steam',
				crewId: null,
				codes: ["2305","2402","6301"],
				symbols: ['#','$','%','@','=','+','*'],
			},
		},
	},
};

test('update puck info', () => {
	expect(runningState20)
	.toEqual(nextState20);
});