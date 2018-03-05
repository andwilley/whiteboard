interface Entity<E> {
    readonly byId: { [id: string]: E };
    readonly allIds: string[];
}

interface Aircrew {
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

interface Days {
    readonly id: string;
    readonly flights: string[];
    readonly notes: string[];
}

interface Flights {
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

interface Notes {
    readonly id: string;
    readonly content: string;
    readonly aircrewRefIds: string[];
}

interface Seat {
    readonly inputName: string;
    readonly crewId: string;
    readonly codes: string[];
    readonly symbols: string[];
}

interface Sorties {
    readonly id: string;
    readonly front: Seat;
    readonly back: Seat;
    readonly loadout: string;
    readonly notes: string[];
}

interface Airspace {
    readonly id: string;
    readonly name: string;
    readonly start: string;
    readonly end: string;
}

interface CrewList {
    readonly currentDay: string;
}

interface AddUpdateAircrewFormValues {
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


interface State {
    readonly aircrew: Entity<Aircrew>;
    readonly days: Entity<Days>;
    readonly flights: Entity<Flights>;
    readonly sorties: Entity<Sorties>;
    readonly notes: Entity<Notes>;
    readonly airspace: Entity<Airspace>;
    readonly crewList: CrewList;
    readonly addUpdateAircrewFormValues: AddUpdateAircrewFormValues;
}