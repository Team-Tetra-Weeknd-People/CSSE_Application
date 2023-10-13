import "../../styles/sudul/common.css";
import SupplierSidebar from "../../components/supplier/Sidebar";

export default function SupplierProfile() {
    sessionStorage.setItem("sidebarStatus", "supplier-profile");
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
