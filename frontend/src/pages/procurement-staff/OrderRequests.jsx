import React, { useEffect, useState } from "react";
import "../../styles/sudul/common.css";
import "../../styles/sudul/orderRequests.css";
import { useNavigate } from "react-router-dom";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import OrderService from "../../services/Order.Service";

export default function ProcurementOrderRequests() {
  sessionStorage.setItem("sidebarStatus", "procurement-order-requests");
  const [orderRequests, setOrderRequests] = useState([]);
  const [filteredOrderRequests, setFilteredOrderRequests] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const handleCheckStatus = (status) => {
    let styles = {};

    switch (status) {
      case "To Be Priced":
        styles = {
          backgroundColor: "#ff444499",
        };
        break;
      case "Priced":
        styles = {
          backgroundColor: "#d861258f",
        };
        break;

      case "Approval Requested":
        styles = {
          backgroundColor: "#ffc41499",
        };
        break;
      case "Approved":
        styles = {
          backgroundColor: "#51eb4999",
        };
        break;
      case "Rejected":
        styles = {
          backgroundColor: "#ff0000",
          color: "#fff",
        };
        break;
      case "Confirmed":
        styles = {
          backgroundColor: "#00bcd499",
        };
        break;
      case "Delivered":
        styles = {
          backgroundColor: "#0d47a1",
          color: "#fff",
        };
        break;
      case "Sent To Delivery":
        styles = {
          backgroundColor: "#77777788",
        };
      default:
        styles = {
          backgroundColor: "#ce91ff99",
        };
    }

    return styles;
  };

  useEffect(() => {
    try {
      OrderService.getAllOrder().then((res) => {
        setOrderRequests(res.data);
        setFilteredOrderRequests(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const navigate = useNavigate();

  function handleRequestClick(id, status) {
    if (status === "To Be Priced" || status === "Priced") {
      navigate(`/procurement-pricing/${id}`);
    }
  }

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);

    // Filter order requests based on the search input
    const filtered = orderRequests.filter((orderRequest) =>
      orderRequest.itemName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredOrderRequests(filtered);
  };

  return (
    <div className="whole-content">
      <div className="sidebar-content">
        <ProcurementSidebar />
      </div>
      <div className="right-content">
        <div className="proc-content">
          <div className="proc-search-bar">
            <h2 className="proc-today">Order Requests</h2>
            <div class="search-container">
              <i class="search-icon fas fa-search"></i>
              <input
                type="text"
                class="search-bar"
                placeholder="Search Order Requests by Item"
                value={searchValue}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <div className="proc-today-orders">
            <div className="proc-today-orders-list">
              <OrderRequestsTable
                data={filteredOrderRequests}
                onRowClick={handleRequestClick}
                checkStatus={handleCheckStatus}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderRequestsTable({ data, onRowClick, checkStatus }) {
  return (
    <table className="proc-order-requests-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Item Name</th>
          <th>Quantity</th>
          <th>Supplier</th>
          <th>Placed Date</th>
          <th>Expected Delivery</th>
          <th>Funding Account</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {data.map((orderRequest) => (
          <tr
            style={checkStatus(orderRequest.status)}
            key={orderRequest._id}
            onClick={() => onRowClick(orderRequest._id, orderRequest.status)}
          >
            <td>{orderRequest._id}</td>
            <td>{orderRequest.itemName}</td>
            <td>{orderRequest.quantity}</td>
            <td>{orderRequest.supplierName}</td>
            <td>{orderRequest.placedDate.toString().split("T")[0]}</td>
            <td>
              {orderRequest.deliveryDate ? orderRequest.deliveryDate : "None"}
            </td>
            <td>{orderRequest.funding}</td>
            <td>{orderRequest.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
