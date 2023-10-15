import { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Alert,
    Modal,
    Spinner
} from 'react-bootstrap';

import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "../../styles/sudul/common.css";
import "../../styles/chanudi/dashboard.css"

import SiteManagerSidebar from "../../components/siteManager/Sidebar";
import SiteManagerNavbar from "../../components/siteManager/Navbar";

import SiteService from '../../services/Site.Service';
import OrderService from '../../services/Order.Service';
import CatalogueService from '../../services/Catalogue.Service';
import SiteManagerService from '../../services/SiteManager.Service';
import SupplierService from '../../services/Supplier.Service';

import SiteImage from '../../assets/images/site.avif'

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { ClockLoader } from 'react-spinners';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


export default function SupplierDashboard() {
    sessionStorage.setItem("sidebarStatus", "site-manager-dashboard");

    const [sites, setSites] = useState([]);
    const [orders, setOrders] = useState([]);
    const [items, setItems] = useState([]);
    const [suppliers, setSuppliers] = useState([]);
    const [catalogues, setCatalogues] = useState([]);
    const [catalogue, setCatalogue] = useState("");
    const [isCatSelected, setIsCatSelected] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [showAddOrder, setShowAddOrder] = useState(false);

    const handleCloseAddOrder = () => setShowAddOrder(false);
    const handleShowAddOrder = () => setShowAddOrder(true);

    useEffect(() => {
        SiteService.getSiteByManager(localStorage.getItem("id")).then((res) => {
            setSites(res.data);
        });
        OrderService.getOrderSiteManager(localStorage.getItem("id")).then((res) => {
            setOrders(res.data);
        });
        CatalogueService.getAllCatalogue().then((res) => {
            setCatalogues(res.data);
        });
        SupplierService.getAllSuppliers().then((res) => {
            setSuppliers(res.data);
        });
    }, []);


    const getStatusColor = (status) => {
        switch (status) {
            case 'PENDING':
                return 'gold';
            case 'PLACED':
                return 'blue';
            case 'ACCEPT':
                return 'green';
            case 'REJECT':
                return 'red';
            case 'DELIVERED':
                return 'purple';
            case 'PAID':
                return 'orange';
            case 'SEND_APPROVE':
                return 'cyan';
            case 'RECEIVED':
                return 'pink';
            default:
                return 'black';
        }
    };

    const initialValues = {
        siteManagerId: localStorage.getItem("id"),
        siteId: "",
        supplierId: "",
        itemName: "",
        itemDescription: "",
        quantity: "",
        funding: "",
    }

    const validationSchema = Yup.object().shape({
        siteId: Yup.string().required("Required"),
        supplierId: Yup.string().required("Required"),
        itemName: Yup.string()
            .required("Required")
            .min(2, 'Too Short!'),
        itemDescription: Yup.string()
            .required("Required")
            .min(2, 'Too Short!'),
        quantity: Yup.number()
            .required("Required")
            .min(1, "Quantity should be greater than 0"),
        funding: Yup.string()
            .required("Required")
            .min(2, 'Too Short!')
    });

    async function placeOrder(values) {
        console.log(values);
        const siteManager = await SiteManagerService.getSiteManager(values.siteManagerId);
        const site = await SiteService.getOneSite(values.siteId);
        const supplier = await SupplierService.getSupplier(values.supplierId);

        const data = {
            siteManagerID: values.siteManagerId,
            siteManagerfName: siteManager.data.fname,
            siteManagerlName: siteManager.data.lname,
            siteManagerContact: siteManager.data.contactNo,
            siteName: site.data.siteName,
            siteAddress: site.data.address,
            siteContact: site.data.contact,
            supplierId: values.supplierId,
            supplierName: supplier.data.shopName,
            itemName: values.itemName,
            itemDescription: values.itemDescription,
            quantity: values.quantity,
            funding: values.funding,
        };

        console.log(data);

        OrderService.createOrder(data).then((res) => {
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Order Placed Successfully!',
                footer: 'Order will be reviewd within 2/3 business days',
                showConfirmButton: false,
                timer: 2500,
                timerProgressBar: true,
            }).then(() => {
                window.location.reload();
            });
        }).catch((err) => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong!',
            }).then(() => {
                console.log(err);
            });
        });

        setIsSubmitted(false);
    }

    return (
        <>
            <div className="whole-content">
                <div className="sidebar-content">
                    <SiteManagerSidebar />
                </div>
                <div className="right-content">
                    <SiteManagerNavbar name="Site Manager Dashboard" />

                    <div className="smdash">
                        <div className="smdashcontainer">
                            <Container style={{ marginTop: "10px" }}>
                                <Row>
                                    <Col>
                                        <Alert key='primary' variant='primary'>
                                            <Alert.Heading>Sites</Alert.Heading>
                                        </Alert>
                                        <div className="swiper">
                                            <Swiper
                                                // install Swiper modules
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                navigation
                                                pagination={{ clickable: true }}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                onSlideChange={() => console.log('slide change')}
                                            >
                                                {!sites.length ? (
                                                    <div className="sweet-loading">
                                                        <ClockLoader color="#36D7B7" size={150} />
                                                    </div>
                                                ) : (
                                                    sites.map((site) => (
                                                        <SwiperSlide key={site.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Img loading="lazy" variant="top" src={SiteImage} style={{ width: '10rem', marginLeft: "123px" }} />
                                                                <Card.Body>
                                                                    <Card.Title>{site.siteName}</Card.Title>
                                                                    <Card.Text>
                                                                        {site.address}
                                                                    </Card.Text>
                                                                    <Button variant="success">Edit</Button>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Button variant="danger">Delete</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </SwiperSlide>
                                                    ))
                                                )}

                                            </Swiper>
                                        </div>
                                        <br />
                                        <Button variant="primary">Add New Site</Button>
                                    </Col>
                                    <Col>
                                        <Alert key='primary' variant='primary'>
                                            <Alert.Heading>Requesitions</Alert.Heading>
                                        </Alert>

                                        <div className="swiper">
                                            <Swiper
                                                // install Swiper modules
                                                modules={[Navigation, Pagination, Scrollbar, A11y]}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                navigation
                                                pagination={{ clickable: true }}
                                                onSwiper={(swiper) => console.log(swiper)}
                                                onSlideChange={() => console.log('slide change')}
                                            >
                                                {!orders.length ? (
                                                    <div className="sweet-loading">
                                                        <ClockLoader color="#36D7B7" size={150} />
                                                    </div>
                                                ) : (
                                                    orders.map((order) => (
                                                        <SwiperSlide key={order.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Body>
                                                                    <Card.Title>{order.siteName}</Card.Title>
                                                                    <Card.Text>
                                                                        {order.siteAddress}
                                                                    </Card.Text>

                                                                    <Card.Text>
                                                                        {order.itemName} - {order.quantity} - {order.itemUnit}/s
                                                                    </Card.Text>
                                                                    <Card.Text>
                                                                        Rs. {order.itemPrice * order.quantity}
                                                                    </Card.Text>
                                                                    <Card.Text>
                                                                        <div style={{ color: getStatusColor(order.status) }}>
                                                                            Status - {order.status}
                                                                        </div>
                                                                    </Card.Text>
                                                                    <Card.Text>
                                                                        Placed Date - {order.placedDate.slice(0, 10)}
                                                                    </Card.Text>
                                                                    <Button variant="success">Edit</Button>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Button variant="danger">Delete</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </SwiperSlide>
                                                    ))
                                                )}

                                            </Swiper>
                                        </div>
                                        <br />
                                        <Button variant="primary" onClick={handleShowAddOrder}>Place a new Order</Button>

                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

            <Modal
                show={showAddOrder}
                onHide={handleCloseAddOrder}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Place a New Order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            placeOrder(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                {/* dropdown to select site */}
                                <div className="form-group">
                                    <label htmlFor="siteId">Site</label>
                                    <Field
                                        as="select"
                                        className={`form-control ${touched.siteId && errors.siteId ? "is-invalid" : ""
                                            }`}
                                        id="siteId"
                                        name="siteId"
                                    >
                                        <option value="">Select Site</option>
                                        {sites.map((site) => (
                                            <option value={site._id} key={site.id}>{site.siteName} - {site.address}</option>
                                        ))}
                                    </Field>
                                    {touched.siteId && errors.siteId ? (
                                        <div className="invalid-feedback">{errors.siteId}</div>
                                    ) : null}

                                </div>

                                {/* dropdown to select supplier */}
                                <div className="form-group">
                                    <label htmlFor="supplierId">Supplier</label>
                                    <Field
                                        as="select"
                                        className={`form-control ${touched.supplierId && errors.supplierId ? "is-invalid" : ""
                                            }`}
                                        id="supplierId"
                                        name="supplierId"
                                    >
                                        <option value="">Select Supplier</option>
                                        {suppliers.map((supplier) => (
                                            <option value={supplier._id} key={supplier.id}>{supplier.shopName} - {supplier.type}</option>
                                        ))}
                                    </Field>
                                    {touched.supplierId && errors.supplierId ? (
                                        <div className="invalid-feedback">{errors.supplierId}</div>
                                    ) : null}
                                </div>

                                {/* itemName */}
                                <div className="form-group">
                                    <label htmlFor="itemName">Item Name</label>
                                    <Field
                                        type="text"
                                        className={`form-control ${touched.itemName && errors.itemName ? "is-invalid" : ""
                                            }`}
                                        id="itemName"
                                        name="itemName"
                                    />
                                    {touched.itemName && errors.itemName ? (
                                        <div className="invalid-feedback">{errors.itemName}</div>
                                    ) : null}
                                </div>

                                {/* itemDescription */}
                                <div className="form-group">
                                    <label htmlFor="itemDescription">Item Description</label>
                                    <Field
                                        type="text"
                                        className={`form-control ${touched.itemDescription && errors.itemDescription ? "is-invalid" : ""
                                            }`}
                                        id="itemDescription"
                                        name="itemDescription"
                                    />
                                    {touched.itemDescription && errors.itemDescription ? (
                                        <div className="invalid-feedback">{errors.itemDescription}</div>
                                    ) : null}
                                </div>

                                {/* quantity */}
                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <Field
                                        type="number"
                                        className={`form-control ${touched.quantity && errors.quantity ? "is-invalid" : ""
                                            }`}
                                        id="quantity"
                                        name="quantity"
                                    />
                                    {touched.quantity && errors.quantity ? (
                                        <div className="invalid-feedback">{errors.quantity}</div>
                                    ) : null}

                                </div>

                                {/* funding */}
                                <div className="form-group">
                                    <label htmlFor="funding">Funding</label>
                                    <Field
                                        type="text"
                                        className={`form-control ${touched.funding && errors.funding ? "is-invalid" : ""
                                            }`}
                                        id="funding"
                                        name="funding"
                                    />
                                    {touched.funding && errors.funding ? (
                                        <div className="invalid-feedback">{errors.funding}</div>
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
                                        Place Order
                                    </Button>
                                )}
                            </Form>
                        )}
                    </Formik>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddOrder}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
