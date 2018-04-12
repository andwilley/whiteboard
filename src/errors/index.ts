import { IErrorTypes, IErrorLocs, IErrorLevels } from '../types/State';

// error levels
export const errorLevels: IErrorLevels = {
    ERROR: 'ERROR',
    WARN: 'WARN',
    CAUT: 'CAUT',
    SUCCESS: 'SUCCESS',
};

// error types
export const errorTypes: IErrorTypes = {
    FORM_VALIDATION: 'FORM_VALIDATION',
    SCHEDULE_CONFLICT: 'SCHEDULE_CONFLICT',
    FORM_VAL_ERROR: 'FORM_VAL_ERROR',
};

// error messages
export const errorMessages = {
    ERR_NO_RESULTS_FOUND: 'No results match your search.',
};

export const errorLocs: IErrorLocs = {
    FLIGHT: 'FLIGHT',
    FLIGHT_TIMES: 'FLIGHT_TIMES',
    FLIGHT_NOTE: 'FLIGHT_NOTE',
    SORTIE: 'SORTIE',
    SORTIE_NOTE: 'SORTIE_NOTE',
    DAY: 'DAY',
    DAY_NOTE: 'DAY_NOTE',
    CREWLIST: 'CREWLIST',
    SNIVS: 'SNIVS',
    APP: 'APP',
};
