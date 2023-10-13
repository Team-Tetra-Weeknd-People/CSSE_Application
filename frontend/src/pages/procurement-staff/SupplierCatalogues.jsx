import "../../styles/sudul/common.css";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";

export default function ProcurementSupplierCatalogues() {
  sessionStorage.setItem("sidebarStatus", "procurement-supplier-catalogues");
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