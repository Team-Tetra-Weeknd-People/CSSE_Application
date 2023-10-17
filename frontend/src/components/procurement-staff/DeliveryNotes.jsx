import React from "react";
import "../../styles/sudul/deliveryNotes.css";

const DeliveryNotes = ({ deliveryData }) => {
    return (
        <div className="delivery-notes-container">
            <h3>Delivery Notes</h3>
            <table className="delivery-notes-table">
                <tbody>
                <tr>
                        <td className="del-head">Delivery Note ID</td>
                        <td>{deliveryData._id}</td>
                    </tr>
                <tr>
                        <td className="del-head">Order ID</td>
                        <td>{deliveryData.orderId}</td>
                    </tr>
                    <tr>
                        <td className="del-head">Supplier ID</td>
                        <td>{deliveryData.supplierId}</td>
                    </tr>
                    <tr>
                        <td className="del-head">Item Description</td>
                        <td>{deliveryData.itemDescription}</td>
                    </tr>
                    <tr>
                        <td className="del-head">Delivery Description</td>
                        <td>{deliveryData.deliveryDescription}</td>
                    </tr>
                    <tr>
                        <td className="del-head">Delivery Note</td>
                        <td>{deliveryData.deliveryNote}</td>
                    </tr>
                    
                </tbody>
            </table>
        </div>
    );
};

export default DeliveryNotes;
