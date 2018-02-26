export type State = {
    readonly aircrewById: {
        readonly [aircrewId: number]: {
            readonly id: number,
            readonly callsign: string,
            readonly first: string,
            readonly last: string,
            readonly rank: number,
            readonly seat: string,
            readonly quals: string[],
            readonly notes: number[],
            readonly odos: number,
            readonly flightPucks: string[],
            readonly simPucks: string[],
            readonly snivs: string[],
        }
    },
};