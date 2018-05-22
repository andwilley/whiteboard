import { qualsList } from '../whiteboard-constants';
import { EditorState } from 'draft-js';
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
                quals: ['FAI', 'SL', 'DL', 'FAC(A)', 'PMCF'],
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
                quals: ['SL'],
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
                quals: ['FAI', 'SL', 'DL'],
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
                quals: ['FAC(A)', 'SL'],
                rank: 3,
                seat: 'wso',
                simPucks: [],
                snivs: [],
            },
        },
        allIds: ['a', 'b', 'c', 'd'],
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
                dayId: '2018-01-24',
                aircrewIds: ['a'],
                start: new Date(2018, 0, 24, 8, 0, 0, 0),
                end: new Date(2018, 0, 24, 10, 0, 0, 0),
                message: 'Test Sniv',
                dateAdded: new Date(2018, 0, 23, 8, 0, 0, 0),
                lastUpdated: new Date(2018, 0, 23, 8, 0, 0, 0),
                dates: {
                    '2018-01-24': {
                        start: new Date(2018, 0, 24, 8, 0, 0, 0),
                        end: new Date(2018, 0, 24, 10, 0, 0, 0),
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
        qualsList,
        showSnivs: true,
        addUpdateAircrewFormDisplay: false,
        filters: {
            crewSearchInput: '',
            showAvailable: false,
            qualFilter: [],
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
    settings: {
        minutesAfterLand: 60,
        minutesBeforeBrief: 60,
        minutesBriefToTakeoff: 120,
        minutesNoteDuration: 60,
    },
    editor: {
        editorState: EditorState.createEmpty(),
        elementBeingEdited: {
            element: null,
            entityId: null,
        },
    },
};
