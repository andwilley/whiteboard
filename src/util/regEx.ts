const TIME_24HOUR = '(0[0-9]:?[0-5][0-9]|1[0-9]:?[0-5][0-9]|2[0-3]:?[0-5][0-9])';
const TR_CODE = '[A-Za-z]+[ -]?\\d{3,4}|\\d{4}|supt|SUPT|red air|RED AIR';

export const RGX_24HOUR_TIME = new RegExp(`^${TIME_24HOUR}$`);
export const RGX_STARTS_WITH_TIME_BLOCK = new RegExp(`^${TIME_24HOUR}[ -]?${TIME_24HOUR}?.*`);
export const RGX_PARTIAL_TIME = /^(?:\d{2}:?)?\d{0,2}$/;
export const RGX_SYMBOLS = /^[!@#$%^&*?~=+-]*$/;
export const RGX_FIND_TR_CODES = new RegExp(`${TR_CODE}`, 'g');
export const RGX_IS_TR_CODE_LIST = new RegExp(`^(?:[ ,-]?(?:${TR_CODE}))*$`);
