import { IAircrew, UErrorTypes, UErrorLevels, IErrors } from './State';

export interface IPucks {
    flight: number;
    sim: number;
    flightNote: number;
    dayNote: number;
}

export interface IAircrewWithPucks extends IAircrew {
    pucks: IPucks;
}

export interface IAircrewDayPucks {
    [id: string]: IPucks;
}

export interface IValidator {
    level: string;
    message: string;
}

export interface INameLocations {
    FRONT_SEAT_NAME: 'FRONT_SEAT_NAME';
    BACK_SEAT_NAME: 'BACK_SEAT_NAME';
    NOTE: 'NOTE';
}

export interface IEditables extends INameLocations {
    BRIEF: 'BRIEF';
    TAKEOFF: 'TAKEOFF';
    LAND: 'LAND';
    FRONT_SEAT_CODE: 'FRONT_SEAT_CODE';
    FRONT_SEAT_SYMBOL: 'FRONT_SEAT_SYMBOL';
    BACK_SEAT_CODE: 'BACK_SEAT_CODE';
    BACK_SEAT_SYMBOL: 'BACK_SEAT_SYMBOL';
    LOADOUT: 'LOADOUT';
    AIRSPACE: 'AIRSPACE';
}

export type UEditables = IEditables[keyof IEditables];

export type NullForAll<T> = {
    [P in keyof T]: null;
};

export interface IUntrackedErrors {
    id: string;
    type: UErrorTypes;
    level: UErrorLevels;
    message: string;
}

export type AllErrors = IErrors | IUntrackedErrors;
