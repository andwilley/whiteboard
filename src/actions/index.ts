import * as cuid from 'cuid';

// Action Types

export const ADD_UPDATE_AIRCREW_FORM_INPUT_CHANGE = 'ADD_UPDATE_AIRCREW_FORM_INPUT_CHANGE';
export const ADD_UPDATE_AIRCREW_FORM_ADD_QUAL = 'ADD_UPDATE_AIRCREW_FORM_ADD_QUAL';
export const ADD_UPDATE_AIRCREW_FORM_DEL_QUAL = 'ADD_UPDATE_AIRCREW_FORM_DEL_QUAL';
export const SET_AIRCREW_FORM = 'SET_AIRCREW_FORM';
export const ADD_UPDATE_AIRCREW = 'ADD_AIRCREW';
// export const UPDATE_AIRCREW = 'UPDATE_AIRCREW';
export const DEL_AIRCREW = 'DEL_AIRCREW';
// export const ADD_AIRCREW_QUALS = 'ADD_AIRCREW_QUALS';
// export const DEL_AIRCREW_QUALS = 'DEL_AIRCREW_QUALS';
export const SET_QUAL_FILTER = 'SET_QUAL_FILTER';
export const SET_CURRENT_DAY = 'SET_CURRENT_DAY';
export const ADD_DAY = 'ADD_DAY';
export const ADD_FLIGHT = 'ADD_FLIGHT';
export const DEL_FLIGHT = 'DEL_FLIGHT';
export const UPDATE_FLIGHT_TIME = 'UPDATE_FLIGHT_TIME';
export const TOGGLE_FLIGHT_TYPE = 'TOGGLE_FLIGHT_TYPE';
export const ADD_UPDATE_NOTE = 'ADD_UPDATE_NOTE';
export const DEL_NOTE = 'DEL_NOTE';
export const ADD_CREW_REF_TO_NOTE = 'ADD_CREW_REF_TO_NOTE';
export const DEL_CREW_REF_FROM_NOTE = 'DEL_CREW_REF_FROM_NOTE';
export const ADD_SORTIE = 'ADD_SORTIE';
export const DEL_SORTIE = 'DEL_SORTIE';
export const UPDATE_PUCK_NAME = 'UPDATE_PUCK_NAME';
export const UPDATE_PUCK_CODE = 'UPDATE_PUCK_CODE';
export const UPDATE_PUCK_SYMBOL = 'UPDATE_PUCK_SYMBOL';
export const ADD_AIRSPACE = 'ADD_AIRSPACE';
export const DEL_AIRSPACE = 'DEL_AIRSPACE';
export const UPDATE_AIRSPACE = 'UPDATE_AIRSPACE';
export const UPDATE_LOADOUT = 'UPDATE_LOADOUT';

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

export const addUpdateAircrewFormAddQual = (qual: string[]) => {
    return {
        type: ADD_UPDATE_AIRCREW_FORM_ADD_QUAL,
        qual,
    };
};

export const addUpdateAircrewFormDelQual = (qual: string[]) => {
    return {
        type: ADD_UPDATE_AIRCREW_FORM_DEL_QUAL,
        qual,
    };
};

export const setAircrewForm = (args: any) => {
    return {
        type: SET_AIRCREW_FORM,
        payload: {
            ...args,
        },
    };
};

// let crewId = 0;			// for testing
export const addUpdateAircrew = (args: any) => {
    const aircrewId = args.id === '' ? cuid() : args.id; // uncomment after testing
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
        first: args.first ? args.first : '',
        last: args.last ? args.last : '',
        callsign: args.callsign,
        seat: args.seat ? args.seat : '',
        quals: args.quals ? args.quals : [],
    };
};

export const delAircrew = (id: number) => {
    return {
        type: DEL_AIRCREW,
        id,
    };
};

export const setCurrentDay = (day: string) => {
    return {
        type: SET_CURRENT_DAY,
        day,
    };
};

export const addDay = (day: Date) => {
    day = new Date(day);
    return {
        type: ADD_DAY,
        id: day.toISOString().slice(0, 10),
        // sun: {
        // 	rise: ,
        // 	set: ,
        // }
    };
};

const testFlightId = 0;		// for testing
export const addFlight = (dayId: number, sim: boolean = false) => {
    // flightId = cuid();
    let flightId = testFlightId;
    flightId++;			// for testing
    return {
        type: ADD_FLIGHT,
        id: flightId,
        dayId,
        sim,
    };
};

export const delFlight = (id: number, dayId: number) => {
    return {
        type: DEL_FLIGHT,
        id,
        dayId,
    };
};

export const updateFlightTime = (id: number, timeType: string, time: string) => {
    return {
        type: UPDATE_FLIGHT_TIME,
        id,
        timeType,
        time,
    };
};

export const toggleFlightType = (id: number) => {
    return {
        type: TOGGLE_FLIGHT_TYPE,
        id,
    };
};

let cnoteId = 0;			// for testing
export const addUpdateNote = (args: any) => {
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

export const delNote = (args: any) => {
    return {
        type: DEL_NOTE,
        id: args.id,
        entity: args.entity,
        entityId: args.entityId,
    };
};

export const addCrewRefToNote = (noteId: number, aircrewId: number) => {
    return {
        type: ADD_CREW_REF_TO_NOTE,
        noteId,
        aircrewId,
    };
};

export const delCrewRefFromNote = (noteId: number, aircrewId: number) => {
    return {
        type: DEL_CREW_REF_FROM_NOTE,
        noteId,
        aircrewId,
    };
};

const testSortieId = 0;			// for testing
export const addSortie = (flightId: number) => {
    // const sortieId = cuid();
    let sortieId = testSortieId;
    sortieId++;				// for testing
    return {
        type: ADD_SORTIE,
        id: sortieId,
        flightId,
    };
};

export const delSortie = (id: number, flightId: number) => {
    return {
        type: DEL_SORTIE,
        id,
        flightId,
    };
};

export const updatePuckName = (args: any) => {
    return {
        type: UPDATE_PUCK_NAME,
        sortieId: args.sortieId,
        crewPosition: args.crewPosition,
        name: args.name,
    };
};

export const updatePuckCode = (args: any) => {
    // strip non-numeric chars from front and back of input
    const newCodes = (codes: string) => {
        let codesStartIndex = 0;
        let codesEndIndex: number = codes.length;
        const lenCodes = codes.length;
        for (let i = 0; i < lenCodes; i++) {
            codesStartIndex = i;
            if (codes[i].match(/\d/)) {
                break;
            }
        }
        for (let i = lenCodes - 1; i > 0; i--) {
            codesEndIndex = i + 1;
            if (codes[i].match(/\d/)) {
                break;
            }
        }
        codes = codes.slice(codesStartIndex, codesEndIndex);
        return codes;
    };

    const strippedCodes = newCodes(args.codes);

    // make it an array
    let codesList: string[] = strippedCodes.split(/[^\d]+/);

    // get rid of duplicates or empty strings
    const codeCount = {};
    codesList = codesList.filter(code => {
        if (codeCount[code] || code === '') {
            return false;
        }
        codeCount[code] = code;
        return true;
    });
    return {
        type: UPDATE_PUCK_CODE,
        sortieId: args.sortieId,
        crewPosition: args.crewPosition,
        codes: codesList,
    };
};

export const updatePuckSymbol = (args: any) => {
    // strip all non-symbols
    let symbols = args.symbols.replace(/[^@!?~#$%*+=]+/g, ''); // [^@!\?~#\$%\*\+=+]

    // make it an array
    symbols = symbols.split('');

    // get rid of duplicates and empty strings
    // this is inefficient. can do it all in one step. this array will never be longer than 10 items, though.
    const symbolCount = {};
    symbols = symbols.filter((symbol: string) => {
        if (symbolCount[symbol] || symbol === '') {
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
export const addAirspace = (flightId: number) => {
    // airspaceId = cuid();
    airspaceId++;			// for testing
    return {
        type: ADD_AIRSPACE,
        id: airspaceId,
        flightId,
    };
};

export const delAirspace = (id: number, flightId: number) => {
    return {
        type: DEL_AIRSPACE,
        id,
        flightId,
    };
};

export const updateAirspace = (args: any) => {
    return {
        type: UPDATE_AIRSPACE,
        id: args.id,
        field: args.field,
        input: args.input,
    };
};

export const updateLoadout = (sortieId: number, input: string) => {
    return {
        type: UPDATE_LOADOUT,
        sortieId,
        input,
    };
};
