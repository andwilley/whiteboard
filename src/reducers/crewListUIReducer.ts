import { qualsList } from '../whiteboard-constants';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';

const crewListUIReducer = (state = { qualsList,
                                     addUpdateAircrewFormDisplay: false,
                                     currentDay: '' },
                           action: IAction) => {
    switch (action.type) {
        case getType(actions.setCurrentDay):
            return {
                ...state,
                currentDay: action.payload.day,
            };
        case getType(actions.addUpdateAircrewFormDisplay):
            return {
                ...state,
                addUpdateAircrewFormDisplay: action.payload.display,
            };
        default:
            return state;
    }
};

export default crewListUIReducer;
