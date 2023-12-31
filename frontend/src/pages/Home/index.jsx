import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Button, Alert, Container } from "react-bootstrap";
import axios from "axios";

import "../../styles/randula/home.css";
import HomeImage from "../../assets/images/home.jpg";
import cover1 from "../../assets/images/cover3.png";
import cover2 from "../../assets/images/cover2.png";
import cover3 from "../../assets/images/cover1.png";

export default function Home() {
  useEffect(() => {
    axios
      .get("https://csse-backend-b5wl.onrender.com/")
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="home">
      <div className="homeMain">
        <div className="homeContainer">
          <Container style={{ padding: 0, margin: 0 }}>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Carousel>
              <Carousel.Item interval={2000}>
                <img src={cover1} alt="cover1" className="carImage" />
                <Carousel.Caption>
                  <h1 style={{ color: "black" }}>SHMOFY - Procument Helper</h1>
                  <Link to="/login">
                    <Button variant="primary">Click Here to Get Started</Button>{" "}
                  </Link>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item interval={2000}>
                <Link to="/login">
                  <img src={cover2} alt="cover1" className="carImage" />
                  <Carousel.Caption>
                    <h1 style={{ color: "black" }}>
                      SHMOFY - Procument Helper
                    </h1>
                    <Link to="/login">
                      <Button variant="primary">
                        Click Here to Get Started
                      </Button>{" "}
                    </Link>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>

              <Carousel.Item interval={2000}>
                <Link to="/login">
                  <img src={cover3} alt="cover1" className="carImage" />
                  <Carousel.Caption>
                    <h1 style={{ fontWeigh: "bold" }}>
                      SHMOFY - Procument Helper
                    </h1>
                    <Link to="/login">
                      <Button variant="primary">
                        Click Here to Get Started
                      </Button>{" "}
                    </Link>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>
            </Carousel>
            <br></br>
            <br></br>
            <Alert variant="success">
              <Alert.Heading>Our Services</Alert.Heading>
              <p>
                Handle all your procurement needs with our easy to use in one
                place !!
              </p>
            </Alert>
          </Container>
        </div>
      </div>
    </div>
  );
}
