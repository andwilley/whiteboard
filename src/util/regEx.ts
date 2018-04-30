const TIME_24HOUR = '0[0-9]:?[0-5][0-9]|1[0-9]:?[0-5][0-9]|2[0-3]:?[0-5][0-9]';

export const RGX_24HOUR_TIME = new RegExp(`^${TIME_24HOUR}$`);
export const RGX_STARTS_WITH_TIME_BLOCK = new RegExp(`^(${TIME_24HOUR})[ -]?(${TIME_24HOUR})?.*`);