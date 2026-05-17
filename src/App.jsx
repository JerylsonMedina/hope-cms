import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CustomersPage from "./pages/CustomersPage"
import ProductsPage from "./pages/ProductsPage"
import SalesPage from "./pages/SalesPage"
import AdminPage from "./pages/AdminPage"
import DeletedCustomersPage from "./pages/DeletedCustomersPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/customers" element={<CustomersPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/sales" element={<SalesPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/deleted-customers" element={
          <ProtectedRoute>
            <DeletedCustomersPage />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App