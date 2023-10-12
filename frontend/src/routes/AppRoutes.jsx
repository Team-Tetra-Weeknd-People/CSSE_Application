import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
    Home
} from "../pages";
import ProcurementDashboard from "../pages/procurement-staff/Dashboard";
import ProcurementOrderRequests from "../pages/procurement-staff/OrderRequests";
import ProcurementPricing from "../pages/procurement-staff/Pricing";
import ProcurementSupplierCatalogues from "../pages/procurement-staff/SupplierCatalogues";

export default function App() {
    return (
        <Router>
            <Routes>
                {/* Common */}
                <Route path="/" element={<Home />} />

                {/* Procurement Staff Routes */}
                <Route path="/procurement-order-requests" element={<ProcurementOrderRequests />} />
                <Route path="/procurement-pricing" element={<ProcurementPricing />} />
                <Route path="/procurement-supplier-catalogues" element={<ProcurementSupplierCatalogues />} />
                <Route path="/procurement-dashboard" element={<ProcurementDashboard />} />
            </Routes>
        </Router>
    )
}