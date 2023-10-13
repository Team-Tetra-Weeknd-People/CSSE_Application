import "../../styles/sudul/common.css";
import SupplierSidebar from "../../components/supplier/Sidebar";

export default function SupplierNewOrders() {
    sessionStorage.setItem("sidebarStatus", "supplier-new-orders");
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
