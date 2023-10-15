import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "../../styles/sudul/common.css";
import "../../styles/sudul/supplierCatalogues.css";
import SupplierService from "../../services/Supplier.Service";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import ItemService from "../../services/Item.Service";

export default function ProcurementSupplierCatalogues() {
  sessionStorage.setItem("sidebarStatus", "procurement-supplier-catalogues");
  const [suppliers, setSuppliers] = useState([]);
  const [filteredSuppliers, setFilteredSuppliers] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [supplierCatalogue, setSupplierCatalogue] = useState("");
  const [supplierCatalogueItems, setSupplierCatalogueItems] = useState([]);
  const [itemSearchValue, setItemSearchValue] = useState("");
  const [filteredSupplierCatalogueItems, setFilteredSupplierCatalogueItems] = useState([]);

  useEffect(() => {
    SupplierService.getAllSuppliers().then((res) => {
      const allSuppliers = res.data;
      setSuppliers(allSuppliers);
      setFilteredSuppliers(allSuppliers);
    });
  }, []);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    const filtered = suppliers.filter((supplier) =>
      supplier.shopName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSuppliers(filtered);
  };

  const handleItemSearchChange = (e) => {
    const value = e.target.value;
    setItemSearchValue(value);

    if (supplierCatalogue !== "Not Available") {
      const filteredItems = supplierCatalogueItems.filter((item) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredSupplierCatalogueItems(filteredItems);
    }
  };

  const handleSupplierClick = (supplier) => {
    setSupplierCatalogue(
      supplier.catalogues[0] ? supplier.catalogues[0] : "Not Available"
    );
    if (supplier.catalogues[0] !== undefined) {
      ItemService.getItemCatalogue(supplier.catalogues[0]._id)
        .then((res) => {
          setSupplierCatalogueItems(res.data);
          setFilteredSupplierCatalogueItems(res.data);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong!",
          });
        });
    }
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
                    <tr key={supplier._id} onClick={() => handleSupplierClick(supplier)}>
                      <td>{supplier.shopName}</td>
                      <td>{supplier.type}</td>
                      <td>{supplier.contactNo}</td>
                      <td>{supplier.email}</td>
                      <td>
                        {supplier.catalogues[0] ? "Available" : "Not Available"}
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
                  <h5>
                    Catalogue ID:{" "}
                    {`${supplierCatalogue == "Not Available" ? "Selected Supplier doesn't have a catalogue!" : supplierCatalogue._id || "Not Available"}`}
                  </h5>
                </div>
                <div>
                  <input
                    type="text"
                    className="sup-search-bar"
                    placeholder="Search Items"
                    value={itemSearchValue}
                    onChange={handleItemSearchChange}
                  />
                </div>
              </div>
              {(supplierCatalogue === "Not Available" || supplierCatalogue==="") ? (
                ""
              ) : (
                <div>
                  <table className="item-table">
                    <thead>
                      <tr>
                        <th>Item Name</th>
                        <th>Quantity Available</th>
                        <th>Price per Unit(Rs.)</th>
                        <th>Unit</th>
                        <th>Created On</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredSupplierCatalogueItems.map((item) => (
                        <tr key={item._id}>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.pricePerUnit.toFixed(2)}</td>
                          <td>{item.unit}</td>
                          <td>{item.createdOn.toString().split("T")[0]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
