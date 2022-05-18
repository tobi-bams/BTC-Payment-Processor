import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AllInvoicesPage from '../../pages/AllInvoices';
import AuthPage from '../../pages/AuthPage';
import CreateStorePage from '../../pages/CreateStore';
import Dashboard from '../../pages/Dashboard';
import NewInvoicePage from '../../pages/NewInvoice';
import AuthContext from '../../context/auth-context';
import AuthLayout from './AuthLayout';
import DashboardIndexLayout from './DashboardIndexLayout';
import WalletPage from '../../pages/CreateBitcoinWalletPage';
import GettingStartedPage from '../../pages/GettingStarted';
import CreateBitcoinWalletPage from '../../pages/AllWallets';
import AllWalletsPage from '../../pages/AllWallets';
// import layouts

const AppRoute = ({ component: Component, layout: Layout, ...rest }) => (
    <Route
        {...rest}
        render={(props) => (
            <Layout>
                <Component {...props}></Component>
            </Layout>
        )}
    ></Route>
);

function AllRoutes() {
    const authCtx = useContext(AuthContext);

    return (
        <Switch>
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/getting-started"
                    layout={DashboardIndexLayout}
                    component={GettingStartedPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/overview"
                    layout={DashboardIndexLayout}
                    component={Dashboard}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/create-store"
                    layout={DashboardIndexLayout}
                    component={CreateStorePage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/wallets/"
                    layout={DashboardIndexLayout}
                    component={AllWalletsPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/wallets/bitcoin"
                    layout={DashboardIndexLayout}
                    component={CreateBitcoinWalletPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/lightning"
                    layout={DashboardIndexLayout}
                    component={WalletPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/invoices"
                    layout={DashboardIndexLayout}
                    component={AllInvoicesPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/invoices/new"
                    layout={DashboardIndexLayout}
                    component={NewInvoicePage}
                />)}
            {!authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/auth"
                    layout={AuthLayout}
                    component={AuthPage}
                />)}
            <AppRoute path="/">
                <Redirect to="/auth" />
            </AppRoute>
            <AppRoute path="*">
                <Redirect to="/auth" />
            </AppRoute>
        </Switch>
    );
}

export default AllRoutes;