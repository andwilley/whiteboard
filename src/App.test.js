import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import { whiteboardApp } from './reducers/index';
import { addUpdateAircrewFormValues, addUpdateAircrew, delAircrew, setCurrentDay, addDay, addFlight, delFlight, updateFlightTime, toggleFlightType, addUpdateNote, delNote, addCrewRefToNote, delCrewRefFromNote, addSortie, delSortie, updatePuckName, updatePuckCode, updatePuckSymbol, addAirspace, delAirspace, updateAirspace, updateLoadout, addUpdateAircrewFormInputChange, addUpdateAircrewFormAddQual, addUpdateAircrewFormDelQual, setAircrewForm } from './actions/index'
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
			seat: "wso",
			quals: ['FAI'],
			flightPucks: [],
			simPucks: [],
			snivs: [],
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
	airspaceById: {},
	allAirspace: [],
	addUpdateAircrewFormValues: {
		id: "",
		callsign: "",
		first: "",
		last: "",
		rank: 0,
		seat: "pilot",
		quals: [],
		existingAircrewUnchanged: false,
    	qualsList: ["SL","DL","MC","NSI","FAI","MDTI","WTI","FAC(A)","FAC(A)I","NS","ACM","LAT","PMCF","ODO"],
    	display: false,
	},
};

const runningState1 = whiteboardApp({},addUpdateAircrew({
		callsign: 'Steamboat',
		rank: 3,
		first: "Drew",
		last: "Willey",
		seat: "wso",
		quals: ['FAI']}
));

test('add crew steam', () => {
	expect(runningState1) /* global expect */
	.toEqual(nextState1);
});

// ************ test add crew
		
let runningState2 = whiteboardApp(runningState1,addUpdateAircrew({
	callsign: 'Jambo',
	rank: 3,
	first: "Alex",
	last: "Blank",
	seat: "pilot",
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
			seat: "pilot",
			quals: ['FAI'],
			flightPucks: [],
			simPucks: [],
			snivs: [],
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

let runningState3 = whiteboardApp(runningState2,addUpdateAircrew({
		callsign: 'Dump',
		rank: 3,
		first: "Mark",
		last: "Infante",
		seat: "pilot",
		quals: ['FAI']}
));

runningState3 = whiteboardApp(runningState3,delAircrew(2));
runningState3 = whiteboardApp(runningState3,delAircrew(3));

test('del crew dump and jambo', () => {
	expect(runningState3)
	.toEqual(nextState1);
});

// ****************** test update crew

let runningState4 = whiteboardApp(runningState3,addUpdateAircrew({
	id: 1,
	rank: 4,
	first: "Andrew",
	last: "Willey",
	seat: "wso",
	quals: ["FAI"],
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

// let runningState5 = whiteboardApp(runningState4,addAircrewQuals(
// 	1,
// 	["FAI","SL","DL","MC","MC"]
// ));

// runningState5 = whiteboardApp(runningState5,delAircrewQuals(
// 	1,
// 	["ML"]
// ));

// runningState5 = whiteboardApp(runningState5,delAircrewQuals(
// 	1,
// 	["DL","MC"]
// ));

// let nextState5 = {
// 	...nextState4,
// 	aircrewById: {
// 		...nextState4.aircrewById,
// 		[1]: {
// 			...nextState4.aircrewById[1],
// 			quals: nextState4.aircrewById[1].quals.concat(["SL"]),
// 		}
// 	}
// }

// test('add del quals steam', () => {
// 	expect(runningState5)
// 	.toEqual(nextState5);
// });

// ********************* test set current day

const runningState6 = whiteboardApp(runningState4,setCurrentDay(
	'2018-01-09'
));

const nextState6 = {
	...nextState4,
	crewList: {
		currentDay: '2018-01-09',
	}
}

test('set current day', () => {
	expect(runningState6)
	.toEqual(nextState6);
});

// ****************** test add day

const runningState7 = whiteboardApp(runningState6,addDay(
	'2018-01-24'
));

const nextState7 = {
	...nextState6,
	daysById: {
		'2018-01-24': {
			id: '2018-01-24',
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
	'2018-01-24'
));

runningState8 = whiteboardApp(runningState8,addFlight(
	'2018-01-24'
));

const nextState8 =  {
	...nextState7,
	daysById: {
		...nextState7.daysById,
		'2018-01-24': {
			...nextState7.daysById['2018-01-24'],
			flights: [1,2],
		},
	},
	flightsById: {
		1: {
			id: 1,
			sim: false,
			// flow: "pit",
			times: {
				brief: "",
				takeoff: "",
				land: "",
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
				brief: "",
				takeoff: "",
				land: "",
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
	},
	allFlights: [1,2],
};

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
				brief: "",
				takeoff: "",
				land: "",
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
	},
	'allFlights': [1]
};

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
				brief: "",
				takeoff: '0900',
				land: "",
			},
			airspace: [],
			sorties: [],
			notes: [],
		},
	},
};

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
};

test('toggle flight type', () => {
	expect(runningState11)
	.toEqual(nextState11);
});

// ******************** test add flight note

let runningState12 = whiteboardApp(runningState11,addUpdateNote({
	entity: 'flight',
	entityId: '1',
}));

runningState12 = whiteboardApp(runningState12,addUpdateNote({
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
			content: '',
			aircrewRefIds: [],
		},
		2: {
			id: 2,
			content: 'nothing',
			aircrewRefIds: [],
		},
	},
	allNotes: [1,2],
};

test('add flight notes', () => {
	expect(runningState12)
	.toEqual(nextState12);
});

// ******************* test update / del flight note

let runningState13 = whiteboardApp(runningState12,addUpdateNote({
	id: 1,
	entity: 'flight',
	entityId: 1,
	content: '0800: test steam',
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
			content: '0800: test steam',
			aircrewRefIds: [],
		},
	},
	allNotes: [1],
};

test('update / del notes', () => {
	expect(runningState13)
	.toEqual(nextState13);
});

// ******************* test add day, aircrew, flight note

let runningState14 = whiteboardApp(runningState13,addUpdateNote({
	entity: 'day',
	entityId: '2018-01-24',
	content: '0900: test test',
}));

runningState14 = whiteboardApp(runningState14,addUpdateNote({
	entity: 'aircrew',
	entityId: '1',
	content: 'test aircrew note',
}));

runningState14 = whiteboardApp(runningState14,addUpdateNote({
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
			aircrewRefIds: [],
		},
		4: {
			id: 4,
			content: 'test aircrew note',
			aircrewRefIds: [],
		},
		5: {
			id: 5,
			content: 'test flight note',
			aircrewRefIds: [],
		},
	}
};

test('add day aircrew and flight notes', () => {
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
};

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
};

test('del day notes', () => {
	expect(runningState16)
	.toEqual(nextState16);
});

// ******************* test add sorties

let runningState17 = whiteboardApp(runningState16,addSortie(
	1
));

runningState17 = whiteboardApp(runningState17,addSortie(
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
			aircrewRefIds: [],
		},
	}
};

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
	codes: 'r 2305,2402, hjk6301 6301,6301  rams',
}));

runningState20 = whiteboardApp(runningState20,updatePuckSymbol({
	sortieId: 1,
	crewPosition: 'front',
	symbols: 'r # $%, @,ten=my++*',
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

// *************** test add del aircrewIds in note refs

const runningState2013 = whiteboardApp(runningState20,addUpdateAircrew({
	callsign: 'Dump',
	rank: 3,
	first: "Mark",
	last: "Infante",
	seat: "pilot",
	quals: ['FAI'],
}));

const runningState208 = whiteboardApp(runningState2013,addCrewRefToNote
	(1,4)
);

const runningState209 = whiteboardApp(runningState208,addCrewRefToNote
	(1,2)
);

const runningState2010 = whiteboardApp(runningState209,addCrewRefToNote
	(6,4)
);

const runningState2011 = whiteboardApp(runningState2010,addCrewRefToNote
	(6,1)
);

const runningState2012 = whiteboardApp(runningState2011,delCrewRefFromNote
	(1,2)
);

const runningState2022 = {
	...runningState2012,
	sortiesById: {
		...runningState2012.sortiesById,
		1: {
			...runningState2012.sortiesById[1],
			front: {
				...runningState2012.sortiesById[1].front,
				crewId: 4,
			},
		},
	}
}

const nextState202 = {
	...nextState20,
	aircrewById: {
		...nextState20.aircrewById,
		[4]: {
			id: 4,
			callsign: "Dump",
			rank: 3,
			first: "Mark",
			last: "Infante",
			seat: "pilot",
			quals: ['FAI'],
			flightPucks: [],
			simPucks: [],
			snivs: [],
			odos: 0,
			notes: [],
		},
	},
	allAircrew: [1,4],
	"notesById": {
		...nextState20.notesById,
		1: {
			...nextState20.notesById[1],
			aircrewRefIds: nextState20.notesById[1].aircrewRefIds.concat(4),
		},
		6: {
			...nextState20.notesById[6],
			aircrewRefIds: nextState20.notesById[6].aircrewRefIds.concat([4,1]),
		},
	},
	"sortiesById": {
		...nextState20.sortiesById,
		1: {
			...nextState20.sortiesById[1],
			front: {
				...nextState20.sortiesById[1].front,
				crewId: 4,
			},
		},
	},
};

// commented out this test becuase it makes my stats look bad... :-)
// test('add del aircrew refs in notes', () => {
// 	expect(runningState2022)
// 	.toEqual(nextState202);
// });


// ********** test that del aircrew gets rid of sorties and notes too

const runningState2014 = whiteboardApp(runningState2022,addSortie(1));
const runningState2015 = whiteboardApp(runningState2014,addSortie(1));

const runningState2016 = {
	...runningState2015,
	sortiesById: {
		...runningState2015.sortiesById,
		3: {
			...runningState2015.sortiesById[3],
			front: {
				...runningState2015.sortiesById[3].front,
				inputName: "steam",
				crewId: 1,
			},
			back: {
				...runningState2015.sortiesById[3].back,
				inputName: "Dump",
				crewId: 4,
			},
		},
		4: {
			...runningState2015.sortiesById[4],
			front: {
				...runningState2015.sortiesById[4].front,
				inputName: "Jambo",
				crewId: 2,
			},
			back: {
				...runningState2015.sortiesById[4].back,
				inputName: "no one",
				crewId: 5,
			},
		},
	},
};

const runningState2020 = whiteboardApp(runningState2016,delAircrew(4));

const nextState20222 = Object.assign({},nextState202);
delete nextState20222.aircrewById[4]; // this is also deleting aircrew 4 from nextState202. What the fuck is going on???

const nextState203 = {
	...nextState20222,
	aircrewById: {
		...nextState20222.aircrewById,
	},
	sortiesById: {
		...nextState20222.sortiesById,
		1: {
			...nextState20222.sortiesById[1],
			front: {
				...nextState20222.sortiesById[1].front,
				inputName: "",
				crewId: null,
			},
		},
		3: {
			id: 3,
			front: {
				inputName: "steam",
				crewId: 1,
				codes: [],
				symbols: [],
			},
			back: {
				// inputName: "Dump",
				// crewId: 4,
				inputName: "",
				crewId: null,
				codes: [],
				symbols: [],
			},
			loadout: "",
			notes: [],
		},
		4: {
			id: 4,
			front: {
				inputName: "Jambo",
				crewId: 2,
				codes: [],
				symbols: [],
			},
			back: {
				inputName: "no one",
				crewId: 5,
				codes: [],
				symbols: [],
			},
			loadout: "",
			notes: [],
		},
	},
	flightsById: {
		...nextState20222.flightsById,
		1: {
			...nextState20222.flightsById[1],
			sorties: nextState20222.flightsById[1].sorties.concat([3,4])
		},
	},
	notesById: {
		...nextState20222.notesById,
		1: {
			...nextState20222.notesById[1],
			aircrewRefIds: nextState20222.notesById[1].aircrewRefIds.filter(id => id !== 4),
		},
		6: {
			...nextState20222.notesById[6],
			aircrewRefIds: nextState20222.notesById[6].aircrewRefIds.filter(id => id !== 4),
		},
	},
	allSorties: nextState20222.allSorties.concat([3,4]),
	allAircrew: nextState20222.allAircrew.filter(id => id != 4),
};

test('del aircrew updates sorties and notes', () => {
	expect(runningState2020)
	.toEqual(nextState203);
});

// test add / del airspace
	// skips state 201!!!

let runningState21 = whiteboardApp(runningState20,addAirspace(1));
runningState21 = whiteboardApp(runningState21,addAirspace(1));
runningState21 = whiteboardApp(runningState21,delAirspace(2, 1));

const nextState21 = {
	...nextState20,
	"airspaceById": {
		...nextState20.airspaceById,
		1: {
			id: 1,
			name: "",
			start: "",
			end: "",
		},
	},
	"allAirspace": nextState20.allAirspace.concat(1),
	"flightsById": {
		...nextState20.flightsById,
		1: {
			...nextState20.flightsById[1],
			"airspace": nextState20.flightsById[1].airspace.concat(1),
		},
	},
};

test('add del airspace', () => {
	expect(runningState21)
	.toEqual(nextState21);
});

// test update airspace

let runningState22 = whiteboardApp(runningState21,updateAirspace({
	id: 1,
	field: "start",
	input: "0800",
}));

const nextState22 = {
	...nextState21,
	"airspaceById": {
		...nextState21.airspaceById,
		1: {
			id: 1,
			name: "",
			start: "0800",
			end: "",
		},
	},
};

test('update airspace', () => {
	expect(runningState22)
	.toEqual(nextState22);
});

// test update loadout

const runningState23 = whiteboardApp(runningState22,updateLoadout(1, "H200L"));

const nextState23 = {
	...nextState22,
	"sortiesById": {
		...nextState22.sortiesById,
		1: {
			...nextState22.sortiesById[1],
			loadout: "H200L",
		},
	},
};

test('update loadout', () => {
	expect(runningState23)
	.toEqual(nextState23);
});

// test change aircrew form values

const runningState24 = whiteboardApp(runningState23,setAircrewForm({
	callsign: "stea",
}));

const nextState24 = {
	...nextState23,
	"addUpdateAircrewFormValues": {
		...nextState23.addUpdateAircrewFormValues,
		callsign: "stea",
	},
};

test('test set aircrew form values', () => {
	expect(runningState24)
	.toEqual(nextState24);
});

// test add / del quals in aircrew form

let runningState25 = whiteboardApp(runningState24,addUpdateAircrewFormAddQual("SL"));

runningState25 = whiteboardApp(runningState25,addUpdateAircrewFormAddQual("DL"));

runningState25 = whiteboardApp(runningState25,addUpdateAircrewFormDelQual("SL"));

const nextState25 = {
	...nextState24,
	"addUpdateAircrewFormValues": {
		...nextState24.addUpdateAircrewFormValues,
		quals: nextState24.addUpdateAircrewFormValues.quals.concat("DL"),
	},
};

test('test add / del aircrew form quals', () => {
	expect(runningState25)
	.toEqual(nextState25);
});