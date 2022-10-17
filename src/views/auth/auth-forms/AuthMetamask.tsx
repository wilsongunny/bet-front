import { useEffect, useState } from 'react';

import { Box, Button, Grid, CircularProgress, Stack, useTheme } from '@mui/material';
import Web3 from 'web3';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';

import useApi from 'hooks/useApi';

import { useDispatch } from 'store';
import { Login } from 'store/reducers/auth';
import { ChangePage } from 'store/reducers/menu';

import snackbar from 'utils/snackbar';
import { CoinbaseWallet, injected, switchNetwork, WalletConnect } from 'utils/connectors';

import Wallet from 'assets/images/icons/wallet.svg';
import Metamask from 'assets/images/icons/metamask.svg';
import Coinbase from 'assets/images/icons/coinbase.svg';
import AnimateButton from 'ui-component/extended/AnimateButton';

const AuthMetamask = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const { account, activate, library, active } = useWeb3React();
    const { signInAddress, signUpAddress, checkAddress } = useApi();
    const [loading, setLoading] = useState(false);
    const [isLogin, setIsLogin] = useState(false);

    const onLogin = (user: any) => {
        dispatch(Login(user));
        dispatch(ChangePage(''));
        snackbar(
            <>
                You have successfully logged in as a user to out betting site.
                <br />
                Now you can start to play. Enjoy!
            </>
        );
        if (
            window.location.pathname.toString().indexOf('blackjack') !== -1 ||
            window.location.pathname.toString().indexOf('roulette') !== -1
        ) {
            window.location.reload();
        }
    };

    const handleAuthenticate = (publicAddress: string, signature: string) => {
        signInAddress(publicAddress, signature)
            .then(({ data }) => {
                console.log(data);
                setLoading(false);
                onLogin(data);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const handleSignMessage = async ({ publicAddress, nonce }: any) => {
        try {
            const web3 = new Web3(library.provider);
            const signature = await web3.eth.personal.sign(`${process.env.REACT_APP_SIGNIN_MESSAGE}: ${nonce}`, publicAddress, '');
            handleAuthenticate(publicAddress, signature);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleSignup = () => {
        signUpAddress(account as string)
            .then(({ data }: any) => {
                handleSignMessage(data.user);
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const metamaskLogin = async () => {
        setIsLogin(false);
        setLoading(true);
        checkAddress(account as string)
            .then(({ data }: any) => {
                if (data.status) {
                    handleSignMessage(data.user);
                } else {
                    handleSignup();
                }
            })
            .catch((error) => {
                setLoading(false);
            });
    };

    const handleClick = async (params: any, isM: boolean = false) => {
        setIsLogin(true);
        await switchNetwork(false, isM);
        if (!active) {
            activate(params, undefined, true).catch((error) => {
                if (error instanceof UnsupportedChainIdError) {
                    activate(params);
                }
            });
        }
    };

    useEffect(() => {
        if (active && isLogin) metamaskLogin();
        // eslint-disable-next-line
    }, [active, isLogin]);

    return (
        <Grid item xs={12} my={2}>
            <Stack direction="row" justifyContent="space-around">
                <AnimateButton>
                    <Button
                        disabled={loading}
                        disableElevation
                        fullWidth
                        onClick={() => handleClick(injected, true)}
                        size="large"
                        variant="outlined"
                        sx={{
                            color: 'grey.700',
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                        }}
                    >
                        <Box sx={{ position: 'relative', width: '36px', height: '36px', mx: 0.9 }}>
                            {loading && <CircularProgress size={36} />}
                            <img
                                src={Metamask}
                                alt="metamask"
                                width={26}
                                height={26}
                                style={{
                                    position: 'absolute',
                                    transform: 'translate(-50%, -50%)',
                                    top: '50%',
                                    left: '50%'
                                }}
                            />
                        </Box>
                    </Button>
                </AnimateButton>
                <AnimateButton>
                    <Button
                        disabled={loading}
                        disableElevation
                        fullWidth
                        onClick={() => handleClick(CoinbaseWallet)}
                        size="large"
                        variant="outlined"
                        sx={{
                            color: 'grey.700',
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                        }}
                    >
                        <Box sx={{ position: 'relative', width: '36px', height: '36px', mx: 0.9 }}>
                            {loading && <CircularProgress size={36} />}
                            <img
                                src={Coinbase}
                                alt="coinbase"
                                width={26}
                                height={26}
                                style={{
                                    position: 'absolute',
                                    transform: 'translate(-50%, -50%)',
                                    top: '50%',
                                    left: '50%'
                                }}
                            />
                        </Box>
                    </Button>
                </AnimateButton>
                <AnimateButton>
                    <Button
                        disabled={loading}
                        disableElevation
                        fullWidth
                        onClick={() => handleClick(WalletConnect)}
                        size="large"
                        variant="outlined"
                        sx={{
                            color: 'grey.700',
                            backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                            borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                        }}
                    >
                        <Box sx={{ position: 'relative', width: '36px', height: '36px', mx: 0.9 }}>
                            {loading && <CircularProgress size={36} />}
                            <img
                                src={Wallet}
                                alt="wallet"
                                width={26}
                                height={26}
                                style={{
                                    position: 'absolute',
                                    transform: 'translate(-50%, -50%)',
                                    top: '50%',
                                    left: '50%'
                                }}
                            />
                        </Box>
                    </Button>
                </AnimateButton>
            </Stack>
        </Grid>
    );
};

export default AuthMetamask;
