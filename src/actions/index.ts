import * as cuid from 'cuid';
import { createAction } from 'typesafe-actions';
import { $call } from 'utility-types';

// Action Types
export const ADD_UPDATE_AIRCREW_FORM_ADD_QUAL = 'ADD_UPDATE_AIRCREW_FORM_ADD_QUAL';
export const ADD_UPDATE_AIRCREW_FORM_DEL_QUAL = 'ADD_UPDATE_AIRCREW_FORM_DEL_QUAL';
export const SET_AIRCREW_FORM = 'SET_AIRCREW_FORM';
export const ADD_UPDATE_AIRCREW = 'ADD_UPDATE_AIRCREW';
export const DEL_AIRCREW = 'DEL_AIRCREW';
export const SET_AIRCREW_SEARCH_FORM = 'SET_AIRCREW_SEARCH_FORM';
export const ADD_QUAL_FILTER = 'ADD_QUAL_FILTER';
export const DEL_QUAL_FILTER = 'DEL_QUAL_FILTER';
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

export interface ISetAircrewSearchArgs {
    crewSearchInput?: string;
    qualFilter?: string[];
    rankFilter?: string[];
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
    setAircrewSearchForm: createAction(SET_AIRCREW_SEARCH_FORM, (args: ISetAircrewSearchArgs) => ({
        type: SET_AIRCREW_SEARCH_FORM,
        payload: {
            ...args,
        },
    })),
    addQualFilter: createAction(ADD_QUAL_FILTER, (qual: string) => ({
        type: ADD_QUAL_FILTER,
        payload: {
            qual,
        },
    })),
    delQualFilter: createAction(DEL_QUAL_FILTER, (qual: string) => ({
        type: DEL_QUAL_FILTER,
        payload: {
            qual,
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
