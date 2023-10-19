import { Link } from "react-router-dom";
import "../../styles/sudul/sidebar.css";

export default function ManagerSidebar() {
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
          to="/manager-dashboard"
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "manager-dashboard"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }
        >
          Dashboard
        </Link>
        <Link
          to="/manager-placeorders"  
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "manager-placeorders"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }

        >
          Place Orders
        </Link>
        <Link
          className="btn btn-primary btn-block"
          style={
            sidebarStatus === "manager-placeorder"
              ? { color: "#000000", backgroundColor: "#ffffff" }
              : null
          }
        >
          Pending Orders
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
