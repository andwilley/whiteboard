import { qualsList } from '../whiteboard-constants';
import { EditorState } from 'draft-js';
import * as moment from 'moment';
import { IState } from '../types/State';

export const INITIAL_STATE: IState = {
    aircrew: {
        byId: {
            cjjpni15i00voOK__w0kuy72p: {
                id: 'cjjpni15i00voOK__w0kuy72p',
                rank: 6,
                first: 'Steven',
                last: 'Acosta',
                callsign: 'Fozzie',
                seat: 'pilot',
                quals: [],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnit1901hdOK__in895rag: {
                id: 'cjjpnit1901hdOK__in895rag',
                rank: 5,
                first: 'Kirk',
                last: 'Bush',
                callsign: 'Cockin',
                seat: 'pilot',
                quals: [
                    'TXN',
                    'STK',
                    'CAS',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnkcp902beOK__q23f3nkq: {
                id: 'cjjpnkcp902beOK__q23f3nkq',
                rank: 5,
                first: '',
                last: 'Bursae',
                callsign: 'Metro',
                seat: 'pilot',
                quals: [
                    'TXN',
                    'IFR',
                    'STK',
                    'STKI',
                    'CAS',
                    'NVG',
                    'NVGI',
                    'FWT 1',
                    'FWT 1I',
                    'BFM',
                    'BFMI',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                    'AII',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnlujs039lOK__3vyg4eyu: {
                id: 'cjjpnlujs039lOK__3vyg4eyu',
                rank: 5,
                first: 'Andrew',
                last: 'Kelemen',
                callsign: 'MAWTS',
                seat: 'pilot',
                quals: [
                    'TXN',
                    'TXNI',
                    'IFR',
                    'IFRI',
                    'STK',
                    'STKI',
                    'CAS',
                    'CASI',
                    'FWT 1',
                    'BFM',
                    'FWT 2',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnmrhq046yOK__ex4if64s: {
                id: 'cjjpnmrhq046yOK__ex4if64s',
                rank: 4,
                first: 'Christopher',
                last: 'Alvino',
                callsign: 'Flash',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'FAC(A)',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnn54b04jhOK__m6n0ec7d: {
                id: 'cjjpnn54b04jhOK__m6n0ec7d',
                rank: 4,
                first: '',
                last: 'Bromley',
                callsign: 'Eore',
                seat: 'pilot',
                quals: [],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpno6mn0560OK__y6r10f8i: {
                id: 'cjjpno6mn0560OK__y6r10f8i',
                rank: 4,
                first: 'Luke',
                last: 'Borgan',
                callsign: 'Maj',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'FWT 1',
                    'BFM',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnol9805ijOK__30wzzrjm: {
                id: 'cjjpnol9805ijOK__30wzzrjm',
                rank: 4,
                first: '',
                last: 'Cather',
                callsign: 'AARP',
                seat: 'pilot',
                quals: [
                    'ODO',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnpj4y06bqOK__0v9mf09n: {
                id: 'cjjpnpj4y06bqOK__0v9mf09n',
                rank: 4,
                first: 'Jesus',
                last: 'Chapa-Garcia',
                callsign: 'Junk',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'FAC(A)',
                    'NVG',
                    'NVGI',
                    'FWT 1',
                    'FWT 2',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnqlx1071lOK__7ioxmq5f: {
                id: 'cjjpnqlx1071lOK__7ioxmq5f',
                rank: 3,
                first: 'Justin',
                last: 'Charles',
                callsign: 'Tummy',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'IFRI',
                    'STK',
                    'STKI',
                    'LAT',
                    'CAS',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnr7bh07wgOK__b3utnirr: {
                id: 'cjjpnr7bh07wgOK__b3utnirr',
                rank: 3,
                first: 'Gregory',
                last: 'Clement',
                callsign: 'Big Fighter',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CQ',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnronv08anOK__3o7fhybb: {
                id: 'cjjpnronv08anOK__3o7fhybb',
                rank: 3,
                first: '',
                last: 'Dicks',
                callsign: 'Broke',
                seat: 'pilot',
                quals: [
                    'ODO',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpns6j508s6OK__7rox79ix: {
                id: 'cjjpns6j508s6OK__7rox79ix',
                rank: 4,
                first: '',
                last: 'Foster',
                callsign: 'Lumpy',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnsr3z09epOK__it0tq39e: {
                id: 'cjjpnsr3z09epOK__it0tq39e',
                rank: 3,
                first: '',
                last: 'Jarvinen',
                callsign: 'Stallion',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'STK',
                    'CAS',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpntpwd0a4kOK__sh1zd07k: {
                id: 'cjjpntpwd0a4kOK__sh1zd07k',
                rank: 4,
                first: '',
                last: 'LaChasse',
                callsign: 'Squirrel',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'TXNI',
                    'IFR',
                    'STK',
                    'STKI',
                    'CAS',
                    'CASI',
                    'FWT 1',
                    'NVG',
                    'OCF',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnus4p0aylOK__hk4y7wtd: {
                id: 'cjjpnus4p0aylOK__hk4y7wtd',
                rank: 4,
                first: 'Andrew',
                last: 'Larsen',
                callsign: 'Mongo',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'TXNI',
                    'FAC(A)',
                    'FWT 1',
                    'OCF',
                    'BFM',
                    'BFMI',
                    'FWT 2',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnvsl50bjgOK__dvdc5oq2: {
                id: 'cjjpnvsl50bjgOK__dvdc5oq2',
                rank: 4,
                first: '',
                last: 'Latta',
                callsign: 'Pablo',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'FWT 1',
                    'FWT 1I',
                    'OCF',
                    'BFM',
                    'BFMI',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnwovk0c7nOK__0qbwxclg: {
                id: 'cjjpnwovk0c7nOK__0qbwxclg',
                rank: 3,
                first: '',
                last: 'McGinnity',
                callsign: 'Busey',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'FWT 1',
                    'OCF',
                    'OCFI',
                    'CQ',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnx67v0csiOK__8u8r7ks4: {
                id: 'cjjpnx67v0csiOK__8u8r7ks4',
                rank: 3,
                first: '',
                last: 'McLeod',
                callsign: 'Nagaa',
                seat: 'pilot',
                quals: [],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnxriy0da1OK__p2ba0yji: {
                id: 'cjjpnxriy0da1OK__p2ba0yji',
                rank: 4,
                first: '',
                last: 'Mekolik',
                callsign: 'Drub',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnyxna0dz2OK__96ko2hil: {
                id: 'cjjpnyxna0dz2OK__96ko2hil',
                rank: 4,
                first: '',
                last: 'Meredith',
                callsign: 'M&M',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'NVG',
                    'FWT 1',
                    'FWT 1I',
                    'BFM',
                    'BFMI',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                    'AII',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpnzh5o0ehfOK__8oiq0swh: {
                id: 'cjjpnzh5o0ehfOK__8oiq0swh',
                rank: 4,
                first: '',
                last: 'Mondoux',
                callsign: 'Taint',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'NVG',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo02ij0f9sOK__pdbcx33s: {
                id: 'cjjpo02ij0f9sOK__pdbcx33s',
                rank: 3,
                first: 'Brock',
                last: 'Money',
                callsign: 'Fonix',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo0xq90fx5OK__5zznmyv8: {
                id: 'cjjpo0xq90fx5OK__5zznmyv8',
                rank: 4,
                first: '',
                last: 'Paulin',
                callsign: 'Barbie',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'STK',
                    'CAS',
                    'FAC(A)',
                    'FWT 1',
                    'BFM',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo1pcq0gm6OK__ln5u381d: {
                id: 'cjjpo1pcq0gm6OK__ln5u381d',
                rank: 4,
                first: '',
                last: 'Phillips',
                callsign: 'Lefty',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'IFRI',
                    'STK',
                    'STKI',
                    'LAT',
                    'LATI',
                    'CASI',
                    'CAS',
                    'NVG',
                    'NVGI',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo2fsa0h8pOK__yehx7kab: {
                id: 'cjjpo2fsa0h8pOK__yehx7kab',
                rank: 4,
                first: '',
                last: 'Rice',
                callsign: 'Suspect',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'FWT 1',
                    'FWT 1I',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                    'AII',
                    'BFM',
                    'BFMI',
                    'CQ',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo3f010hwwOK__2kuon8g2: {
                id: 'cjjpo3f010hwwOK__2kuon8g2',
                rank: 4,
                first: '',
                last: 'Schwamberger',
                callsign: 'Stork',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'STK',
                    'FWT 1',
                    'FWT 2',
                    'BFM',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo4hei0iq3OK__wjeyk5q6: {
                id: 'cjjpo4hei0iq3OK__wjeyk5q6',
                rank: 4,
                first: '',
                last: 'Southerland',
                callsign: 'Nutshack',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'LAT',
                    'LATI',
                    'CAS',
                    'FWT 1',
                    'BFM',
                    'FWT 2',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo51tj0j7mOK__sxcer64i: {
                id: 'cjjpo51tj0j7mOK__sxcer64i',
                rank: 4,
                first: '',
                last: 'Stevens',
                callsign: '2Face',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'FWT 1',
                    'CQ',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo5w660jtbOK__m16sifar: {
                id: 'cjjpo5w660jtbOK__m16sifar',
                rank: 3,
                first: '',
                last: 'Tanner',
                callsign: 'Landfill',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'STK',
                    'STKI',
                    'CAS',
                    'FWT 1',
                    'CQ',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo6s1x0kfuOK__u9zmfx9b: {
                id: 'cjjpo6s1x0kfuOK__u9zmfx9b',
                rank: 4,
                first: '',
                last: 'Tebbetts',
                callsign: 'Coots',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'TXNI',
                    'IFR',
                    'STK',
                    'STKI',
                    'CAS',
                    'CASI',
                    'NVG',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo7mzz0l91OK__0ef3k8xd: {
                id: 'cjjpo7mzz0l91OK__0ef3k8xd',
                rank: 4,
                first: '',
                last: 'Valko',
                callsign: 'Face',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'FWT 1',
                    'FWT 2',
                    'BFM',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjppvyoh00o6OK__jin2bzwj: {
                id: 'cjjppvyoh00o6OK__jin2bzwj',
                rank: 4,
                first: '',
                last: 'Walsh',
                callsign: 'BS',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'STK',
                    'LAT',
                    'CAS',
                    'LATI',
                    'NVG',
                    'NVGI',
                    'FWT 1',
                    'FWT 1I',
                    'BFM',
                    'BFMI',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                    'AII',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo8e180lreOK__6jq9d9wa: {
                id: 'cjjpo8e180lreOK__6jq9d9wa',
                rank: 4,
                first: '',
                last: 'Wavers',
                callsign: 'Repo',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'STKI',
                    'CAS',
                    'CASI',
                    'FWT 1',
                    'FWT 2',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpo9gri0mi3OK__uu24op1o: {
                id: 'cjjpo9gri0mi3OK__uu24op1o',
                rank: 4,
                first: '',
                last: 'Zetts',
                callsign: 'Foam',
                seat: 'pilot',
                quals: [
                    'ODO',
                    'TXN',
                    'IFR',
                    'STK',
                    'LAT',
                    'CAS',
                    'NVG',
                    'NVGI',
                    'FWT 1',
                    'OCF',
                    'OCFI',
                    'BFM',
                    'BFMI',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                    'AII',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpoav7z0n8sOK__ohn87p6g: {
                id: 'cjjpoav7z0n8sOK__ohn87p6g',
                rank: 4,
                first: '',
                last: 'Jansen',
                callsign: 'Cougar',
                seat: 'wso',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'CASI',
                    'FAC(A)',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpoc6ue0og5OK__6i68vbg2: {
                id: 'cjjpoc6ue0og5OK__6i68vbg2',
                rank: 3,
                first: 'Colin',
                last: 'Pena',
                callsign: 'Milio',
                seat: 'wso',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'CASI',
                    'FAC(A)',
                    'FWT 1',
                    'FWT 1I',
                    'FWT 2',
                    'FWT 2I',
                    'AI',
                    'AII',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpod5ky0p3iOK__fwbajl6l: {
                id: 'cjjpod5ky0p3iOK__fwbajl6l',
                rank: 4,
                first: '',
                last: 'Suetos',
                callsign: 'Barney',
                seat: 'wso',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'IFR',
                    'CAS',
                    'CASI',
                    'FAC(A)',
                    'NVG',
                    'FWT 1',
                    'BFM',
                    'FWT 2',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpoekt50qbpOK__s0gef335: {
                id: 'cjjpoekt50qbpOK__s0gef335',
                rank: 4,
                first: '',
                last: 'Von Seggern',
                callsign: 'Turtle',
                seat: 'wso',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'CASI',
                    'FAC(A)',
                    'NVG',
                    'NVGI',
                    'FWT 1',
                    'FWT 2',
                    'BFM',
                    'AI',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
            cjjpppbcs00y6OK__p8om7zm3: {
                id: 'cjjpppbcs00y6OK__p8om7zm3',
                rank: 3,
                first: 'Andrew',
                last: 'Willey',
                callsign: 'Steamboat',
                seat: 'wso',
                quals: [
                    'ODO',
                    'TXN',
                    'STK',
                    'CAS',
                    'FAC(A)',
                    'FWT 1',
                ],
                flightPucks: [],
                simPucks: [],
                odos: 0,
                snivs: [],
                notes: [],
            },
        },
        allIds: [
            'cjjpni15i00voOK__w0kuy72p',
            'cjjpnit1901hdOK__in895rag',
            'cjjpnkcp902beOK__q23f3nkq',
            'cjjpnlujs039lOK__3vyg4eyu',
            'cjjpnmrhq046yOK__ex4if64s',
            'cjjpnn54b04jhOK__m6n0ec7d',
            'cjjpno6mn0560OK__y6r10f8i',
            'cjjpnol9805ijOK__30wzzrjm',
            'cjjpnpj4y06bqOK__0v9mf09n',
            'cjjpnqlx1071lOK__7ioxmq5f',
            'cjjpnr7bh07wgOK__b3utnirr',
            'cjjpnronv08anOK__3o7fhybb',
            'cjjpns6j508s6OK__7rox79ix',
            'cjjpnsr3z09epOK__it0tq39e',
            'cjjpntpwd0a4kOK__sh1zd07k',
            'cjjpnus4p0aylOK__hk4y7wtd',
            'cjjpnvsl50bjgOK__dvdc5oq2',
            'cjjpnwovk0c7nOK__0qbwxclg',
            'cjjpnx67v0csiOK__8u8r7ks4',
            'cjjpnxriy0da1OK__p2ba0yji',
            'cjjpnyxna0dz2OK__96ko2hil',
            'cjjpnzh5o0ehfOK__8oiq0swh',
            'cjjpo02ij0f9sOK__pdbcx33s',
            'cjjpo0xq90fx5OK__5zznmyv8',
            'cjjpo1pcq0gm6OK__ln5u381d',
            'cjjpo2fsa0h8pOK__yehx7kab',
            'cjjpo3f010hwwOK__2kuon8g2',
            'cjjpo4hei0iq3OK__wjeyk5q6',
            'cjjpo51tj0j7mOK__sxcer64i',
            'cjjpo5w660jtbOK__m16sifar',
            'cjjpo6s1x0kfuOK__u9zmfx9b',
            'cjjpo7mzz0l91OK__0ef3k8xd',
            'cjjppvyoh00o6OK__jin2bzwj',
            'cjjpo8e180lreOK__6jq9d9wa',
            'cjjpo9gri0mi3OK__uu24op1o',
            'cjjpoav7z0n8sOK__ohn87p6g',
            'cjjpoc6ue0og5OK__6i68vbg2',
            'cjjpod5ky0p3iOK__fwbajl6l',
            'cjjpoekt50qbpOK__s0gef335',
            'cjjpppbcs00y6OK__p8om7zm3',
        ],
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
