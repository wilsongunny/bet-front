import { memo, useEffect, useState } from 'react';
import {
    FormControl,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Skeleton,
    Typography,
    IconButton
} from '@mui/material';

import { FormattedMessage } from 'react-intl';
import { MultibetIcon, StatusIcon } from 'ui-component/SvgIcon';

import moment from 'moment';
import parse from 'html-react-parser';
import { toNumber } from 'utils/number';

import { useSelector } from 'store';
import { HistoryProps } from 'types/payment';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';

import { StatusBadge, WTab, WTabs } from 'ui-component';
import { useNavigate } from 'react-router-dom';

const TableHistory = () => {
    const navigate = useNavigate();
    const Api = useApi();
    const { locale, boxShadow } = useConfig();
    moment.locale(locale);
    const { user } = useSelector((state) => state.auth);
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        Api.getMybets('Settled')
            .then(({ data }) => {
                setHistories(data);
                setLoading(false);
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    if (loading) return <Skeleton variant="rectangular" height={300} sx={{ borderRadius: '18px', boxShadow }} />;

    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ pl: 3 }}>
                                <FormattedMessage id="Sport" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Odd" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Amount" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Teams" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Status" />
                            </TableCell>
                            <TableCell sx={{ pr: 3 }}>
                                <FormattedMessage id="Date&Time" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {histories.map((item: any, key) => (
                            <TableRow hover key={key}>
                                <TableCell sx={{ pl: 3 }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {item.type === 'multi' ? (
                                            <MultibetIcon />
                                        ) : (
                                            <i className={`sportsicons sportsicon-${item.sport[0].SportId}`} style={{ fontSize: '20px' }} />
                                        )}
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography className="text-ellipse" sx={{ maxWidth: '100px' }}>
                                        {`${toNumber(item.odds)} -> ${item.bettings[0].HomeTeam}`}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                            {toNumber(item.stake)}
                                        </Typography>
                                        <img width="16px" src={item.currency.icon} alt="icon" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <StatusIcon status={item.bettings[0].status} />
                                        <Typography sx={{ pt: 0.5, cursor: 'pointer' }}>
                                            {`${item.bettings[0].HomeTeam} - ${item.bettings[0].AwayTeam}`}
                                        </Typography>
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <StatusBadge status={item.status} />
                                </TableCell>
                                <TableCell sx={{ pr: 3 }}>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        {moment(item.createdAt).format('ddd, MMM YY, h:mm A')}
                                    </Stack>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default memo(TableHistory);
