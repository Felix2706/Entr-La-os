import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Personalizer from './pages/Personalizer';
import Cart from './pages/Cart';
import Order from './pages/Order';
import Payment from './pages/Payment';
import Confirmation from './pages/Confirmation';

export default function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontFamily: '"Inter", sans-serif',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalogo" element={<Catalog />} />
          <Route path="produto/:id" element={<ProductDetail />} />
          <Route path="personalizar" element={<Personalizer />} />
          <Route path="carrinho" element={<Cart />} />
          <Route path="pedido" element={<Order />} />
          <Route path="pagamento" element={<Payment />} />
          <Route path="confirmacao" element={<Confirmation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
