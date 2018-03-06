import { qualsList } from '../whiteboard-constants';

export const INITIAL_STATE = {
    aircrew: {
        byId: {
            'a': {
                callsign: 'Steamboat',
                first: 'Drew',
                flightPucks: [],
                id: 'a',
                last: 'Willey',
                notes: [],
                odos: 0,
                quals: ['FAI'],
                rank: 3,
                seat: 'wso',
                simPucks: [],
                snivs: [],
            },
            'b': {
                callsign: 'Jambo',
                first: 'Alex',
                flightPucks: [],
                id: 'b',
                last: 'Blank',
                notes: [],
                odos: 0,
                quals: ['FAI'],
                rank: 3,
                seat: 'pilot',
                simPucks: [],
                snivs: [],
            },
            'c': {
                callsign: 'Dump',
                first: 'Mark',
                flightPucks: [],
                id: 'c',
                last: 'Infante',
                notes: [],
                odos: 0,
                quals: ['FAI'],
                rank: 3,
                seat: 'pilot',
                simPucks: [],
                snivs: [],
            },
            'd': {
                callsign: 'Cox',
                first: 'Steve',
                flightPucks: [],
                id: 'd',
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
        allIds: ['a','b','c','d'],
    },
    days: {
        byId: {
            '2018-01-24': {
                flights: ['a','b'],
                id: '2018-01-24',
                // flow: {
                // 	numJets: [],
                // 	method: [],
                // },
                // sun: {
                // 	rise: 0710,
                // 	set: 2031,
                // },
                notes: ['b'],
            },
        },
        allIds: ['2018-01-24'],
    },
    flights: {
        byId: {
            'a': {
                id: 'a',
                sim: true,
                // flow: 'pit',
                times: {
                    brief: '',
                    takeoff: '',
                    land: '',
                },
                airspace: [],
                sorties: ['a','b'],
                notes: ['a'],
            },
            'b': {
                id: 'b',
                sim: false,
                // flow: 'pit',
                times: {
                    brief: '',
                    takeoff: '',
                    land: '',
                },
                airspace: [],
                sorties: ['c', 'd'],
                notes: [],
            },
        },
        allIds: ['a', 'b'],
    },
    notes: {
        byId: {
            1: {
                id: 'a',
                content: 'test flight note',
                aircrewRefIds: ['a', 'b', 'c'],
            },
            2: {
                id: 'b',
                content: 'test day note',
                aircrewRefIds: ['a', 'b', 'c'],
            },
        },
        allIds: ['a','b'],
    },
    crewList: {
        currentDay: '2018-01-24',
    },
    sorties: {
        byId: {
            'a': {
                id: 'a',
                front: {
                    inputName: '',
                    crewId: 'a',
                    codes: [],
                    symbols: [],
                },
                back: {
                    inputName: '',
                    crewId: 'b',
                    codes: [],
                    symbols: [],
                },
                loadout: '',
                notes: [],
            },
            'b': {
                id: 'b',
                front: {
                    inputName: '',
                    crewId: 'a',
                    codes: [],
                    symbols: [],
                },
                back: {
                    inputName: '',
                    crewId: 'b',
                    codes: [],
                    symbols: [],
                },
                loadout: '',
                notes: [],
            },
            'c': {
                id: 'c',
                front: {
                    inputName: '',
                    crewId: 'c',
                    codes: [],
                    symbols: [],
                },
                back: {
                    inputName: '',
                    crewId: 'a',
                    codes: [],
                    symbols: [],
                },
                loadout: '',
                notes: [],
            },
            'd': {
                id: 'd',
                front: {
                    inputName: '',
                    crewId: 'c',
                    codes: [],
                    symbols: [],
                },
                back: {
                    inputName: '',
                    crewId: 'a',
                    codes: [],
                    symbols: [],
                },
                loadout: '',
                notes: [],
            },
        },
        allIds: ['a','b','c','d'],
    },
    airspace: {
        byId: {},
        allIds: [],
    },
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
