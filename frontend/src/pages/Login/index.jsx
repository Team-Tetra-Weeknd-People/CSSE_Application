import { useState } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Modal,
    Spinner
} from 'react-bootstrap';

import jwtDecode from 'jwt-decode';

import { Tooltip } from "react-tooltip";

import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import '../../styles/randula/home.css'

import Admin from '../../assets/images/admin.jpg';
import Manager from '../../assets/images/manager.jpg';
import Site from '../../assets/images/site.jpg';
import Staff from '../../assets/images/staff.jpg';
import Supplier from '../../assets/images/supplier.jpg';

import AdminService from '../../services/Admin.Service';
import ProcurementStaffService from '../../services/ProcurementStaff.Service';
import SupplierService from '../../services/Supplier.Service';
import ManagerService from '../../services/Manager.Service';
import SiteManagerService from '../../services/SiteManager.Service';

export default function Login() {

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

    const [isSubmitted, setIsSubmitted] = useState(false);

    const loginSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const initialValues = {
        email: "randula98@gmail.com",
        password: "11111111",
    };

    // Admin Login
    async function adminLogin(values) {
        try {
            const response = await AdminService.login(values);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "Welcome Admin",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    const token = localStorage.getItem("token");
                    const decodedToken = jwtDecode(token);
                    localStorage.setItem("id", decodedToken.id);
                    window.location.href = "/admin-dashboard";
                })

            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid Credentials",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
            });
        }
        setIsSubmitted(false);
    }

    // Procurement Staff Login
    async function procurementStaffLogin(values) {
        try {
            const response = await ProcurementStaffService.login(values);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "Welcome Procurement Staff",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    const token = localStorage.getItem("token");
                    const decodedToken = jwtDecode(token);
                    localStorage.setItem("id", decodedToken.id);
                    window.location.href = "/procurement-dashboard";
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid Credentials",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
            });
        }
        setIsSubmitted(false);
    }

    // Supplier Login
    async function supplierLogin(values) {
        try {
            const response = await SupplierService.login(values);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "Welcome Supplier",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    const token = localStorage.getItem("token");
                    const decodedToken = jwtDecode(token);
                    localStorage.setItem("id", decodedToken.id);
                    window.location.href = "/supplier-dashboard";
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid Credentials",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
            });
        }
        setIsSubmitted(false);
    }

    // Manager Login
    async function managerLogin(values) {
        try {
            const response = await ManagerService.login(values);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "Welcome Manager",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    const token = localStorage.getItem("token");
                    const decodedToken = jwtDecode(token);
                    localStorage.setItem("id", decodedToken.id);
                    window.location.href = "/manager-dashboard";
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid Credentials",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
            });
        }
        setIsSubmitted(false);
    }

    // Site Manager Login
    async function siteManagerLogin(values) {
        try {
            const response = await SiteManagerService.login(values);
            console.log(response);
            if (response.status === 200) {
                Swal.fire({
                    icon: "success",
                    title: "Login Success",
                    text: "Welcome Site Manager",
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                }).then(() => {
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("user", JSON.stringify(response.data.user));
                    const token = localStorage.getItem("token");
                    const decodedToken = jwtDecode(token);
                    localStorage.setItem("id", decodedToken.id);
                    window.location.href = "/site-manager-dashboard";
                })
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                icon: "error",
                title: "Login Failed",
                text: "Invalid Credentials",
                showConfirmButton: false,
                timerProgressBar: true,
                timer: 2000,
            });
        }
        setIsSubmitted(false);
    }

    function card(user, desctipion, image, button) {
        return (
            <>
                <Card style={{ width: '15rem' }} data-tooltip-id={user}>
                    <Card.Img loading="lazy" variant="top" src={image} style={{ width: '10rem', marginLeft: "40px" }} />
                    <Card.Body>
                        <Card.Title>{user}</Card.Title>
                        <Button variant="primary" onClick={button}>Login</Button>
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
                                {card("Procurement Staff", procurementText, Manager, handleShowProcurement)}
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

            {/* admin */}
            <Modal show={showAdmin} onHide={handleCloseAdmin}>
                <Modal.Header closeButton>
                    <Modal.Title>Admin</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Admins can manage the system and add new users. </p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            adminLogin(values);
                            console.log(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                        id="email"
                                        name="email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                        id="password"
                                        name="password"
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <br />
                                {/* submit button */}
                                {isSubmitted ? (
                                    <Button variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Processing...
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                )}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAdmin}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

            {/* procurement */}
            < Modal show={showProcurement} onHide={handleCloseProcurement} >
                <Modal.Header closeButton>
                    <Modal.Title>Procurement Staff</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Procurement staff can manage the procurement process. </p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            console.log(values);
                            procurementStaffLogin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                        id="email"
                                        name="email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                        id="password"
                                        name="password"
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <br />
                                {/* submit button */}
                                {isSubmitted ? (
                                    <Button variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Processing...
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                )}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseProcurement}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

            {/* supplier */}
            < Modal show={showSupplier} onHide={handleCloseSupplier} >
                <Modal.Header closeButton>
                    <Modal.Title>Supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Suppliers can manage the catalogues and view orders.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            console.log(values);
                            supplierLogin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                        id="email"
                                        name="email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                        id="password"
                                        name="password"
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <br />
                                {/* submit button */}
                                {isSubmitted ? (
                                    <Button variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Processing...
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                )}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSupplier}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

            {/* manager */}
            < Modal show={showManager} onHide={handleCloseManager} >
                <Modal.Header closeButton>
                    <Modal.Title>Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Manage the orders and view the order requests.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            console.log(values);
                            managerLogin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                        id="email"
                                        name="email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                        id="password"
                                        name="password"
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <br />
                                {/* submit button */}
                                {isSubmitted ? (
                                    <Button variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Processing...
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                )}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseManager}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >

            {/* site manager */}
            < Modal show={showSiteManager} onHide={handleCloseSiteManager} >
                <Modal.Header closeButton>
                    <Modal.Title>Site Manager</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Site managers can manage the order requests.</p>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={loginSchema}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            console.log(values);
                            siteManagerLogin(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <Field
                                        type="email"
                                        className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
                                            }`}
                                        id="email"
                                        name="email"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        We'll never share your email with anyone else.
                                    </small>
                                    {touched.email && errors.email ? (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    ) : null}
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <Field
                                        type="password"
                                        className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
                                            }`}
                                        id="password"
                                        name="password"
                                    />
                                    {touched.password && errors.password ? (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    ) : null}
                                </div>
                                <br />
                                {/* submit button */}
                                {isSubmitted ? (
                                    <Button variant="primary" disabled>
                                        <Spinner
                                            as="span"
                                            animation="grow"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        &nbsp; Processing...
                                    </Button>
                                ) : (
                                    <Button variant="primary" type="submit">
                                        Login
                                    </Button>
                                )}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseSiteManager}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal >
        </>
    )
}
