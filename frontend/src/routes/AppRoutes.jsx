import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Home,
    Login,

    ProcurementDashboard,
    ProcurementOrderRequests,
    ProcurementPricingAndDeliveryNotes,
    ProcurementSupplierCatalogues,

    AdminDashboard,

    ManagerDashboard,
    ManagerPlaceOrders,
    ManagerPlaceOrder,

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
                <Route path="/procurement-pricing-and-delivery-notes/:id" element={<ProcurementPricingAndDeliveryNotes />} />
                <Route path="/procurement-supplier-catalogues" element={<ProcurementSupplierCatalogues />} />
                <Route path="/procurement-dashboard" element={<ProcurementDashboard />} />

                {/* Admin Routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />

                {/* Manager Routes */}
                <Route path="/manager-dashboard" element={<ManagerDashboard />} />
                <Route path="/manager-placeorders" element={<ManagerPlaceOrders />} />
                <Route path="/manager-placeorder/:id" element={<ManagerPlaceOrder />} />

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