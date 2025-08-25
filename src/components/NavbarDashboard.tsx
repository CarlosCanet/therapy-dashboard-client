import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoTD from "../assets/LogoTD.png";

function NavbarDashboard() {
  return (
    <Navbar expand="lg" bg="primary" fixed='top'>
      <Container>
        <Navbar.Brand href="#home"><img src={LogoTD} className="align-top" width="30px"/></Navbar.Brand>
        <Navbar.Brand href="#home" className='text-secondary'>Therapy Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto">
            <Nav.Link href="/" className='text-secondary'>Home</Nav.Link>
            <NavDropdown title="Patients" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1" className='text-secondary'>Patient list</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2" className='text-secondary'>Add new patient</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/" className='text-secondary'>Calendar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavbarDashboard;