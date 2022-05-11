import { Route, Switch } from 'react-router-dom';
import AllProductsPage from '../../pages/AllProducts';
import AllTransactionsPage from '../../pages/AllTransactions';
import AuthPage from '../../pages/AuthPage';
import CreateStorePage from '../../pages/CreateStore';
import Dashboard from '../../pages/Dashboard';
import HomePage from '../../pages/HomePage';
import NewProductPage from '../../pages/NewProduct';
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
    return (
        <Switch>
            {/* --------------------------- */}
            {/* LANDING PAGES ROUTERS - START */}
            {/* <AppRoute exact path="/" layout={DefaultLayout} component={ProductsIndex} /> */}
            <AppRoute exact path="/" layout={DefaultLayout} component={HomePage} />

            <AppRoute
                exact
                path="/dashboard/"
                layout={DashboardIndexLayout}
                component={Dashboard}
            />
            <AppRoute
                exact
                path="/dashboard/create-store"
                layout={DashboardIndexLayout}
                component={CreateStorePage}
            />
            <AppRoute
                exact
                path="/dashboard/products"
                layout={DashboardIndexLayout}
                component={AllProductsPage}
            />
            <AppRoute
                exact
                path="/dashboard/products/new"
                layout={DashboardIndexLayout}
                component={NewProductPage}
            />
            <AppRoute
                exact
                path="/dashboard/transactions"
                layout={DashboardIndexLayout}
                component={AllTransactionsPage}
            />

            <AppRoute
                exact
                path="/auth/"
                layout={AuthLayout}
                component={AuthPage}
            />
        </Switch>
    );
}

export default AllRoutes;