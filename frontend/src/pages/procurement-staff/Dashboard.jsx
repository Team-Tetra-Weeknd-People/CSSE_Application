import React, { useEffect, useState } from "react";
import "../../styles/sudul/common.css";
import "../../styles/sudul/dashboard.css";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import { PieChart, Pie, Tooltip, Cell } from "recharts";
import OrderService from "../../services/Order.Service";
import ProcurementStaff from "../../services/ProcurementStaff.Service";

export default function ProcurementDashboard() {
  sessionStorage.setItem("sidebarStatus", "procurement-dashboard");
  const [orderStatusData, setOrderStatusData] = useState([]);
  const [procurementStaff, setProcurementStaff] = useState({});

  useEffect(() => {
    ProcurementStaff.getOneProcurementStaff(localStorage.getItem("id"))
      .then((res) => {
        setProcurementStaff(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Fetch orders from your API using OrderService
    OrderService.getAllOrder()
      .then((res) => {
        // Group orders by status
        const orders = res.data;
        const statusCounts = {};

        orders.forEach((order) => {
          const status = order.status;
          if (statusCounts[status]) {
            statusCounts[status]++;
          } else {
            statusCounts[status] = 1;
          }
        });

        // Define colors for different statuses
        const statusColors = {
          "To Be Priced": "#ff444499",
          Priced: "#d861258f",
          "Approval Requested": "#ffc41499",
          Approved: "#51eb4999",
          Rejected: "#ff0000",
          Confirmed: "#00bcd499",
          Delivered: "#0d47a1",
          "Sent To Delivery": "#77777788",
          Received: "#00ff00",
          Completed: "#ce91ff99",
        };

        // Create data for the pie chart
        const data = Object.keys(statusCounts).map((status) => ({
          name: status,
          value: statusCounts[status],
          color: statusColors[status] || "#ce91ff99",
        }));

        setOrderStatusData(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="whole-content">
      <div className="sidebar-content">
        <ProcurementSidebar />
      </div>
      <div className="right-content">
        <div className="proc-dashboard">
          <h2>Procurement Dashboard</h2>
          <div className="proc-order-det">
            <div className="proc-pie-chart">
              <h3>Order Status</h3>
              <PieChart width={500} height={500}>
                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={200}
                  fill="#8884d8"
                  label
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </div>
            <div className="proc-status-det">
              <h3>Order Status Legend</h3>
              <StatusTable />
            </div>
          </div>
          <div className="proc-profile-det">
            <h3>Profile Details</h3>
            <table className="profile-details-table">
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
                  <td>{procurementStaff.fname}</td>
                  <td>{procurementStaff.lname}</td>
                  <td>{procurementStaff.contactNo}</td>
                  <td>{procurementStaff.email}</td>
                  <td>{procurementStaff.createdOn ? procurementStaff.createdOn.toString().split("T")[0] : ''}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
const statusColors = {
  "To Be Priced": "#ff444499",
  Priced: "#d861258f",
  "Approval Requested": "#ffc41499",
  Approved: "#51eb4999",
  Rejected: "#ff0000",
  Confirmed: "#00bcd499",
  Delivered: "#0d47a1",
  "Sent To Delivery": "#77777788",
  Received: "#00ff00",
  Completed: "#ce91ff99",
};

const StatusTable = () => {
  return (
    <table>
      <thead>
        <tr>
          <th>Status Name</th>
          <th>Color</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(statusColors).map(([status, color]) => (
          <tr key={status}>
            <td>{status}</td>
            <td style={{ backgroundColor: color }}></td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
