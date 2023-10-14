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
  const [unitPrice, setUnitPrice] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [itemName, setItemName] = useState("");
  const [funding, setFunding] = useState("");

  useEffect(() => {
    try {
      OrderService.getOneOrder(id).then((res) => {
        setOrderRequest(res.data);
        setUnitPrice(res.data.unitPrice);
        setQuantity(res.data.quantity);
        setItemName(res.data.itemName);
        setFunding(res.data.funding);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const handleUnitPriceChange = (e) => {
    const price = parseFloat(e.target.value);
    setUnitPrice(price);
    setSubTotal(price * quantity);
  };
  const handleQuantityChange = (e) => {
    const quantityO = parseInt(e.target.value);
    setQuantity(e.target.value);
    setSubTotal(unitPrice * quantityO);
  };

  const handleSave = () => {
    const newOrder = {
      itemName: itemName,
      quantity: quantity,
      unitPrice: unitPrice,
      funding: funding,
      subTotal: subTotal,
    };
    OrderService.updateOrder(id, newOrder).then((res) => {
      console.log(res.data);
    });
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
                    <td>
                      <input
                        placeholder="Item Name"
                        type="text"
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Quantity"
                        type="number"
                        value={quantity}
                        onChange={(e) => {
                          handleQuantityChange(e);
                        }}
                      />
                    </td>
                    <td>
                      <input
                        placeholder="Rs."
                        type="number"
                        value={unitPrice}
                        onChange={(e) => {
                          handleUnitPriceChange(e);
                        }}
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
                    <td>
                      <input
                        placeholder="Funding Account"
                        type="text"
                        value={funding}
                        onChange={(e) => setFunding(e.target.value)}
                      />
                    </td>
                    <td>{subTotal ? subTotal.toFixed(2) : (0).toFixed(2)}</td>
                    <td>{orderRequest.status}</td>
                  </tr>
                </tbody>
              </table>
              <div className="total-and-buttons">
                <div className="total-price">
                  <h4>
                    Total: Rs.{subTotal ? subTotal.toFixed(2) : (0).toFixed(2)}
                  </h4>
                </div>
                <div className="pricing-buttons">
                  {subTotal > 100000 ? (
                    <>
                      <button className="btn btn-primary btn-save" onClick={handleSave}>Save</button>
                      <button className="btn btn-primary btn-req">
                        Request Approval
                      </button>
                      <button className="btn btn-danger btn-block">
                        Reject
                      </button>
                      <button className="btn btn-danger btn-block">
                        Reject & Delete
                      </button>
                    </>
                  ) : (
                    <>
                      <button className="btn btn-primary btn-save">Save</button>
                      <button className="btn btn-primary">Approve</button>
                      <button className="btn btn-primary btn-req">
                        Request Approval
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
