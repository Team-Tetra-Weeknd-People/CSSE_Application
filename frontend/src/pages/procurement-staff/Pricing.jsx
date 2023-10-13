import "../../styles/sudul/common.css";
import "../../styles/sudul/pricing.css";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import { useParams } from "react-router-dom";
import OrderService from "../../services/Order.Service";
import { useEffect, useState } from "react";

export default function ProcurementPricing() {
  const { id } = useParams();
  sessionStorage.setItem("sidebarStatus", "procurement-pricing");

  const [orderRequest, setOrderRequest] = useState({});
  const [unitPrice, setUnitPrice] = useState(0);
  const [subTotal, setSubTotal] = useState(0);

  useEffect(() => {
    try {
      OrderService.getOneOrder(id).then((res) => {
        setOrderRequest(res.data);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleUnitPriceChange = (e) => {
    const price = parseFloat(e.target.value);

    if (!isNaN(price)) {
      setUnitPrice(price);
      setSubTotal(price * orderRequest.quantity);
    }
  };

  return (
    <>
      <div className="whole-content">
        <div className="sidebar-content">
          <ProcurementSidebar />
        </div>
        <div className="right-content">
          <div className="proc-pricing">
            <div className="proc-pricing-header">
              <h2>Order Request: {orderRequest._id}</h2>
              <h3>Supplier: {orderRequest.supplierName}</h3>
            </div>
            <div className="proc-pricing-container">
              <h4>Order Details</h4>
              <table className="pricing-order-details-table">
                <thead>
                  <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price per Unit (Rs.)</th>
                    <th>Placed Date</th>
                    <th>Expected Delivery</th>
                    <th>Funding Account</th>
                    <th>Sub Total (Rs.)</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{orderRequest.itemName}</td>
                    <td>{orderRequest.quantity}</td>
                    <td>
                      <input
                        placeholder="Rs. "
                        type="number"
                        value={unitPrice}
                        onChange={handleUnitPriceChange}
                      />
                    </td>
                    <td>
                      {orderRequest.placedDate
                        ? orderRequest.placedDate.split("T")[0]
                        : ""}
                    </td>
                    <td>
                      {orderRequest.deliveryDate
                        ? orderRequest.deliveryDate.split("T")[0]
                        : "None"}
                    </td>
                    <td>{orderRequest.funding}</td>
                    <td>{subTotal}</td>
                    <td>{orderRequest.status}</td>
                  </tr>
                </tbody>
              </table>
              <div className="total-and-buttons">
                <h4>Total: Rs.{subTotal}</h4>
                <div className="pricing-buttons">
                  {subTotal > 100000 ? (
                    <>
                      <button className="btn btn-primary">
                        Save & Request Approval
                      </button>
                      <button className="btn btn-danger btn-block">
                        Reject & Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary">
                        Save & Approve
                      </button>
                      <button className="btn btn-primary">
                        Save & Request Approval
                      </button>
                      <button className="btn btn-danger btn-block">
                        Reject
                      </button>
                      <button className="btn btn-danger btn-block">
                        Reject & Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
