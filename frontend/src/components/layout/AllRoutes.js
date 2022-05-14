import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AllInvoicesPage from '../../pages/AllInvoices';
import AllTransactionsPage from '../../pages/AllTransactions';
import AuthPage from '../../pages/AuthPage';
import CreateStorePage from '../../pages/CreateStore';
import Dashboard from '../../pages/Dashboard';
import HomePage from '../../pages/HomePage';
import NewInvoicePage from '../../pages/NewInvoice';
import AuthContext from '../../context/auth-context';
import AuthLayout from './AuthLayout';
import DashboardIndexLayout from './DashboardIndexLayout';
import DefaultLayout from './DefaultLayout';
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
            <AppRoute exact path="/" layout={DefaultLayout} component={HomePage} />
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/"
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
                    path="/dashboard/transactions"
                    layout={DashboardIndexLayout}
                    component={AllTransactionsPage}
                />)}
            {!authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/auth"
                    layout={AuthLayout}
                    component={AuthPage}
                />)}
            <AppRoute path="*">
                <Redirect to="/" />
            </AppRoute>
        </Switch>
    );
}

export default AllRoutes;