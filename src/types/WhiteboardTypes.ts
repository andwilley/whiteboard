import * as Moment from 'moment';
import { IAircrew, UErrorTypes, UErrorLevels, UErrorLocs, IErrors, ITimeTypes } from './State';

export interface IPucks {
    flight: number;
    sim: number;
    flightNote: number;
    simNote: number;
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
    SNIV_FORM: 'SNIV_FORM';
}

export type UNameLocations = INameLocations[keyof INameLocations];

export interface IEditables extends INameLocations, ITimeTypes {
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

export interface ISchedBlock {
    start: Moment.Moment;
    end: Moment.Moment;
    location: UErrorLocs;
    locationId: string;
}

export interface ISchedObject {
    [id: string]: ISchedBlock[];
}

export interface IActiveRefsAndBlock {
    activeAircrewRefs: ISchedObject;
    activeTimeblock: ISchedBlock | null;
}

export interface IIcons {
    trash: 'M3 0c-.55 0-1 .45-1 1h-1c-.55 0-1 .45-1 1h7c0-.55-.45-1-1-1h-1c0-.55-.45-1-1-1h-1zm-2 \
3v4.81c0 .11.08.19.19.19h4.63c.11 0 .19-.08.19-.19v-4.81h-1v3.5c0 \
.28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1v3.5c0 .28-.22.5-.5.5s-.5-.22-.5-.5v-3.5h-1z';
    plus: 'M3 0v3h-3v2h3v3h2v-3h3v-2h-3v-3h-2z';
}

export type UIcons = keyof IIcons;
