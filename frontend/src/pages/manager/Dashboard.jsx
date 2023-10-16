import React, { useEffect, useState } from "react";
import "../../styles/sudul/common.css";
import "../../styles/madusha/dashboard.css";
import ManagerSidebar from "../../components/manager/SideBar";
import OrderService from "../../services/Order.Service";
import Manager from "../../services/Manager.Service";
import { Link } from 'react-router-dom';

export default function ManagerDashboard() {
  sessionStorage.setItem("sidebarStatus", "manager-dashboard");
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [manager, setManager] = useState({});
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setfilteredOrders] = useState([]);
  const [pendingOrders, setPendingOrders] = useState([]);

  useEffect(() => {
    Manager.getOneManager(localStorage.getItem("id"))
      .then((res) => {
        setManager(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [1]);

  useEffect(() => {
    try {
      OrderService.getAllOrder().then((res) => {
        setOrders(res.data);
        console.log(res.data);
        // const allowedStatus = ["Approval Requested"];

        // Filter the data based on the allowedStatus array
        // const filteredData = orders.filter( (order) => order.status === "Approval Requested")
        // setfilteredOrders(filteredData);
        // console.log(filteredData);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);



  return (
    <div className="whole-content">
      <div className="sidebar-content">
        <ManagerSidebar />
      </div>
      <div className="right-content">
        <div className="manager-dashboard">
          <h2 className="manager-heading-text">Manager Dashboard</h2>
          <Link to="/manager-placeorders">
          <div className="manager-order-card">
            <div className="manager-order-heading">
              <h3 className="manager-order-heading-text">Approval Requested Orders</h3>
            </div>
            <div className="manager-order-count">
              <p className="manager-order-count-text">
                {orders.filter( (order) => order.status === "Approval Requested").length}
                {/* {pendingOrders.length} */}
                {/* {filteredOrders.length} */}
              </p>
            </div>
          </div>
          </Link>
          <div className="manager-pending-orders-table">
            <div className="manager-pending-orders-table-heading">
              Pending Orders to be Approved
            </div>
          <table className="manager-order-requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Supplier</th>
                <th>subTotal</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.filter( (order) => order.status === "Approval Requested").map((orderRequest) => (
                <tr>
                  <td>{orderRequest._id}</td>
                  <td>{orderRequest.itemName}</td>
                  <td>{orderRequest.supplierName}</td>
                  <td>Rs. {orderRequest.subTotal}</td>
                  <td>{orderRequest.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
          <div className="manager-profile-det">
            <h3>Profile Details</h3>
            <table className="manager-profile-details-table">
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Contact Number</th>
                  <th>Email</th>
                  <th>Account Created</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{manager.fname}</td>
                  <td>{manager.lname}</td>
                  <td>{manager.contactNo}</td>
                  <td>{manager.email}</td>
                  <td>{manager.createdOn ? manager.createdOn.toString().split("T")[0] : ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

