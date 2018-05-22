import { qualsList } from '../whiteboard-constants';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { ICrewListUI } from '../types/State';

const crewListUIReducer = (state: ICrewListUI = { qualsList,
                                                  addUpdateAircrewFormDisplay: false,
                                                  currentDay: '',
                                                  showSnivs: true,
                                                  filters: {
                                                      crewSearchInput: '',
                                                      showAvailable: false,
                                                      qualFilter: [],
                                                      rankFilter: [],
                                                  },
                                                },
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
                filters: {
                    ...state.filters,
                    ...action.payload,
                },
            };
        case getType(actions.addQualFilter):
            return {
                ...state,
                filters: {
                    ...state.filters,
                    qualFilter: state.filters.qualFilter.concat(action.payload.qual),
                },
            };
        case getType(actions.delQualFilter):
            return {
                ...state,
                filters: {
                    ...state.filters,
                    qualFilter: state.filters.qualFilter.filter(qual => qual !== action.payload.qual),
                },
            };
        default:
            return state;
    }
};

export default crewListUIReducer;
