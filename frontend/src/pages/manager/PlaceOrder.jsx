import "../../styles/sudul/common.css";
import "../../styles/madusha/placeorder.css";
import ManagerSidebar from "../../components/manager/SideBar";
import { useParams } from "react-router-dom";
import OrderService from "../../services/Order.Service";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

export default function ManagerPlaceOrder() {
  const { id } = useParams();
  sessionStorage.setItem("sidebarStatus", "manager-placeorder");

  const [orderRequest, setOrderRequest] = useState({});
  const [subTotal, setSubTotal] = useState(0);


  useEffect(() => {
    try {
      OrderService.getOneOrder(id).then((res) => {
        setOrderRequest(res.data);
        setSubTotal(res.data.subTotal);
      });
    } catch (error) {
      console.error(error);
    }
  }, [id]);

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
          (orderRequest.status === "Approval Requested")
        ) {
          const newOrder = {
            status: statChange,
          };
          OrderService.updateOrder(id, newOrder)
            .then((res) => {
                if (statChange === "Approved") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Approved!",
                });
              } else if (statChange === "Rejected") {
                Swal.fire({
                  icon: "success",
                  title: "Success",
                  text: "Order Rejected!",
                });
              }
              window.location.reload();
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
          window.location = "/manager-placeorders";
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
          <ManagerSidebar />
        </div>
        <div className="right-content">
          <div className="manager-pricing">
            <div className="manager-pricing-header">
              <h2>Order Request: {orderRequest._id}</h2>
              <h3>Supplier: {orderRequest.supplierName}</h3>
            </div>
            <div className="manager-pricing-container">
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
                      {orderRequest.itemName}
                    </td>
                    <td>
                      {orderRequest.quantity}
                    </td>
                    <td>
                      {orderRequest.unitPrice}
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
                      {orderRequest.funding}
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
                  {orderRequest.status === "Approval Requested" && (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleActionClick("Approved", "Approve the order")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => handleActionClick("Rejected", "Reject the order")}
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
                  {orderRequest.status === "Approved" && (
                    <>
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => handleActionClick("Rejected", "Reject the order")}
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
                  {orderRequest.status === "Rejected" && (
                    <>
                      <button
                        className="btn btn-danger btn-block"
                        onClick={() => deleteRequest()}
                      >
                        Delete
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
