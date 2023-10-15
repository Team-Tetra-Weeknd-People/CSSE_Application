import { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Modal,
    Spinner,
    Alert,
} from 'react-bootstrap';

import '../../styles/randula/home.css'

import { Tooltip } from "react-tooltip";

import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import Admin from '../../assets/images/admin.jpg';
import Manager from '../../assets/images/manager.jpg';
import Site from '../../assets/images/site.jpg';
import Staff from '../../assets/images/staff.jpg';
import Supplier from '../../assets/images/supplier.jpg';

import AdminService from '../../services/Admin.Service';
import ManagerService from '../../services/Manager.Service';
import SiteManagerService from '../../services/SiteManager.Service';
import ProcumentStaffService from '../../services/ProcumentStaff.Service';
import SupplierService from '../../services/Supplier.Service';

export default function AdminDashboard() {
    const adminText = "Admins can manage the system and add new users. "
    const procurementText = "Procurement staff can manage the procurement process. "
    const supplierText = "Suppliers can manage the catalogues and view orders."
    const manager = "Manage the orders and view the order requests."
    const siteManagerText = "Site managers can manage the order requests."

    const [showAdmin, setShowAdmin] = useState(false);
    const [showProcurement, setShowprocurement] = useState(false);
    const [showSupplier, setShowSupplier] = useState(false);
    const [showManager, setShowManager] = useState(false);
    const [showSiteManager, setShowSiteManager] = useState(false);

    const [showAdminAdd, setShowAdminAdd] = useState(false);
    const [showProcurementAdd, setShowProcurementAdd] = useState(false);
    const [showSupplierAdd, setShowSupplierAdd] = useState(false);
    const [showManagerAdd, setShowManagerAdd] = useState(false);
    const [showSiteManagerAdd, setShowSiteManagerAdd] = useState(false);

    const handleCloseAdmin = () => setShowAdmin(false);
    const handleShowAdmin = () => setShowAdmin(true);
    const handleCloseProcurement = () => setShowprocurement(false);
    const handleShowProcurement = () => setShowprocurement(true);
    const handleCloseSupplier = () => setShowSupplier(false);
    const handleShowSupplier = () => setShowSupplier(true);
    const handleCloseManager = () => setShowManager(false);
    const handleShowManager = () => setShowManager(true);
    const handleCloseSiteManager = () => setShowSiteManager(false);
    const handleShowSiteManager = () => setShowSiteManager(true);

    const handleCloseAdminAdd = () => {
        handleShowAdmin()
        setShowAdminAdd(false)
    };
    const handleShowAdminAdd = () => {
        handleCloseAdmin()
        setShowAdminAdd(true)
    };
    const handleCloseProcurementAdd = () => {
        handleShowProcurement()
        setShowProcurementAdd(false)
    }
    const handleShowProcurementAdd = () => {
        handleCloseProcurement()
        setShowProcurementAdd(true)
    };
    const handleCloseSupplierAdd = () => {
        handleShowSupplier()
        setShowSupplierAdd(false)
    };
    const handleShowSupplierAdd = () => {
        handleCloseSupplier()
        setShowSupplierAdd(true)
    };
    const handleCloseManagerAdd = () => {
        handleShowManager()
        setShowManagerAdd(false)
    };
    const handleShowManagerAdd = () => {
        handleCloseManager()
        setShowManagerAdd(true)
    };
    const handleCloseSiteManagerAdd = () => {
        handleShowSiteManager()
        setShowSiteManagerAdd(false)
    };
    const handleShowSiteManagerAdd = () => {
        handleCloseSiteManager()
        setShowSiteManagerAdd(true)
    };

    const [admins, setAdmins] = useState([]);
    const [managers, setManagers] = useState([]);
    const [siteManagers, setSiteManagers] = useState([]);
    const [procurementStaffs, setProcurementStaffs] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    const userSchema = Yup.object().shape({
        fname: Yup.string()
            .required("First Name is required"),
        lname: Yup.string()
            .required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        contactNo: Yup.string()
            .required("Contact Number is required")
            .matches(/^[0-9]{10}$/, "Invalid Contact Number"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const supplierSchema = Yup.object().shape({
        fname: Yup.string()
            .required("First Name is required"),
        lname: Yup.string()
            .required("Last Name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        contactNo: Yup.string()
            .required("Contact Number is required")
            .matches(/^[0-9]{10}$/, "Invalid Contact Number"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters"),
        confirmPassword: Yup.string()
            .required("Confirm Password is required")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
        shopName: Yup.string()
            .required("Shop Name is required"),
        type: Yup.string()
            .required("Shop Type is required"),
    });

    useEffect(() => {
        AdminService.getAllAdmins().then(response => {
            setAdmins(response.data);
        }).catch(e => {
            console.log(e);
        })

        ManagerService.getAllManager().then(response => {
            setManagers(response.data);
        }).catch(e => {
            console.log(e);
        })

        SiteManagerService.getAllSiteManagers().then(response => {
            setSiteManagers(response.data);
        }).catch(e => {
            console.log(e);
        })

        ProcumentStaffService.getAllProcumentStaff().then(response => {
            setProcurementStaffs(response.data);
        }).catch(e => {
            console.log(e);
        })

        SupplierService.getAllSuppliers().then(response => {
            setSuppliers(response.data);
        }).catch(e => {
            console.log(e);
        })
    }, [])

    async function addAdmin(values) {
        AdminService.register(values).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Admin Added Successfully',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            AdminService.getAllAdmins().then(response => {
                setAdmins(response.data);
            }).catch(e => {
                console.log(e);
            })
            handleCloseAdminAdd()
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
        })
    }

    async function deleteAdmin(id) {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                AdminService.deleteAdmin(id).then(response => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Admin Deleted Successfully',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    })
                    AdminService.getAllAdmins().then(response => {
                        setAdmins(response.data);
                    }).catch(e => {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Something went wrong!',
                            showConfirmButton: false,
                            timer: 1500,
                            timerProgressBar: true,
                        })
                    })
                }).catch(e => {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Delete went wrong!',
                        showConfirmButton: false,
                        timer: 1500,
                        timerProgressBar: true,
                    })
                })
            }
        })
    }

    async function addProcurementStaff(values) {
        ProcumentStaffService.register(values).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Procurement Staff Added Successfully',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            ProcumentStaffService.getAllProcumentStaff().then(response => {
                setProcurementStaffs(response.data);
            }).catch(e => {
                console.log(e);
            })
            handleCloseProcurementAdd()
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
        })
    }

    async function deleteProcurementStaff(id) {
        ProcumentStaffService.deleteProcumentStaff(id).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Procurement Staff Deleted Successfully',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
            ProcumentStaffService.getAllProcumentStaff().then(response => {
                setProcurementStaffs(response.data);
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Delete went wrong!',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
            })
        })
    }

    async function addSupplier(values) {
        SupplierService.register(values).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Supplier Added Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            SupplierService.getAllSuppliers().then(response => {
                setSuppliers(response.data);
            }).catch(e => {
                console.log(e);
            })
            handleCloseSupplierAdd()
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    async function deleteSupplier(id) {
        SupplierService.deleteSupplier(id).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Supplier Deleted Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            SupplierService.getAllSuppliers().then(response => {
                setSuppliers(response.data);
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Delete went wrong!',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    async function addManager(values) {
        ManagerService.register(values).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Manager Added Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            ManagerService.getAllManager().then(response => {
                setManagers(response.data);
            }).catch(e => {
                console.log(e);
            })
            handleCloseManagerAdd()
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    async function deleteManager(id) {
        ManagerService.deleteManager(id).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Manager Deleted Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            ManagerService.getAllManager().then(response => {
                setManagers(response.data);
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Delete went wrong!',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    async function addSiteManager(values) {
        SiteManagerService.register(values).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Site Manager Added Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            SiteManagerService.getAllSiteManagers().then(response => {
                setSiteManagers(response.data);
            }).catch(e => {
                console.log(e);
            })
            handleCloseSiteManagerAdd()
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    async function deleteSiteManager(id) {
        SiteManagerService.deleteSiteManager(id).then(response => {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Site Manager Deleted Successfully',
                showConfirmButton: false,
                timer: 1500,
            })
            SiteManagerService.getAllSiteManagers().then(response => {
                setSiteManagers(response.data);
            }).catch(e => {
                console.log(e);
            })
        }).catch(e => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Delete went wrong!',
                showConfirmButton: false,
                timer: 1500,
            })
        })
    }

    function card(user, desctipion, image, button) {
        return (
            <>
                <Card style={{ width: '15rem' }} data-tooltip-id={user}>
                    <Card.Img loading="lazy" variant="top" src={image} style={{ width: '10rem', marginLeft: "40px" }} />
                    <Card.Body>
                        <Card.Title>{user}</Card.Title>
                        <Button variant="primary" onClick={button}>View All Accounts</Button>
                    </Card.Body>
                </Card>

                <Tooltip
                    id={user}
                    place="top"
                    content={desctipion}
                />
            </>
        )
    }

    function supplierCard(supplier) {
        return (
            <>
                <Card style={{ width: '10rem' }}>
                    <Card.Body>
                        <Card.Title>{supplier.fname}</Card.Title> - <Card.Title>{supplier.lname}</Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{supplier.email}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">{supplier.contactNo}</Card.Subtitle>
                        <Card.Text>
                            Created On : {new Date(supplier.createdOn).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                        </Card.Text>
                        <Card.Subtitle className="mb-2 text-muted">Shop Name - {supplier.shopName}</Card.Subtitle>
                        <Card.Subtitle className="mb-2 text-muted">Shop Type - {supplier.type}</Card.Subtitle>
                        <Button variant="danger">Danger</Button>{' '}
                    </Card.Body>
                </Card>
            </>
        )
    }



    return (
        <>
            <div className="loginMain">
                <div className="loginContainer">
                    <Container >
                        <Row style={{ marginTop: "10px" }}>
                            <Col className="d-flex justify-content-center">
                                {card("Admin", adminText, Admin, handleShowAdmin)}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {card("Procument Staff", procurementText, Manager, handleShowProcurement)}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {card("Supplier", supplierText, Supplier, handleShowSupplier)}
                            </Col>
                        </Row>
                    </Container>
                    <Container>
                        <Row style={{ marginTop: "15px" }}>
                            <Col className="d-flex justify-content-center">
                                {card("Manager", manager, Staff, handleShowManager)}
                            </Col>
                            <Col className="d-flex justify-content-center">
                                {card("Site Manager", siteManagerText, Site, handleShowSiteManager)}
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>

            <Modal
                show={showAdmin}
                onHide={handleCloseAdmin}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Admin Accounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={9}>
                            <Alert key='secondary' variant='secondary' >
                                {adminText}
                            </Alert>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary"
                                style={{ height: "57px" }}
                                onClick={handleShowAdminAdd}>Add New Admin</Button>{' '}
                        </Col>
                    </Row>

                    <Row>
                        <div className="userList">
                            {admins.length > 0 ? (
                                admins.map((admin) => (
                                    <div className="userCard" key={admin._id}>
                                        <Card style={{ width: '13rem' }}>
                                            <Card.Body>
                                                <Card.Title>{admin.fname}</Card.Title><Card.Title>{admin.lname}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{admin.email}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">{admin.contactNo}</Card.Subtitle>
                                                <Card.Text>
                                                    Created On : {new Date(admin.createdOn).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                </Card.Text>
                                                <Button variant="danger" onClick={() => {
                                                    deleteAdmin(admin._id)
                                                }}>Delete</Button>{' '}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdmin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showProcurement}
                onHide={handleCloseProcurement}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Procurement Staff Accounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={9}>
                            <Alert key='secondary' variant='secondary' >
                                {procurementText}
                            </Alert>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary"
                                style={{ height: "57px" }}
                                onClick={handleShowProcurementAdd}>Add New Procurement Staff</Button>{' '}
                        </Col>
                    </Row>

                    <Row>
                        <div className="userList">
                            {procurementStaffs.length > 0 ? (
                                procurementStaffs.map((procurementStaff) => (
                                    <div className="userCard" key={procurementStaff._id}>
                                        <Card style={{ width: '13rem' }}>
                                            <Card.Body>
                                                <Card.Title>{procurementStaff.fname}</Card.Title><Card.Title>{procurementStaff.lname}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{procurementStaff.email}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">{procurementStaff.contactNo}</Card.Subtitle>
                                                <Card.Text>
                                                    Created On : {new Date(procurementStaff.createdOn).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                </Card.Text>
                                                <Button variant="danger" onClick={() => {
                                                    deleteProcurementStaff(procurementStaff._id)
                                                }}>Delete</Button>{' '}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProcurement}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showSupplier}
                onHide={handleCloseSupplier}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Supplier Accounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={9}>
                            <Alert key='secondary' variant='secondary' >
                                {supplierText}
                            </Alert>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary"
                                style={{ height: "57px" }}
                                onClick={handleShowSupplierAdd}>Add New Supplier</Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <div className="userList">
                            {suppliers.length > 0 ? (
                                suppliers.map((supplier) => (
                                    <div className="userCard" key={supplier._id}>
                                        <Card style={{ width: '13rem' }}>
                                            <Card.Body>
                                                <Card.Title>{supplier.fname}</Card.Title><Card.Title>{supplier.lname}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{supplier.email}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">{supplier.contactNo}</Card.Subtitle>
                                                <Card.Text>
                                                    Created On : {new Date(supplier.createdOn).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                </Card.Text>
                                                <Card.Subtitle className="mb-2 text-muted">Shop Name - {supplier.shopName}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">Shop Type - {supplier.type}</Card.Subtitle>
                                                <Button variant="danger" onClick={() => {
                                                    deleteSupplier(supplier._id)
                                                }}>Delete</Button>{' '}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSupplier}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showManager}
                onHide={handleCloseManager}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Manager Accounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={9}>
                            <Alert key='secondary' variant='secondary' >
                                {manager}
                            </Alert>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary"
                                style={{ height: "57px" }}
                                onClick={handleShowManagerAdd}>Add New Manager</Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <div className="userList">
                            {managers.length > 0 ? (
                                managers.map((manager) => (
                                    <div className="userCard" key={manager._id}>
                                        <Card style={{ width: '13rem' }}>
                                            <Card.Body>
                                                <Card.Title>{manager.fname}</Card.Title><Card.Title>{manager.lname}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{manager.email}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">{manager.contactNo}</Card.Subtitle>
                                                <Card.Text>
                                                    Created On : {new Date(manager.createdOn).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                </Card.Text>
                                                <Button variant="danger" onClick={() => {
                                                    deleteManager(manager._id)
                                                }}>Delete</Button>{' '}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseManager}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showSiteManager}
                onHide={handleCloseSiteManager}
                backdrop="static"
                keyboard={false}
                size='lg'
            >
                <Modal.Header closeButton>
                    <Modal.Title>Site Manager Accounts</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={9}>
                            <Alert key='secondary' variant='secondary' >
                                {siteManagerText}
                            </Alert>
                        </Col>
                        <Col sm={2}>
                            <Button variant="primary"
                                style={{ height: "57px" }}
                                onClick={handleShowSiteManagerAdd}>Add New Site Manager</Button>{' '}
                        </Col>
                    </Row>
                    <Row>
                        <div className="userList">
                            {siteManagers.length > 0 ? (
                                siteManagers.map((siteManager) => (
                                    <div className="userCard" key={siteManager._id}>
                                        <Card style={{ width: '13rem' }}>
                                            <Card.Body>
                                                <Card.Title>{siteManager.fname}</Card.Title><Card.Title>{siteManager.lname}</Card.Title>
                                                <Card.Subtitle className="mb-2 text-muted">{siteManager.email}</Card.Subtitle>
                                                <Card.Subtitle className="mb-2 text-muted">{siteManager.contactNo}</Card.Subtitle>
                                                <Card.Text>
                                                    Created On : {new Date(siteManager.createdOn).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                                                </Card.Text>
                                                <Button variant="danger" onClick={() => {
                                                    deleteSiteManager(siteManager._id)
                                                }}>Delete</Button>{' '}
                                            </Card.Body>
                                        </Card>
                                    </div>
                                ))
                            ) : (
                                <Spinner animation="border" variant="primary" />
                            )}
                        </div>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSiteManager}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showAdminAdd}
                onHide={handleCloseAdminAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            contactNo: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={userSchema}
                        onSubmit={(values) => {
                            addAdmin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name</label>
                                    <Field
                                        name="fname"
                                        type="text"
                                        className={`form-control ${touched.fname && errors.fname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.fname && errors.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lname">Last Name</label>
                                    <Field
                                        name="lname"
                                        type="text"
                                        className={`form-control ${touched.lname && errors.lname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.lname && errors.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactNo">Contact Number</label>
                                    <Field
                                        name="contactNo"
                                        type="text"
                                        className={`form-control ${touched.contactNo && errors.contactNo ? "is-invalid" : ""
                                            }`}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                    />
                                    {touched.contactNo && errors.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>
                                <br />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdminAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showProcurementAdd}
                onHide={handleCloseProcurementAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Procurement Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            contactNo: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={userSchema}
                        onSubmit={(values) => {
                            addProcurementStaff(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name</label>
                                    <Field
                                        name="fname"
                                        type="text"
                                        className={`form-control ${touched.fname && errors.fname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.fname && errors.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lname">Last Name</label>
                                    <Field
                                        name="lname"
                                        type="text"
                                        className={`form-control ${touched.lname && errors.lname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.lname && errors.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactNo">Contact Number</label>
                                    <Field
                                        name="contactNo"
                                        type="text"
                                        className={`form-control ${touched.contactNo && errors.contactNo ? "is-invalid" : ""
                                            }`}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                    />
                                    {touched.contactNo && errors.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}

                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <br />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProcurementAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showSupplierAdd}
                onHide={handleCloseSupplierAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            contactNo: "",
                            password: "",
                            confirmPassword: "",
                            shopName: "",
                            type: "",
                        }}
                        validationSchema={supplierSchema}
                        onSubmit={(values) => {
                            addSupplier(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name</label>
                                    <Field
                                        name="fname"
                                        type="text"
                                        className={`form-control ${touched.fname && errors.fname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.fname && errors.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lname">Last Name</label>
                                    <Field
                                        name="lname"
                                        type="text"
                                        className={`form-control ${touched.lname && errors.lname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.lname && errors.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactNo">Contact Number</label>
                                    <Field
                                        name="contactNo"
                                        type="text"
                                        className={`form-control ${touched.contactNo && errors.contactNo ? "is-invalid" : ""
                                            }`}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                    />
                                    {touched.contactNo && errors.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    )
                                        : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}

                                </div>

                                <div className="form-group">
                                    <label htmlFor="shopName">Shop Name</label>
                                    <Field
                                        name="shopName"
                                        type="text"
                                        className={`form-control ${touched.shopName && errors.shopName ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.shopName && errors.shopName ? (
                                        <div className="invalid-feedback">{errors.shopName}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="type">Shop Type</label>
                                    <Field
                                        name="type"
                                        type="text"
                                        className={`form-control ${touched.type && errors.type ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.type && errors.type ? (
                                        <div className="invalid-feedback">{errors.type}</div>
                                    ) : null}
                                </div>

                                <br />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSupplierAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showManagerAdd}
                onHide={handleCloseManagerAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            contactNo: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={userSchema}
                        onSubmit={(values) => {
                            addManager(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name</label>
                                    <Field
                                        name="fname"
                                        type="text"
                                        className={`form-control ${touched.fname && errors.fname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.fname && errors.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lname">Last Name</label>
                                    <Field
                                        name="lname"
                                        type="text"
                                        className={`form-control ${touched.lname && errors.lname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.lname && errors.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactNo">Contact Number</label>
                                    <Field
                                        name="contactNo"
                                        type="text"
                                        className={`form-control ${touched.contactNo && errors.contactNo ? "is-invalid" : ""
                                            }`}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                    />
                                    {touched.contactNo && errors.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <br />
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseManagerAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal
                show={showSiteManagerAdd}
                onHide={handleCloseSiteManagerAdd}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Site Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={{
                            fname: "",
                            lname: "",
                            email: "",
                            contactNo: "",
                            password: "",
                            confirmPassword: "",
                        }}
                        validationSchema={userSchema}
                        onSubmit={(values) => {
                            addSiteManager(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="fname">First Name</label>
                                    <Field
                                        name="fname"
                                        type="text"
                                        className={`form-control ${touched.fname && errors.fname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.fname && errors.fname ? (
                                        <div className="invalid-feedback">{errors.fname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lname">Last Name</label>
                                    <Field
                                        name="lname"
                                        type="text"
                                        className={`form-control ${touched.lname && errors.lname ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.lname && errors.lname ? (
                                        <div className="invalid-feedback">{errors.lname}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        name="email"
                                        type="text"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="contactNo">Contact Number</label>
                                    <Field
                                        name="contactNo"
                                        type="text"
                                        className={`form-control ${touched.contactNo && errors.contactNo ? "is-invalid" : ""
                                            }`}
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                    />
                                    {touched.contactNo && errors.contactNo ? (
                                        <div className="invalid-feedback">{errors.contactNo}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        name="password"
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <Field
                                        name="confirmPassword"
                                        type="password"
                                        className={`form-control ${touched.confirmPassword && errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword ? (
                                        <div className="invalid-feedback">{errors.confirmPassword}</div>
                                    ) : null}
                                </div>

                                <br />

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSiteManagerAdd}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
