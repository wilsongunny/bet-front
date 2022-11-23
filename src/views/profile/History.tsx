import { memo, useEffect, useState } from 'react';
import { Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Skeleton, Typography } from '@mui/material';

import { FormattedMessage } from 'react-intl';

import moment from 'moment';
import { toNumber } from 'utils/number';

import { useSelector } from 'store';

import useApi from 'hooks/useApi';
import useConfig from 'hooks/useConfig';
import { StatusIcon } from 'ui-component/SvgIcon';

const TableHistory = () => {
    const Api = useApi();
    const { locale, boxShadow } = useConfig();
    moment.locale(locale);
    const { user } = useSelector((state) => state.auth);
    const [histories, setHistories] = useState([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        const params = {
            page: 1,
            pageSize: 1000,
            userId: user._id,
            column: 'createdAt',
            sort: -1
        };
        Api.getBalanceHistorysList(params)
            .then(({ data }) => {
                setHistories(data.results);
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
                                <FormattedMessage id="Before" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Current" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Amount" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Type" />
                            </TableCell>
                            <TableCell sx={{ pr: 3 }}>
                                <FormattedMessage id="Date&Time" />
                            </TableCell>
                            <TableCell>
                                <FormattedMessage id="Status" />
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {histories.map((item: any, key) => (
                            <TableRow hover key={key}>
                                <TableCell sx={{ pl: 1 }}>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                            {toNumber(item.beforeBalance)}
                                        </Typography>
                                        <img width="16px" src={item.currency.icon} alt="icon" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                            {toNumber(item.currentBalance)}
                                        </Typography>
                                        <img width="16px" src={item.currency.icon} alt="icon" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={0.5}>
                                        <Typography variant="body2" className="text-ellipse" color="#fff" sx={{ maxWidth: '100px' }}>
                                            {toNumber(item.amount)}
                                        </Typography>
                                        <img width="16px" src={item.currency.icon} alt="icon" />
                                    </Stack>
                                </TableCell>
                                <TableCell>
                                    <Typography className="text-ellipse" sx={{ maxWidth: '150px' }}>
                                        {item.type}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Typography className="text-ellipse" sx={{ maxWidth: '180px' }}>
                                        {item.createdAt}
                                    </Typography>
                                </TableCell>
                                <TableCell>
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                        <StatusIcon status={item.amount > 0 ? 'WIN' : 'LOST'} />
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
