import * as cuid from 'cuid';
import { isMoment } from 'moment';
import { errorTypes } from '../errors';
import { errorLevels } from '../errors';
import { errorMessages } from '../errors';
import { UErrorLevels } from '../types/State';
import { IUntrackedErrors } from '../types/WhiteboardTypes';
import { RGX_24HOUR_TIME, RGX_IS_TR_CODE_LIST } from '../util/regEx';

/**
 * Validators - show user input errors (still updates state with invalid input)
 */

interface IValArgs {
    level: UErrorLevels;
    message: string;
}

export const isString = (x: any) => {
    return Object.prototype.toString.call(x) === '[object String]';
};

/**
 * Validator signature.
 * Validator must include a check for type, since input is any.
 * - there should be a way around this...
 */
export type ValidatorFn = (input: any) => IUntrackedErrors | null;

export const is24HourTime = (args?: IValArgs) => (input: any): IUntrackedErrors | null => {
    const valid = RGX_24HOUR_TIME.test(input) && isString(input);
    return valid ?
        null :
        {
            id: cuid(),
            type: errorTypes.FORM_VALIDATION,
            level: args && args.level ? args.level : errorLevels.CAUT,
            message: args && args.message ? args.message : errorMessages.INVALID_TIME,
        };
};

export const trCodeList = (args?: IValArgs) => (input: any): IUntrackedErrors | null => {
    const valid = RGX_IS_TR_CODE_LIST.test(input) && isString(input);
    return valid ?
        null :
        {
            id: cuid(),
            type: errorTypes.FORM_VALIDATION,
            level: args && args.level ? args.level : errorLevels.CAUT,
            message: args && args.message ? args.message : errorMessages.INVALID_CODE,
        };
};

export const validMoment = (args?: IValArgs) => (input: any): IUntrackedErrors | null => {
    const valid = isMoment(input);
    return valid ?
        null :
        {
            id: cuid(),
            type: errorTypes.FORM_VALIDATION,
            level: args && args.level ? args.level : errorLevels.CAUT,
            message: args && args.message ? args.message : errorMessages.INVALID_DATE,
        };
};

const validator = (input: any, ...validatorFunctions: ValidatorFn[]): IUntrackedErrors[] => {
    /**
     * @param input Input to be validated
     * @param validatorFunctions Array of functions with the validator signature.
     * @returns {IUntrackedErrors[]} Array of errors. Empty array if none.
     *
     * Iteratively runs each validation function on the given input.
     */
    if (!input) {
        return [];
    }
    return  validatorFunctions.reduce((aggregatedErrors: IUntrackedErrors[], valFunc) => {
        const error = valFunc(input);
        if (error) {
            aggregatedErrors = aggregatedErrors.concat(error);
        }
        return aggregatedErrors;
    }, []);
};

export default validator;
