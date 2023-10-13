import { useState, useEffect } from 'react';
import {
    Container,
    Button,
    Card,
    Row,
    Col,
    Alert
} from 'react-bootstrap';

import "../../styles/sudul/common.css";
import "../../styles/chanudi/dashboard.css"

import SiteManagerSidebar from "../../components/siteManager/Sidebar";
import SiteManagerNavbar from "../../components/siteManager/Navbar";

import SiteService from '../../services/Site.Service';
import OrderService from '../../services/Order.Service';

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

    useEffect(() => {
        SiteService.getSiteByManager(localStorage.getItem("id")).then((res) => {
            setSites(res.data);
        });
    }, []);

    useEffect(() => {
        OrderService.getOrderSiteManager(localStorage.getItem("id")).then((res) => {
            setOrders(res.data);
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
                                        <Button variant="primary">Place a new Order</Button>

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
