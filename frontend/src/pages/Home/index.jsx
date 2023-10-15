import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import "../../styles/randula/home.css";
import HomeImage from "../../assets/images/home.jpg";
import cover1 from "../../assets/images/cover3.png";
import cover2 from "../../assets/images/cover2.png";
import cover3 from "../../assets/images/cover1.png";

export default function Home() {
  return (
    <div className="home">
      <div className="homeMain">
        <div className="homeContainer">
          <Container>
            <Carousel>
              <Carousel.Item interval={2000} >
                <Link to="/login">
                  <img src={cover1} alt="cover1" className="carImage" />
                  <Carousel.Caption>
                    <h1 style={{ color: "black" }}>SHMOFY - Procument Helper</h1>
                    <p style={{ color: "black" }}>
                      Click Here to Get Started
                    </p>
                  </Carousel.Caption>
                </Link>
              </Carousel.Item>

              <Carousel.Item interval={2000}>
                <Link to="/login">

                  <img src={cover2} alt="cover1" className="carImage" />
                  <Carousel.Caption>
                    <h1 style={{ color: "black" }}>SHMOFY - Procument Helper</h1>
                    <p style={{ color: "black" }}>
                      Click Here to Get Started
                    </p>
                  </Carousel.Caption>
                </Link>

              </Carousel.Item>

              <Carousel.Item interval={2000}>
                <Link to="/login">

                  <img src={cover3} alt="cover1" className="carImage" />
                  <Carousel.Caption>
                    <h1>SHMOFY - Procument Helper</h1>
                    <p>
                      Click Here to Get Started
                    </p>
                  </Carousel.Caption>
                </Link>

              </Carousel.Item>

            </Carousel>
          </Container>
        </div>
      </div>
    </div>
  );
}
