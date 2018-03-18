export VAL_IS_24_HOUR_TIME = 'VAL_IS_24_HOUR_TIME';

const textValidator = (type: string, input: string) => {
    /**
     * @param {string} type Type of validation
     * @param {string} input The input to validate
     * @returns {boolean} True if valid, False if not. 
     */
    switch (type) {
        case VAL_IS_24_HOUR_TIME:
            return /^0[0-9][0-5][0-9]|1[0-9][0-5][0-9]|2[0-3][0-5][0-9]$/.test(input);
        default:
            return true;
    }
};

export default textValidator;
