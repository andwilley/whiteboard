import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { IAddUpdateAircrewFormValues } from '../types/State';

const addUpdateAircrewFormValuesReducer = (state: IAddUpdateAircrewFormValues = {
                                               id: '',
                                               callsign: '',
                                               first: '',
                                               last: '',
                                               rank: 0,
                                               seat: 'pilot',
                                               quals: [],
                                               existingAircrewUnchanged: false,
                                           },
                                           action: IAction) => {
    switch (action.type) {
        case getType(actions.addUpdateAircrewFormAddQual):
            return {
                ...state,
                quals: state.quals.concat(action.payload.qual),
            };
        case getType(actions.addUpdateAircrewFormDelQual):
            return {
                ...state,
                quals: state.quals.filter(qual => qual !== action.payload.qual),
            };
        case getType(actions.setAircrewForm):
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export default addUpdateAircrewFormValuesReducer;
