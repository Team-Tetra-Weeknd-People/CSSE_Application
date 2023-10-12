import "../../styles/sudul/common.css";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";

export default function ProcurementPricing() {
  sessionStorage.setItem("sidebarStatus", "procurement-pricing");
  return (
    <>
      <div className="whole-content">
        <div className="sidebar-content">
          <ProcurementSidebar />
        </div>
        <div className="right-content"></div>
      </div>
    </>
  );
}