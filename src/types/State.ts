import { EditorState } from 'draft-js';
import { UEditables, NullForAll, ISchedBlock } from './WhiteboardTypes';
import { Moment } from 'moment';

export interface IEntity<E> {
    readonly byId: { readonly [id: string]: E };
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

export interface IGroups {
    readonly id: string;
    readonly name: string;
    readonly aircrewIds: string[];
}

export interface IDays {
    readonly id: string;
    readonly flights: string[];
    readonly notes: string[];
}

export interface IFlightTimes {
    readonly brief: string; // moment
    readonly takeoff: string; // moment
    readonly land: string; // moment
}

export interface IFlights {
    readonly id: string;
    readonly sim: boolean;
    readonly times: IFlightTimes;
    readonly useExactTimes: boolean;
    readonly airspace: string[];
    readonly sorties: string[];
    readonly notes: string[];
}

export interface ISnivDates {
    [key: string]: {
        start: Moment;
        end: Moment;
    };
}

export interface ISnivs {
    readonly id: string;
    readonly aircrewIds: string[];
    readonly start: Moment | string;
    readonly end: Moment | string;
    readonly message: string;
    readonly dateAdded: Moment;
    readonly lastUpdated: Moment;
    readonly dates: ISnivDates;
}

export interface INotes {
    readonly id: string;
    readonly content: string;
    // readonly start: moment;
    // readonly end: moment;
    readonly aircrewRefIds: string[];
}

export interface ISeat {
    readonly inputName: string;
    readonly aircrewRefIds: string[];
    readonly codes: string[];
    readonly symbols: string;
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
    readonly groupFilter: string[];
    readonly rankFilter: number[];
}

export interface ICrewListUI {
    readonly currentDay: string;
    readonly addUpdateAircrewFormDisplay: boolean;
    readonly addUpdateSnivFormDisplay: boolean;
    readonly filters: IFilters;
    readonly showSnivs: boolean;
    readonly showFilters: boolean;
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

export interface IAddUpdateSnivFormValues {
    readonly snivId: string;
    readonly aircrew: string;
    readonly aircrewRefIds: string[];
    readonly start: Moment | string;
    readonly end: Moment | string;
    readonly message: string;
}

export interface ITimeTypes {
    BRIEF: 'BRIEF';
    TAKEOFF: 'TAKEOFF';
    LAND: 'LAND';
}

export type UTimeTypes = ITimeTypes[keyof ITimeTypes];

export interface ISnivTimeTypes {
    SNIV_START: 'SNIV_START';
    SNIV_END: 'SNIV_END';
}

export type USnivTimeTypes = ISnivTimeTypes[keyof ISnivTimeTypes];

export interface INoteEntity {
    DAY_NOTE: 'DAY_NOTE';
    FLIGHT_NOTE: 'FLIGHT_NOTE';
    AIRCREW_NOTE: 'AIRCREW_NOTE';
    SORTIE_NOTE: 'SORTIE_NOTE';
}

export type UNoteEntity = INoteEntity[keyof INoteEntity];

export interface IErrorLocs extends ITimeTypes, INoteEntity {
    FLIGHT: 'FLIGHT';
    SIM: 'SIM';
    SORTIE: 'SORTIE';
    DAY: 'DAY';
    SIM_NOTE: 'SIM_NOTE';
    CREWLIST: 'CREWLIST';
    SNIVS: 'SNIVS';
    SNIV_FORM: 'SNIV_FORM';
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

export interface IErrorTypes {
    FORM_VALIDATION: 'FORM_VALIDATION';
    SCHEDULE_CONFLICT: 'SCHEDULE_CONFLICT';
    TIME_ORDER: 'TIME_ORDER';
}

export type UGenericErrorTypes = Exclude<keyof IErrorTypes,
    (IErrorTypes['SCHEDULE_CONFLICT'] | IErrorTypes['TIME_ORDER'])>;

export type UErrorTypes = IErrorTypes[keyof IErrorTypes];

export interface IBaseErrorMeta {
}

export interface ISchedErrorMeta extends IBaseErrorMeta {
    readonly aircrewId: string;
}

export interface ITimeErrorMeta extends IBaseErrorMeta {
    readonly timeType: UTimeTypes | USnivTimeTypes;
}

/** this is used by the interface for the arguments for the addError action */
export interface ICustomErrorMeta {
    readonly aircrewId?: string;
    readonly timeType?: UTimeTypes | USnivTimeTypes;
}

export interface IBaseErrors {
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
    readonly meta: IBaseErrorMeta;
}

export interface IGenericErrors extends IBaseErrors {
    readonly type: UGenericErrorTypes;
}

export interface ISchedErrors extends IBaseErrors {
    readonly type: IErrorTypes['SCHEDULE_CONFLICT'];
    readonly meta: ISchedErrorMeta;
}

export interface ITimeErrors extends IBaseErrors {
    readonly type: IErrorTypes['TIME_ORDER'];
    readonly meta: ITimeErrorMeta;
}

export type IErrors = (IGenericErrors | ISchedErrors | ITimeErrors);

export interface ISettings {
    readonly minutesBeforeBrief: number;
    readonly minutesBriefToTakeoff: number;
    readonly minutesBriefToBoxTime: number;
    readonly minutesNoteDuration: number;
    readonly minutesAfterLand: number;
    readonly minutesAfterBoxTime: number;
    readonly hotPitNoShorterThan: number;
    readonly hotPitNoLongerThan: number;
    readonly qualsList: string[];
}

export interface IInputElement {
    readonly element: UEditables;
    readonly entityId: string;
    readonly timeblock: ISchedBlock;
}

export type IElementBeingEdited = IInputElement | NullForAll<IInputElement>;

export interface IEditor {
    readonly editorState: EditorState;
    readonly elementBeingEdited: IElementBeingEdited;
}

export interface IState {
    readonly aircrew: IEntity<IAircrew>;
    readonly groups: IEntity<IGroups>;
    readonly days: IEntity<IDays>;
    readonly flights: IEntity<IFlights>;
    readonly sorties: IEntity<ISorties>;
    readonly snivs: IEntity<ISnivs>;
    readonly notes: IEntity<INotes>;
    readonly airspace: IEntity<IAirspace>;
    readonly crewListUI: ICrewListUI;
    readonly addUpdateAircrewFormValues: IAddUpdateAircrewFormValues;
    readonly addUpdateSnivFormValues: IAddUpdateSnivFormValues;
    readonly settings: ISettings;
    readonly errors: IEntity<IErrors>;
    readonly editor: IEditor;
}
