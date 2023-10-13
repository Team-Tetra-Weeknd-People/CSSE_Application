import "../../styles/sudul/common.css";
import SiteManagerSidebar from "../../components/siteManager/Sidebar";

export default function SupplierDashboard() {
    sessionStorage.setItem("sidebarStatus", "site-manager-dashboard");
    return (
        <>
            <div className="whole-content">
                <div className="sidebar-content">
                    <SiteManagerSidebar />
                </div>
                <div className="right-content"></div>
            </div>
        </>
    );
}
