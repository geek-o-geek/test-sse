import Login from './screens/Login.tsx'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "@/components/ProtectedRoute.tsx";
import Layout from '@/components/Layout.tsx';
import CartDetails from '@/screens/CartDetails.tsx';
import Signup from './screens/Signup.tsx';
import { ThemeProvider } from '@/context/ThemeProvider.tsx';
import { lazy, Suspense } from 'react';

function App() {

  const ProductListing = lazy(() => import('./screens/ProductListing.tsx'));

  return <ThemeProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/products" element={<ProtectedRoute>
                <Layout>
                  <Suspense fallback={<div>loading...</div>}>
                    <ProductListing />
                  </Suspense>
                </Layout>
            </ProtectedRoute>} />
          <Route path="/cart" element={<ProtectedRoute><Layout><CartDetails /></Layout></ProtectedRoute>} />
        </Routes>
    </BrowserRouter>
  </ThemeProvider>
}

export default App
