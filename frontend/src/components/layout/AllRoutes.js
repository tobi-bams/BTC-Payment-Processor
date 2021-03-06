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
import CreateBitcoinWalletPage from '../../pages/CreateBitcoinWalletPage';
import GettingStartedPage from '../../pages/GettingStarted';
import AllWalletsPage from '../../pages/AllWallets';
import InvoiceDetailsPage from '../../pages/InvoiceDetailPage';
import ConnectLightningPage from '../../pages/ConnectLightningNode';
import DefaultLayout from './DefaultLayout';
import CheckoutPage from '../../pages/CheckoutPage';
import OnboardingLayout from './OnboardingLayout';
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
                    layout={OnboardingLayout}
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
                    layout={OnboardingLayout}
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
                    layout={OnboardingLayout}
                    component={CreateBitcoinWalletPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/wallets/lightning"
                    layout={OnboardingLayout}
                    component={ConnectLightningPage}
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
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/invoices/:invoiceId"
                    layout={DashboardIndexLayout}
                    component={InvoiceDetailsPage}
                />)}
            <AppRoute
                exact
                path="/dashboard/invoices/checkout/:invoiceId"
                layout={DefaultLayout}
                component={CheckoutPage}
            />
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