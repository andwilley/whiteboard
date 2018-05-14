import * as cuid from 'cuid';
import { errorLevels } from '../errors';
import { errorTypes } from '../errors';
import { errorMessages } from '../errors';
import { IUntrackedErrors } from '../types/WhiteboardTypes';
import { RGX_24HOUR_TIME, RGX_IS_TR_CODE_LIST } from '../util/regEx';
import { UErrorLevels } from '../types/State';

/** Validators - show user input errors (still updates state with invalid input) */

interface IValArgs {
    level: UErrorLevels;
    message: string;
}

export type ValidatorFn = (text: string) => IUntrackedErrors | null;

export const is24HourTime = (args?: IValArgs) => (text: string): IUntrackedErrors | null => {
    const valid = RGX_24HOUR_TIME.test(text);
    return valid ?
        null :
        {
            id: cuid(),
            type: errorTypes.FORM_VAL_ERROR,
            level: args && args.level ? args.level : errorLevels.CAUT,
            message: args && args.message ? args.message : errorMessages.INVALID_TIME,
        };
};

export const trCodeList = (args?: IValArgs) => (text: string): IUntrackedErrors | null => {
    const valid = RGX_IS_TR_CODE_LIST.test(text);
    return valid ?
        null :
        {
            id: cuid(),
            type: errorTypes.FORM_VAL_ERROR,
            level: args && args.level ? args.level : errorLevels.CAUT,
            message: args && args.message ? args.message : errorMessages.INVALID_CODE,
        };
};

const validator = (text: string,
                   ...validatorFunctions: ValidatorFn[]):
IUntrackedErrors[] => {
    /**
     * @param text String input to be validated
     * @param validatorFunctions Array of functions with the validator signature.
     * @returns {IUntrackedErrors[]} Array of errors. Empty array if none.
     *
     * Iteratively runs each validation function on the given text.
     */
    if (text === '') {
        return [];
    }
    return  validatorFunctions.reduce((aggregatedErrors: IUntrackedErrors[], valFunc) => {
        const error = valFunc(text);
        if (error) {
            aggregatedErrors = aggregatedErrors.concat(error);
        }
        return aggregatedErrors;
    }, []);
};

export default validator;
