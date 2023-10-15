import "../../styles/sudul/common.css";
import "../../styles/sudul/pricing.css";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import { useParams } from "react-router-dom";
import OrderService from "../../services/Order.Service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
        setSubTotal(res.data.subTotal);
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

  const handleActionClick = (statChange, actionMessage) => {
    Swal.fire({
      title: "Confirmation",
      text: `Are you sure you want to ${actionMessage}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the action
        if (
          quantity > 0 &&
          unitPrice > 0 &&
          itemName !== "" &&
          funding !== "" &&
          (orderRequest.status === "To Be Priced" || orderRequest.status === "Priced")
        ) {
          const newOrder = {
            itemName: itemName,
            quantity: quantity,
            unitPrice: unitPrice,
            funding: funding,
            subTotal: subTotal,
            status: statChange,
          };
          OrderService.updateOrder(id, newOrder)
            .then((res) => {
              if (statChange === "Priced") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Priced Successfully!",
                });
              } else if (statChange === "Approved") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Approved!",
                });
              } else if (statChange === "Approval Requested") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Approval Requested!",
                });
              } else if (statChange === "Rejected") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Rejected!",
                });
              }
            })
            .catch((err) => {
              console.error(err);
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Something went wrong!",
              });
            });
        }else{
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Please fill all the fields!",
          });
        }
      }
    });
  };

const deleteRequest = () => {
  Swal.fire({
    title: "Delete Confirmation",
    text: "Are you sure you want to delete this order?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "No, cancel",
    confirmButtonColor: "#d33", 
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed the deletion
      OrderService.deleteOrder(id)
        .then((res) => {
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Order Deleted!",
          });
          window.location = "/procurement-order-requests";
        })
        .catch((err) => {
          console.error(err);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Something went wrong!",
          });
        });
    }
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
                        placeholder="Price per Unit (Rs.)"
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
                      {(orderRequest.status === "To Be Priced" ||
                        orderRequest.status === "Priced") && (
                        <>
                          <button
                            className="btn btn-primary btn-save"
                            onClick={() => handleActionClick("Priced","save the price")}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-primary btn-req"
                            onClick={() =>
                              handleActionClick("Approval Requested","save the price and request approval")
                            }
                          >
                            Request Approval
                          </button>
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() => handleActionClick("Rejected", "reject the order")}
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() => deleteRequest()}
                          >
                            Reject & Delete
                          </button>
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      {(orderRequest.status === "To Be Priced" ||
                        orderRequest.status === "Priced") && (
                        <>
                          <button
                            className="btn btn-primary btn-save"
                            onClick={() => handleActionClick("Priced","save the price")}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleActionClick("Approved","approve the order")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-primary btn-req"
                            onClick={() =>
                              handleActionClick("Approval Requested","save the price and request approval")
                            }
                          >
                            Request Approval
                          </button>
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() => handleActionClick("Rejected","reject")}
                          >
                            Reject
                          </button>
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() => deleteRequest()}
                          >
                            Reject & Delete
                          </button>
                        </>
                      )}
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
