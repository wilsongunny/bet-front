import { Fragment, useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Badge, Box, Card, CircularProgress, IconButton, Stack, Tab, Tabs, Typography, useTheme } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { FormattedMessage, useIntl } from 'react-intl';
import PerfectScrollbar from 'react-perfect-scrollbar';

import useConfig from 'hooks/useConfig';
import config, { BASE_URL } from 'config';
import { inintSportsData, SportsListProps, SportsMatchProps, SportsParamsProps, TabProps } from 'types/sports';

import Axios from 'utils/axios';
import { checkUpdate } from 'utils/sports';

import Loader from 'ui-component/Loader';
import { useSelector } from 'store';
import { SportsItem, Breadcrumbs } from 'ui-component';
import Transitions from 'ui-component/extended/Transitions';
import { FutureIcon, InplaysIcon, NexthoursIcon } from 'ui-component/SvgIcon';
import Event from './component/Event';
import Trophy from 'assets/images/sports/trophy.png';

const tabs = [
    // {
    //     index: 0,
    //     title: 'In-plays',
    //     status: 'LIVE',
    //     icon: <InplaysIcon />
    // },
    {
        index: 1,
        title: 'Next 1 hour',
        status: 'HOUR',
        icon: <NexthoursIcon />
    },
    {
        index: 2,
        title: 'Next 24hrs',
        status: 'TODAY',
        icon: <NexthoursIcon />
    },
    {
        index: 3,
        title: 'Future',
        status: 'PRE',
        icon: <FutureIcon />
    }
];

const SportsPage = () => {
    const theme = useTheme();
    const { boxShadow } = useConfig();
    const { formatMessage } = useIntl();
    const params: SportsParamsProps = useParams();
    const navigate = useNavigate();
    const { search } = useSelector((store) => store.sports);
    const [activeSports, setActiveSports] = useState<number>(Number(params?.sportsId) || 0);
    const [activeTab, setActiveTab] = useState<TabProps | undefined>(tabs[params.tabId || 1]);
    const [activeSportsData, setActiveSportsData] = useState<SportsListProps>(inintSportsData);
    const [sportsLists, setSportsLists] = useState<SportsListProps[]>([]);
    const [sportsMatchs, setSportsMatchs] = useState<SportsMatchProps[]>([]);
    const [activeLeague, setActiveLeague] = useState<number[]>([]);
    const [pageLoading, setPageLoading] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);

    const updateMatchs = useCallback(checkUpdate, [sportsMatchs, activeSports]);

    const initActiveSport = (data: SportsListProps[]) => {
        if (!activeSports) {
            setActiveSports(data[0].SportId);
            setActiveSportsData(data[0]);
            navigate(`/sports/${data[0].SportId}/${activeTab?.index || 0}`, { replace: true });
        } else {
            setActiveSportsData(data.find((e) => e.SportId === activeSports) || inintSportsData);
        }
    };

    const tabChangeHandler = (event: React.SyntheticEvent, index: number) => {
        setActiveTab(tabs.find((e: TabProps) => e.index === index));
        setSportsMatchs([]);
        navigate(`/sports/${activeSports}/${index}`, { replace: true });
    };

    const activeSportsHandler = (SportId: number) => {
        setActiveSports(SportId);
        setActiveSportsData(sportsLists.find((e) => e.SportId === SportId) || inintSportsData);
        setSportsMatchs([]);
        navigate(`/sports/${SportId}/0`, { replace: true });
    };

    const activeLeagueHandler = (LeagueId: number) => {
        const isOpen = activeLeague.indexOf(LeagueId) > -1;
        if (isOpen) {
            setActiveLeague(activeLeague.filter((id: number) => id !== LeagueId));
        } else {
            setActiveLeague([...activeLeague, LeagueId]);
        }
    };

    const getSportsList = () => {
        setPageLoading(true);
        Axios.post('api/v1/sports/lists', {})
            .then(({ data }: { data: SportsListProps[] }) => {
                setSportsLists(data);
                setPageLoading(false);
                initActiveSport(data);
            })
            .catch(() => {
                setPageLoading(false);
            });
    };

    const getSportMatchs = () => {
        setLoading(true);
        Axios.post('api/v1/sports/matchs', {
            SportId: activeSports,
            EventStatus: activeTab?.status
        })
            .then(({ data }) => {
                updateMatchs(data, sportsMatchs, activeSports, setSportsMatchs);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const getSportsListsTimer = () => {
        Axios.post('api/v1/sports/lists', {}).then(({ data }) => {
            setSportsLists(data);
        });
    };

    const getSportMatchsTimer = useCallback(() => {
        if (!activeTab?.status) return;
        Axios.post('api/v1/sports/matchs', {
            SportId: activeSports,
            EventStatus: activeTab?.status
        }).then(({ data }) => {
            updateMatchs(data, sportsMatchs, activeSports, setSportsMatchs);
        });
    }, [activeSports, activeTab, sportsMatchs, updateMatchs]);

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            getSportsList();
        }
        return () => {
            unmounted = true;
        };
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        let unmounted = false;
        if (!unmounted) {
            getSportMatchs();
        }
        return () => {
            unmounted = true;
        };
        // eslint-disable-next-line
    }, [activeSports, activeTab]);

    useEffect(() => {
        let unmounted = false;
        const timer = setInterval(() => {
            if (!unmounted) {
                getSportMatchsTimer();
                getSportsListsTimer();
            }
        }, config.timer1);
        return () => {
            clearInterval(timer);
            unmounted = true;
        };
    }, [getSportMatchsTimer]);

    const renderMatchs = () => {
        if (loading) {
            return (
                <Stack alignItems="center" justifyContent="center">
                    <CircularProgress color="inherit" />
                </Stack>
            );
        }
        if (!sportsMatchs.length) {
            return (
                <Typography
                    sx={{
                        textAlign: 'center',
                        fontWeight: '700',
                        fontSize: '16px',
                        lineHeight: '100%',
                        color: '#fff'
                    }}
                >
                    <FormattedMessage id="Events are currently not available" />
                </Typography>
            );
        }
        return sportsMatchs.map((item, key) => {
            const events = item.events.filter(
                (e) =>
                    e.home.name.toLowerCase().indexOf(search.toLowerCase()) !== -1 ||
                    e.away.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
            );
            if (!events.length) return <Fragment key={key} />;
            return (
                <Card
                    key={key}
                    sx={{
                        background: '#11293a',
                        borderRadius: '13px',
                        py: 2,
                        px: { xs: 1, sm: 2 },
                        boxShadow
                    }}
                >
                    <Stack
                        onClick={() => activeLeagueHandler(item.LeagueId)}
                        pl={1}
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ overflow: 'hidden', borderRadius: 1, cursor: 'pointer' }}
                    >
                        <Typography
                            sx={{
                                fontWeight: '700',
                                fontSize: '16px',
                                lineHeight: '100%',
                                color: '#fff'
                            }}
                        >
                            {item.LeagueName}
                        </Typography>
                        <Stack direction="row" alignItems="center">
                            <Badge
                                badgeContent={item.events?.length || 0}
                                color="secondary"
                                sx={{
                                    mr: 3,
                                    '& .MuiBadge-badge': {
                                        background: 'linear-gradient(228.67deg, #7CD044 5.65%, #6AB739 100%), #D9D9D9'
                                    }
                                }}
                            />
                            <IconButton size="small">
                                {activeLeague.indexOf(item.LeagueId) !== -1 ? <KeyboardArrowDownIcon /> : <KeyboardArrowLeftIcon />}
                            </IconButton>
                        </Stack>
                    </Stack>
                    {activeLeague.indexOf(item.LeagueId) !== -1 && (
                        <Transitions in direction="up" type="slide">
                            {events.map((event, index) => (
                                <Event
                                    key={index}
                                    event={event}
                                    activeSports={activeSportsData}
                                    isLive={activeTab?.status === 'LIVE' || false}
                                />
                            ))}
                        </Transitions>
                    )}
                </Card>
            );
        });
    };

    if (pageLoading) return <Loader />;
    if (!sportsLists.length) return <Typography>Events are currently not available</Typography>;

    return (
        <Transitions in direction="up" type="slide">
            <Box className="sports-items">
                <PerfectScrollbar aria-setsize={1}>
                    <Stack direction="row" spacing={2}>
                        {sportsLists.map((item, key) => (
                            <SportsItem
                                key={key}
                                index={key % 5}
                                theme={theme}
                                active={activeSports === item.SportId}
                                onClick={() => activeSportsHandler(item.SportId)}
                            >
                                <Box className="warraper">
                                    <Box className="cover">
                                        <Box className="back" />
                                        <i className={`sportsicons sportsicon-${item.SportId}`} />
                                    </Box>
                                </Box>
                                <Typography>
                                    <FormattedMessage id={item.SportName} />
                                </Typography>
                            </SportsItem>
                        ))}
                    </Stack>
                </PerfectScrollbar>
                <Breadcrumbs theme={theme} background={`${BASE_URL}/${activeSportsData?.img}`}>
                    <Stack className="text-box">
                        <Typography className="text-ellipse" variant="h3">
                            {activeSportsData?.SportName && <FormattedMessage id={activeSportsData.SportName} />}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Typography variant="body1">
                                <FormattedMessage id="Home" />
                            </Typography>
                            <Typography variant="body1">/</Typography>
                            <Typography variant="body2">
                                {activeSportsData?.SportName && <FormattedMessage id={activeSportsData.SportName} />}
                            </Typography>
                        </Stack>
                    </Stack>
                    <img className="background" src={`${BASE_URL}/${activeSportsData?.img}`} alt="" />
                    <img className="trophy" src={Trophy} alt="" />
                    <Box className="light-1" />
                    <Box className="light-2" />
                    <Box className="light-3" />
                    <Box className="light-4" />
                    <Box className="light-5" />
                </Breadcrumbs>
            </Box>
            <Tabs
                value={activeTab?.index || 0}
                onChange={tabChangeHandler}
                aria-label="icon"
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    ml: 2,
                    mt: 1,
                    minHeight: '45px',
                    width: 'calc(100% - 32px)',
                    '& .MuiTabs-indicator': {
                        background: '#fff'
                    }
                }}
            >
                {tabs.map((item, key) => (
                    <Tab
                        key={key}
                        icon={item.icon}
                        label={formatMessage({ id: item.title })}
                        iconPosition="start"
                        sx={{
                            minHeight: '45px',
                            opacity: '0.5',
                            color: '#fff',
                            fontWeight: '600',
                            '& svg': {
                                mt: -0.2,
                                mr: 0.5
                            },
                            '&.Mui-selected': {
                                color: '#fff',
                                opacity: '1'
                            }
                        }}
                    />
                ))}
            </Tabs>
            <Card
                sx={{
                    p: { xs: 1, sm: 3 },
                    borderRadius: '18px',
                    background: '#0f222f',
                    boxShadow
                }}
            >
                <Stack spacing={{ xs: 1, sm: 2 }}>{renderMatchs()}</Stack>
            </Card>
        </Transitions>
    );
};

export default SportsPage;
