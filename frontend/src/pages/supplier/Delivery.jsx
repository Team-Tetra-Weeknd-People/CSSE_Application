import "../../styles/sudul/common.css";
import SupplierSidebar from "../../components/supplier/Sidebar";

export default function SupplierDelivery() {
    sessionStorage.setItem("sidebarStatus", "supplier-delivery");
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
