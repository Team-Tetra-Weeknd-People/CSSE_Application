import React, { useState, useEffect } from "react";
import "../../styles/sudul/common.css";
import "../../styles/sudul/supplierCatalogues.css";
import SupplierService from "../../services/Supplier.Service";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";

export default function ProcurementSupplierCatalogues() {
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    // Fetch the list of suppliers when the component mounts
    SupplierService.getAllSuppliers().then((res) => {
      const allSuppliers = res.data;
      setSuppliers(allSuppliers);
      setFilteredSuppliers(allSuppliers); // Initialize filteredSuppliers with all suppliers
    });
  }, []);

  // Function to handle search input change
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filter suppliers based on the search input
    const filtered = suppliers.filter((supplier) =>
      supplier.shopName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  return (
    <>
      <div className="whole-content">
        <div className="sidebar-content">
          <ProcurementSidebar />
        </div>
        <div className="right-content">
          <div className="proc-sup-content">
            <div className="proc-sup-search-bar">
              <div className="proc-sup-search-bar-header">
                <h3>Suppliers</h3>
              </div>
              <div>
                <input
                  type="text"
                  className="sup-search-bar"
                  placeholder="Search Supplier Shop Name"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <div className="proc-sup-suppliers">
              <table className="supplier-table">
                <thead>
                  <tr>
                    <th>Shop Name</th>
                    <th>Contact Name</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier._id}>
                      <td>{supplier.shopName}</td>
                      <td>{supplier.contactName}</td>
                      <td>{supplier.phoneNumber}</td>
                      <td>{supplier.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
