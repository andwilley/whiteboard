import * as cuid from 'cuid';
import { createAction } from 'typesafe-actions';
import { $call } from 'utility-types';

// Action Types
export const ADD_UPDATE_AIRCREW_FORM_ADD_QUAL = 'ADD_UPDATE_AIRCREW_FORM_ADD_QUAL';
export const ADD_UPDATE_AIRCREW_FORM_DEL_QUAL = 'ADD_UPDATE_AIRCREW_FORM_DEL_QUAL';
export const SET_AIRCREW_FORM = 'SET_AIRCREW_FORM';
export const ADD_UPDATE_AIRCREW = 'ADD_UPDATE_AIRCREW';
export const DEL_AIRCREW = 'DEL_AIRCREW';
export const SET_QUAL_FILTER = 'SET_QUAL_FILTER';
export const SET_CURRENT_DAY = 'SET_CURRENT_DAY';
export const ADD_UPDATE_AIRCREW_FORM_DISPLAY = 'ADD_UPDATE_AIRCREW_FORM_DISPLAY';
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

// const makeActionCreator = (type, ...payloadNames) => {
//     return (...payloadValues) => {
//         const action = { type, payload: {} };
//         payloadNames.forEach((name, index) => {
//             action.payload[payloadName[index]] = payloadValues[index];
//         })
//         return action;
//     };
// };

export interface ISetAircrewArgs {
    id?: string;
    callsign?: string;
    first?: string;
    last?: string;
    rank?: number;
    seat?: string;
    existingAircrewUnchanged?: boolean;
    display?: boolean;
}

export interface IAddAircrewArgs {
    id?: string;
    callsign: string;
    first: string;
    last: string;
    rank: number;
    seat: string;
    quals: string[];
    existingAircrewUnchanged: boolean;
}

export interface IAddUpdateNoteArgs {
    id?: string;
    entity: string;
    entityId: string;
    content?: string;
}

export interface IDelNoteArgs {
    id: string;
    entity: string;
    entityId: string;
}

export interface IUpdatePuckNameArgs {
    sortieId: string;
    crewPosition: string;
    name: string;
}

export interface IUpdatePuckCodeArgs {
    sortieId: string;
    crewPosition: string;
    codes: string;
}

export interface IUpdatePuckSymbolArgs {
    sortieId: string;
    crewPosition: string;
    symbols: string;
}

export interface IUpdateAirspace {
    id: string;
    field: string;
    input: string;
}

// let crewId = 0;
// let testFlightId = 0;
// let cnoteId = 0;
// let testSortieId = 0;
// let airspaceId = 0;

export const actions = {
    addUpdateAircrewFormAddQual: createAction(ADD_UPDATE_AIRCREW_FORM_ADD_QUAL, (qual: string) => ({
        type: ADD_UPDATE_AIRCREW_FORM_ADD_QUAL,
        payload: {
            qual,
        },
    })),
    addUpdateAircrewFormDelQual: createAction(ADD_UPDATE_AIRCREW_FORM_DEL_QUAL, (qual: string) => ({
        type: ADD_UPDATE_AIRCREW_FORM_DEL_QUAL,
        payload: {
            qual,
        },
    })),
    setAircrewForm: createAction(SET_AIRCREW_FORM, (args: ISetAircrewArgs) => ({
        type: SET_AIRCREW_FORM,
        payload: {
            ...args,
        },
    })),
    addUpdateAircrew: createAction(ADD_UPDATE_AIRCREW, (args: IAddAircrewArgs) => {
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
            payload: {
                id: aircrewId,
                rank: args.rank ? args.rank : 0,
                first: args.first ? args.first : '',
                last: args.last ? args.last : '',
                callsign: args.callsign,
                seat: args.seat ? args.seat : '',
                quals: args.quals ? args.quals : [],
            },
        };
    }),
    delAircrew: createAction(DEL_AIRCREW, (id: string) => ({
        type: DEL_AIRCREW,
        payload: {
            id,
        },
    })),
    setCurrentDay: createAction(SET_CURRENT_DAY, (day: string) => ({
        type: SET_CURRENT_DAY,
        payload: {
            day,
        },
    })),
    addUpdateAircrewFormDisplay: createAction(ADD_UPDATE_AIRCREW_FORM_DISPLAY, (display: boolean) => ({
        type: ADD_UPDATE_AIRCREW_FORM_DISPLAY,
        payload: {
            display,
        },
    })),
    addDay: createAction(ADD_DAY, (day: string) => {
        const dayDate = new Date(day);
        return {
            type: ADD_DAY,
            payload: {
                id: dayDate.toISOString().slice(0, 10),
                // sun: {
                // 	rise: ,
                // 	set: ,
                // }
            },
        };
    }),
    addFlight: createAction(ADD_FLIGHT, (dayId: string, sim: boolean = false) => {
        const flightId = cuid();
        // testFlightId++;
        // const flightId = testFlightId;
        return {
            type: ADD_FLIGHT,
            payload: {
                id: flightId,
                dayId,
                sim,
            },
        };
    }),
    delFlight: createAction(DEL_FLIGHT, (id: string, dayId: string) => ({
        type: DEL_FLIGHT,
        payload: {
            id,
            dayId,
        },
    })),
    updateFlightTime: createAction(UPDATE_FLIGHT_TIME, (id: string, timeType: string, time: string) => ({
        type: UPDATE_FLIGHT_TIME,
        payload: {
            id,
            timeType,
            time,
        },
    })),
    toggleFlightType: createAction(TOGGLE_FLIGHT_TYPE, (id: string) => ({
        type: TOGGLE_FLIGHT_TYPE,
        payload: {
            id,
        },
    })),
    addUpdateNote: createAction(ADD_UPDATE_NOTE, (args: IAddUpdateNoteArgs) => {
        const noteId = args.id ? args.id : cuid();
        // below for testing
        // let noteId;
        // if (args.id) {
        //     noteId = args.id;
        // } else {
        //     cnoteId++;
        //     noteId = cnoteId;
        // }
        // end testing code
        return {
            type: ADD_UPDATE_NOTE,
            payload: {
                id: noteId,
                entity: args.entity,
                entityId: args.entityId,
                content: args.content ? args.content : '',
            },
        };
    }),
    delNote: createAction(DEL_NOTE, (args: IDelNoteArgs) => ({
        type: DEL_NOTE,
        payload: {
            id: args.id,
            entity: args.entity,
            entityId: args.entityId,
        },
    })),
    addCrewRefToNote: createAction(ADD_CREW_REF_TO_NOTE, (noteId: string, aircrewId: string) => ({
        type: ADD_CREW_REF_TO_NOTE,
        payload: {
            noteId,
            aircrewId,
        },
    })),
    delCrewRefFromNote: createAction(DEL_CREW_REF_FROM_NOTE, (noteId: string, aircrewId: string) => ({
        type: DEL_CREW_REF_FROM_NOTE,
        payload: {
            noteId,
            aircrewId,
        },
    })),
    addSortie: createAction(ADD_SORTIE, (flightId: string) => {
        const sortieId = cuid();
        // testSortieId++;
        // const sortieId = testSortieId;
        return {
            type: ADD_SORTIE,
            payload: {
                id: sortieId,
                flightId,
            },
        };
    }),
    delSortie: createAction(DEL_SORTIE, (id: string, flightId: string) => ({
        type: DEL_SORTIE,
        payload: {
            id,
            flightId,
        },
    })),
    updatePuckName: createAction(UPDATE_PUCK_NAME, (args: IUpdatePuckNameArgs) => ({
        type: UPDATE_PUCK_NAME,
        payload: {
            sortieId: args.sortieId,
            crewPosition: args.crewPosition,
            name: args.name,
        },
    })),
    updatePuckCode: createAction(UPDATE_PUCK_CODE, (args: IUpdatePuckCodeArgs) => {
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
            payload: {
                sortieId: args.sortieId,
                crewPosition: args.crewPosition,
                codes: codesList,
            },
        };
    }),
    updatePuckSymbol: createAction(UPDATE_PUCK_SYMBOL, (args: IUpdatePuckSymbolArgs) => {
        // strip all non-symbols
        const symbols = args.symbols.replace(/[^@!?~#$%*+=]+/g, ''); // [^@!\?~#\$%\*\+=+]

        // make it an array
        let symbolList = symbols.split('');

        // get rid of duplicates and empty strings
        // this is inefficient. can do it all in one step. this array will never be longer than 10 items, though.
        const symbolCount = {};
        symbolList = symbolList.filter((symbol: string) => {
            if (symbolCount[symbol] || symbol === '') {
                return false;
            }
            symbolCount[symbol] = symbol;
            return true;
        });
        return {
            type: UPDATE_PUCK_SYMBOL,
            payload: {
                sortieId: args.sortieId,
                crewPosition: args.crewPosition,
                symbolList,
            },
        };
    }),
    addAirspace: createAction(ADD_AIRSPACE, (flightId: string) => {
        const airspaceId = cuid();
        // airspaceId++;			// for testing
        return {
            type: ADD_AIRSPACE,
            payload: {
                id: airspaceId,
                flightId,
            },
        };
    }),
    delAirspace: createAction(DEL_AIRSPACE, (id: string, flightId: string) => ({
        type: DEL_AIRSPACE,
        payload: {
            id,
            flightId,
        },
    })),
    updateAirspace: createAction(UPDATE_AIRSPACE, (args: IUpdateAirspace) => ({
        type: UPDATE_AIRSPACE,
        payload: {
            id: args.id,
            field: args.field,
            input: args.input,
        },
    })),
    updateLoadout: createAction(UPDATE_LOADOUT, (sortieId: string, input: string) => ({
        type: UPDATE_LOADOUT,
        payload: {
            sortieId,
            input,
        },
    })),
};

const returnsOfActions = (Object as any).values(actions).map($call);
export type IAction = typeof returnsOfActions[number];

// export const addUpdateAircrewFormAddQual = (qual: string[]) => {
//     return {
//         type: ADD_UPDATE_AIRCREW_FORM_ADD_QUAL,
//         qual,
//     };
// };

// export const addUpdateAircrewFormDelQual = (qual: string[]) => {
//     return {
//         type: ADD_UPDATE_AIRCREW_FORM_DEL_QUAL,
//         qual,
//     };
// };

// export const setAircrewForm = (args: any) => {
//     return {
//         type: SET_AIRCREW_FORM,
//         payload: {
//             ...args,
//         },
//     };
// };

// // let crewId = 0;			// for testing
// export const addUpdateAircrew = (args: any) => {
//     const aircrewId = args.id === '' ? cuid() : args.id; // uncomment after testing
//     // let aircrewId; // for testing
//     // if (args.id) {
//     // 	aircrewId = args.id;
//     // } else {
//     // 	crewId++;
//     // 	aircrewId = crewId;
//     // }// for testing
//     return {
//         type: ADD_UPDATE_AIRCREW,
//         id: aircrewId,
//         rank: args.rank ? args.rank : 0,
//         first: args.first ? args.first : '',
//         last: args.last ? args.last : '',
//         callsign: args.callsign,
//         seat: args.seat ? args.seat : '',
//         quals: args.quals ? args.quals : [],
//     };
// };

// export const delAircrew = (id: number) => {
//     return {
//         type: DEL_AIRCREW,
//         id,
//     };
// };

// export const setCurrentDay = (day: string) => {
//     return {
//         type: SET_CURRENT_DAY,
//         day,
//     };
// };

// export const addDay = (day: Date) => {
//     day = new Date(day);
//     return {
//         type: ADD_DAY,
//         id: day.toISOString().slice(0, 10),
//         // sun: {
//         // 	rise: ,
//         // 	set: ,
//         // }
//     };
// };

// const testFlightId = 0;		// for testing
// export const addFlight = (dayId: number, sim: boolean = false) => {
//     // flightId = cuid();
//     let flightId = testFlightId;
//     flightId++;			// for testing
//     return {
//         type: ADD_FLIGHT,
//         id: flightId,
//         dayId,
//         sim,
//     };
// };

// export const delFlight = (id: number, dayId: number) => {
//     return {
//         type: DEL_FLIGHT,
//         id,
//         dayId,
//     };
// };

// export const updateFlightTime = (id: number, timeType: string, time: string) => {
//     return {
//         type: UPDATE_FLIGHT_TIME,
//         id,
//         timeType,
//         time,
//     };
// };

// export const toggleFlightType = (id: number) => {
//     return {
//         type: TOGGLE_FLIGHT_TYPE,
//         id,
//     };
// };

// let cnoteId = 0;			// for testing
// export const addUpdateNote = (args: any) => {
//     if (!args.content) {
//         args.content = '';
//     }
//     // let noteId = args.id ? args.id : cuid();
//     // below for testing
//     let noteId;
//     if (args.id) {
//         noteId = args.id;
//     } else {
//         cnoteId++;
//         noteId = cnoteId;
//     }
//     // end testing code
//     return {
//         type: ADD_UPDATE_NOTE,
//         id: noteId,
//         entity: args.entity,
//         entityId: args.entityId,
//         content: args.content,
//     };
// };

// export const delNote = (args: any) => {
//     return {
//         type: DEL_NOTE,
//         id: args.id,
//         entity: args.entity,
//         entityId: args.entityId,
//     };
// };

// export const addCrewRefToNote = (noteId: number, aircrewId: number) => {
//     return {
//         type: ADD_CREW_REF_TO_NOTE,
//         noteId,
//         aircrewId,
//     };
// };

// export const delCrewRefFromNote = (noteId: number, aircrewId: number) => {
//     return {
//         type: DEL_CREW_REF_FROM_NOTE,
//         noteId,
//         aircrewId,
//     };
// };

// const testSortieId = 0;			// for testing
// export const addSortie = (flightId: number) => {
//     // const sortieId = cuid();
//     let sortieId = testSortieId;
//     sortieId++;				// for testing
//     return {
//         type: ADD_SORTIE,
//         id: sortieId,
//         flightId,
//     };
// };

// export const delSortie = (id: number, flightId: number) => {
//     return {
//         type: DEL_SORTIE,
//         id,
//         flightId,
//     };
// };

// export const updatePuckName = (args: any) => {
//     return {
//         type: UPDATE_PUCK_NAME,
//         sortieId: args.sortieId,
//         crewPosition: args.crewPosition,
//         name: args.name,
//     };
// };

// export const updatePuckCode = (args: any) => {
//     // strip non-numeric chars from front and back of input
//     const newCodes = (codes: string) => {
//         let codesStartIndex = 0;
//         let codesEndIndex: number = codes.length;
//         const lenCodes = codes.length;
//         for (let i = 0; i < lenCodes; i++) {
//             codesStartIndex = i;
//             if (codes[i].match(/\d/)) {
//                 break;
//             }
//         }
//         for (let i = lenCodes - 1; i > 0; i--) {
//             codesEndIndex = i + 1;
//             if (codes[i].match(/\d/)) {
//                 break;
//             }
//         }
//         codes = codes.slice(codesStartIndex, codesEndIndex);
//         return codes;
//     };

//     const strippedCodes = newCodes(args.codes);

//     // make it an array
//     let codesList: string[] = strippedCodes.split(/[^\d]+/);

//     // get rid of duplicates or empty strings
//     const codeCount = {};
//     codesList = codesList.filter(code => {
//         if (codeCount[code] || code === '') {
//             return false;
//         }
//         codeCount[code] = code;
//         return true;
//     });
//     return {
//         type: UPDATE_PUCK_CODE,
//         sortieId: args.sortieId,
//         crewPosition: args.crewPosition,
//         codes: codesList,
//     };
// };

// export const updatePuckSymbol = (args: any) => {
//     // strip all non-symbols
//     let symbols = args.symbols.replace(/[^@!?~#$%*+=]+/g, ''); // [^@!\?~#\$%\*\+=+]

//     // make it an array
//     symbols = symbols.split('');

//     // get rid of duplicates and empty strings
//     // this is inefficient. can do it all in one step. this array will never be longer than 10 items, though.
//     const symbolCount = {};
//     symbols = symbols.filter((symbol: string) => {
//         if (symbolCount[symbol] || symbol === '') {
//             return false;
//         }
//         symbolCount[symbol] = symbol;
//         return true;
//     });
//     return {
//         type: UPDATE_PUCK_SYMBOL,
//         sortieId: args.sortieId,
//         crewPosition: args.crewPosition,
//         symbols,
//     };
// };

// let airspaceId = 0;			// for testing
// export const addAirspace = (flightId: number) => {
//     // airspaceId = cuid();
//     airspaceId++;			// for testing
//     return {
//         type: ADD_AIRSPACE,
//         id: airspaceId,
//         flightId,
//     };
// };

// export const delAirspace = (id: number, flightId: number) => {
//     return {
//         type: DEL_AIRSPACE,
//         id,
//         flightId,
//     };
// };

// export const updateAirspace = (args: any) => {
//     return {
//         type: UPDATE_AIRSPACE,
//         id: args.id,
//         field: args.field,
//         input: args.input,
//     };
// };

// export const updateLoadout = (sortieId: number, input: string) => {
//     return {
//         type: UPDATE_LOADOUT,
//         sortieId,
//         input,
//     };
// };
