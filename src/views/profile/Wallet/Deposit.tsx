import { forwardRef, useState } from 'react';
import { Box, Button, CardContent, CardProps, CircularProgress, Grid, IconButton, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import CreditCardIcon from '@mui/icons-material/CreditCardTwoTone';

import { FormattedMessage, useIntl } from 'react-intl';

import useApi from 'hooks/useApi';
import { useSelector } from 'store';

import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import Metamask from 'assets/images/icons/metamask.svg';

interface Props extends CardProps {
    modalStyle: React.CSSProperties;
    functions: any;
}

const CurrencyList = forwardRef(({ modalStyle, functions }: Props, ref: React.Ref<HTMLDivElement>) => {
    const Api = useApi();
    const theme = useTheme();
    const { formatMessage } = useIntl();
    const { currency } = useSelector((store) => store.auth);
    const [loading, setLoading] = useState<boolean>(false);

    const OtherWallet = () => {
        setLoading(true);
        Api.deposit()
            .then(({ data }) => {
                functions.onDepositCoinPayment(data.address);
                functions.onDepositVisible();
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const MetamaskWallet = () => {
        functions.onDepositMVisible();
        functions.onDepositVisible();
    };

    return (
        <div ref={ref} tabIndex={-1}>
            <MainCard
                style={modalStyle}
                sx={{
                    position: 'absolute',
                    width: { xs: 280, lg: 450 },
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)'
                }}
                divider={false}
                title={`${formatMessage({ id: 'Deposit' })} ${currency.name}`}
                content={false}
                secondary={
                    <IconButton onClick={functions.onDepositVisible}>
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <CardContent sx={{ mb: 2, pt: 0 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    onClick={MetamaskWallet}
                                    disableElevation
                                    fullWidth
                                    size="large"
                                    variant="outlined"
                                    sx={{
                                        color: 'grey.700',
                                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                    }}
                                >
                                    <img src={Metamask} alt="metamask" width={20} height={20} style={{ marginRight: '1rem' }} />
                                    <FormattedMessage id="Metamask Wallet" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                        <Grid item xs={12}>
                            <AnimateButton>
                                <Button
                                    onClick={OtherWallet}
                                    disableElevation
                                    fullWidth
                                    disabled={loading}
                                    size="large"
                                    variant="outlined"
                                    sx={{
                                        color: 'grey.700',
                                        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.dark.main : theme.palette.grey[50],
                                        borderColor: theme.palette.mode === 'dark' ? theme.palette.dark.light + 20 : theme.palette.grey[100]
                                    }}
                                >
                                    <Box sx={{ position: 'relative', width: '26px', height: '26px', mr: 1 }}>
                                        {loading && <CircularProgress size={26} />}
                                        <Box
                                            sx={{
                                                position: 'absolute',
                                                top: '50%',
                                                left: '50%',
                                                width: '26px',
                                                height: '26px',
                                                transform: 'translate(-50%, -50%)'
                                            }}
                                        >
                                            <CreditCardIcon />
                                        </Box>
                                    </Box>
                                    <FormattedMessage id="Other Wallet" />
                                </Button>
                            </AnimateButton>
                        </Grid>
                    </Grid>
                </CardContent>
            </MainCard>
        </div>
    );
});

export default CurrencyList;
