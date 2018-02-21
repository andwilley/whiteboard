import cuid from "cuid";

// Action Types

export const ADD_UPDATE_AIRCREW_FORM_INPUT_CHANGE = "ADD_UPDATE_AIRCREW_FORM_INPUT_CHANGE";
export const ADD_UPDATE_AIRCREW_FORM_ADD_QUAL = "ADD_UPDATE_AIRCREW_FORM_ADD_QUAL";
export const ADD_UPDATE_AIRCREW_FORM_DEL_QUAL = "ADD_UPDATE_AIRCREW_FORM_DEL_QUAL";
export const SET_AIRCREW_FORM = "SET_AIRCREW_FORM";
export const ADD_UPDATE_AIRCREW = "ADD_AIRCREW";
// export const UPDATE_AIRCREW = "UPDATE_AIRCREW";
export const DEL_AIRCREW = "DEL_AIRCREW";
// export const ADD_AIRCREW_QUALS = "ADD_AIRCREW_QUALS";
// export const DEL_AIRCREW_QUALS = "DEL_AIRCREW_QUALS";
export const SET_QUAL_FILTER = "SET_QUAL_FILTER";
export const SET_CURRENT_DAY = "SET_CURRENT_DAY";
export const ADD_DAY = "ADD_DAY";
export const ADD_FLIGHT = "ADD_FLIGHT";
export const DEL_FLIGHT = "DEL_FLIGHT";
export const UPDATE_FLIGHT_TIME = "UPDATE_FLIGHT_TIME";
export const TOGGLE_FLIGHT_TYPE = "TOGGLE_FLIGHT_TYPE";
export const ADD_UPDATE_NOTE = "ADD_UPDATE_NOTE";
export const DEL_NOTE = "DEL_NOTE";
export const ADD_CREW_REF_TO_NOTE = "ADD_CREW_REF_TO_NOTE";
export const DEL_CREW_REF_FROM_NOTE = "DEL_CREW_REF_FROM_NOTE";
export const ADD_SORTIE = "ADD_SORTIE";
export const DEL_SORTIE = "DEL_SORTIE";
export const UPDATE_PUCK_NAME = "UPDATE_PUCK_NAME";
export const UPDATE_PUCK_CODE = "UPDATE_PUCK_CODE";
export const UPDATE_PUCK_SYMBOL = "UPDATE_PUCK_SYMBOL";
export const ADD_AIRSPACE = "ADD_AIRSPACE";
export const DEL_AIRSPACE = "DEL_AIRSPACE";
export const UPDATE_AIRSPACE = "UPDATE_AIRSPACE";
export const UPDATE_LOADOUT = "UPDATE_LOADOUT";

// const genUniqueId = entity => {
// 	let result = '';
// 	const idLength = 4;
// 	const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
// 	for (var i = idLength; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
//     if (store.getState()[entity].hasOwnProperty(result)) {
//     	return genUniqueId(entity);
//     }
//     return result;
// };

export const addUpdateAircrewFormAddQual = qual => {
	return {
		type: ADD_UPDATE_AIRCREW_FORM_ADD_QUAL,
		qual,
	};
};

export const addUpdateAircrewFormDelQual = qual => {
	return {
		type: ADD_UPDATE_AIRCREW_FORM_DEL_QUAL,
		qual,
	};
};

export const setAircrewForm = args => {
	return {
		type: SET_AIRCREW_FORM,
		payload: {
			...args,
		},
	};
};

// let crewId = 0;			// for testing
export const addUpdateAircrew = args => {
	const aircrewId = args.id === "" ? cuid() : args.id; // uncomment after testing
	// let aircrewId; // for testing
	// if (args.id) {
	// 	aircrewId = args.id;
	// } else {
	// 	crewId++; 
	// 	aircrewId = crewId;
	// }// for testing
	return {
		type: ADD_UPDATE_AIRCREW,
		id: aircrewId,
		rank: args.rank ? args.rank : 0,
		first: args.first ? args.first : "",
		last: args.last ? args.last : "",
		callsign: args.callsign,
		seat: args.seat ? args.seat : "",
		quals: args.quals ? args.quals : [],
	};
};

export const delAircrew = id => {
	return {
		type: DEL_AIRCREW,
		id,
	};
};

export const setCurrentDay = (day) => {
	return {
		type: SET_CURRENT_DAY,
		day,
	};
};

export const addDay = day => {
	day = new Date(day);
	return {
		type: ADD_DAY,
		id: day.toISOString().slice(0,10),
		// sun: {
		// 	rise: ,
		// 	set: ,
		// }
	};
};

let flightId = 0;		// for testing
export const addFlight = (dayId, sim=false) => {
	// flightId = cuid();
	flightId++;			// for testing
	return {
		type: ADD_FLIGHT,
		id: flightId,
		dayId,
		sim,
	};
};

export const delFlight = (id, dayId) => {
	return {
		type: DEL_FLIGHT,
		id,
		dayId,
	};
};

export const updateFlightTime = (id, timeType, time) => {
	return {
		type: UPDATE_FLIGHT_TIME,
		id,
		timeType,
		time,
	};
};

export const toggleFlightType = id => {
	return {
		type: TOGGLE_FLIGHT_TYPE,
		id,
	};
};

let cnoteId = 0;			// for testing
export const addUpdateNote = args => {
	if (!args.content) {
		args.content = '';
	}
	// let noteId = args.id ? args.id : cuid();
	// below for testing
	let noteId;
	if (args.id) {
		noteId = args.id;
	} else {
		cnoteId++;
		noteId = cnoteId;
	}
	// end testing code
	return {
		type: ADD_UPDATE_NOTE,
		id: noteId,
		entity: args.entity,
		entityId: args.entityId,
		content: args.content,
	};
};

export const delNote = args => { // maybe the note could store the entity and entityId so we don't have to specify in the args
	return {
		type: DEL_NOTE,
		id: args.id,
		entity: args.entity,
		entityId: args.entityId,
	};
};

export const addCrewRefToNote = (noteId, aircrewId) => {
	return {
		type: ADD_CREW_REF_TO_NOTE,
		noteId,
		aircrewId,
	};
};

export const delCrewRefFromNote = (noteId, aircrewId) => {
	return {
		type: DEL_CREW_REF_FROM_NOTE,
		noteId,
		aircrewId,
	};
};

let sortieId = 0;			// for testing
export const addSortie = flightId => {
	// sortieId = cuid();
	sortieId++;				// for testing
	return {
		type: ADD_SORTIE,
		id: sortieId,
		flightId,
	};
};

export const delSortie = (id, flightId) => {
	return {
		type: DEL_SORTIE,
		id,
		flightId,
	};
};

export const updatePuckName = args => {
	return {
		type: UPDATE_PUCK_NAME,
		sortieId: args.sortieId,
		crewPosition: args.crewPosition,
		name: args.name,
	};
};

export const updatePuckCode = args => {
	// strip non-numeric chars from front and back of input
	let newCodes = codes => {
		let codesStartIndex, codesEndIndex;
		const lenCodes = codes.length;
		for (let i = 0; i < lenCodes; i++) {
			if (codes[i].match(/\d/)) {
				codesStartIndex = i;
				break;
			}
		}
		for (let lenCodes = codes.length, i = lenCodes - 1; i > 0; i--) {
			if (codes[i].match(/\d/)) {
				codesEndIndex = i+1;
				break;
			}
		}
		codes = codes.slice(codesStartIndex,codesEndIndex);
		return codes;
	};
	let codes = newCodes(args.codes);
	
	// make it an array
	codes = codes.split(/[^\d]+/);
	
	// get rid of duplicates or empty strings
	let codeCount = {};
	codes = codes.filter(code => {
		if (codeCount[code] || code === "") {
			return false;
		}
		codeCount[code] = code;
		return true;
	});
	return {
		type: UPDATE_PUCK_CODE,
		sortieId: args.sortieId,
		crewPosition: args.crewPosition,
		codes,
	};
};

export const updatePuckSymbol = args => {
	// strip all non-symbols
	let symbols = args.symbols.replace(/[^@!?~#$%*+=]+/g,""); // [^@!\?~#\$%\*\+=+]
	
	// make it an array
	symbols = symbols.split('');
	
	// get rid of duplicates and empty strings
	// this is inefficient. can do it all in one step. this array will never be longer than 10 items, though.
	let symbolCount = {};
	symbols = symbols.filter(symbol => {
		if (symbolCount[symbol] || symbol === "") {
			return false;
		}
		symbolCount[symbol] = symbol;
		return true;
	});
	return {
		type: UPDATE_PUCK_SYMBOL,
		sortieId: args.sortieId,
		crewPosition: args.crewPosition,
		symbols,
	};
};

let airspaceId = 0;			// for testing
export const addAirspace = flightId => {
	// airspaceId = cuid();
	airspaceId++;			// for testing
	return {
		type: ADD_AIRSPACE,
		id: airspaceId,
		flightId,
	};
};

export const delAirspace = (id, flightId) => {
	return {
		type: DEL_AIRSPACE,
		id,
		flightId,
	};
};

export const updateAirspace = args => {
	return {
		type: UPDATE_AIRSPACE,
		id: args.id,
		field: args.field,
		input: args.input,
	};
};

export const updateLoadout = (sortieId, input) => {
	return {
		type: UPDATE_LOADOUT,
		sortieId,
		input,
	};
};