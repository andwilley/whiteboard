import { combineReducers } from 'redux';
import { getType } from 'typesafe-actions';
import { actions, IAction } from '../actions';
import { IEntity, IErrors, UErrorLocs } from '../types/State';
import { errorLocs } from '../errors';

const errorsById = (state: {[id: string]: IErrors} = {}, action: IAction) => {
    switch (action.type) {
        case getType(actions.addError):
            return {
                ...state,
                ...action.payload.errorsById,
            };
        case getType(actions.delError):
            const rest = Object.assign({}, state);
            action.payload.errorIds.forEach(errorId => {
                delete rest[errorId];
            });
            return rest;
        default:
            return state;
    }
};

const allErrors = (state: string[] = [], action: IAction) => {
    switch (action.type) {
        case getType(actions.addError):
            const newErrorIds = Object.keys(action.payload.errorsById);
            return state.concat(newErrorIds);
        case getType(actions.delError):
            return state.filter(id => action.payload.errorIds.indexOf(id) === -1);
        default:
            return state;
    }
};

const errorReducer = combineReducers<IEntity<IErrors>>({
    byId: errorsById,
    allIds: allErrors,
});

export default errorReducer;

export const getEntityErrors = (errorById: {[id: string]: IErrors},
                                activeErrorIds: string[],
                                errorLoc: UErrorLocs
): {[id: string]: IErrors[]} => {
    /** show sim, flight note and sim note errors with flight errors for now */
    const errorLocations: UErrorLocs[] = errorLoc === errorLocs.FLIGHT ?
        [errorLocs.FLIGHT, errorLocs.FLIGHT_NOTE, errorLocs.SIM, errorLocs.SIM_NOTE] : [errorLoc];
    return activeErrorIds.reduce((errors, errorId) => {
        if (errorLocations.indexOf(errorById[errorId].location) > -1) {
            errors[errorById[errorId].locationId] = errors[errorById[errorId].locationId] ?
            errors[errorById[errorId].locationId].concat(errorById[errorId]) :
            [errorById[errorId]];
        }
        return errors;
    }, {});
};

export const getErrorsById = (state: IEntity<IErrors>) => {
    return state.byId;
};

export const getAllErrorIds = (state: IEntity<IErrors>) => {
    return state.allIds;
};

export const getAllErrors = (state: IEntity<IErrors>) => {
    return state.allIds.map(errorId => state.byId[errorId]);
};
