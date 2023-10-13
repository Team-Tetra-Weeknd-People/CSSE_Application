import "../../styles/sudul/common.css";
import SupplierSidebar from "../../components/supplier/Sidebar";

export default function SupplierDashboard() {
    sessionStorage.setItem("sidebarStatus", "supplier-dashboard");
    return (
        <>
            <div className="whole-content">
                <div className="sidebar-content">
                    <SupplierSidebar />
                </div>
                <div className="right-content"></div>
            </div>
        </>
    );
}
