import { ConfigProps } from 'types/config';

export const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:2002';
// export const BASE_URL = 'http://193.203.202.113:80/';
export const BASE_PATH = '';
export const HOME_PATH = '/sports';

const config: ConfigProps = {
    fontFamily: `'Roboto', sans-serif`,
    borderRadius: 8,
    boxShadow: '#0003 0 2px 5px 4px, #0000001f 0 2px 4px 1px',
    outlinedFilled: true,
    navType: 'dark',
    presetColor: 'default',
    locale: 'es',
    rtlLayout: false,
    timer1: 5000,
    timer2: 900000,
    RECAPTCHA_SITE_KEY: '6LeRhsIeAAAAADY6KUkpQaIqPTKsXy2sa7u4JBAb'
};

export default config;
