import { lazy } from 'react';
import MainLayout from 'layout/MainLayout';
import UserLayout from 'layout/UserLayout';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/AuthGuard';

const Wallet = Loadable(lazy(() => import('views/profile/Wallet')));
const Account = Loadable(lazy(() => import('views/profile/Account')));
const Preferences = Loadable(lazy(() => import('views/profile/Preferences')));
const Referral = Loadable(lazy(() => import('views/profile/Referral')));
const History = Loadable(lazy(() => import('views/profile/History')));

const ProfileRoutes = {
    path: '/user',
    element: (
        <MainLayout>
            <AuthGuard>
                <UserLayout />
            </AuthGuard>
        </MainLayout>
    ),
    children: [
        {
            path: '/user/wallet',
            element: <Wallet />
        },
        {
            path: '/user/account',
            element: <Account />
        },
        {
            path: '/user/referral',
            element: <Referral />
        },
        {
            path: '/user/preferences',
            element: <Preferences />
        },
        {
            path: '/user/history',
            element: <History />
        }
    ]
};

export default ProfileRoutes;
