import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from 'react-bootstrap/Button';

export default function NavBar() {

  function handleLogout() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  }

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Administrator Dashboard</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
              <Button variant="secondary" onClick={handleLogout}>Log Out</Button>{' '}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
