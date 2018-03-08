// reducers

import { combineReducers } from 'redux';
import { qualsList } from '../whiteboard-constants';
import { getType } from 'typesafe-actions';
import { IState } from '../reducers/State';
import { actions, IAction } from '../actions';
    //  , {
    //     ADD_UPDATE_AIRCREW_FORM_ADD_QUAL,
    //     ADD_UPDATE_AIRCREW_FORM_DEL_QUAL,
    //     SET_AIRCREW_FORM,
    //     ADD_UPDATE_AIRCREW,
    //     DEL_AIRCREW,
    //     SET_CURRENT_DAY,
    //     ADD_DAY,
    //     ADD_FLIGHT,
    //     DEL_FLIGHT,
    //     UPDATE_FLIGHT_TIME,
    //     TOGGLE_FLIGHT_TYPE,
    //     ADD_UPDATE_NOTE,
    //     DEL_NOTE,
    //     ADD_CREW_REF_TO_NOTE,
    //     DEL_CREW_REF_FROM_NOTE,
    //     ADD_SORTIE,
    //     DEL_SORTIE,
    //     UPDATE_PUCK_NAME,
    //     UPDATE_PUCK_CODE,
    //     UPDATE_PUCK_SYMBOL,
    //     ADD_AIRSPACE,
    //     DEL_AIRSPACE,
    //     UPDATE_AIRSPACE,
    //     UPDATE_LOADOUT,
    //   }

const addUpdateAircrewFormValues = (state = {
                                        id: '',
                                        callsign: '',
                                        first: '',
                                        last: '',
                                        rank: 0,
                                        seat: 'pilot',
                                        quals: [],
                                        existingAircrewUnchanged: false,
                                        qualsList,
                                        display: false,
                                    },
                                    action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrewFormAddQual):
            return {
                ...state,
                quals: state.quals.concat(action.payload.qual),
            };
        case getType(actions.addUpdateAircrewFormDelQual):
            return {
                ...state,
                quals: state.quals.filter(qual => qual !== action.payload.qual),
            };
        case getType(actions.setAircrewForm):
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

const aircrewById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrew):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    rank: action.payload.rank,
                    first: action.payload.first,
                    last: action.payload.last,
                    callsign: action.payload.callsign,
                    seat: action.payload.seat,
                    quals: action.payload.quals,
                    flightPucks: [],
                    simPucks: [],
                    odos: 0,
                    snivs: [],
                    notes: [],
                },
            };
        case getType(actions.delAircrew):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            // why doesn't this work??? rest is returning the entire state...???
            // let { [action.id]: delcrew, ...rest } = state;
            return rest;
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'aircrew' ||
                state[action.payload.entityId].notes.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes.concat(action.payload.id),
                },
            };
        case getType(actions.delNote):
            if (action.payload.entity !== 'aircrew') {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter((noteId: number) => noteId !== action.payload.id),
                },
            };
        default:
            return state;
    }
};

const allAircrew = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrew):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        case getType(actions.delAircrew):
            return state.filter(item => item !== action.payload.id);
        default:
            return state;
    }
};

const crewList = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.setCurrentDay):
            return {
                ...state,
                currentDay: action.payload.day,
            };
        default:
            return state;
    }
};

const daysById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addDay):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
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
            };
        case getType(actions.addFlight):
            if (state[action.payload.dayId].flights.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.dayId]: {
                    ...state[action.payload.dayId],
                    flights: state[action.payload.dayId].flights.concat(action.payload.id),
                },
            };
        case getType(actions.delFlight):
            return {
                ...state,
                [action.payload.dayId]: {
                    ...state[action.payload.dayId],
                    flights: state[action.payload.dayId].flights
                        .filter((flightId: number) => flightId !== action.payload.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'day' ||
                state[action.payload.entityId].notes.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes.concat(action.payload.id),
                },
            };
        case getType(actions.delNote):
            if (action.payload.entity !== 'day') {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter((noteId: number) => noteId !== action.payload.id),
                },
            };
        default:
            return state;
    }
};

const allDays = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addDay):
            return state.concat(action.payload.id);
        default:
            return state;
    }
};

const flightsById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    sim: action.payload.sim,
                    // flow: 'pit',
                    times: {
                        brief: '',
                        takeoff: '',
                        land: '',
                    },
                    airspace: [],
                    sorties: [],
                    notes: [],
                },
            };
        case getType(actions.delFlight):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.updateFlightTime):
            if (['brief', 'takeoff', 'land'].indexOf(action.payload.timeType) === -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    times: {
                        ...state[action.payload.id].times,
                        [action.payload.timeType]: action.payload.time,
                    },
                },
            };
        case getType(actions.toggleFlightType):
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    sim: !state[action.payload.id].sim,
                },
            };
        case getType(actions.addSortie):
            if (state[action.payload.flightId].sorties.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    sorties: state[action.payload.flightId].sorties.concat(action.payload.id),
                },
            };
        case getType(actions.delSortie):
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    sorties: state[action.payload.flightId].sorties
                        .filter((sortieId: number) => sortieId !== action.payload.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'flight' ||
                state[action.payload.entityId].notes.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes.concat(action.payload.id),
                },
            };
        case getType(actions.delNote):
            if (action.payload.entity !== 'flight') {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter((noteId: number) => noteId !== action.payload.id),
                },
            };
        case getType(actions.addAirspace):
            if (state[action.payload.flightId].airspace.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    airspace: state[action.payload.flightId].airspace.concat(action.payload.id),
                },
            };
        case getType(actions.delAirspace):
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    airspace: state[action.payload.flightId].airspace
                        .filter((airspaceId: number) => airspaceId !== action.payload.id),
                },
            };
        default:
            return state;
    }
};

const allFlights = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        case getType(actions.delFlight):
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

const notesById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    content: action.payload.content,
                    aircrewRefIds: [],
                    // keep track of who added, edited, time added etc later
                },
            };
        case getType(actions.delNote):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.addCrewRefToNote):
            if (state[action.payload.noteId].aircrewRefIds.indexOf(action.payload.aircrewId) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.noteId]: {
                    ...state[action.payload.noteId],
                    aircrewRefIds: state[action.payload.noteId].aircrewRefIds.concat(action.payload.aircrewId),
                },
            };
        case getType(actions.delCrewRefFromNote):
            return {
                ...state,
                [action.payload.noteId]: {
                    ...state[action.payload.noteId],
                    aircrewRefIds: state[action.payload.noteId].aircrewRefIds
                        .filter((id: number) => id !== action.payload.aircrewId),
                },
            };
        case getType(actions.delAircrew):
            const newNotesById = Object.assign({}, state);
            Object.keys(newNotesById).forEach(noteId => {
                newNotesById[noteId] = Object.assign({}, state[noteId]);
                newNotesById[noteId].aircrewRefIds = newNotesById[noteId].aircrewRefIds
                    .filter((id: number) => id !== action.payload.id);
            });
            return newNotesById;
        default:
            return state;
    }
};

const allNotes = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            if (state.indexOf(action.payload.id) > -1) {
                return state;
            }
            return state.concat(action.payload.id);
        case getType(actions.delNote):
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

const sortiesById = (state = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addSortie):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    front: {
                        inputName: '',
                        crewId: null,
                        codes: [],
                        symbols: [],
                    },
                    back: {
                        inputName: '',
                        crewId: null,
                        codes: [],
                        symbols: [],
                    },
                    loadout: '',
                    notes: [],
                },
            };
        case getType(actions.delSortie):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.delAircrew):
            const newSortiesById = Object.assign({}, state);
            Object.keys(newSortiesById).forEach(sortieId => {
                newSortiesById[sortieId] = Object.assign({}, state[sortieId]);
                if (action.payload.id === newSortiesById[sortieId].front.crewId) {
                    newSortiesById[sortieId].front = Object.assign({}, state[sortieId].front, {
                            inputName: '',
                            crewId: null,
                        }
                    );
                }
                if (action.payload.id === newSortiesById[sortieId].back.crewId) {
                    newSortiesById[sortieId].back = Object.assign({}, state[sortieId].back, {
                            inputName: '',
                            crewId: null,
                        }
                    );
                }
            });
            return newSortiesById;
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== 'sortie' ||
                state[action.payload.entityId].notes.indexOf(action.payload.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes.concat(action.payload.id),
                },
            };
        case getType(actions.delNote):
            if (action.payload.entity !== 'sortie') {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter((noteId: number) => noteId !== action.payload.id),
                },
            };
        case getType(actions.updatePuckName):
            // match name to list of crew
            // if its a match, set crewId to aircrew id
            // if not:
            const crewId = null;
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        inputName: action.payload.name,
                        crewId, // *******************TODO ***
                    },
                },
            };
        case getType(actions.updatePuckCode):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        codes: action.payload.codes,
                    },
                },
            };
        case getType(actions.updatePuckSymbol):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    [action.payload.crewPosition]: {
                        ...state[action.payload.sortieId][action.payload.crewPosition],
                        symbols: action.payload.symbols,
                    },
                },
            };
        case getType(actions.updateLoadout):
            return {
                ...state,
                [action.payload.sortieId]: {
                    ...state[action.payload.sortieId],
                    loadout: action.payload.input,
                },
            };
        default:
            return state;
    }
};

const allSorties = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addSortie):
            return state.concat(action.payload.id);
        case getType(actions.delSortie):
            return state.filter(sortieId => sortieId !== action.payload.id);
        default:
            return state;
    }
};

const airspaceById = (state = {}, action: IAction) => {
    // add these cases to sortiesById as well
    switch (action.type) {
        case getType(actions.addAirspace):
            return {
                ...state,
                [action.payload.id]: {
                    id: action.payload.id,
                    name: '',
                    start: '',
                    end: '',
                },
            };
        case getType(actions.delAirspace):
            const rest = Object.assign({}, state);
            delete rest[action.payload.id];
            return rest;
        case getType(actions.updateAirspace):
            // handle this input better?
            return {
                ...state,
                [action.payload.id]: {
                    ...state[action.payload.id],
                    [action.payload.field]: action.payload.input,
                },
            };
        default:
            return state;
    }
};

const allAirspace = (state = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addAirspace):
            return state.concat(action.payload.id);
        case getType(actions.delAirspace):
            return state.filter(sortieId => sortieId !== action.payload.id);
        default:
            return state;
    }
};

const aircrewReducer = combineReducers({
   byId: aircrewById,
   allIds: allAircrew,
});

const daysReducer = combineReducers({
    byId: daysById,
    allIds: allDays,
});

const flightsReducer = combineReducers({
    byId: flightsById,
    allIds: allFlights,
});

const notesReducer = combineReducers({
    byId: notesById,
    allIds: allNotes,
});

const sortiesReducer = combineReducers({
    byId: sortiesById,
    allIds: allSorties,
});

const airspaceReducer = combineReducers({
    byId: airspaceById,
    allIds: allAirspace,
});

export const whiteboardApp = combineReducers<IState>({
    aircrew: aircrewReducer,
    days: daysReducer,
    flights: flightsReducer,
    sorties: sortiesReducer,
    notes: notesReducer,
    airspace: airspaceReducer,
    crewList,
    addUpdateAircrewFormValues,
});
