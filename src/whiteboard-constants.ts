import { INameLocations, IEditables, IIcons } from './types/WhiteboardTypes';
import { ITimeTypes, IAddUpdateSnivFormValues, ISnivTimeTypes, INoteEntity } from './types/State';

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

export const blankSnivForm: IAddUpdateSnivFormValues = {
    snivId: '',
    aircrew: '',
    aircrewRefIds: [],
    start: '',
    end: '',
    message: '',
};

export const seats = ['front', 'back'];

export const noteEntity: INoteEntity = {
    DAY_NOTE: 'DAY_NOTE',
    FLIGHT_NOTE: 'FLIGHT_NOTE',
    SORTIE_NOTE: 'SORTIE_NOTE',
    AIRCREW_NOTE: 'AIRCREW_NOTE',
};

export const nameLocation: INameLocations = {
    FRONT_SEAT_NAME: 'FRONT_SEAT_NAME',
    BACK_SEAT_NAME: 'BACK_SEAT_NAME',
    NOTE: 'NOTE',
    SNIV_FORM: 'SNIV_FORM',
};

export const timeTypes: ITimeTypes = {
    BRIEF: 'BRIEF',
    TAKEOFF: 'TAKEOFF',
    LAND: 'LAND',
};

export const snivTimeTypes: ISnivTimeTypes = {
    SNIV_START: 'SNIV_START',
    SNIV_END: 'SNIV_END',
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

export const builtInGroupNames = ['all hands', 'all aircrew', 'all officers'];

export const icons: IIcons = {
    trash: 'M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 \
3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 \
.28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z',
    plus: 'M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z',
};
