import { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Alert
} from 'react-bootstrap';

// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import { ClockLoader } from 'react-spinners';

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

export default function SupplierDashboard() {
    sessionStorage.setItem("sidebarStatus", "supplier-dashboard");

    const [catelouges, setCatelouges] = useState([]);
    const [items, setItems] = useState([]);

    useEffect(() => {
        CatelougeService.getCatalogueSupplier(localStorage.getItem("id")).then((res) => {
            setCatelouges(res.data);
        });
    }, []);

    useEffect(() => {
        ItemService.getItemSupplier(localStorage.getItem("id")).then((res) => {
            setItems(res.data);
        });
    }, []);

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
                                                {!catelouges.length ? (
                                                    <div className="sweet-loading">
                                                        <ClockLoader color="#36D7B7" size={150} />
                                                    </div>
                                                ) : (
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
                                                )}

                                            </Swiper>
                                        </div>

                                        <br />
                                        <Button variant="primary">Add New Catelouge</Button>
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
                                                {!items.length ? (
                                                    <div className="sweet-loading">
                                                        <ClockLoader color="#36D7B7" size={150} />
                                                    </div>
                                                ) : (
                                                    items.map((item) => (
                                                        <SwiperSlide key={item.id}>
                                                            <Card style={{ width: '25rem', height: '20rem' }}>
                                                                <Card.Img loading="lazy" variant="top" src={ItemImage} style={{ width: '14rem', marginLeft: "100px" }} />
                                                                <Card.Body>
                                                                    <Card.Title>{item.name}</Card.Title>
                                                                    <Card.Text>
                                                                        Rs. {item.pricePerUnit} per {item.unit}
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
                                        <Button variant="primary">Add New Item</Button>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
