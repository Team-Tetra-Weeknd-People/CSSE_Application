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
    SiteManagerInventory,
    SiteManagerNotifications,
    SiteManagerProfile,
    SupplierDashboard,
    SupplierDelivery,
    SupplierNewOrders,
    SupplierNotifications,
    SupplierProfile
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
                <Route path="/procurement-pricing/:id" element={<ProcurementPricing />} />
                <Route path="/procurement-supplier-catalogues" element={<ProcurementSupplierCatalogues />} />
                <Route path="/procurement-dashboard" element={<ProcurementDashboard />} />

                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                {/* Manager Routes */}
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />

                {/* Site Manager Routes */}
                <Route path="/site-manager-dashboard" element={<SiteManagerDashboard />} />
                <Route path="/site-manager-inventory" element={<SiteManagerInventory />} />
                <Route path="/site-manager-notifications" element={<SiteManagerNotifications />} />
                <Route path="/site-manager-profile" element={<SiteManagerProfile />} />

                {/* Supplier Routes */}
                <Route path="/supplier-dashboard" element={<SupplierDashboard />} />
                <Route path="/supplier-delivery" element={<SupplierDelivery />} />
                <Route path="/supplier-new-orders" element={<SupplierNewOrders />} />
                <Route path="/supplier-notifications" element={<SupplierNotifications />} />
                <Route path="/supplier-profile" element={<SupplierProfile />} />

            </Routes>
        </Router>
    )
}