import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { ICrewListUI, IFilters } from '../types/State';

const crewListUIReducer = (
    state: ICrewListUI = {
        addUpdateAircrewFormDisplay: false,
        addUpdateSnivFormDisplay: false,
        currentDay: '',
        showSnivs: false,
        showFilters: false,
        filters: {
            crewSearchInput: '',
            showAvailable: false,
            qualFilter: [],
            groupFilter: [],
            rankFilter: [],
        },
    },
    action: IAction
) => {
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
        case getType(actions.addGroupFilter):
            return {
                ...state,
                filters: {
                    ...state.filters,
                    groupFilter: state.filters.groupFilter.concat(action.payload.group),
                },
            };
        case getType(actions.delGroupFilter):
            return {
                ...state,
                filters: {
                    ...state.filters,
                    groupFilter: state.filters.groupFilter.filter(group => group !== action.payload.group),
                },
            };
        case getType(actions.toggleShowSnivs):
            return {
                ...state,
                showSnivs: !state.showSnivs,
            };
        case getType(actions.toggleShowFilters):
            return {
                ...state,
                showFilters: !state.showFilters,
            };
        case getType(actions.addUpdateSnivFormDisplay):
            return {
                ...state,
                addUpdateSnivFormDisplay: action.payload.display,
            };
        default:
            return state;
    }
};

export default crewListUIReducer;

export const getFilters = (state: ICrewListUI) => {
    return state.filters;
};

export const getShowSnivs = (state: ICrewListUI): boolean => {
    return state.showSnivs;
};

export const getShowFilters = (state: ICrewListUI): boolean => {
    return state.showFilters;
};

export const getCurrentDayId = (state: ICrewListUI): string => {
    return state.currentDay;
};

export const getShowAvailable = (state: IFilters) => {
    return state.showAvailable;
};
