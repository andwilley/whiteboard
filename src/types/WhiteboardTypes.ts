import { IAircrew } from './State';

export interface IPucks {
    flight: number;
    sim: number;
    flightNote: number;
    dayNote: number;
}

export interface IAircrewWithPucks extends IAircrew {
    pucks: IPucks;
}

export interface IFilters {
    qualFilter: string[];
    rankFilter: number[];
}
