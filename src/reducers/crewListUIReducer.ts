import { qualsList } from '../whiteboard-constants';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { ICrewListUI } from '../types/State';

const crewListUIReducer = (state: ICrewListUI = { qualsList,
                                                  addUpdateAircrewFormDisplay: false,
                                                  currentDay: '',
                                                  crewSearchInput: '',
                                                  qualFilter: [],
                                                  rankFilter: [] },
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
        case getType(actions.setAircrewSearchForm):
            return {
                ...state,
                ...action.payload,
            };
        case getType(actions.addQualFilter):
            return {
                ...state,
                qualFilter: state.qualFilter.concat(action.payload.qual),
            };
        case getType(actions.delQualFilter):
            return {
                ...state,
                qualFilter: state.qualFilter.filter(qual => qual !== action.payload.qual),
            };
        default:
            return state;
    }
};

export default crewListUIReducer;
