import * as cuid from 'cuid';
import { errorLevels } from '../errors';
import { errorTypes } from '../errors';
import { errorMessages } from '../errors';

export const RGX_24HOUR_TIME = /^0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9]$/;
export const RGX_STARTS_WITH_TIME_BLOCK =
    /^(0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9])[ -]?(0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9])?.*/;

export const validatorFunctions = {
    is24HourTime: (text: string, level = errorLevels.ERROR) => {
        const valid = RGX_24HOUR_TIME.test(text);
        return valid ?
            null :
            {
                id: cuid(),
                type: errorTypes.FORM_VAL_ERROR,
                level,
                message: 'Error Message',
                display: true,
            };
    },
};

const validator = (theValidatorFunctions: string[], value: string) => {
    /**
     * @param {string[]}validatorFunctions array of validation strings corresponding to list above
     * @param {string} value The string to be validated
     * @returns {IErrors|null} If value validates, return null, if not, return the IErrors object
     * should evaluate in order of level
     */
     return errorMessages;
};

export default validator;
