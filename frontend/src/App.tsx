import Dashboard from './pages/Dashboard';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout/Layout';
import AllProductsPage from './pages/AllProducts';
import NewProductPage from './pages/NewProduct';
import AllTransactionsPage from './pages/AllTransactions';
import CreateStorePage from './pages/CreateStore';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<Dashboard />} />
        <Route path='/create-store' element={<CreateStorePage />} />
        <Route path='/products' element={<AllProductsPage />} />
        <Route path='/new-product' element={<NewProductPage />} />
        <Route path='/transactions' element={<AllTransactionsPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
