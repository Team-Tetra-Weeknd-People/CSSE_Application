import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

import "../../styles/randula/home.css";
import HomeImage from "../../assets/images/home.jpg";
import cover1 from "../../assets/images/cover3.jpg";
import cover2 from "../../assets/images/cover2.jpg";
import cover3 from "../../assets/images/cover1.jpg";

export default function Home() {
  return (
    <div className="home">
      <div className="homeMain">
        <div className="homeContainer">
          <Container>
            <Carousel>
              <Carousel.Item interval={1000}>
                <img src={cover1} alt="cover1" />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src={cover2} alt="cover1"/>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>

              <Carousel.Item>
                <img src={cover3} alt="cover1" />
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </Container>
        </div>
      </div>
    </div>
  );
}
