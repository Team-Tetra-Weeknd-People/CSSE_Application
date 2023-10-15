import { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Alert,
    Modal,
    Table
} from 'react-bootstrap';

// import Swiper core and required modules

import Swal from "sweetalert2";

import "../../styles/sudul/common.css";
import "../../styles/randula/supplier.css"

import SupplierSidebar from "../../components/supplier/Sidebar";
import SupplierNavbar from "../../components/supplier/Navbar";

import ItemService from '../../services/Item.Service';
import OrderService from '../../services/Order.Service';

export default function SupplierDelivery() {
    sessionStorage.setItem("sidebarStatus", "supplier-delivery");
    const [confirmedOrders, setConfirmedOrders] = useState([]);
    const [sentOrders, setSentOrders] = useState([]);
    const [deliveredOrders, setDeliveredOrders] = useState([]);
    const [completedOrders, setCompletedOrders] = useState([]);

    const [confirmedOrder, setConfirmedOrder] = useState({});
    const [sentOrder, setSentOrder] = useState({});
    const [deliveredOrder, setDeliveredOrder] = useState({});
    const [completedOrder, setCompletedOrder] = useState({});

    const [showConfirmedOrders, setShowConfirmedOrders] = useState(false);
    const [showSentOrders, setShowSentOrders] = useState(false);
    const [showDeliveredOrders, setShowDeliveredOrders] = useState(false);
    const [showCompletedOrders, setShowCompletedOrders] = useState(false);

    const handleShowConfirmedOrders = () => setShowConfirmedOrders(true);
    const handleCloseConfirmedOrders = () => setShowConfirmedOrders(false);
    const handleShowSentOrders = () => setShowSentOrders(true);
    const handleCloseSentOrders = () => setShowSentOrders(false);
    const handleShowDeliveredOrders = () => setShowDeliveredOrders(true);
    const handleCloseDeliveredOrders = () => setShowDeliveredOrders(false);
    const handleShowCompletedOrders = () => setShowCompletedOrders(true);
    const handleCloseCompletedOrders = () => setShowCompletedOrders(false);

    function handleConfirmedOrder(order) {
        setConfirmedOrder(order);
        handleShowConfirmedOrders();
    }

    function handleSentOrder(order) {
        setSentOrder(order);
        handleShowSentOrders();
    }

    function handleDeliveredOrder(order) {
        setDeliveredOrder(order);
        handleShowDeliveredOrders();
    }

    function handleCompletedOrder(order) {
        setCompletedOrder(order);
        handleShowCompletedOrders();
    }

    useEffect(() => {
        OrderService.getOrderStatusSupplier("Confirmed", localStorage.getItem("id"))
            .then(response => {
                setConfirmedOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        OrderService.getOrderStatusSupplier("Sent%20To%20Delivery", localStorage.getItem("id"))
            .then(response => {
                setSentOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        OrderService.getOrderStatusSupplier("Delivered", localStorage.getItem("id"))
            .then(response => {
                setDeliveredOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });
        OrderService.getOrderStatusSupplier("Completed", localStorage.getItem("id"))
            .then(response => {
                setCompletedOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    // order sent to delivery
    async function sendToDelivery(id) {
        const data = {
            status: "Sent To Delivery"
        }

        Swal.fire({
            title: 'Are you sure?',
            text: "You want to send this order to delivery?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',

            confirmButtonText: 'Yes, Send it!'
        }).then((result) => {
            if (result.isConfirmed) {
                OrderService.updateOrder(id, data)
                    .then(response => {
                        Swal.fire({
                            icon: "success",
                            title: "Order Sent To Delivery!",
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                        }).then(() => {
                            window.location.reload();
                        })
                    })
                    .catch(e => {
                        console.log(e);
                    });
            }
        })
    }



    return (
        <>
            <div className="whole-content">
                <div className="sidebar-content">
                    <SupplierSidebar />
                </div>
                <div className="right-content">
                    <SupplierNavbar name="Delivery" />
                    <div className="supDash">
                        <div className="supDashContainer newOrderCont">
                            <Container>
                                <Row>
                                    <Alert variant='dark'>
                                        <b>Confiremd Orders</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Delivery Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {confirmedOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.deliveryDate ? (
                                                        order.deliveryDate.slice(0, 10)
                                                    ) : (
                                                        "Not Set"
                                                    )}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>
                                                        <Button variant="outline-primary" size='sm'
                                                            onClick={() => {
                                                                handleConfirmedOrder(order);
                                                            }}>View</Button>{' '}
                                                    </td>
                                                </tr>
                                            ))}


                                        </tbody>
                                    </Table>
                                </Row>

                                <Row>
                                    <Alert variant='info'>
                                        <b>Orders Sent To Delivery</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Delivery Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sentOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.deliveryDate ? (
                                                        order.deliveryDate.slice(0, 10)
                                                    ) : (
                                                        "Not Set"
                                                    )}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>
                                                        <Button variant="outline-primary" size='sm'
                                                            onClick={() => {
                                                                handleSentOrder(order);
                                                            }}>View</Button>{' '}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Row>

                                <Row>
                                    <Alert variant='success'>
                                        <b>Delivered Orders</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Delivery Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {deliveredOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.deliveryDate ? (
                                                        order.deliveryDate.slice(0, 10)
                                                    ) : (
                                                        "Not Set"
                                                    )}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>
                                                        <Button variant="outline-primary" size='sm'
                                                            onClick={() => {
                                                                handleDeliveredOrder(order);
                                                            }}>View</Button>{' '}
                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </Table>
                                </Row>

                                <Row>
                                    <Alert variant='primary'>
                                        <b>Completed Orders</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Delivery Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {completedOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.deliveryDate ? (
                                                        order.deliveryDate.slice(0, 10)
                                                    ) : (
                                                        "Not Set"
                                                    )}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                </Row>


                            </Container>
                        </div>

                    </div>
                </div>
            </div>


            {/* Modal for confirmed orders */}
            <Modal
                show={showConfirmedOrders}
                onHide={handleCloseConfirmedOrders}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Order Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <Col>
                                <Card style={{ width: '18rem', minHeight: '14rem' }}>
                                    <Card.Body>
                                        <Card.Title>Customer Details</Card.Title>
                                        <Card.Text>Site - {confirmedOrder.siteName}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.siteAddress}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.siteContact}</Card.Subtitle>
                                        <Card.Text>Site Manager - {confirmedOrder.siteManagerfName} {confirmedOrder.siteManagerlName}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.siteManagerContact}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem', minHeight: '14rem' }}>
                                    <Card.Body>
                                        <Card.Title>Item Details</Card.Title>
                                        <Card.Text>
                                            <Card.Text>Supplier - {confirmedOrder.supplierName}</Card.Text>
                                            <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.itemName}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.itemDescription}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.quantity}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{confirmedOrder.funding}</Card.Subtitle>
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    </Container>
                    <br />
                    <Container>
                        <div className="orderBtnContainer">
                            <Row>
                                <Col sm={2}></Col>
                                <Col sm={3}>
                                    <Button variant="success" onClick={() => {
                                        sendToDelivery(confirmedOrder._id);
                                    }}>Send To Delivery</Button>{' '}
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmedOrders}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
