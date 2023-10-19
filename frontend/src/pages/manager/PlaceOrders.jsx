import React, { useEffect, useState } from "react";
import "../../styles/sudul/common.css";
import "../../styles/madusha/placeorders.css";
import { useNavigate } from "react-router-dom";
import ManagerSidebar from "../../components/manager/SideBar";
import OrderService from "../../services/Order.Service";

export default function ManagerPlaceOrders() {
    sessionStorage.setItem("sidebarStatus", "manager-placeorders");
    const [orderRequests, setOrderRequests] = useState([]);
    const [filteredOrderRequests, setFilteredOrderRequests] = useState([]);
    const [searchValue, setSearchValue] = useState("");
  
    const handleCheckStatus = (status) => {
      let styles = {};
    
      switch (status) {    
        case "Approval Requested":
          styles = {
            backgroundColor: "#ffc414",
          };
          break;
          case "Approved":
            styles = {
              backgroundColor: "#51eb49",
            };
            break;
        case "Rejected":
            styles = {
                backgroundColor: "#ff4444",
                color: "white",
            };
            break;            
        default:
          styles = {
            backgroundColor: "#ce91ff",
          };
      }
    
      return styles;
    };
    useEffect(() => {
      try {
        OrderService.getAllOrder().then((res) => {
          setOrderRequests(res.data);
          setFilteredOrderRequests(res.data); // Initialize filteredOrderRequests with all order requests
        });
      } catch (error) {
        console.error(error);
      }
    }, []);
  
  
    const navigate = useNavigate();
  
    function handleRequestClick(id) {
      navigate(`/manager-placeorder/${id}`);
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
            <ManagerSidebar />
          </div>
        <div className="right-content">
        <div className="manager-content">
          <div className="manager-search-bar">
            <input
              type="text"
              className="search-bar"
              placeholder="Search Order Requests by Item"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
          <div className="manager-today-orders">
            {/* <span className="manager-today">Today</span> */}
            <h2 className="manager-today">Order Requests</h2>
            <div className="manager-today-orders-list">
              <OrderRequestsTable
                data={filteredOrderRequests}
                onRowClick={handleRequestClick}
                checkStatus={handleCheckStatus}
              />
            </div>
          </div>
          {/* <div className="manager-prev-orders">
            <span className="manager-prev">Previous Orders</span>
          </div> */}
        </div>
      </div>
      </div>
      );
    }
      function OrderRequestsTable({ data, onRowClick, checkStatus }) {

        const allowedStatus = ["Approved", "Approval Requested", "Rejected"];

        // Filter the data based on the allowedStatus array
        const filteredData = data.filter((orderRequest) =>
          allowedStatus.includes(orderRequest.status)
        );
        return (
          <table className="manager-order-requests-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Placed Date</th>
                <th>Expected Delivery</th>
                <th>Sub Total</th>
                <th>Funding Account</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((orderRequest) => (
                <tr style={checkStatus(orderRequest.status)}
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
                  <td>Rs. {orderRequest.subTotal}</td>
                  <td>{orderRequest.funding}</td>
                  <td>{orderRequest.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
}
