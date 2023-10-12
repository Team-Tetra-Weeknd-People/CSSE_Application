import {
    Container,
    Button,
    Row,
    Col
} from 'react-bootstrap';


import '../../styles/randula/home.css'
import HomeImage from '../../assets/images/home.jpg'
import { Navbar } from '../../components';

export default function Home() {
    return (<>
    <div className="sidebar">
        <Navbar />
    </div>
        <div className="home">
            <Container >
                <Row>
                    <Col sm={8} md={6}>
                        <h2>SHMOFY</h2>
                        <h3>Efficiency in Every Transaction, Excellence in Every Handover</h3>
                        <Button variant="primary">Get Started</Button>
                    </Col>
                    <Col sm={8} md={6}>
                        <img src={HomeImage} alt="" style={{ height: "95vh", borderRadius: "10px" }} />
                    </Col>
                </Row>
            </Container>
        </div></>
    );
}
