import { Link } from "react-router-dom";
import "../../styles/sudul/sidebar.css";

export default function SupplierSidebar() {
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
                    to="/supplier-dashboard"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "supplier-dashboard"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Dashboards
                </Link>
                <Link
                    to="/supplier-new-orders"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "supplier-new-orders"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Orders
                </Link>
                <Link
                    to="/supplier-delivery"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "supplier-delivery"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Delivery
                </Link>
                {/* <Link
                    to="/supplier-notifications"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "supplier-notifications"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Notifications
                </Link>
                <Link
                    to="/supplier-profile"
                    className="btn btn-primary btn-block"
                    style={
                        sidebarStatus === "supplier-profile"
                            ? { color: "#000000", backgroundColor: "#ffffff" }
                            : null
                    }
                >
                    Profile
                </Link> */}
            </div>
            <div className="logout">
                <button className="btn btn-danger btn-block"
                    onClick={logout}
                >Logout</button>
            </div>
        </div>
    );
}
