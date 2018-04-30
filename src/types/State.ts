import { EditorState } from 'draft-js';
import { UEditables, NullForAll } from './WhiteboardTypes';

export interface IEntity<E> {
    readonly byId: { readonly [id: string]: E };
    readonly allIds: string[];
}

export interface IEntityWithActive<E> {
    readonly byId: { readonly [id: string]: E };
    readonly activeIds: string[];
    readonly allIds: string[];
}

export interface IAircrew {
    readonly id: string;
    readonly callsign: string;
    readonly first: string;
    readonly last: string;
    readonly rank: number;
    readonly seat: string;
    readonly quals: string[];
    readonly odos: number;
    readonly notes: string[];
    readonly flightPucks: string[];
    readonly simPucks: string[];
    readonly snivs: string[];
}

export interface IDays {
    readonly id: string;
    readonly flights: string[];
    readonly notes: string[];
    readonly errors: string[];
}

export interface IFlightTimes {
    readonly brief: string;
    readonly takeoff: string;
    readonly land: string;
}

export interface IFlights {
    readonly id: string;
    readonly sim: boolean;
    readonly times: IFlightTimes;
    readonly airspace: string[];
    readonly sorties: string[];
    readonly notes: string[];
}

export interface INotes {
    readonly id: string;
    readonly content: string;
    readonly aircrewRefIds: string[];
}

export interface ISeat {
    readonly inputName: string;
    readonly aircrewRefIds: string[];
    readonly codes: string[];
    readonly symbols: string[];
}

export interface ISorties {
    readonly id: string;
    readonly front: ISeat;
    readonly back: ISeat;
    readonly loadout: string;
    readonly notes: string[];
}

export interface IAirspace {
    readonly id: string;
    readonly name: string;
    readonly start: string;
    readonly end: string;
}

export interface IFilters {
    readonly crewSearchInput: string;
    readonly showAvailable: boolean;
    readonly qualFilter: string[];
    readonly rankFilter: number[];
}

export interface ICrewListUI {
    readonly currentDay: string;
    readonly qualsList: string[];
    readonly addUpdateAircrewFormDisplay: boolean;
    readonly filters: IFilters;
}

export interface IAddUpdateAircrewFormValues {
    readonly id: string;
    readonly callsign: string;
    readonly first: string;
    readonly last: string;
    readonly rank: number;
    readonly seat: string;
    readonly quals: string[];
    readonly existingAircrewUnchanged: boolean;
}

export interface IErrorTypes {
    FORM_VALIDATION: 'FORM_VALIDATION';
    SCHEDULE_CONFLICT: 'SCHEDULE_CONFLICT';
    FORM_VAL_ERROR: 'FORM_VAL_ERROR';
}

export type UErrorTypes = Exclude<keyof IErrorTypes, IErrorTypes['SCHEDULE_CONFLICT']>;

// export type UErrorTypes = IErrorTypes['FORM_VALIDATION'] | IErrorTypes['FORM_VAL_ERROR'];

export interface IErrorLocs {
    FLIGHT: 'FLIGHT';
    SORTIE: 'SORTIE';
    DAY: 'DAY';
    DAY_NOTE: 'DAY_NOTE';
    CREWLIST: 'CREWLIST';
    SNIVS: 'SNIVS';
    APP: 'APP';
}

export type UErrorLocs = IErrorLocs[keyof IErrorLocs];

export interface IErrorLevels {
    WARN: 'WARN';
    CAUT: 'CAUT';
    INFO: 'INFO';
    SUCCESS: 'SUCCESS';
}

export type UErrorLevels = IErrorLevels[keyof IErrorLevels];

export interface IGenericErrorMeta {
    readonly aircrewId?: string;
    readonly timeHiddenToggled?: Date[];
    readonly timeInactive?: Date;
}

export interface ISchedErrorMeta {
    readonly aircrewId: string;
    readonly timeHiddenToggled?: Date[];
    readonly timeInactive?: Date;
}

export interface IGenericErrors {
    readonly id: string;
    readonly time: Date;
    readonly dayId: string;
    readonly type: UErrorTypes;
    readonly location: UErrorLocs;
    readonly locationId: string;
    readonly level: UErrorLevels;
    readonly message: string;
    readonly display: boolean;
    readonly active: boolean;
    readonly meta: IGenericErrorMeta;
}

export interface ISchedErrors {
    readonly id: string;
    readonly time: Date;
    readonly dayId: string;
    readonly type: IErrorTypes['SCHEDULE_CONFLICT'];
    readonly location: UErrorLocs;
    readonly locationId: string;
    readonly level: UErrorLevels;
    readonly message: string;
    readonly display: boolean;
    readonly active: boolean;
    readonly meta: ISchedErrorMeta;
}

export type IErrors = IGenericErrors | ISchedErrors;

export interface ISettings {
    readonly minutesBeforeBrief: number;
    readonly minutesBriefToTakeoff: number;
    readonly minutesNoteDuration: number;
    readonly minutesAfterLand: number;
}

export interface IInputElement {
    readonly element: UEditables;
    readonly entityId: string;
}

export type IElementBeingEdited = IInputElement | NullForAll<IInputElement>;

export interface IEditor {
    readonly editorState: EditorState;
    readonly elementBeingEdited: IElementBeingEdited;
}

export interface IState {
    readonly aircrew: IEntity<IAircrew>;
    readonly days: IEntity<IDays>;
    readonly flights: IEntity<IFlights>;
    readonly sorties: IEntity<ISorties>;
    readonly notes: IEntity<INotes>;
    readonly airspace: IEntity<IAirspace>;
    readonly crewListUI: ICrewListUI;
    readonly addUpdateAircrewFormValues: IAddUpdateAircrewFormValues;
    readonly settings: ISettings;
    readonly errors: IEntityWithActive<IErrors>;
    readonly editor: IEditor;
}
