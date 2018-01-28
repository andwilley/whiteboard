// reducers

import { combineReducers } from 'redux';
import {
		ADD_AIRCREW,
		DEL_AIRCREW,
		UPDATE_AIRCREW,
		ADD_AIRCREW_QUALS,
		DEL_AIRCREW_QUALS,
		SET_CURRENT_DAY,
		ADD_DAY,
		ADD_FLIGHT,
		DEL_FLIGHT,
		UPDATE_FLIGHT_TIME,
		TOGGLE_FLIGHT_TYPE,
		ADD_UPDATE_NOTE,
		DEL_NOTE,
		ADD_SORTIE,
		DEL_SORTIE
	   } from '../actions/index';

const aircrewById = (state = {}, action) => {
	switch (action.type) {
		case ADD_AIRCREW:
			return {
				...state,
				[action.id]: {
					id: action.id,
					rank: action.rank,
					first: action.first,
					last: action.last,
					callsign: action.callsign,
					quals: action.quals,
					flightPucks: [],
					simPucks: [],
					odos: 0,
					snivs: {},
					notes: [],
				},
			};
		case DEL_AIRCREW:
			let rest = Object.assign({},state);
			delete rest[action.id];
			// why doesn't this work??? rest is returning the entire state...????
			//let { [action.id]: delcrew, ...rest } = state;
			return rest;
		case UPDATE_AIRCREW:
			const { rank, first, last, callsign } = state[action.id]
			return {
				...state,
				[action.id]: {
					...state[action.id],
					rank: action.rank ? action.rank : rank,
					first: action.first ? action.first : first,
					last: action.last ? action.last : last,
					callsign: action.callsign ? action.callsign : callsign,
				}
			};
		case ADD_AIRCREW_QUALS:
			let quals = state[action.id].quals;
			let freshQuals = action.quals.filter((qual) => !quals.includes(qual));
			return {
				...state,
				[action.id]: {
					...state[action.id],
					quals: quals.concat(freshQuals),
				}
			};
		case DEL_AIRCREW_QUALS:
			let oldQuals = state[action.id].quals;
			let newQuals = oldQuals.filter((qual) => !action.quals.includes(qual));
			return {
				...state,
				[action.id]: {
					...state[action.id],
					quals: newQuals,
				}
			};
		case ADD_UPDATE_NOTE:
			if (action.entity != 'aircrew' || state[action.entityId].notes.includes(action.id)) {
				return state;
			}
			return {
				...state,
				[action.entityId]: {
					...state[action.entityId],
					notes: state[action.entityId].notes.concat(action.id),
				},
			};
		case DEL_NOTE:
			if (action.entity != 'aircrew') {
				return state;
			}
			return {
				...state,
				[action.entityId]: {
					...state[action.entityId],
					notes: state[action.entityId].notes.filter(noteId => noteId != action.id),
				},
			};
		default:
			return state;
	};
};

const allAircrew = (state = [], action) => {
	switch (action.type) {
		case ADD_AIRCREW:
			return state.concat(action.id);
		case DEL_AIRCREW:
			return state.filter(item => item != action.id);
		default:
			return state;
	};
};

const crewList = (state = {}, action) => {
	switch (action.type) {
		case SET_CURRENT_DAY:
			return {
				...state,
				currentDay: action.day,
			};
		default:
			return state;
	};
};

const daysById = (state = {}, action) => {
	switch (action.type) {
		case ADD_DAY:
			return {
				...state,
				[action.id]: {
					id: action.id,
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
				}
			};
		case ADD_FLIGHT:
			if (state[action.dayId].flights.includes(action.id)) {
				return state;
			}
			return {
				...state,
				[action.dayId]: {
					...state[action.dayId],
					flights: state[action.dayId].flights.concat(action.id),
				},
			};
		case DEL_FLIGHT:
			return {
				...state,
				[action.dayId]: {
					...state[action.dayId],
					flights: state[action.dayId].flights.filter(flightId => flightId != action.id),
				}
			}
		case ADD_UPDATE_NOTE:
			if (action.entity != 'day' || state[action.entityId].notes.includes(action.id)) {
				return state;
			}
			return {
				...state,
				[action.entityId]: {
					...state[action.entityId],
					notes: state[action.entityId].notes.concat(action.id),
				},
			};
		case DEL_NOTE:
			if (action.entity != 'day') {
				return state;
			}
			return {
				...state,
				[action.entityId]: {
					...state[action.entityId],
					notes: state[action.entityId].notes.filter(noteId => noteId != action.id),
				},
			};
		default:
			return state;
	};
};

const allDays = (state = [], action) => {
	switch (action.type) {
		case ADD_DAY:
			return state.concat(action.id);
		default:
			return state;
	};
};

const flightsById = (state = {}, action) => {
	switch (action.type) {
		case ADD_FLIGHT:
			return {
				...state,
				[action.id]: {
					id: action.id,
					sim: action.sim,
					// flow: "pit",
					times: {
						brief: null,
						takeoff: null,
						land: null,
					},
					airspace: [],
					sorties: [],
					notes: [],
				}
			};
		case DEL_FLIGHT:
			let rest = Object.assign({},state);
			delete rest[action.id];
			return rest;
		case UPDATE_FLIGHT_TIME:
			if (!['brief','takeoff','land'].includes(action.timeType)) {
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
		case TOGGLE_FLIGHT_TYPE:
			return {
				...state,
				[action.id]: {
					...state[action.id],
					sim: !state[action.id].sim,
				},
			};
		case ADD_SORTIE:
			if (state[action.flightId].sorties.includes(action.id)) {
				return state;
			}
			return {
				...state,
				[action.flightId]: {
					...state[action.flightId],
					sorties: state[action.flightId].sorties.concat(action.id),
				},
			};
		case DEL_SORTIE:
			return {
				...state,
				[action.flightId]: {
					...state[action.flightId],
					sorties: state[action.flightId].sorties.filter(sortieId => sortieId != action.id),
				},
			};
		case ADD_UPDATE_NOTE:
			if (action.entity != 'flight' || state[action.entityId].notes.includes(action.id)) {
				return state;
			};
			return {
				...state,
				[action.entityId]: {
					...state[action.entityId],
					notes: state[action.entityId].notes.concat(action.id),
				},
			};
		case DEL_NOTE:
			if (action.entity != 'flight') {
				return state;
			}
			return {
				...state,
				[action.entityId]: {
					...state[action.entityId],
					notes: state[action.entityId].notes.filter(noteId => noteId != action.id),
				},
			};
		default:
			return state;
	};
};

const allFlights = (state = [], action) => {
	switch (action.type) {
		case ADD_FLIGHT:
			return state.concat(action.id);
		case DEL_FLIGHT:
			return state.filter(id => id != action.id)
		default:
			return state;
	};
};

const notesById = (state = {}, action) => {
	switch (action.type) {
		case ADD_UPDATE_NOTE:
			return {
				...state,
				[action.id]: {
					id: action.id,
					content: action.content,
					// keep track of who added, edited, time added etc later
				},
			};
		case DEL_NOTE:
			let rest = Object.assign({},state);
			delete rest[action.id];
			return rest;
		default:
			return state;
	}
}

const allNotes = (state = [], action) => {
	switch (action.type) {
		case ADD_UPDATE_NOTE:
			if (state.includes(action.id)) {
				return state;
			}
			return state.concat(action.id);
		case DEL_NOTE:
			return state.filter(id => id != action.id)
		default:
			return state;
	}
};

const sortiesById = (state = {}, action) => {
	switch (action.type) {
		case ADD_SORTIE:
			return {
				...state,
				[action.id]: {
					id: action.id,
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
			};
		case DEL_SORTIE:
			let rest = Object.assign({},state);
			delete rest[action.id];
			return rest;
		case ADD_UPDATE_NOTE:
		case DEL_NOTE:
		default:
			return state;
	}
};

const allSorties = (state = [], action) => {
	switch (action.type) {
		case ADD_SORTIE:
			return state.concat(action.id);
		case DEL_SORTIE:
			return state.filter(sortieId => sortieId != action.id);
		case ADD_UPDATE_NOTE:
		case DEL_NOTE:
		default:
			return state;
	}
};

export const whiteboardApp = combineReducers ({
	aircrewById,
	allAircrew,
	daysById,
	allDays,
	flightsById,
	allFlights,
	notesById,
	allNotes,
	sortiesById,
	allSorties,
	crewList,
});