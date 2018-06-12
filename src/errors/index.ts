import { IErrorTypes, IErrorLocs, IErrorLevels, UErrorLevels, IErrors } from '../types/State';
import { IUntrackedErrors, AllErrors } from '../types/WhiteboardTypes';

// error levels
export const errorLevels: IErrorLevels = {
    WARN: 'WARN',
    CAUT: 'CAUT',
    INFO: 'INFO',
    SUCCESS: 'SUCCESS',
};

// error types
export const errorTypes: IErrorTypes = {
    FORM_VALIDATION: 'FORM_VALIDATION',
    SCHEDULE_CONFLICT: 'SCHEDULE_CONFLICT',
    TIME_ORDER: 'TIME_ORDER',
};

// error messages
export const errorMessages = {
    ERR_NO_RESULTS_FOUND: 'No results match your search.',
    INVALID_TIME: 'Please enter a valid 24 hour time.',
    INVALID_CODE: 'Not all the codes you entered are valid.',
    INVALID_DATE: 'Please enter an actual date.',
    INVALID_DATE_ORDER: 'Your end date is prior to you start date.',
    TIME_ORDER: 'The times you entered are not in order.',
    FLIGHT_CONFLICT: 'has a flight or a sim (or is in the notes for one) during this time.',
    SNIV_CONFLICT: 'is snived during this time.',
    NOTE_CONFLICT: 'is scheduled in the notes during this time.',
};

export const errorLocs: IErrorLocs = {
    FLIGHT: 'FLIGHT',
    BRIEF: 'BRIEF',
    TAKEOFF: 'TAKEOFF',
    LAND: 'LAND',
    SORTIE: 'SORTIE',
    DAY: 'DAY',
    DAY_NOTE: 'DAY_NOTE',
    CREWLIST: 'CREWLIST',
    SNIVS: 'SNIVS',
    APP: 'APP',
};

export const getHighestErrorLevel = (errors: AllErrors[]): UErrorLevels | null => {
    return errors.reduce((highest: UErrorLevels | null, error: IErrors | IUntrackedErrors) => {
        switch (highest) {
            case errorLevels.WARN:
                return highest;
            case errorLevels.CAUT:
                if (error.level === errorLevels.WARN) {
                    return error.level;
                }
                return highest;
            case errorLevels.INFO:
                if (error.level === errorLevels.WARN || error.level === errorLevels.CAUT) {
                    return error.level;
                }
                return highest;
            case errorLevels.SUCCESS:
                if (error.level === errorLevels.WARN ||
                    error.level === errorLevels.CAUT ||
                    error.level === errorLevels.INFO) {
                    return error.level;
                }
                return highest;
            case null:
                return error.level;
            default:
                return null;
        }
    }, null);
};
