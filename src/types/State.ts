export interface IEntity<E> {
    readonly byId: { [id: string]: E };
    readonly allIds: string[];
}

export interface IEntityWithActive<E> {
    readonly byId: { [id: string]: E };
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
    readonly notes: number[];
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
    existingAircrewUnchanged: boolean;
}

export interface IErrorMeta {
    readonly aircrewId: string;
    readonly timeHiddenToggled?: Date[];
    readonly timeInactive?: Date;
}

export interface IErrors {
    readonly id: string;
    readonly time: Date;
    readonly dayId: string;
    readonly type: string;
    readonly location: string;
    readonly locationId: string;
    readonly level: string;
    readonly message: string;
    readonly display: boolean;
    readonly active: boolean;
    readonly meta: IErrorMeta;
}

export interface ISettings {
    minutesBeforeBrief: number;
    minutesAfterLand: number;
    minutesBriefToTakeoff: number;
    minutesNoteDuration: number;
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
}
