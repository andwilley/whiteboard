// reducers

import { combineReducers } from 'redux';
import { actions } from '../actions';
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
                                    action) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrewFormAddQual):
            return {
                ...state,
                quals: state.quals.concat(action.qual),
            };
        case getType(actions.addUpdateAircrewFormDelQual):
            return {
                ...state,
                quals: state.quals.filter(qual => qual !== action.qual),
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

const aircrewById = (state = {}, action) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrew):
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    rank: action.rank,
                    first: action.first,
                    last: action.last,
                    callsign: action.callsign,
                    seat: action.seat,
                    quals: action.quals,
                    flightPucks: [],
                    simPucks: [],
                    odos: 0,
                    snivs: [],
                    notes: [],
                },
            };
        case getType(actions.delAircrew):
            const rest = Object.assign({}, state);
            delete rest[action.id];
            // why doesn't this work??? rest is returning the entire state...???
            // let { [action.id]: delcrew, ...rest } = state;
            return rest;
        case getType(actions.addUpdateNote):
            if (action.entity !== 'aircrew' || state[action.entityId].notes.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.concat(action.id),
                },
            };
        case getType(actions.delNote):
            if (action.entity !== 'aircrew') {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.filter((noteId: number) => noteId !== action.id),
                },
            };
        default:
            return state;
    }
};

const allAircrew = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrew):
            if (state.indexOf(action.id) > -1) {
                return state;
            }
            return state.concat(action.id);
        case getType(actions.delAircrew):
            return state.filter(item => item !== action.id);
        default:
            return state;
    }
};

const crewList = (state = {}, action) => {
    switch (action.type) {
        case getType(actions.setCurrentDay):
            return {
                ...state,
                currentDay: action.day,
            };
        default:
            return state;
    }
};

const daysById = (state = {}, action) => {
    switch (action.type) {
        case getType(actions.addDay):
            return {
                ...state,
                [action.id]: {
                    id: action.id,
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
            if (state[action.dayId].flights.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.dayId]: {
                    ...state[action.dayId],
                    flights: state[action.dayId].flights.concat(action.id),
                },
            };
        case getType(actions.delFlight):
            return {
                ...state,
                [action.dayId]: {
                    ...state[action.dayId],
                    flights: state[action.dayId].flights.filter((flightId: number) => flightId !== action.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.entity !== 'day' || state[action.entityId].notes.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.concat(action.id),
                },
            };
        case getType(actions.delNote):
            if (action.entity !== 'day') {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.filter((noteId: number) => noteId !== action.id),
                },
            };
        default:
            return state;
    }
};

const allDays = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addDay):
            return state.concat(action.id);
        default:
            return state;
    }
};

const flightsById = (state = {}, action) => {
    switch (action.type) {
        case getType(actions.addFlight):
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    sim: action.sim,
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
            delete rest[action.id];
            return rest;
        case getType(actions.updateFlightTime):
            if (['brief', 'takeoff', 'land'].indexOf(action.timeType) === -1) {
                return state;
            }
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    times: {
                        ...state[action.id].times,
                        [action.timeType]: action.time,
                    },
                },
            };
        case getType(actions.toggleFlightType):
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    sim: !state[action.id].sim,
                },
            };
        case getType(actions.addSortie):
            if (state[action.flightId].sorties.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.flightId]: {
                    ...state[action.flightId],
                    sorties: state[action.flightId].sorties.concat(action.id),
                },
            };
        case getType(actions.delSortie):
            return {
                ...state,
                [action.flightId]: {
                    ...state[action.flightId],
                    sorties: state[action.flightId].sorties.filter((sortieId: number) => sortieId !== action.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.entity !== 'flight' || state[action.entityId].notes.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.concat(action.id),
                },
            };
        case getType(actions.delNote):
            if (action.entity !== 'flight') {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.filter((noteId: number) => noteId !== action.id),
                },
            };
        case getType(actions.addAirspace):
            if (state[action.flightId].airspace.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.flightId]: {
                    ...state[action.flightId],
                    airspace: state[action.flightId].airspace.concat(action.id),
                },
            };
        case getType(actions.delAirspace):
            return {
                ...state,
                [action.flightId]: {
                    ...state[action.flightId],
                    airspace: state[action.flightId].airspace.filter((airspaceId: number) => airspaceId !== action.id),
                },
            };
        default:
            return state;
    }
};

const allFlights = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addFlight):
            if (state.indexOf(action.id) > -1) {
                return state;
            }
            return state.concat(action.id);
        case getType(actions.delFlight):
            return state.filter(id => id !== action.id);
        default:
            return state;
    }
};

const notesById = (state = {}, action) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    content: action.content,
                    aircrewRefIds: [],
                    // keep track of who added, edited, time added etc later
                },
            };
        case getType(actions.delNote):
            const rest = Object.assign({}, state);
            delete rest[action.id];
            return rest;
        case getType(actions.addCrewRefToNote):
            if (state[action.noteId].aircrewRefIds.indexOf(action.aircrewId) > -1) {
                return state;
            }
            return {
                ...state,
                [action.noteId]: {
                    ...state[action.noteId],
                    aircrewRefIds: state[action.noteId].aircrewRefIds.concat(action.aircrewId),
                },
            };
        case getType(actions.delCrewRefFromNote):
            return {
                ...state,
                [action.noteId]: {
                    ...state[action.noteId],
                    aircrewRefIds: state[action.noteId].aircrewRefIds.filter((id: number) => id !== action.aircrewId),
                },
            };
        case getType(actions.delAircrew):
            const newNotesById = Object.assign({}, state);
            Object.keys(newNotesById).forEach(noteId => {
                newNotesById[noteId] = Object.assign({}, state[noteId]);
                newNotesById[noteId].aircrewRefIds = newNotesById[noteId].aircrewRefIds
                    .filter((id: number) => id !== action.id);
            });
            return newNotesById;
        default:
            return state;
    }
};

const allNotes = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addUpdateNote):
            if (state.indexOf(action.id) > -1) {
                return state;
            }
            return state.concat(action.id);
        case getType(actions.delNote):
            return state.filter(id => id !== action.id);
        default:
            return state;
    }
};

const sortiesById = (state = {}, action) => {
    switch (action.type) {
        case getType(actions.addSortie):
            return {
                ...state,
                [action.id]: {
                    id: action.id,
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
            delete rest[action.id];
            return rest;
        case getType(actions.delAircrew):
            const newSortiesById = Object.assign({}, state);
            Object.keys(newSortiesById).forEach(sortieId => {
                newSortiesById[sortieId] = Object.assign({}, state[sortieId]);
                if (action.id === newSortiesById[sortieId].front.crewId) {
                    newSortiesById[sortieId].front = Object.assign({}, state[sortieId].front, {
                            inputName: '',
                            crewId: null,
                        }
                    );
                }
                if (action.id === newSortiesById[sortieId].back.crewId) {
                    newSortiesById[sortieId].back = Object.assign({}, state[sortieId].back, {
                            inputName: '',
                            crewId: null,
                        }
                    );
                }
            });
            return newSortiesById;
        case getType(actions.addUpdateNote):
            if (action.entity !== 'sortie' || state[action.entityId].notes.indexOf(action.id) > -1) {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.concat(action.id),
                },
            };
        case getType(actions.delNote):
            if (action.entity !== 'sortie') {
                return state;
            }
            return {
                ...state,
                [action.entityId]: {
                    ...state[action.entityId],
                    notes: state[action.entityId].notes.filter((noteId: number) => noteId !== action.id),
                },
            };
        case getType(actions.updatePuckName):
            // match name to list of crew
            // if its a match, set crewId to aircrew id
            // if not:
            const crewId = null;
            return {
                ...state,
                [action.sortieId]: {
                    ...state[action.sortieId],
                    [action.crewPosition]: {
                        ...state[action.sortieId][action.crewPosition],
                        inputName: action.name,
                        crewId, // *******************TODO ***
                    },
                },
            };
        case getType(actions.updatePuckCode):
            return {
                ...state,
                [action.sortieId]: {
                    ...state[action.sortieId],
                    [action.crewPosition]: {
                        ...state[action.sortieId][action.crewPosition],
                        codes: action.codes,
                    },
                },
            };
        case getType(actions.updatePuckSymbol):
            return {
                ...state,
                [action.sortieId]: {
                    ...state[action.sortieId],
                    [action.crewPosition]: {
                        ...state[action.sortieId][action.crewPosition],
                        symbols: action.symbols,
                    },
                },
            };
        case getType(actions.updateLoadout):
            return {
                ...state,
                [action.sortieId]: {
                    ...state[action.sortieId],
                    loadout: action.input,
                },
            };
        default:
            return state;
    }
};

const allSorties = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addSortie):
            return state.concat(action.id);
        case getType(actions.delSortie):
            return state.filter(sortieId => sortieId !== action.id);
        default:
            return state;
    }
};

const airspaceById = (state = {}, action) => {
    // add these cases to sortiesById as well
    switch (action.type) {
        case getType(actions.addAirspace):
            return {
                ...state,
                [action.id]: {
                    id: action.id,
                    name: '',
                    start: '',
                    end: '',
                },
            };
        case getType(actions.delAirspace):
            const rest = Object.assign({}, state);
            delete rest[action.id];
            return rest;
        case getType(actions.updateAirspace):
            // handle this input better?
            return {
                ...state,
                [action.id]: {
                    ...state[action.id],
                    [action.field]: action.input,
                },
            };
        default:
            return state;
    }
};

const allAirspace = (state = [], action) => {
    switch (action.type) {
        case getType(actions.addAirspace):
            return state.concat(action.id);
        case getType(actions.delAirspace):
            return state.filter(sortieId => sortieId !== action.id);
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
    byId: aircrewById,
    allIds: allAircrew,
});

export const whiteboardApp = combineReducers<IState, IAction>({
    aircrew: aircrewReducer,
    days: daysReducer,
    flights: flightsReducer,
    sorties: sortiesReducer,
    notes: notesReducer,
    airspace: airspaceReducer,
    crewList,
    addUpdateAircrewFormValues,
});
