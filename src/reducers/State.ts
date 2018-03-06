interface IEntity<E> {
    readonly byId: { [id: string]: E };
    readonly allIds: string[];
}

interface IAircrew {
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

interface IDays {
    readonly id: string;
    readonly flights: string[];
    readonly notes: string[];
}

interface IFlights {
    readonly id: string;
    readonly sim: boolean;
    readonly times: {
        readonly brief: string;
        readonly takeoff: string;
        readonly land: string;
    };
    readonly airspace: string[];
    readonly sorties: string[];
    readonly notes: string[];
}

interface INotes {
    readonly id: string;
    readonly content: string;
    readonly aircrewRefIds: string[];
}

interface ISeat {
    readonly inputName: string;
    readonly crewId: string;
    readonly codes: string[];
    readonly symbols: string[];
}

interface ISorties {
    readonly id: string;
    readonly front: Seat;
    readonly back: Seat;
    readonly loadout: string;
    readonly notes: string[];
}

interface IAirspace {
    readonly id: string;
    readonly name: string;
    readonly start: string;
    readonly end: string;
}

interface ICrewList {
    readonly currentDay: string;
}

interface IAddUpdateAircrewFormValues {
    readonly id: string;
    readonly callsign: string;
    readonly first: string;
    readonly last: string;
    readonly rank: number;
    readonly seat: string;
    readonly quals: string[];
    readonly existingAircrewUnchanged: boolean;
    readonly qualsList: string[];
    readonly display: boolean;
}

export interface IState {
    readonly aircrew: IEntity<IAircrew>;
    readonly days: IEntity<IDays>;
    readonly flights: IEntity<IFlights>;
    readonly sorties: IEntity<ISorties>;
    readonly notes: IEntity<INotes>;
    readonly airspace: IEntity<IAirspace>;
    readonly crewList: ICrewList;
    readonly addUpdateAircrewFormValues: IAddUpdateAircrewFormValues;
}
