import { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Alert,
    Modal
} from 'react-bootstrap';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { ClockLoader } from 'react-spinners';

import Swal from "sweetalert2";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import "../../styles/sudul/common.css";
import "../../styles/randula/supplier.css"

import SupplierSidebar from "../../components/supplier/Sidebar";
import SupplierNavbar from "../../components/supplier/Navbar";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import CatImage from '../../assets/images/cat.png'
import ItemImage from '../../assets/images/items.webp'

import CatelougeService from '../../services/Catalogue.Service';
import ItemService from '../../services/Item.Service';
import SupplierService from '../../services/Supplier.Service';

export default function SupplierDashboard() {
    sessionStorage.setItem("sidebarStatus", "supplier-dashboard");

    const [catelouges, setCatelouges] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showAddCatelouge, setShowAddCatelouge] = useState(false);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showEditCatelouge, setShowEditCatelouge] = useState(false);
    const [showEditItem, setShowEditItem] = useState(false);

    const handleCloseAddCatelouge = () => setShowAddCatelouge(false);
    const handleShowAddCatelouge = () => setShowAddCatelouge(true);
    const handleCloseAddItem = () => setShowAddItem(false);
    const handleShowAddItem = () => setShowAddItem(true);
    const handleCloseEditCatelouge = () => setShowEditCatelouge(false);
    const handleShowEditCatelouge = () => setShowEditCatelouge(true);
    const handleCloseEditItem = () => setShowEditItem(false);
    const handleShowEditItem = () => setShowEditItem(true);

    useEffect(() => {
        CatelougeService.getCatalogueSupplier(localStorage.getItem("id")).then((res) => {
            setCatelouges(res.data);
        });
        ItemService.getItemSupplier(localStorage.getItem("id")).then((res) => {
            setItems(res.data);
        });

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const initialValuesAddCatelouge = {
        name: "",
        description: "",
    };

    const validationSchemaAddCatelouge = Yup.object().shape({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    });

    const initialValuesAddItem = {
        name: "",
        catelougeID: "",
        quantity: null,
        pricePerUnit: null,
        unit: ""
    };

    const validationSchemaAddItem = Yup.object().shape({
        name: Yup.string().required("Required"),
        catelougeID: Yup.string().required("Required"),
        quantity: Yup.number().required("Required"),
        pricePerUnit: Yup.number().required("Required"),
        unit: Yup.string().required("Required")
    });


    async function addCatelouge(values) {
        const data = {
            name: values.name,
            description: values.description,
            supplierID: localStorage.getItem("id"),
        };
        await CatelougeService.createCatalogue(data).then((res) => {
            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Catelouge Added Successfully",
                }).then(() => {
                    handleCloseAddCatelouge();
                    CatelougeService.getCatalogueSupplier(localStorage.getItem("id")).then((res) => {
                        setCatelouges(res.data);
                    });
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
            }
        });
    }

    async function addItem(values) {

        const supplier = await SupplierService.getSupplier(localStorage.getItem("id"));
        console.log(supplier.data);


        const data = {
            name: values.name,
            catelougeID: values.catelougeID,
            supplierID: localStorage.getItem("id"),
            supplierShopName: supplier.data.shopName,
            quantity: values.quantity,
            pricePerUnit: values.pricePerUnit,
            unit: values.unit,
        };
        await ItemService.createItem(data).then((res) => {
            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Item Added Successfully",
                }).then(() => {
                    handleCloseAddItem();
                    ItemService.getItemSupplier(localStorage.getItem("id")).then((res) => {
                        setItems(res.data);
                    });
                });
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                });
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
                    <SupplierNavbar name="Home" />
                    <div className="supDash">
                        <div className="supDashContainer">
                            <Container style={{ marginTop: "10px" }}>
                                <Row>
                                    <Col>
                                        <Alert key='primary' variant='primary'>
                                            <Alert.Heading>Catelouges</Alert.Heading>
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
                                                {loading ? (
                                                    <div className="sweet-loading">
                                                        <ClockLoader color="#36D7B7" size={150} />
                                                    </div>
                                                ) : catelouges.length > 0 ? (
                                                    catelouges.map((catelouge) => (
                                                        <SwiperSlide key={catelouge.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Img loading="lazy" variant="top" src={CatImage} style={{ width: '10rem', marginLeft: "123px" }} />
                                                                <Card.Body>
                                                                    <Card.Title>{catelouge.name}</Card.Title>
                                                                    <Card.Text>
                                                                        {catelouge.description}
                                                                    </Card.Text>
                                                                    <Button variant="success">Edit</Button>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Button variant="danger">Delete</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </SwiperSlide>
                                                    ))
                                                ) : (
                                                    <div className="sweet-loading">
                                                        <h3>No Catelouges</h3>
                                                    </div>
                                                )}

                                            </Swiper>
                                        </div>

                                        <br />
                                        <Button variant="primary" onClick={handleShowAddCatelouge}>Add New Catelouge</Button>
                                    </Col>
                                    <Col>
                                        <Alert key='primary' variant='primary'>
                                            <Alert.Heading>Items</Alert.Heading>
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
                                                {loading ? (
                                                    <div className="sweet-loading">
                                                        <ClockLoader color="#36D7B7" size={150} />
                                                    </div>
                                                ) : items.length > 0 ? (
                                                    items.map((item) => (
                                                        <SwiperSlide key={item.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Img loading="lazy" variant="top" src={ItemImage} style={{ width: '10rem', marginLeft: "123px" }} />
                                                                <Card.Body>
                                                                    <Card.Title>{item.name}</Card.Title>
                                                                    <Card.Text>
                                                                        {item.description}
                                                                    </Card.Text>
                                                                    <Button variant="success">Edit</Button>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Button variant="danger">Delete</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </SwiperSlide>
                                                    ))
                                                ) : (
                                                    <div className="sweet-loading">
                                                        <h3>No Items</h3>
                                                    </div>
                                                )}
                                            </Swiper>
                                        </div>

                                        <br />
                                        <Button variant="primary" onClick={handleShowAddItem}>Add New Item</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>

            {/* cat add modal */}
            <Modal show={showAddCatelouge} onHide={handleCloseAddCatelouge}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Catelouge</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValuesAddCatelouge}
                        validationSchema={validationSchemaAddCatelouge}
                        onSubmit={(values) => {
                            addCatelouge(values);
                        }}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="description">Description</label>
                                    <Field
                                        name="description"
                                        className={`form-control ${touched.description && errors.description ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.description}
                                    </div>
                                </div>

                                {/* submit button */}
                                <br />
                                <Button variant="primary" type="submit">
                                    Add Catelouge
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body><Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddCatelouge}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* item add modal */}
            <Modal show={showAddItem} onHide={handleCloseAddItem}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Item</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValuesAddItem}
                        onSubmit={(values) => {
                            addItem(values);
                        }}
                        validationSchema={validationSchemaAddItem}
                    >
                        {({ errors, touched }) => (
                            <Form>
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <Field
                                        name="name"
                                        className={`form-control ${touched.name && errors.name ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">{errors.name}</div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="catelougeID">Catelouge</label>
                                    {/* get catelouge by dropdown */}
                                    <Field
                                        as="select"
                                        name="catelougeID"
                                        className={`form-control ${touched.catelougeID && errors.catelougeID ? "is-invalid" : ""
                                            }`}
                                    >
                                        <option value="">Select Catelouge</option>
                                        {catelouges.map((catelouge) => (
                                            <option key={catelouge.id} value={catelouge.id}>
                                                {catelouge.name}
                                            </option>
                                        ))}
                                    </Field>

                                </div>

                                <div className="form-group">
                                    <label htmlFor="quantity">Quantity</label>
                                    <Field
                                        name="quantity"
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                        className={`form-control ${touched.quantity && errors.quantity ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.quantity}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="pricePerUnit">Price Per Unit</label>
                                    <Field
                                        onInput={(e) => {
                                            e.target.value = e.target.value.replace(/[^0-9]/g, "");
                                        }}
                                        name="pricePerUnit"
                                        className={`form-control ${touched.pricePerUnit && errors.pricePerUnit ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.pricePerUnit}
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="unit">Unit</label>
                                    <Field
                                        name="unit"
                                        className={`form-control ${touched.unit && errors.unit ? "is-invalid" : ""
                                            }`}
                                    />
                                    <div className="invalid-feedback">
                                        {errors.unit}
                                    </div>
                                </div>

                                {/* submit button */}
                                <br />
                                <Button variant="primary" type="submit">
                                    Add Item
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Modal.Body><Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddItem}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}
