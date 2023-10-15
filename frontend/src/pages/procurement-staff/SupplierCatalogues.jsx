import React, { useState, useEffect } from "react";
import "../../styles/sudul/common.css";
import "../../styles/sudul/supplierCatalogues.css";
import SupplierService from "../../services/Supplier.Service";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";

export default function ProcurementSupplierCatalogues() {
  sessionStorage.setItem("sidebarStatus", "procurement-supplier-catalogues");
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [supplierCatalogueId, setSupplierCatalogueId] = useState('');

  useEffect(() => {
    // Fetch the list of suppliers when the component mounts
    SupplierService.getAllSuppliers().then((res) => {
      const allSuppliers = res.data;
      setSuppliers(allSuppliers);
      setFilteredSuppliers(allSuppliers);
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
                    <th>Type</th>
                    <th>Phone Number</th>
                    <th>Email</th>
                    <th>Catalogue</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSuppliers.map((supplier) => (
                    <tr key={supplier._id} onClick={() =>{setSupplierCatalogueId(supplier.catelougues[1]  ? supplier.catelougues[1]  : "Not Available")}}> 
                      <td>{supplier.shopName}</td>
                      <td>{supplier.type}</td>
                      <td>{supplier.contactNo}</td>
                      <td>{supplier.email}</td>
                      <td>
                        {supplier.catelougues[1] ? "Available" : "Not Available"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="proc-sup-catalogue-det">
              <div className="proc-sup-search-bar">
                <div className="proc-sup-search-bar-header">
                  <h3>Supplier Catalogue</h3>
                  <h5>Supplier: {`${supplierCatalogueId=="Not Available" ? 'Selected Supplier doesn\'t have a catalogue!' : supplierCatalogueId}`}</h5>
                </div>
                <div>
                  <input
                    type="text"
                    className="sup-search-bar"
                    placeholder="Search Items"
                    value={searchValue}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
              {supplierCatalogueId=="Not Available" ? ('') : ('f')}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
