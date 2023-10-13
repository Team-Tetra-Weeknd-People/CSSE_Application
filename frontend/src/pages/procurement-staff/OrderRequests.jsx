import React, { useEffect, useState } from "react";
import "../../styles/sudul/common.css";
import "../../styles/sudul/orderRequests.css";
import { useNavigate } from "react-router-dom";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import OrderService from "../../services/Order.Service";

export default function ProcurementOrderRequests() {
  sessionStorage.setItem("sidebarStatus", "procurement-order-requests");
  const [orderRequests, setOrderRequests] = useState([]);

  useEffect(() => {
    try {
      OrderService.getAllOrder().then((res) => {
        setOrderRequests(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const navigate = useNavigate();

  function handleRequestClick(id) {
    navigate(`/procurement-pricing/${id}`);
  }

  return (
    <div className="whole-content">
      <div className="sidebar-content">
        <ProcurementSidebar />
      </div>
      <div className="right-content">
        <div className="proc-content">
          <div className="proc-search-bar">
            <input type="text" className="search-bar" placeholder="Search..." />
            <button className="search-button">Search</button>
          </div>
          <div className="proc-today-orders">
            <span className="proc-today">Today</span>
            <div className="proc-today-orders-list">
              <OrderRequestsTable
                data={orderRequests}
                onRowClick={handleRequestClick}
              />
            </div>
          </div>
          <div className="proc-prev-orders">
            <span className="proc-prev">Previous Orders</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function OrderRequestsTable({ data, onRowClick }) {
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
            key={orderRequest._id}
            onClick={() => onRowClick(orderRequest._id)}
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
