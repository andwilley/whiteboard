import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { IEntity, IFlights } from '../types/State';
import { actions, IAction } from '../actions';
import { noteEntity } from '../whiteboard-constants';
import * as Moment from 'moment';
import { conv24HrTimeToMoment } from '../util/utilFunctions';
import { errorLocs } from '../errors';

const flightsById = (state: {[id: string]: IFlights} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            return {
                ...state,
                [action.payload.flightId]: {
                    id: action.payload.flightId,
                    sim: action.payload.sim,
                    useExactTimes: false,
                    // flow: 'pit',
                    times: {
                        brief: '',
                        takeoff: '',
                        land: '',
                    },
                    airspace: [],
                    sorties: [action.payload.sortieId],
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
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    times: {
                        ...state[action.payload.flightId].times,
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
        case getType(actions.toggleFlightExactTimes):
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    useExactTimes: !state[action.payload.flightId].useExactTimes,
                },
            };
        case getType(actions.addSortie):
            if (state[action.payload.flightId].sorties.indexOf(action.payload.sortieId) > -1) {
                return state;
            }
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    sorties: state[action.payload.flightId].sorties.concat(action.payload.sortieId),
                },
            };
        case getType(actions.delSortie):
            return {
                ...state,
                [action.payload.flightId]: {
                    ...state[action.payload.flightId],
                    sorties: state[action.payload.flightId].sorties
                        .filter(sortieId => sortieId !== action.payload.id),
                },
            };
        case getType(actions.addUpdateNote):
            if (action.payload.entity !== noteEntity.FLIGHT_NOTE ||
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
            if (action.payload.entity !== noteEntity.FLIGHT_NOTE) {
                return state;
            }
            return {
                ...state,
                [action.payload.entityId]: {
                    ...state[action.payload.entityId],
                    notes: state[action.payload.entityId].notes
                        .filter(noteId => noteId !== action.payload.id),
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
                        .filter(airspaceId => airspaceId !== action.payload.id),
                },
            };
        case getType(actions.reorderNotes):
            if (action.payload.noteLoc !== noteEntity.FLIGHT_NOTE) {
                return state;
            }
            const sourceNotesCopy = state[action.payload.sourceLocId].notes.concat();
            const destNotesCopy = action.payload.sourceLocId === action.payload.destLocId ?
                sourceNotesCopy :
                state[action.payload.destLocId].notes.concat();
            const movedNoteId = sourceNotesCopy.splice(action.payload.oldIndex, 1)[0];
            destNotesCopy.splice(action.payload.newIndex, 0, movedNoteId);
            return {
                ...state,
                [action.payload.sourceLocId]: {
                    ...state[action.payload.sourceLocId],
                    notes: sourceNotesCopy,
                },
                [action.payload.destLocId]: {
                    ...state[action.payload.destLocId],
                    notes: destNotesCopy,
                },
            };
        case getType(actions.reorderSorties):
            const sourceId = action.payload.sourceLocId.slice(errorLocs.FLIGHT.length + 1);
            const destId = action.payload.destLocId.slice(errorLocs.FLIGHT.length + 1);
            const sourceSortiesCopy = state[sourceId].sorties.concat();
            const destSortiesCopy = sourceId === destId ?
                sourceSortiesCopy :
                state[destId].sorties.concat();
            const movedSortieId = sourceSortiesCopy.splice(action.payload.oldIndex, 1)[0];
            destSortiesCopy.splice(action.payload.newIndex, 0, movedSortieId);
            return {
                ...state,
                [sourceId]: {
                    ...state[sourceId],
                    sorties: sourceSortiesCopy,
                },
                [destId]: {
                    ...state[destId],
                    sorties: destSortiesCopy,
                },
            };
        default:
            return state;
    }
};

const allFlights = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addFlight):
            if (state.indexOf(action.payload.flightId) > -1) {
                return state;
            }
            return state.concat(action.payload.flightId);
        case getType(actions.delFlight):
            return state.filter(id => id !== action.payload.id);
        default:
            return state;
    }
};

const flightsReducer = combineReducers<IEntity<IFlights>>({
    byId: flightsById,
    allIds: allFlights,
});

export default flightsReducer;

interface ITotalFlightTimeAndSortiesAcc {
    totalFlightTime: number;
    totalSorties: number;
}

export const getTotalFlightTimeAndSorties = (
    flights: IEntity<IFlights>,
    dayId: string
): ITotalFlightTimeAndSortiesAcc => {
    return flights.allIds.reduce((totalFlightTimeAndSorties: ITotalFlightTimeAndSortiesAcc, flightId) => {
        const takeoff = conv24HrTimeToMoment(flights.byId[flightId].times.takeoff, dayId);
        const land = conv24HrTimeToMoment(flights.byId[flightId].times.land, dayId);
        if (flights.byId[flightId].sim) {
            return totalFlightTimeAndSorties;
        }
        if (!takeoff.isValid() || !land.isValid()) {
            return {
                totalFlightTime: totalFlightTimeAndSorties.totalFlightTime,
                totalSorties: totalFlightTimeAndSorties.totalSorties + flights.byId[flightId].sorties.length,
            };
        }
        return {
            totalFlightTime: totalFlightTimeAndSorties.totalFlightTime +
                (Moment.duration(land.diff(takeoff)).asHours()) * flights.byId[flightId].sorties.length,
            totalSorties: totalFlightTimeAndSorties.totalSorties + flights.byId[flightId].sorties.length,
        };
    }, {totalFlightTime: 0, totalSorties: 0});
};

export const getCurrentDayFlights = (
    stateFlightsById: IEntity<IFlights>['byId'],
    currentDayFlightIds: string[]): IFlights[] => {
    return currentDayFlightIds.map(flightId => {
        return stateFlightsById[flightId];
    });
};

export const getFlightsById = (state: IEntity<IFlights>) => {
    return state.byId;
};

export const getFlightById = (state: IEntity<IFlights>['byId'], flightId: string) => {
    return state[flightId];
};
