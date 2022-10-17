import { memo } from 'react';

import { Avatar, Box, Drawer, IconButton, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
// import { IconMenu2 } from '@tabler/icons';
import { FormattedMessage } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

import { drawerWidth } from 'store/constant';
import { useDispatch, useSelector } from 'store';
import { openDrawer } from 'store/reducers/menu';

import useConfig from 'hooks/useConfig';
// import AnimateButton from 'ui-component/extended/AnimateButton';

import MenuList from './MenuList';
import Localization from './Localization';

const Sidebar = () => {
    const theme = useTheme();
    const { boxShadow } = useConfig();
    const matchUpMd = useMediaQuery('(min-width:768px)');

    const dispatch = useDispatch();
    const { drawerOpen } = useSelector((state) => state.menu);
    const dWidth = drawerOpen ? drawerWidth : drawerWidth - 170;

    const pri = !drawerOpen ? 'persistent' : 'temporary';
    // const radius = drawerOpen ? '50px' : 0;

    return (
        <Box
            component="nav"
            sx={{
                flexShrink: { md: 0 },
                width: matchUpMd ? dWidth : 'auto',
                transition: theme.transitions.create('all')
            }}
            aria-label="mailbox folders"
        >
            <Drawer
                variant={matchUpMd ? 'persistent' : pri}
                anchor="left"
                open
                onClose={() => dispatch(openDrawer(!drawerOpen))}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: `${dWidth}px`,
                        transition: theme.transitions.create('all'),
                        color: theme.palette.text.primary,
                        borderRight: 'none',
                        background: '#0f212e',
                        boxShadow,
                        '@media (max-width: 767px)': {
                            width: drawerOpen ? '100vw' : 0
                        }
                    }
                }}
                ModalProps={{ keepMounted: true }}
                color="inherit"
            >
                <Box
                    sx={{
                        width: '100%',
                        position: 'relative',
                        height: '60px',
                        minHeight: '60px',
                        alignItems: 'center',
                        display: 'flex',
                        background: '#0f212e',
                        transition: theme.transitions.create('all'),
                        boxShadow: '#0003 0 4px 6px -1px, #0000001f 0 2px 4px 9px'
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                            padding: `0 ${drawerOpen ? 28 : 18}px`,
                            justifyContent: drawerOpen ? 'flex-start' : 'center',
                            height: '100%'
                        }}
                    >
                        <Avatar
                            variant="rounded"
                            sx={{
                                ...theme.typography.commonAvatar,
                                ...theme.typography.mediumAvatar,
                                overflow: 'hidden',
                                background: '#0f212e',
                                color: theme.palette.mode === 'dark' ? theme.palette.secondary.main : theme.palette.secondary.dark,
                                '&:hover': {
                                    background: '#071824',
                                    transition: theme.transitions.create('all'),
                                    color: theme.palette.mode === 'dark' ? theme.palette.secondary.light : theme.palette.secondary.light
                                }
                            }}
                            onClick={() => dispatch(openDrawer(!drawerOpen))}
                            color="inherit"
                        >
                            {drawerOpen ? <KeyboardDoubleArrowLeftIcon /> : <KeyboardDoubleArrowRightIcon />}
                        </Avatar>
                        <Typography
                            sx={{
                                ml: 2,
                                zIndex: 1,
                                color: '#fff',
                                minWidth: 'calc(100% - 75px)',
                                whiteSpace: 'nowrap',
                                transition: theme.transitions.create('all'),
                                display: drawerOpen ? 'block' : 'none'
                            }}
                            variant="h3"
                        >
                            <FormattedMessage id="All Service" />
                        </Typography>
                        {drawerOpen && !matchUpMd && (
                            <IconButton size="small" onClick={() => dispatch(openDrawer(false))}>
                                <CloseIcon />
                            </IconButton>
                        )}
                    </Box>
                </Box>
                <PerfectScrollbar
                    component="div"
                    style={{
                        height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 72px)',
                        paddingTop: '10px',
                        paddingLeft: drawerOpen ? '12px' : '5px',
                        paddingRight: drawerOpen ? '12px' : '5px'
                    }}
                >
                    <MenuList />
                </PerfectScrollbar>
                <Stack sx={{ background: '#0f212e', p: '5px' }} spacing={1}>
                    <Localization />
                </Stack>
            </Drawer>
        </Box>
    );
};

export default memo(Sidebar);
