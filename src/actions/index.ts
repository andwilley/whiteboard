import * as cuid from 'cuid';
import { UErrorTypes,
         UErrorLocs,
         UErrorLevels,
         ICustomErrorMeta,
         IAddUpdateSnivFormValues,
         UNoteEntity} from '../types/State';
import { createAction } from 'typesafe-actions';
import { $call } from 'utility-types';
import { EditorState } from 'draft-js';
import { UEditables, ISchedBlock } from '../types/WhiteboardTypes';
import * as moment from 'moment';

// Action Types
export const BATCH_ACTIONS = 'BATCH_ACTIONS';
export const ADD_UPDATE_AIRCREW_FORM_ADD_QUAL = 'ADD_UPDATE_AIRCREW_FORM_ADD_QUAL';
export const ADD_UPDATE_AIRCREW_FORM_DEL_QUAL = 'ADD_UPDATE_AIRCREW_FORM_DEL_QUAL';
export const SET_AIRCREW_FORM = 'SET_AIRCREW_FORM';
export const ADD_UPDATE_AIRCREW = 'ADD_UPDATE_AIRCREW';
export const DEL_AIRCREW = 'DEL_AIRCREW';
export const SET_AIRCREW_SEARCH_FORM = 'SET_AIRCREW_SEARCH_FORM';
export const ADD_QUAL_FILTER = 'ADD_QUAL_FILTER';
export const DEL_QUAL_FILTER = 'DEL_QUAL_FILTER';
export const ADD_GROUP_FILTER = 'ADD_GROUP_FILTER';
export const DEL_GROUP_FILTER = 'DEL_GROUP_FILTER';
export const SET_CURRENT_DAY = 'SET_CURRENT_DAY';
export const TOGGLE_SHOW_SNIVS = 'TOGGLE_SHOW_SNIVS';
export const ADD_UPDATE_AIRCREW_FORM_DISPLAY = 'ADD_UPDATE_AIRCREW_FORM_DISPLAY';
export const ADD_DAY = 'ADD_DAY';
export const ADD_FLIGHT = 'ADD_FLIGHT';
export const DEL_FLIGHT = 'DEL_FLIGHT';
export const UPDATE_FLIGHT_TIME = 'UPDATE_FLIGHT_TIME';
export const TOGGLE_FLIGHT_TYPE = 'TOGGLE_FLIGHT_TYPE';
export const TOGGLE_FLIGHT_EXACT_TIMES = 'TOGGLE_FLIGHT_EXACT_TIMES';
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
export const TOGGLE_SHOW_FILTERS = 'TOGGLE_SHOW_FILTERS';
export const DEL_ERROR = 'DEL_ERROR';
export const SET_EDITOR_STATE = 'SET_EDITOR_STATE';
export const SET_EDITED_ELEMENT = 'SET_EDITED_ELEMENT';
export const SET_EDITED_ELEMENT_TIMEBLOCK = 'SET_EDITED_ELEMENT_TIMEBLOCK';
export const ADD_UPDATE_SNIV = 'ADD_UPDATE_SNIV';
export const DEL_SNIV = 'DEL_SNIV';
export const SET_SNIV_FORM = 'SET_SNIV_FORM';
export const ADD_AIRCREW_REF_TO_SNIV_FORM = 'ADD_AIRCREW_REF_TO_SNIV_FORM';
export const DEL_AIRCREW_REF_FROM_SNIV_FORM = 'DEL_AIRCREW_REF_FROM_SNIV_FORM';
export const ADD_UPDATE_SNIV_FORM_DISPLAY = 'ADD_UPDATE_SNIV_FORM_DISPLAY';
export const REORDER_NOTES = 'REORDER_NOTES';
export const REORDER_SORTIES = 'REORDER_SORTIES';

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
    groupFilter?: string[];
    rankFilter?: string[];
}

export interface IAddUpdateAircrewArgs {
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
    entity: UNoteEntity;
    entityId: string;
    content?: string;
}

export interface IDelNoteArgs {
    id: string;
    entity: UNoteEntity;
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
    type: UErrorTypes;
    location: UErrorLocs;
    locationId: string;
    level: UErrorLevels;
    message: string;
    meta?: ICustomErrorMeta;
}

export interface IAddUpdateSnivArgs {
    snivId?: string;
    aircrewIds: string[];
    start: moment.Moment | string;
    end: moment.Moment | string;
    message: string;
}

export type ISetSnivFormArgs = {
    [P in keyof IAddUpdateSnivFormValues]?: IAddUpdateSnivFormValues[P];
};

const breakDateRangeIntoDays = (start: moment.Moment | string,
                                end: moment.Moment | string
): {[key: string]: {start: moment.Moment; end: moment.Moment}} => {
    /**
     * doesn't work if start and end are 23:59:59.999 on the same day.
     * Use can't set ms. Not a factor, but it is a bug
     * Moments are mutable!! watch the references.
     */
    if (typeof start === 'string' || typeof end === 'string') {
        return {};
    }
    if (start.isAfter(end)) {
        const temp = start;
        start = end;
        end = temp;
    }
    const beginningOfCurrentDay = moment(start);
    const endOfCurrentDay = moment(start);

    /** subtract a day for the beginning of the loop */
    beginningOfCurrentDay.date(beginningOfCurrentDay.date() - 1);
    beginningOfCurrentDay.hour(0).minute(0).second(0).millisecond(0);
    endOfCurrentDay.date(endOfCurrentDay.date() - 1);
    endOfCurrentDay.hour(23).minute(59).second(59).millisecond(999);
    let dates = {};
    do {
        // beginningOfCurrentDay = new Date(beginningOfCurrentDay.getTime());
        // endOfCurrentDay = new Date(endOfCurrentDay.getTime());
        beginningOfCurrentDay.date(beginningOfCurrentDay.date() + 1);
        endOfCurrentDay.date(endOfCurrentDay.date() + 1);
        dates = {
            ...dates,
            [`${endOfCurrentDay.year()}-${endOfCurrentDay.format('MM')}-${endOfCurrentDay.format('DD')}`]: {
                start: start.isSameOrAfter(beginningOfCurrentDay) ? start : beginningOfCurrentDay.clone(),
                end: end.isAfter(endOfCurrentDay) ? endOfCurrentDay.clone() : end,
            },
        };
    } while (end.isSameOrAfter(endOfCurrentDay));
    return dates;
};

export const actions = {
    batchActions: createAction(BATCH_ACTIONS, (...batchedActions) => ({
        type: BATCH_ACTIONS,
        payload: {
            actions: batchedActions,
        },
    })),
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
    addUpdateAircrew: createAction(ADD_UPDATE_AIRCREW, (args: IAddUpdateAircrewArgs) => {
        const aircrewId = (!args.id || args.id === '') ? cuid() : args.id;
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
        /**
         * removes aircrew object and removes references from:
         * -sorties
         * -notes
         * -snivs*
         */
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
    addGroupFilter: createAction(ADD_GROUP_FILTER, (group: string) => ({
        type: ADD_GROUP_FILTER,
        payload: {
            group,
        },
    })),
    delGroupFilter: createAction(DEL_GROUP_FILTER, (group: string) => ({
        type: DEL_GROUP_FILTER,
        payload: {
            group,
        },
    })),
    setCurrentDay: createAction(SET_CURRENT_DAY, (day: string) => ({
        type: SET_CURRENT_DAY,
        payload: {
            day,
        },
    })),
    toggleShowSnivs: createAction(TOGGLE_SHOW_SNIVS),
    toggleShowFilters: createAction(TOGGLE_SHOW_FILTERS),
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
        /** must be accompanied by del sortie and del notes */
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
            timeType: timeType.toLocaleLowerCase(),
            time,
        },
    })),
    toggleFlightType: createAction(TOGGLE_FLIGHT_TYPE, (id: string) => ({
        type: TOGGLE_FLIGHT_TYPE,
        payload: {
            id,
        },
    })),
    toggleFlightExactTimes: createAction(TOGGLE_FLIGHT_EXACT_TIMES, (flightId: string) => ({
        type: TOGGLE_FLIGHT_EXACT_TIMES,
        payload: {
            flightId,
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
        /**
         * breaks if global flag isn't set. too brittle??
         * we don't check for duplicates or invalid codes here. we rely on the input
         * to be filtered by FlexInput... is this a bad idea? I have to do it there to
         * keep the editor from showing it... if I did it here, we'd be doing it twice.
         */
        return {
            type: UPDATE_PUCK_CODE,
            payload: {
                sortieId: args.sortieId,
                crewPosition: args.crewPosition,
                codes: [args.codes] || [],
            },
        };
    }),
    updatePuckSymbol: createAction(UPDATE_PUCK_SYMBOL, (args: IUpdatePuckSymbolArgs) => ({
        /**
         * we don't check for duplicates or invalid symbols here. we rely on the input
         * to be filtered by FlexInput... is this a bad idea? I have to do it there to
         * keep the editor from showing it... if I did it here, we'd be doing it twice.
         */
        type: UPDATE_PUCK_SYMBOL,
        payload: {
            sortieId: args.sortieId,
            crewPosition: args.crewPosition,
            symbols: args.symbols,
        },
    })),
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
    addError: createAction(ADD_ERROR, (args: IAddErrorArgs | IAddErrorArgs[]) => {
        /**
         * this creates an errorByIds object that can be spread to the state.
         * It uses mutating keyed assignment because that is SIGNIFICANTLY faster than
         * creating an entirely new object on every iteration. Even just creating the
         * object here vice a batched action call to the reducer is way better.
         */
        const errorsById = {};
        if (Array.isArray(args)) {
            args.forEach(errorArg => {
                const errorId = cuid();
                errorsById[errorId] = {
                    id: errorId,
                    time: new Date(),
                    dayId: errorArg.dayId,
                    type: errorArg.type,
                    location: errorArg.location,
                    locationId: errorArg.locationId,
                    level: errorArg.level,
                    message: errorArg.message,
                    meta: {
                        ...errorArg.meta,
                    },
                };
            });
        } else {
            const errorId = cuid();
            errorsById[errorId] = {
                id: errorId,
                time: new Date(),
                dayId: args.dayId,
                type: args.type,
                location: args.location,
                locationId: args.locationId,
                level: args.level,
                message: args.message,
                meta: {
                    ...args.meta,
                },
            };
        }
        return {
            type: ADD_ERROR,
            payload: {
                errorsById,
            },
        };
    }),
    delError: createAction(DEL_ERROR, (errorIds: string[]) => ({
        type: DEL_ERROR,
        payload: {
            errorIds,
        },
    })),
    setEditorState: createAction(SET_EDITOR_STATE, (editorState: EditorState) => ({
        type: SET_EDITOR_STATE,
        payload: {
            editorState,
        },
    })),
    setEditedElement: createAction(SET_EDITED_ELEMENT, (editable: UEditables | null, entityId: string | null) => ({
        type: SET_EDITED_ELEMENT,
        payload: {
            editable,
            entityId,
        },
    })),
    setEditedElementTimeblock: createAction(SET_EDITED_ELEMENT_TIMEBLOCK, (timeblock: ISchedBlock | null) => ({
        type: SET_EDITED_ELEMENT_TIMEBLOCK,
        payload: {
            timeblock,
        },
    })),
    addUpdateSniv: createAction(ADD_UPDATE_SNIV, (args: IAddUpdateSnivArgs) => ({
        type: ADD_UPDATE_SNIV,
        payload: {
            snivId: args.snivId || cuid(),
            aircrewIds: args.aircrewIds,
            dateAdded: args.snivId ? null : moment(),
            lastUpdated: moment(),
            message: args.message,
            start: args.start,
            end: args.end,
            dates: breakDateRangeIntoDays(args.start, args.end),
        },
    })),
    delSniv: createAction(DEL_SNIV, (snivId: string, aircrewId?: string) => ({
        type: DEL_SNIV,
        payload: {
            snivId,
            aircrewId,
        },
    })),
    setSnivForm: createAction(SET_SNIV_FORM, (args: ISetSnivFormArgs) => ({
        type: SET_SNIV_FORM,
        payload: {
            ...args,
        },
    })),
    addAircrewRefToSnivForm: createAction(ADD_AIRCREW_REF_TO_SNIV_FORM, (aircrewId: string) => ({
        type: ADD_AIRCREW_REF_TO_SNIV_FORM,
        payload: {
            aircrewId,
        },
    })),
    delAircrewRefFromSnivForm: createAction(DEL_AIRCREW_REF_FROM_SNIV_FORM, (aircrewId: string) => ({
        type: DEL_AIRCREW_REF_FROM_SNIV_FORM,
        payload: {
            aircrewId,
        },
    })),
    addUpdateSnivFormDisplay: createAction(ADD_UPDATE_SNIV_FORM_DISPLAY, (display: boolean) => ({
        type: ADD_UPDATE_SNIV_FORM_DISPLAY,
        payload: {
            display,
        },
    })),
    reorderNotes: createAction(REORDER_NOTES, (
        noteLoc: UNoteEntity,
        sourceLocId: string,
        destLocId: string,
        oldIndex: number,
        newIndex: number
    ) => ({
        type: REORDER_NOTES,
        payload: {
            noteLoc,
            sourceLocId,
            destLocId,
            oldIndex,
            newIndex,
        },
    })),
    reorderSorties: createAction(REORDER_SORTIES, (
        sourceLocId: string,
        destLocId: string,
        oldIndex: number,
        newIndex: number
    ) => ({
        type: REORDER_SORTIES,
        payload: {
            sourceLocId,
            destLocId,
            oldIndex,
            newIndex,
        },
    })),
};

const returnsOfActions = Object.values(actions).map($call);
export type IAction = typeof returnsOfActions[number];
