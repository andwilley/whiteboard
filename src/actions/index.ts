import * as cuid from 'cuid';
import { IErrorMeta } from '../types/State';
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
export const UPDATE_NOTE_CREW_REFS = 'UPDATE_NOTE_CREW_REFS';
export const ADD_SORTIE = 'ADD_SORTIE';
export const DEL_SORTIE = 'DEL_SORTIE';
export const UPDATE_PUCK_NAME = 'UPDATE_PUCK_NAME';
export const UPDATE_SEAT_CREW_REFS = 'UPDATE_SEAT_CREW_REFS';
export const UPDATE_PUCK_CODE = 'UPDATE_PUCK_CODE';
export const UPDATE_PUCK_SYMBOL = 'UPDATE_PUCK_SYMBOL';
export const ADD_AIRSPACE = 'ADD_AIRSPACE';
export const DEL_AIRSPACE = 'DEL_AIRSPACE';
export const UPDATE_AIRSPACE = 'UPDATE_AIRSPACE';
export const UPDATE_LOADOUT = 'UPDATE_LOADOUT';
export const ADD_ERROR = 'ADD_ERROR';
export const TOGGLE_SHOW_ERROR = 'TOGGLE_SHOW_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';
export const DEL_ERROR = 'DEL_ERROR';

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
    showAvailable?: boolean;
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

export interface IAddErrorArgs {
    dayId: string;
    type: string;
    location: string;
    locationId: string;
    level: string;
    message: string;
    meta: IErrorMeta;
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
        /** action to add flight to state.
         * in reducer:
         * adds new flight entity to flights byId and allIds
         * adds flightId to the days.byId[dayId].flights
         * adds new sortie entity to sorties byId and allIds
         * adds new sortieId to the new flight entity
         * @param {string} dayId Id of the day to add the flight to
         * @param {boolean} sim Is this going to be a sim, default false
         * @returns {object} ADD_FLIGHT action object
         */
        const flightId = cuid();
        const sortieId = cuid();
        // testFlightId++;
        // const flightId = testFlightId;
        return {
            type: ADD_FLIGHT,
            payload: {
                flightId,
                sortieId,
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
    updateFlightTime: createAction(UPDATE_FLIGHT_TIME, (flightId: string, timeType: string, time: string) => ({
        type: UPDATE_FLIGHT_TIME,
        payload: {
            flightId,
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
        /**
         * entities are noteEntity.* from ../whiteboard-constants
         *
         * updates:
         * flights reducer
         * days reducer
         * sorties reducer
         * aircrew reducer
         */
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
    updateNoteCrewRefs: createAction(UPDATE_NOTE_CREW_REFS, (noteId: string, aircrewIds: string[]) => ({
        type: UPDATE_NOTE_CREW_REFS,
        payload: {
            noteId,
            aircrewIds,
        },
    })),
    addSortie: createAction(ADD_SORTIE, (flightId: string) => {
        /**
         * adds sortie entity to sorties.byId
         * adds sortieId to sorties.allIds
         * adds sortieId to flights.byId[flightId].sorties
         */
        const sortieId = cuid();
        // testSortieId++;
        // const sortieId = testSortieId;
        return {
            type: ADD_SORTIE,
            payload: {
                sortieId,
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
        /**
         * updates the inputName field in the sortie
         * crewPosition options: 'front' or 'back'
         */
        type: UPDATE_PUCK_NAME,
        payload: {
            sortieId: args.sortieId,
            crewPosition: args.crewPosition,
            name: args.name,
        },
    })),
    updateSeatCrewRefs: createAction(UPDATE_SEAT_CREW_REFS,
      (sortieId: string, crewPosition: string, aircrewIds: string[]) => ({
        type: UPDATE_SEAT_CREW_REFS,
        payload: {
            sortieId,
            crewPosition,
            aircrewIds,
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
    addError: createAction(ADD_ERROR, (args: IAddErrorArgs) => {
        const errorId = cuid();
        return {
            type: ADD_ERROR,
            payload: {
                errorId,
                time: new Date(),
                type: args.type,
                dayId: args.dayId,
                location: args.location,
                locationId: args.locationId,
                level: args.level,
                message: args.message,
            },
            meta: {
                ...args.meta,
            },
        };
    }),
    toggleShowError: createAction(TOGGLE_SHOW_ERROR, (errorId: string) => ({
        type: TOGGLE_SHOW_ERROR,
        payload: {
            errorId,
        },
        meta: {
            timeHiddenToggled: new Date(),
        },
    })),
    clearError: createAction(CLEAR_ERROR, (errorId: string, dayId: string) => ({
        type: CLEAR_ERROR,
        payload: {
            errorId,
            dayId,
        },
        meta: {
            timeInactive: new Date(),
        },
    })),
    delError: createAction(DEL_ERROR, (errorId: string, dayId: string) => ({
        type: DEL_ERROR,
        payload: {
            errorId,
            dayId,
        },
    })),
};

const returnsOfActions = (Object as any).values(actions).map($call);
export type IAction = typeof returnsOfActions[number];
