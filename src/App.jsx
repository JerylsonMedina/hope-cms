import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegisterPage"
import CustomersPage from "./pages/CustomersPage"
import ProductsPage from "./pages/ProductsPage"
import SalesPage from "./pages/SalesPage"
import AdminPage from "./pages/AdminPage"
import DeletedCustomersPage from "./pages/DeletedCustomersPage"
import AppShell from "./components/AppShell"
import AuthCallbackPage from "./components/AuthCallbackPage"
import CustomerListPage from "./pages/CustomerListPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes - NO shell */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Protected routes - wrapped in AppShell */}
        <Route path="/customers" element={<AppShell><CustomersPage /></AppShell>} />
        <Route path="/products" element={<AppShell><ProductsPage /></AppShell>} />
        <Route path="/sales" element={<AppShell><SalesPage /></AppShell>} />
        <Route path="/admin" element={<AppShell><AdminPage /></AppShell>} />
        <Route path="/deleted-customers" element={<AppShell><DeletedCustomersPage /></AppShell>} />
        <Route path="/customer-list" element={<AppShell><CustomerListPage /></AppShell>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App