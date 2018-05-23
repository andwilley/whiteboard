import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { IAddUpdateSnivFormValues } from '../types/State';

const addUpdateSnivFormValuesReducer = (state: IAddUpdateSnivFormValues = {
                                            snivId: '',
                                            aircrew: '',
                                            aircrewRefIds: [],
                                            start: '',
                                            end: '',
                                            message: '',
                                        },
                                        action: IAction
) => {
    switch (action.type) {
        case getType(actions.setSnivForm):
            return {
                ...state,
                ...action.payload,
            };
        case getType(actions.addAircrewRefToSnivForm):
            if (state.aircrewRefIds.indexOf(action.payload.aircrewId) > -1) {
                return state;
            }
            return {
                ...state,
                aircrewRefIds: state.aircrewRefIds.concat(action.payload.aircrewId),
            };
        case getType(actions.delAircrewRefFromSnivForm):
            return {
                ...state,
                aircrewRefIds: state.aircrewRefIds.filter(id => id !== action.payload.aircrewId),
            };
        default:
            return state;
    }
};

export default addUpdateSnivFormValuesReducer;
