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
    brief: Moment.Moment | null;
    hardStart: Moment.Moment;
    hardEnd: Moment.Moment;
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
    pencil: 'M6 0l-1 1 2 2 1-1-2-2zm-2 2l-4 4v2h2l4-4-2-2z';
    plane: 'M16.392,2.702L13.84,5.254  C11.224,4.735,0.748,2.235,0.611,2.406C0.458,2.598,0.404,2.73,\
0.097,3.114c3.022,2.289,6.101,4.477,9.131,6.752l-3.855,3.855  L0,14.056l0,0l4.723,2.739l2.651,4.635l0,\
0l0.333-5.355c1.261-1.25,2.531-2.492,3.798-3.736c2.3,3.06,4.51,6.171,6.822,9.224  \
c0.384-0.308,0.516-0.361,0.708-0.515c0.173-0.138-2.407-10.937-2.87-13.343c0.869-0.883,1.73-1.773,2.58-2.675  \
C23.273,0.231,21.333-2.24,16.392,2.702z';
    controller: 'M377.8,100.1C332.9,86.8,318.8,112,256,112s-76.9-25.3-121.8-11.9c-44.9,13.3-67.3,60.4-88.5,148.8  \
c-21.2,88.5-17.3,152.4,7.7,164.3c25,11.9,53.2-15.4,80.1-49.1C155.3,337.7,166.2,336,256,336c89.7,0,99,0.7,122.5,28.1 \
c26.9,33.7,55.1,61,80.1,49.1c25-11.9,28.9-75.8,7.7-164.3C445.1,160.5,422.6,113.5,377.8,100.1z M128.2,263.7  \
c-21.7,0-39.3-17.7-39.3-39.6c0-21.8,17.6-39.6,39.3-39.6c21.7,0,39.3,17.8,39.3,39.6S149.9,263.7,128.2,263.7z \
M309.7,243.6  c-10.6,0-19.3-8.7-19.3-19.4c0-10.7,8.7-19.4,19.3-19.4c10.7,0,19.4,8.7,19.4,19.4C329,234.9,320.4,\
243.6,309.7,243.6z M351.9,286  c-10.6,0-19.3-8.7-19.3-19.4c0-10.8,8.7-19.4,19.3-19.4c10.7,0,19.4,8.7,19.4,19.\
4C371.3,277.4,362.6,286,351.9,286z M351.9,201.1  c-10.6,0-19.3-8.7-19.3-19.4c0-10.7,8.7-19.4,19.3-19.4c10.7,0,\
19.4,8.7,19.4,19.4C371.3,192.4,362.6,201.1,351.9,201.1z   M394.2,243.6c-10.7,0-19.3-8.7-19.3-19.4c0-10.7,8.7-\
19.4,19.3-19.4c10.6,0,19.3,8.7,19.3,19.4  C413.5,234.9,404.9,243.6,394.2,243.6z';
    paperclip: 'M5 0c-.51 0-1.02.21-1.41.59l-2.78 2.72c-1.07 1.07-1.07 2.8 0 3.88 1.07 1.07 2.8 1.07 \
3.88 0l1.25-1.25-.69-.69-1.16 1.13-.09.13c-.69.69-1.81.69-2.5 0-.68-.68-.66-1.78 0-2.47l2.78-2.75c.39-.39 1.04-.39 \
1.44 0 .39.39.37 1.01 0 1.41l-2.5 2.47c-.1.1-.27.1-.38 0-.1-.1-.1-.27 0-.38l.06-.03.91-.94-.69-.69-.97.97c-\
.48.48-.48 1.27 0 1.75s1.27.49 1.75 0l2.5-2.44c.78-.78.78-2.04 0-2.81-.39-.39-.89-.59-1.41-.59z';
    x: 'M1.41 0l-1.41 1.41.72.72 1.78 1.81-1.78 1.78-.72.69 1.41 1.44.72-.72 1.81-1.81 1.78 1.81.69.72 \
1.44-1.44-.72-.69-1.81-1.78 1.81-1.81.72-.72-1.44-1.41-.69.72-1.78 1.78-1.81-1.78-.72-.72z';
    'chevron-bottom': 'M1.5 0l-1.5 1.5 4 4 4-4-1.5-1.5-2.5 2.5-2.5-2.5z';
    'chevron-top': 'M4 0l-4 4 1.5 1.5 2.5-2.5 2.5 2.5 1.5-1.5-4-4z';
    clock: 'M4 0c-2.2 0-4 1.8-4 4s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4zm0 1c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-\
3 1.34-3 3-3zm-.5 1v2.22l.16.13.5.5.34.38.72-.72-.38-.34-.34-.34v-1.81h-1z';
}

export type UIcons = keyof IIcons;
