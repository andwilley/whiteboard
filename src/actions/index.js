// Action Types

export const ADD_AIRCREW = "ADD_AIRCREW";
export const UPDATE_AIRCREW = "UPDATE_AIRCREW";
export const DEL_AIRCREW = "DEL_AIRCREW";
export const ADD_AIRCREW_QUALS = "ADD_AIRCREW_QUALS";
export const DEL_AIRCREW_QUALS = "DEL_AIRCREW_QUALS";
export const SET_QUAL_FILTER = "SET_QUAL_FILTER";
export const SET_CURRENT_DAY = "SET_CURRENT_DAY";
export const ADD_DAY = "ADD_DAY";
export const ADD_FLIGHT = "ADD_FLIGHT";
export const DEL_FLIGHT = "DEL_FLIGHT";
export const UPDATE_FLIGHT_TIME = "UPDATE_FLIGHT_TIME";
export const TOGGLE_FLIGHT_TYPE = "TOGGLE_FLIGHT_TYPE";
export const ADD_UPDATE_NOTE = "ADD_UPDATE_NOTE";
export const DEL_NOTE = "DEL_NOTE";
export const ADD_SORTIE = "ADD_SORTIE";
export const DEL_SORTIE = "DEL_SORTIE";


let inputID = 0;
export const addAircrew = (args) => {
	return {
		type: ADD_AIRCREW,
		id: args.id,
		rank: args.rank,
		first: args.first,
		last: args.last,
		callsign: args.callsign,
		quals: args.quals,
	};
};

export const delAircrew = (id) => {
	return {
		type: DEL_AIRCREW,
		id,
	};
};

export const updateAircrew = (args) => {
	return {
		type: UPDATE_AIRCREW,
		id: args.id,
		rank: args.rank,
		first: args.first,
		last: args.last,
		callsign: args.callsign,
	};
};

export const addAircrewQuals = (id, quals) => {
	return {
		type: ADD_AIRCREW_QUALS,
		id,
		quals,
	};
};

export const delAircrewQuals = (id, quals) => {
	return {
		type: DEL_AIRCREW_QUALS,
		id,
		quals,
	};
};

export const setCurrentDay = (day) => {
	return {
		type: SET_CURRENT_DAY,
		day,
	};
};

export const addDay = (day) => {
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

export const addFlight = (id, dayId, sim=false) => {
	return {
		type: ADD_FLIGHT,
		id,
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

export const toggleFlightType = (id) => {
	return {
		type: TOGGLE_FLIGHT_TYPE,
		id,
	};
};

export const addUpdateNote = (args) => {
	if (!args.content) {
		args.content = '';
	}
	return {
		type: ADD_UPDATE_NOTE,
		id: args.id,
		entity: args.entity,
		entityId: args.entityId,
		content: args.content,
	};
};

export const delNote = (args) => {
	return {
		type: DEL_NOTE,
		id: args.id,
		entity: args.entity,
		entityId: args.entityId,
	};
};

export const addSortie = (id,flightId) => {
	return {
		type: ADD_SORTIE,
		id,
		flightId,
	};
};

export const delSortie = (id, flightId) => {
	return {
		type: DEL_SORTIE,
		id,
		flightId,
	}
}