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
		DEL_FLIGHT
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
			// may want to do this check in the action creator... might be impure to reference state here...
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
					crewPucked: [],									// by aircrew.<id> as they are added to sorties, used by crewList filters
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

export const reducer = combineReducers ({
	aircrewById,
	allAircrew,
	daysById,
	allDays,
	crewList,
});