import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Home,
    Login,

    ProcurementDashboard,
    ProcurementOrderRequests,
    ProcurementPricing,
    ProcurementSupplierCatalogues,

    AdminDashboard,

    ManagerDashboard,

    SiteManagerDashboard,

    SupplierDashboard
} from "../pages";

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Common */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />

                {/* Procurement Staff Routes */}
                <Route path="/procurement-order-requests" element={<ProcurementOrderRequests />} />
                <Route path="/procurement-pricing" element={<ProcurementPricing />} />
                <Route path="/procurement-supplier-catalogues" element={<ProcurementSupplierCatalogues />} />
                <Route path="/procurement-dashboard" element={<ProcurementDashboard />} />

                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                {/* Manager Routes */}
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />

                {/* Site Manager Routes */}
                <Route path="/site-manager-dashboard" element={<SiteManagerDashboard />} />

                {/* Supplier Routes */}
                <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
            </Routes>
        </Router>
    )
}