import "../../styles/sudul/common.css";
import "../../styles/chanudi/dashboard.css"

import SiteManagerSidebar from "../../components/siteManager/Sidebar";
import SiteManagerNavbar from "../../components/siteManager/Navbar";

export default function SiteManagerNotifications() {
    sessionStorage.setItem("sidebarStatus", "site-manager-notifications");
    return (
        <>
            <div className="whole-content">
                <div className="sidebar-content">
                    <SiteManagerSidebar />
                </div>
                <div className="right-content">
                    <SiteManagerNavbar name="Notifications" />

                    <div className="smdash">
                        <div className="smdashcontainer">
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
