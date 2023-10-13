import { Link } from "react-router-dom";
import "../../styles/sudul/sidebar.css";

export default function SiteManagerSidebar() {
    const sidebarStatus = sessionStorage.getItem("sidebarStatus");

    function logout() {
        localStorage.clear();
        sessionStorage.clear();
        window.location.href = "/";
    }

    return (
        <div className="sidebar">
            <div className="header">
                <h2>SHMOFY</h2>
            </div>
            <div className="menu">
                <Link
                    to="/site-manager-dashboard"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "site-manager-dashboard"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Dashboards
                </Link>
                <Link
                    to="/site-manager-inventory"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "site-manager-inventory"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Notifications
                </Link>
                <Link
                    to="/site-manager-notifications"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "site-manager-notifications"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Inventory
                </Link>
                <Link
                    to="/site-manager-profile"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "site-manager-profile"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Profile
                </Link>
            </div>
            <div className="logout">
                <button className="btn btn-danger btn-block"
                    onClick={logout}
                >Logout</button>
            </div>
        </div>
    );
}
