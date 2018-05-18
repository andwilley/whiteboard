import { INameLocations, IEditables } from './types/WhiteboardTypes';
import { ITimeTypes } from './types/State';

export const qualsList =
    ['SL', 'DL', 'MC', 'NSI', 'FAI', 'MDTI', 'WTI', 'FAC(A)', 'FAC(A)I', 'NS', 'ACM', 'LAT', 'PMCF', 'ODO'];

export const blankAddUpdateAircrewForm = {
    id: '',
    callsign: '',
    first: '',
    last: '',
    rank: 0,
    seat: 'pilot',
    quals: [],
    existingAircrewUnchanged: false,
    display: false,
};

export const seats = ['front', 'back'];

export const noteEntity = {
    DAY: 'DAY',
    FLIGHT: 'FLIGHT',
    SORTIE: 'SORTIE',
    AIRCREW: 'AIRCREW',
};

export const nameLocation: INameLocations = {
    FRONT_SEAT_NAME: 'FRONT_SEAT_NAME',
    BACK_SEAT_NAME: 'BACK_SEAT_NAME',
    NOTE: 'NOTE',
};

export const timeTypes: ITimeTypes = {
    BRIEF: 'BRIEF',
    TAKEOFF: 'TAKEOFF',
    LAND: 'LAND',
};

export const editables: IEditables = {
    ...nameLocation,
    ...timeTypes,
    FRONT_SEAT_CODE: 'FRONT_SEAT_CODE',
    FRONT_SEAT_SYMBOL: 'FRONT_SEAT_SYMBOL',
    BACK_SEAT_CODE: 'BACK_SEAT_CODE',
    BACK_SEAT_SYMBOL: 'BACK_SEAT_SYMBOL',
    LOADOUT: 'LOADOUT',
    AIRSPACE: 'AIRSPACE',
};
