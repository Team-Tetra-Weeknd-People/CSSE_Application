import { useState, useEffect } from "react";
import {
  Container,
  Button,
  Card,
  Row,
  Col,
  Alert,
  Modal,
  Table,
} from "react-bootstrap";

import "../../styles/sudul/common.css";
import "../../styles/chanudi/dashboard.css";
import "../../styles/sudul/orderRequests.css";

import SiteManagerSidebar from "../../components/siteManager/Sidebar";
import SiteManagerNavbar from "../../components/siteManager/Navbar";

import OrderService from "../../services/Order.Service";

export default function SiteManagerNotifications() {
  sessionStorage.setItem("sidebarStatus", "site-manager-notifications");

  const [orders, setOrders] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    OrderService.getOrderSiteManager(localStorage.getItem("id"))
      .then((response) => {
        setOrders(response.data);
        console.log(response);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

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
        break;
      default:
        styles = {
          backgroundColor: "#ce91ff99",
        };
        break;
    }

    return styles;
  };

  return (
    <>
      <div className="whole-content">
        <div className="sidebar-content">
          <SiteManagerSidebar />
        </div>
        <div className="right-content">
          <SiteManagerNavbar name="Notifications" />

          <div className="smdash">
            <div className="smdashcontainer smnotifications">
              <table className="proc-order-requests-table">
                <thead>
                  <tr>
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
                  {orders.map((orderRequest) => (
                    <tr
                      style={handleCheckStatus(orderRequest.status)}
                      key={orderRequest._id}
                    >
                      <td>{orderRequest.itemName}</td>
                      <td>{orderRequest.quantity}</td>
                      <td>{orderRequest.supplierName}</td>
                      <td>{orderRequest.placedDate.slice(0, 10)}</td>
                      <td>
                        {orderRequest.deliveryDate
                          ? orderRequest.deliveryDate.slice(0, 10)
                          : "None"}
                      </td>
                      <td>{orderRequest.funding}</td>
                      <td>{orderRequest.status}</td>
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
