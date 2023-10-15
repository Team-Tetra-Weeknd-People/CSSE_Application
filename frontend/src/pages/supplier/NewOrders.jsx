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

import OrderService from '../../services/Order.Service';

export default function SupplierNewOrders() {
    sessionStorage.setItem("sidebarStatus", "supplier-new-orders");
    const [approvalOrders, setApprovalOrders] = useState([]);
    const [approvedOrders, setApprovedOrders] = useState([]);
    const [confirmedOrders, setConfirmedOrders] = useState([]);
    const [rejectedOrders, setRejectedOrders] = useState([]);

    const [approvalOrder, setApprovalOrder] = useState({});
    const [approvedOrder, setApprovedOrder] = useState({});
    const [confirmedOrder, setConfirmedOrder] = useState({});

    const [showApprovalOrderModal, setShowApprovalOrderModal] = useState(false);
    const [showApprovedOrderModal, setShowApprovedOrderModal] = useState(false);
    const [showConfirmedOrderModal, setShowConfirmedOrderModal] = useState(false);

    const handleshowApprovalOrderModal = () => setShowApprovalOrderModal(true);
    const handleCloseApprovalOrderModal = () => setShowApprovalOrderModal(false);
    const handleShowApprovedOrderModal = () => setShowApprovedOrderModal(true);
    const handleCloseApprovedOrderModal = () => setShowApprovedOrderModal(false);
    const handleShowConfirmedOrderModal = () => setShowConfirmedOrderModal(true);
    const handleCloseConfirmedOrderModal = () => setShowConfirmedOrderModal(false);

    function handleApprovalOrder(order) {
        setApprovalOrder(order);
        handleshowApprovalOrderModal();
    }

    function handleApprovedOrder(order) {
        setApprovedOrder(order);
        handleShowApprovedOrderModal();
    }

    function handleConfirmedOrder(order) {
        setConfirmedOrder(order);
        handleShowConfirmedOrderModal();
    }


    useEffect(() => {
        OrderService.getOrderStatusSupplier("Approval%20Requested", localStorage.getItem("id"))
            .then(response => {
                setApprovalOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        OrderService.getOrderStatusSupplier("Approved", localStorage.getItem("id"))
            .then(response => {
                setApprovedOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        OrderService.getOrderStatusSupplier("Confirmed", localStorage.getItem("id"))
            .then(response => {
                setConfirmedOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });

        OrderService.getOrderStatusSupplier("Rejected", localStorage.getItem("id"))
            .then(response => {
                setRejectedOrders(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, []);

    // approve order
    async function approveOrder(id) {
        const data = {
            status: "Approved"
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, approve it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        })
            .then((result) => {
                if (result.value) {
                    OrderService.updateOrder(id, data)
                        .then(response => {
                            Swal.fire({
                                icon: "success",
                                title: "Order Approved",
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
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Order is not approved.", "error");
                }
            });
    }

    // confirm order
    async function confirmOrder(id) {
        const data = {
            status: "Confirmed"
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, confirm it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        })
            .then((result) => {
                if (result.value) {
                    OrderService.updateOrder(id, data)
                        .then(response => {
                            Swal.fire({
                                icon: "success",
                                title: "Order Confirmed",
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
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Order is not confirmed.", "error");
                }
            });
    }

    // reject order
    async function rejectOrder(id) {
        const data = {
            status: "Rejected"
        };

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, reject it!",
            cancelButtonText: "No, cancel!",
            reverseButtons: true
        })
            .then((result) => {
                if (result.value) {
                    OrderService.updateOrder(id, data)
                        .then(response => {
                            Swal.fire({
                                icon: "success",
                                title: "Order Rejected",
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
                } else if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire("Cancelled", "Order is not rejected.", "error");
                }
            });
    }

    return (
        <>
            <div className="whole-content">
                <div className="sidebar-content">
                    <SupplierSidebar />
                </div>
                <div className="right-content">
                    <SupplierNavbar name="Orders" />
                    <div className="supDash">
                        <div className="supDashContainer newOrderCont">
                            <Container>
                                <Row>
                                    <Alert variant='warning'>
                                        <b>Orders with Approval Request</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {approvalOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>
                                                        <Button variant="outline-primary" size='sm'
                                                            onClick={() => {
                                                                handleApprovalOrder(order);
                                                            }}>View</Button>{' '}
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </Table>

                                </Row>

                                <Row>
                                    <Alert variant='success'>
                                        <b>Approved Orders</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {approvedOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>
                                                    <td>
                                                        <Button variant="outline-primary" size='sm'
                                                            onClick={() => {
                                                                handleApprovedOrder(order);
                                                            }}>View</Button>{' '}
                                                    </td>
                                                </tr>
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                </Row>

                                <Row>
                                    <Alert variant='info'>
                                        <b>Confiemed Orders</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
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
                                            ))
                                            }
                                        </tbody>
                                    </Table>
                                </Row>

                                <Row>
                                    <Alert variant='danger'>
                                        <b>Rejected Orders</b>
                                    </Alert>

                                    <Table striped bordered hover size="sm">
                                        <thead>
                                            <tr>
                                                <th>Placed Date</th>
                                                <th>Site Name</th>
                                                <th>Item Name</th>
                                                <th>Quantity</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {rejectedOrders.map((order, index) => (
                                                <tr key={index}>
                                                    <td>{order.placedDate.slice(0, 10)}</td>
                                                    <td>{order.siteName}</td>
                                                    <td>{order.itemName}</td>
                                                    <td>{order.quantity}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showApprovalOrderModal}
                onHide={handleCloseApprovalOrderModal}
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
                                        <Card.Text>Site - {approvalOrder.siteName}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{approvalOrder.siteAddress}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{approvalOrder.siteContact}</Card.Subtitle>
                                        <Card.Text>Site Manager - {approvalOrder.siteManagerfName} {approvalOrder.siteManagerlName}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{approvalOrder.siteManagerContact}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem', minHeight: '14rem' }}>
                                    <Card.Body>
                                        <Card.Title>Item Details</Card.Title>
                                        <Card.Text>
                                            <Card.Text>Supplier - {approvalOrder.supplierName}</Card.Text>
                                            <Card.Subtitle className="mb-2 text-muted">{approvalOrder.itemName}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{approvalOrder.itemDescription}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{approvalOrder.quantity}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{approvalOrder.funding}</Card.Subtitle>
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
                                        approveOrder(approvalOrder._id);
                                    }}>Approve Order</Button>{' '}
                                </Col>
                                <Col sm={3}>
                                    <Button variant="primary" onClick={() => {
                                        confirmOrder(approvalOrder._id);
                                    }}>Confirm Order</Button>{' '}
                                </Col>
                                <Col sm={3}>
                                    <Button variant="danger" onClick={() => {
                                        rejectOrder(approvalOrder._id);
                                    }}>Reject Order</Button>{' '}
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseApprovalOrderModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showApprovedOrderModal}
                onHide={handleCloseApprovedOrderModal}
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
                                        <Card.Text>Site - {approvedOrder.siteName}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{approvedOrder.siteAddress}</Card.Subtitle>
                                        <Card.Subtitle className="mb-2 text-muted">{approvedOrder.siteContact}</Card.Subtitle>
                                        <Card.Text>Site Manager - {approvedOrder.siteManagerfName} {approvedOrder.siteManagerlName}</Card.Text>
                                        <Card.Subtitle className="mb-2 text-muted">{approvedOrder.siteManagerContact}</Card.Subtitle>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col>
                                <Card style={{ width: '18rem', minHeight: '14rem' }}>
                                    <Card.Body>
                                        <Card.Title>Item Details</Card.Title>
                                        <Card.Text>
                                            <Card.Text>Supplier - {approvedOrder.supplierName}</Card.Text>
                                            <Card.Subtitle className="mb-2 text-muted">{approvedOrder.itemName}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{approvedOrder.itemDescription}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{approvedOrder.quantity}</Card.Subtitle>
                                            <Card.Subtitle className="mb-2 text-muted">{approvedOrder.funding}</Card.Subtitle>
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
                                <Col sm={3}></Col>
                                <Col sm={3}>
                                    <Button variant="primary" onClick={() => {
                                        confirmOrder(approvedOrder._id);
                                    }}>Confirm Order</Button>{' '}
                                </Col>
                                <Col sm={3}>
                                    <Button variant="danger" onClick={() => {
                                        rejectOrder(approvedOrder._id);
                                    }}>Reject Order</Button>{' '}
                                </Col>
                            </Row>
                        </div>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseApprovedOrderModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showConfirmedOrderModal}
                onHide={handleCloseConfirmedOrderModal}
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
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseConfirmedOrderModal}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
