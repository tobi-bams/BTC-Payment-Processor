import { useContext } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import AllProductsPage from '../../pages/AllProducts';
import AllTransactionsPage from '../../pages/AllTransactions';
import AuthPage from '../../pages/AuthPage';
import CreateStorePage from '../../pages/CreateStore';
import Dashboard from '../../pages/Dashboard';
import HomePage from '../../pages/HomePage';
import NewProductPage from '../../pages/NewProduct';
import AuthContext from '../../store/auth-context';
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
            {/* --------------------------- */}
            {/* LANDING PAGES ROUTERS - START */}
            {/* <AppRoute exact path="/" layout={DefaultLayout} component={ProductsIndex} /> */}
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
                    path="/dashboard/products"
                    layout={DashboardIndexLayout}
                    component={AllProductsPage}
                />)}
            {authCtx.isLoggedIn && (
                <AppRoute
                    exact
                    path="/dashboard/products/new"
                    layout={DashboardIndexLayout}
                    component={NewProductPage}
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