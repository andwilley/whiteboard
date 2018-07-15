import { qualsList } from '../whiteboard-constants';
import { EditorState } from 'draft-js';
import * as moment from 'moment';
import { IState } from '../types/State';

export const INITIAL_STATE: IState = {
    aircrew: {
        byId: {
            a: {
                callsign: 'Steamboat',
                first: 'Drew',
                flightPucks: [],
                id: 'a',
                last: 'Willey',
                notes: [],
                odos: 0,
                quals: ['TXN', 'STK', 'CAS', 'FWT 1', 'FCF'],
                rank: 3,
                seat: 'wso',
                simPucks: [],
                snivs: [],
            },
            b: {
                callsign: 'Jambo',
                first: 'Alex',
                flightPucks: [],
                id: 'b',
                last: 'Blank',
                notes: [],
                odos: 0,
                quals: ['TXN', 'STK', 'CAS'],
                rank: 3,
                seat: 'pilot',
                simPucks: [],
                snivs: [],
            },
            c: {
                callsign: 'Dump',
                first: 'Mark',
                flightPucks: [],
                id: 'c',
                last: 'Infante',
                notes: [],
                odos: 0,
                quals: ['ODO', 'TXN', 'STK', 'FWT 1', 'FCF'],
                rank: 3,
                seat: 'pilot',
                simPucks: [],
                snivs: [],
            },
            d: {
                callsign: 'Cox',
                first: 'Steve',
                flightPucks: [],
                id: 'd',
                last: 'Hand',
                notes: [],
                odos: 0,
                quals: ['ODO', 'TXN', 'STK', 'CAS', 'FWT 1', 'FWT 2'],
                rank: 3,
                seat: 'wso',
                simPucks: [],
                snivs: [],
            },
        },
        allIds: ['a', 'b', 'c', 'd'],
    },
    groups: {
        byId: {
            a: {
                id: 'a',
                name: '18-1',
                aircrewIds: ['a', 'b'],
            },
        },
        allIds: ['a'],
    },
    days: {
        byId: {
            '2018-01-24': {
                flights: ['a', 'b'],
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
                errors: [],
            },
        },
        allIds: ['2018-01-24'],
    },
    flights: {
        byId: {
            a: {
                id: 'a',
                sim: true,
                useExactTimes: false,
                // flow: 'pit',
                times: {
                    brief: '',
                    takeoff: '',
                    land: '',
                },
                airspace: [],
                sorties: ['a', 'b'],
                notes: ['a'],
            },
            b: {
                id: 'b',
                sim: false,
                useExactTimes: false,
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
    snivs: {
        byId: {
            a: {
                id: 'a',
                aircrewIds: ['a'],
                start: moment('2018-01-24T08:00:00.000', moment.ISO_8601),
                end: moment('2018-01-24T10:00:00.000', moment.ISO_8601),
                message: 'Test Sniv',
                dateAdded: moment('2018-01-23T08:00:00.000', moment.ISO_8601),
                lastUpdated: moment('2018-01-23T08:00:00.000', moment.ISO_8601),
                dates: {
                    '2018-01-24': {
                        start: moment('2018-01-24T08:00:00.000', moment.ISO_8601),
                        end: moment('2018-01-24T10:00:00.000', moment.ISO_8601),
                    },
                },
            },
        },
        allIds: ['a'],
    },
    notes: {
        byId: {
            a: {
                id: 'a',
                content: 'test flight note',
                aircrewRefIds: [],
            },
            b: {
                id: 'b',
                content: 'test day note',
                aircrewRefIds: [],
            },
        },
        allIds: ['a', 'b'],
    },
    crewListUI: {
        currentDay: '2018-01-24',
        showSnivs: false,
        showFilters: false,
        addUpdateAircrewFormDisplay: false,
        addUpdateSnivFormDisplay: false,
        filters: {
            crewSearchInput: '',
            showAvailable: false,
            qualFilter: [],
            groupFilter: [],
            rankFilter: [],
        },
    },
    sorties: {
        byId: {
            a: {
                id: 'a',
                front: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                back: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                loadout: '',
                notes: [],
            },
            b: {
                id: 'b',
                front: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                back: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                loadout: '',
                notes: [],
            },
            c: {
                id: 'c',
                front: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                back: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                loadout: '',
                notes: [],
            },
            d: {
                id: 'd',
                front: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                back: {
                    inputName: '',
                    aircrewRefIds: [],
                    codes: [],
                    symbols: '',
                },
                loadout: '',
                notes: [],
            },
        },
        allIds: ['a', 'b', 'c', 'd'],
    },
    airspace: {
        byId: {},
        allIds: [],
    },
    errors: {
        byId: {},
        activeIds: [],
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
    },
    addUpdateSnivFormValues: {
        snivId: '',
        aircrew: '',
        aircrewRefIds: [],
        start: '',
        end: '',
        message: '',
    },
    settings: {
        minutesAfterLand: 60,
        minutesAfterBoxTime: 30,
        minutesBeforeBrief: 29,
        minutesBriefToTakeoff: 120,
        minutesBriefToBoxTime: 60,
        minutesNoteDuration: 60,
        hotPitNoShorterThan: 45,
        hotPitNoLongerThan: 75,
        qualsList,
    },
    editor: {
        editorState: EditorState.createEmpty(),
        elementBeingEdited: {
            element: null,
            entityId: null,
            timeblock: null,
        },
    },
};
