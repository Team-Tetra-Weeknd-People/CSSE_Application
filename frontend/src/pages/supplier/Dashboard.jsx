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

import Catalogueservice from '../../services/Catalogue.Service';
import ItemService from '../../services/Item.Service';
import SupplierService from '../../services/Supplier.Service';

export default function SupplierDashboard() {
    sessionStorage.setItem("sidebarStatus", "supplier-dashboard");

    const [catalogues, setCatalogues] = useState([]);
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [showAddCatalogue, setShowAddCatalogue] = useState(false);
    const [showAddItem, setShowAddItem] = useState(false);
    const [showEditCatalogue, setShowEditCatalogue] = useState(false);
    const [showEditItem, setShowEditItem] = useState(false);

    const handleCloseAddCatalogue = () => setShowAddCatalogue(false);
    const handleShowAddCatalogue = () => setShowAddCatalogue(true);
    const handleCloseAddItem = () => setShowAddItem(false);
    const handleShowAddItem = () => setShowAddItem(true);
    const handleCloseEditCatalogue = () => setShowEditCatalogue(false);
    const handleShowEditCatalogue = () => setShowEditCatalogue(true);
    const handleCloseEditItem = () => setShowEditItem(false);
    const handleShowEditItem = () => setShowEditItem(true);

    useEffect(() => {
        Catalogueservice.getCatalogueSupplier(localStorage.getItem("id")).then((res) => {
            setCatalogues(res.data);
        });
        ItemService.getItemSupplier(localStorage.getItem("id")).then((res) => {
            setItems(res.data);
        });

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }, []);

    const initialValuesAddCatalogue = {
        name: "",
        description: "",
    };

    const validationSchemaAddCatalogue = Yup.object().shape({
        name: Yup.string().required("Required"),
        description: Yup.string().required("Required"),
    });

    const initialValuesAddItem = {
        name: "",
        catalogueID: "",
        quantity: null,
        pricePerUnit: null,
        unit: ""
    };

    const validationSchemaAddItem = Yup.object().shape({
        name: Yup.string().required("Required"),
        catalogueID: Yup.string().required("Required"),
        quantity: Yup.number().required("Required"),
        pricePerUnit: Yup.number().required("Required"),
        unit: Yup.string().required("Required")
    });


    async function addCatalogue(values) {
        const data = {
            name: values.name,
            description: values.description,
            supplierID: localStorage.getItem("id"),
        };
        await Catalogueservice.createCatalogue(data).then((res) => {
            if (res.status === 201) {
                Swal.fire({
                    icon: "success",
                    title: "Success",
                    text: "Catalogue Added Successfully",
                }).then(() => {
                    handleCloseAddCatalogue();
                    Catalogueservice.getCatalogueSupplier(localStorage.getItem("id")).then((res) => {
                        setCatalogues(res.data);
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
        setIsSubmitted(false);
    }

    async function addItem(values) {

        const supplier = await SupplierService.getSupplier(localStorage.getItem("id"));
        console.log(supplier.data);


        const data = {
            name: values.name,
            catalogueID: values.catalogueID,
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
        setIsSubmitted(false);
    }

    //delete catalogue confirmation swal
    async function deleteCatalogue(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1cc88a",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                Catalogueservice.deleteCatalogue(id).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Catalogue Deleted Successfully",
                        }).then(() => {
                            Catalogueservice.getCatalogueSupplier(localStorage.getItem("id")).then((res) => {
                                setCatalogues(res.data);
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
        });
    }

    async function deleteItem(id) {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1cc88a",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                ItemService.deleteItem(id).then((res) => {
                    if (res.status === 200) {
                        Swal.fire({
                            icon: "success",
                            title: "Success",
                            text: "Item Deleted Successfully",
                        }).then(() => {
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
                                            <Alert.Heading>Catalogues</Alert.Heading>
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
                                                        <ClockLoader color="#ffffff" size={150} />
                                                    </div>
                                                ) : catalogues.length > 0 ? (
                                                    catalogues.map((catalogue) => (
                                                        <SwiperSlide key={catalogue.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Img loading="lazy" variant="top" src={CatImage} style={{ width: '10rem', marginLeft: "123px" }} />
                                                                <Card.Body>
                                                                    <Card.Title>{catalogue.name}</Card.Title>
                                                                    <Card.Text>
                                                                        {catalogue.description}
                                                                    </Card.Text>
                                                                    <Button variant="success">Edit</Button>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Button variant="danger"
                                                                        onClick={() => {
                                                                            deleteCatalogue(catalogue._id)
                                                                        }}>Delete</Button>
                                                                </Card.Body>
                                                            </Card>
                                                        </SwiperSlide>
                                                    ))
                                                ) : (
                                                    <div className="sweet-loading">
                                                        <h3>No Catalogues</h3>
                                                    </div>
                                                )}

                                            </Swiper>
                                        </div>

                                        <br />
                                        <Button variant="primary" onClick={handleShowAddCatalogue}>Add New Catalogue</Button>
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
                                                        <ClockLoader color="#ffffff" size={150} />
                                                    </div>
                                                ) : items.length > 0 ? (
                                                    items.map((item) => (
                                                        <SwiperSlide key={item.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Img loading="lazy" variant="top" src={ItemImage} style={{ width: '13rem', marginLeft: "100px" }} />
                                                                <Card.Body>
                                                                    <Card.Title>{item.name}</Card.Title>
                                                                    <Card.Text>
                                                                        {item.description}
                                                                    </Card.Text>
                                                                    <Card.Subtitle className="mb-2 text-muted">Quantity - {item.quantity}</Card.Subtitle>
                                                                    <Card.Subtitle className="mb-2 text-muted">Rs. {item.pricePerUnit} per {item.unit}</Card.Subtitle>
                                                                    <Button variant="success">Edit</Button>
                                                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                                    <Button variant="danger"
                                                                        onClick={() => {
                                                                            deleteItem(item._id)
                                                                        }}>Delete</Button>
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
            <Modal show={showAddCatalogue} onHide={handleCloseAddCatalogue}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Catalogue</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Formik
                        initialValues={initialValuesAddCatalogue}
                        validationSchema={validationSchemaAddCatalogue}
                        onSubmit={(values) => {
                            setIsSubmitted(true);
                            addCatalogue(values);
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
                                        Add Catalogue
                                    </Button>
                                )}

                            </Form>
                        )}
                    </Formik>
                </Modal.Body><Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseAddCatalogue}>
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
                            setIsSubmitted(true);
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
                                    <label htmlFor="catalogueID">Catalogue</label>
                                    {/* get catalogue by dropdown */}
                                    <Field
                                        as="select"
                                        name="catalogueID"
                                        className={`form-control ${touched.catalogueID && errors.catalogueID ? "is-invalid" : ""
                                            }`}
                                    >
                                        <option value="">Select Catalogue</option>
                                        {catalogues.map((catalogue) => (
                                            <option key={catalogue.id} value={catalogue.id}>
                                                {catalogue.name}
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
                                        Add Catalogue
                                    </Button>
                                )}
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
