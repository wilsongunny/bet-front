// import React, { useRef, useState } from 'react';

import {
    Grid
    // Box,
    // Button,
    // Checkbox,
    // Divider,
    // FormControl,
    // FormControlLabel,
    // FormHelperText,
    // IconButton,
    // InputAdornment,
    // InputLabel,
    // CircularProgress,
    // OutlinedInput,
    // Stack,
    // Typography,
    // useTheme
} from '@mui/material';

// import Visibility from '@mui/icons-material/Visibility';
// import VisibilityOff from '@mui/icons-material/VisibilityOff';

// import ReCAPTCHA from 'react-google-recaptcha';
// import { FormattedMessage, useIntl } from 'react-intl';

// import * as Yup from 'yup';
// import { Formik } from 'formik';

// import config from 'config';

// import useApi from 'hooks/useApi';
// import useConfig from 'hooks/useConfig';
import useScriptRef from 'hooks/useScriptRef';

// import { useDispatch } from 'store';
// import { Login } from 'store/reducers/auth';
// import { ChangePage } from 'store/reducers/menu';

// import snackbar from 'utils/snackbar';
// import AnimateButton from 'ui-component/extended/AnimateButton';
import AuthMetamask from './AuthMetamask';

const AuthLogin = ({ loginProp, ...others }: { loginProp?: number }) => {
    // const theme = useTheme();
    const scriptedRef = useScriptRef();
    // const { formatMessage } = useIntl();
    // // const recaptchaInputRef = useRef({}) as any;
    // const { borderRadius, locale } = useConfig();
    // const dispatch = useDispatch();
    // const { login } = useApi();
    // const [checked, setChecked] = useState(true);
    // const [recaptcha, setRecaptcha] = useState<string | null>('RST');
    // const [showPassword, setShowPassword] = useState(false);

    // const loginHandler = async (values: { email: string; password: string }, { setErrors, setStatus, setSubmitting }: any) => {
    //     try {
    //         await login(values.email, values.password, recaptcha)
    //             .then(
    //                 ({ data }) => onLogin(data),
    //                 (err: any) => {
    //                     if (scriptedRef.current) {
    //                         setStatus({ success: false });
    //                         setErrors({ submit: err.message });
    //                         setSubmitting(false);
    //                     }
    //                     // if (recaptchaInputRef.current) {
    //                     //     recaptchaInputRef.current.reset();
    //                     // }
    //                 }
    //             )
    //             .catch((error) => {
    //                 // if (recaptchaInputRef.current) {
    //                 //     recaptchaInputRef.current.reset();
    //                 // }
    //             });
    //     } catch (err: any) {
    //         if (scriptedRef.current) {
    //             setStatus({ success: false });
    //             setErrors({ submit: err.message });
    //             setSubmitting(false);
    //         }
    //         // if (recaptchaInputRef.current) {
    //         //     recaptchaInputRef.current.reset();
    //         // }
    //     }
    // };

    // const handleClickShowPassword = () => {
    //     setShowPassword(!showPassword);
    // };

    // const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    //     event.preventDefault();
    // };

    // const onLogin = (user: any) => {
    //     dispatch(Login(user));
    //     dispatch(ChangePage(''));
    //     snackbar(
    //         <>
    //             You have successfully logged in as a user to {process.env.REACT_APP_NAME}.
    //             <br />
    //             Now you can start to play. Enjoy!
    //         </>
    //     );
    //     // if (
    //     //     window.location.pathname.toString().indexOf('blackjack') !== -1 ||
    //     //     window.location.pathname.toString().indexOf('roulette') !== -1
    //     // ) {
    //     //     window.location.reload();
    //     // }
    // };

    return (
        <>
            <Grid container direction="column" justifyContent="center" spacing={2}>
                <AuthMetamask />
                {/* <Grid item xs={12}>
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex'
                        }}
                    >
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />

                        <Button
                            variant="outlined"
                            sx={{
                                cursor: 'unset',
                                m: 2,
                                py: 0.5,
                                px: 7,
                                borderColor:
                                    theme.palette.mode === 'dark'
                                        ? `${theme.palette.dark.light + 20} !important`
                                        : `${theme.palette.grey[100]} !important`,
                                color: `${theme.palette.grey[900]}!important`,
                                fontWeight: 500,
                                borderRadius: `${borderRadius}px`
                            }}
                            disableRipple
                            disabled
                        >
                            <FormattedMessage id="OR" />
                        </Button>
                        <Divider sx={{ flexGrow: 1 }} orientation="horizontal" />
                    </Box>
                </Grid>
                <Grid item xs={12} container alignItems="center" justifyContent="center">
                    <Box sx={{ mb: 2 }}>
                        <Typography className="h6">
                            <FormattedMessage id="Sign in with Email address" />
                        </Typography>
                    </Box>
                </Grid> */}
            </Grid>
            {/* <Formik
                initialValues={{
                    email: '',
                    password: '',
                    submit: null
                }}
                validationSchema={Yup.object().shape({
                    email: Yup.string()
                        .max(255)
                        .required(formatMessage({ id: 'Email is required' })),
                    password: Yup.string()
                        .max(255)
                        .required(formatMessage({ id: 'Password is required' }))
                })}
                onSubmit={loginHandler}
            >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit} {...others}>
                        <FormControl fullWidth error={Boolean(touched.email && errors.email)} sx={{ ...theme.typography.customInput }}>
                            <InputLabel htmlFor="outlined-adornment-email-login">
                                <FormattedMessage id="Email Address / Username" />
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-email-login"
                                type="email"
                                value={values.email}
                                name="email"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                label={formatMessage({ id: 'Email Address / Username' })}
                                inputProps={{}}
                            />
                            {touched.email && errors.email && (
                                <FormHelperText error id="standard-weight-helper-text-email-login">
                                    {errors.email}
                                </FormHelperText>
                            )}
                        </FormControl>

                        <FormControl
                            fullWidth
                            error={Boolean(touched.password && errors.password)}
                            sx={{ ...theme.typography.customInput }}
                        >
                            <InputLabel htmlFor="outlined-adornment-password-login">
                                <FormattedMessage id="Password" />
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password-login"
                                type={showPassword ? 'text' : 'password'}
                                value={values.password}
                                name="password"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                            size="large"
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label={formatMessage({ id: 'Password' })}
                                inputProps={{}}
                            />
                            {touched.password && errors.password && (
                                <FormHelperText error id="standard-weight-helper-text-password-login">
                                    {errors.password}
                                </FormHelperText>
                            )}
                        </FormControl>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" spacing={1}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={checked}
                                        onChange={(event) => setChecked(event.target.checked)}
                                        name="checked"
                                        color="primary"
                                    />
                                }
                                label={formatMessage({ id: 'Remember me' })}
                            />
                            <Typography
                                onClick={() => dispatch(ChangePage('forgot'))}
                                className="h6"
                                color="secondary"
                                sx={{ cursor: 'pointer' }}
                            >
                                <FormattedMessage id="Forgot Password?" />
                            </Typography>
                        </Stack>
                        {errors.submit && (
                            <Box sx={{ mt: 3 }}>
                                <FormHelperText error>{errors.submit}</FormHelperText>
                            </Box>
                        )}

                        <Box sx={{ mt: 2 }}>
                            <AnimateButton>
                                <Button
                                    disableElevation
                                    disabled={isSubmitting}
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    color="secondary"
                                >
                                    {isSubmitting && <CircularProgress size={20} sx={{ mr: 1 }} />}
                                    <FormattedMessage id="Sign in" />
                                </Button>
                            </AnimateButton>
                        </Box>
                        {/* <Box sx={{ alignItems: 'center', justifyContent: 'center', display: 'flex', mt: 2, width: '100%' }}>
                            <ReCAPTCHA
                                size="normal"
                                sitekey={config.RECAPTCHA_SITE_KEY}
                                ref={recaptchaInputRef}
                                onChange={setRecaptcha}
                                onExpired={() => setRecaptcha(null)}
                                hl={locale}
                            />
                        </Box>
                    </form>
                )}
            </Formik> */}
        </>
    );
};

export default AuthLogin;
