import { qualsList } from '../whiteboard-constants';

export const INITIAL_STATE = {
    aircrewById: {
        1: {
            callsign: 'Steamboat',
            first: 'Drew',
            flightPucks: [],
            id: 1,
            last: 'Willey',
            notes: [],
            odos: 0,
            quals: ['FAI'],
            rank: 3,
            seat: 'wso',
            simPucks: [],
            snivs: [],
        },
        2: {
            callsign: 'Jambo',
            first: 'Alex',
            flightPucks: [],
            id: 2,
            last: 'Blank',
            notes: [],
            odos: 0,
            quals: ['FAI'],
            rank: 3,
            seat: 'pilot',
            simPucks: [],
            snivs: [],
        },
        3: {
            callsign: 'Dump',
            first: 'Mark',
            flightPucks: [],
            id: 3,
            last: 'Infante',
            notes: [],
            odos: 0,
            quals: ['FAI'],
            rank: 3,
            seat: 'pilot',
            simPucks: [],
            snivs: [],
        },
        4: {
            callsign: 'Cox',
            first: 'Steve',
            flightPucks: [],
            id: 4,
            last: 'Hand',
            notes: [],
            odos: 0,
            quals: ['FAC(A)'],
            rank: 3,
            seat: 'wso',
            simPucks: [],
            snivs: [],
        },
    },
    allAircrew: [1, 2, 3, 4],
    daysById: {
        '2018-01-24': {
            flights: [1, 2],
            id: '2018-01-24',
            // flow: {
            // 	numJets: [],
            // 	method: [],
            // },
            // sun: {
            // 	rise: 0710,
            // 	set: 2031,
            // },
            notes: [2],
        },
    },
    allDays: ['2018-01-24'],
    flightsById: {
        1: {
            id: 1,
            sim: true,
            // flow: 'pit',
            times: {
                brief: '',
                takeoff: '',
                land: '',
            },
            airspace: [],
            sorties: [1, 2],
            notes: [1],
        },
        2: {
            id: 2,
            sim: false,
            // flow: 'pit',
            times: {
                brief: '',
                takeoff: '',
                land: '',
            },
            airspace: [],
            sorties: [3, 4],
            notes: [],
        },
    },
    allFlights: [1, 2],
    notesById: {
        1: {
            id: 1,
            content: 'test flight note',
            aircrewRefIds: [1, 2, 3],
        },
        2: {
            id: 2,
            content: 'test day note',
            aircrewRefIds: [1, 2, 3],
        },
    },
    allNotes: [1, 2],
    crewList: {
        currentDay: '2018-01-24',
    },
    sortiesById: {
        1: {
            id: 1,
            front: {
                inputName: '',
                crewId: 1,
                codes: [],
                symbols: [],
            },
            back: {
                inputName: '',
                crewId: 2,
                codes: [],
                symbols: [],
            },
            loadout: '',
            notes: [],
        },
        2: {
            id: 2,
            front: {
                inputName: '',
                crewId: 1,
                codes: [],
                symbols: [],
            },
            back: {
                inputName: '',
                crewId: 2,
                codes: [],
                symbols: [],
            },
            loadout: '',
            notes: [],
        },
        3: {
            id: 3,
            front: {
                inputName: '',
                crewId: 3,
                codes: [],
                symbols: [],
            },
            back: {
                inputName: '',
                crewId: 1,
                codes: [],
                symbols: [],
            },
            loadout: '',
            notes: [],
        },
        4: {
            id: 4,
            front: {
                inputName: '',
                crewId: 3,
                codes: [],
                symbols: [],
            },
            back: {
                inputName: '',
                crewId: 1,
                codes: [],
                symbols: [],
            },
            loadout: '',
            notes: [],
        },
    },
    allSorties: [1, 2, 3, 4],
    airspaceById: {},
    allAirspace: [],
    addUpdateAircrewFormValues: {
        id: '',
        callsign: '',
        first: '',
        last: '',
        rank: 0,
        seat: 'pilot',
        quals: [],
        existingAircrewUnchanged: false,
        qualsList,
        display: false,
    },
};
