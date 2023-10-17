import "../../styles/sudul/common.css";
import "../../styles/sudul/pricing.css";
import ProcurementSidebar from "../../components/procurement-staff/Sidebar";
import { useParams } from "react-router-dom";
import OrderService from "../../services/Order.Service";
import SupplierService from "../../services/Supplier.Service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DeliveryNoteService from "../../services/DeliveryNote.Service";
import DeliveryNotes from "../../components/procurement-staff/DeliveryNotes";

export default function ProcurementPricingAndDeliveryNotes() {
  const { id } = useParams();
  sessionStorage.setItem("sidebarStatus", "procurement-pricing");

  const [orderRequest, setOrderRequest] = useState({});
  const [unitPrice, setUnitPrice] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [itemName, setItemName] = useState("");
  const [funding, setFunding] = useState("");
  const [deliveryNotes, setDeliveryNotes] = useState({});
  const [supplier, setSupplier] = useState({});

  useEffect(() => {
    try {
      OrderService.getOneOrder(id).then((res) => {
        setOrderRequest(res.data);
        setUnitPrice(res.data.unitPrice);
        setQuantity(res.data.quantity);
        setItemName(res.data.itemName);
        setFunding(res.data.funding);
        setSubTotal(res.data.subTotal);
        SupplierService.getSupplier(res.data.supplierId).then((res) => {
          setSupplier(res.data);
        });
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    try {
      DeliveryNoteService.getDeliveryNoteOrder(id).then((res) => {
        setDeliveryNotes(res.data[0]);
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
          funding !== ""
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
            .then(() => {
              if (statChange === "Priced") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Priced Successfully!",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              } else if (statChange === "Approved") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Approved!",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              } else if (statChange === "Approval Requested") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Approval Requested!",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              } else if (statChange === "Rejected") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Rejected!",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              } else if (statChange === "Received") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Received!",
                  confirmButtonText: "OK",
                }).then((result) => {
                  if (result.isConfirmed) {
                    window.location.reload();
                  }
                });
              }
              else if (statChange === "Completed") {
                const emailData = {
                  email: supplier.email || "sudul.fernando@gmail.com",
                  orderId: orderRequest._id,
                  htmlBody: `<!DOCTYPE html>
                    <html lang="en">
                    <head>
                      <meta charset="UTF-8">
                      <meta name="viewport" content="width=device-width, initial-scale=1.0">
                      <title>Order Invoice</title>
                    </head>
                    <body style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4;">
                      <div style="max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                        <h2 style="text-align: center; color: #333;">Order Invoice</h2>
                        <p><strong>Order ID:</strong> ${orderRequest._id}</p>
                        <p><strong>Supplier Name:</strong> ${supplier.shopName}</p>
                        <p><strong>Item Name:</strong> ${itemName}</p>
                        <p><strong>Quantity:</strong> ${quantity}</p>
                        <p><strong>Unit Price (Rs.):</strong> ${unitPrice}</p>
                        <p><strong>Total (Rs.):</strong> ${subTotal}</p>
                        <p style="text-align: center; margin-top: 20px;">Thank you for your business!</p>
                      </div>
                    </body>
                    </html>
                    `
                };
                OrderService.emailForInvoice(emailData).then((res) => {
                  Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Order Invoiced & Completed!",
                    confirmButtonText: "OK",
                  }).then((result) => {
                    if (result.isConfirmed) {
                      window.location.reload();
                    }
                  });
                }).catch((err) => {
                  console.error(err);
                  Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Something went wrong!",
                  });
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
        } else {
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
                        disabled={orderRequest.status !== "Approved" && orderRequest.status !== "Approval Requested" && orderRequest.status !== "Rejected"
                          && orderRequest.status !== "Priced" && orderRequest.status !== "To Be Priced"}
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
                        disabled={orderRequest.status !== "Approved" && orderRequest.status !== "Approval Requested" && orderRequest.status !== "Rejected"
                          && orderRequest.status !== "Priced" && orderRequest.status !== "To Be Priced"}
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
                        disabled={orderRequest.status !== "Approved" && orderRequest.status !== "Approval Requested" && orderRequest.status !== "Rejected"
                          && orderRequest.status !== "Priced" && orderRequest.status !== "To Be Priced"}
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
                  {(orderRequest.status === "Rejected") && (
                    <>
                      <button
                        className="btn btn-primary btn-save"
                        onClick={() => handleActionClick("Priced", "save the price")}
                      >
                        Re-Price, Re-Request & Save
                      </button></>)}
                  {subTotal > 100000 ? (
                    <>
                      {(orderRequest.status === "To Be Priced") && (
                        <>
                          <button
                            className="btn btn-primary btn-save"
                            onClick={() => handleActionClick("Priced", "save the price")}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-primary btn-req"
                            onClick={() =>
                              handleActionClick("Approval Requested", "save the price and request approval")
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
                      {(orderRequest.status === "Approved" ||
                        orderRequest.status === "Approval Requested" ||
                        orderRequest.status === "Priced") && (
                          <>
                            <button
                              className="btn btn-primary btn-save"
                              onClick={() => handleActionClick("Priced", "save the price")}
                            >
                              Re-Price & Save
                            </button>
                            <button
                              className="btn btn-primary btn-req"
                              onClick={() =>
                                handleActionClick("Approval Requested", "save the price and request approval")
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
                      {(orderRequest.status === "To Be Priced") && (
                        <>
                          <button
                            className="btn btn-primary btn-save"
                            onClick={() => handleActionClick("Priced", "save the price")}
                          >
                            Save
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleActionClick("Approved", "approve the order")}
                          >
                            Approve
                          </button>
                          <button
                            className="btn btn-primary btn-req"
                            onClick={() =>
                              handleActionClick("Approval Requested", "save the price and request approval")
                            }
                          >
                            Request Approval
                          </button>
                          <button
                            className="btn btn-danger btn-block"
                            onClick={() => handleActionClick("Rejected", "reject")}
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
                      {(orderRequest.status === "Approved" ||
                        orderRequest.status === "Approval Requested" ||
                        orderRequest.status === "Priced") && (
                          <>
                            <button
                              className="btn btn-primary btn-save"
                              onClick={() => handleActionClick("Priced", "save the price")}
                            >
                              Re-Price & Save
                            </button>
                            <button
                              className="btn btn-primary"
                              onClick={() => handleActionClick("Approved", "approve the order")}
                            >
                              Approve
                            </button>
                            <button
                              className="btn btn-primary btn-req"
                              onClick={() =>
                                handleActionClick("Approval Requested", "save the price and request approval")
                              }
                            >
                              Request Approval
                            </button>
                            <button
                              className="btn btn-danger btn-block"
                              onClick={() => handleActionClick("Rejected", "reject")}
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
                <div className="delivery-notes">
                  {deliveryNotes && (<>
                    <DeliveryNotes deliveryData={deliveryNotes} /></>)}
                </div>
                <div className="pricing-buttons">
                  {(orderRequest.status === "Delivered" || orderRequest.status === "Sent To Delivery") && (
                    <button
                      className="btn btn-primary btn-save"
                      onClick={() => handleActionClick("Received", "mark the order as received")}
                    >
                      Mark as Received
                    </button>
                  )}
                  {(orderRequest.status === "Received") && (
                    <button
                      className="btn btn-primary btn-save"
                      onClick={() => handleActionClick("Completed", "mark the order as received")}
                    >
                      Invoice & Complete
                    </button>
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
