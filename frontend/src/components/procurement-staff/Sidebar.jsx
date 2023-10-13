import { Link } from "react-router-dom";
import "../../styles/sudul/sidebar.css";

export default function ProcurementSidebar() {
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
          to="/procurement-order-requests"
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "procurement-order-requests"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }
        >
          Order Requests
        </Link>
        <Link
          to="/procurement-pricing"
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "procurement-pricing"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }
        >
          Pricing
        </Link>
        <Link
          to="/procurement-supplier-catalogues"
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "procurement-supplier-catalogues"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }
        >
          Supplier Catalogues
        </Link>
        <Link
          to="/procurement-dashboard"
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "procurement-dashboard"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }
        >
          Dashboard
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
