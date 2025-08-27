import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LogoTD from "../assets/LogoTD.png";
import { Link } from 'react-router';

function NavbarDashboard() {
  return (
    <Navbar expand="lg" bg="primary" fixed='top'>
      <Container>
        <Navbar.Brand as={Link} to="/"><img src={LogoTD} className="align-top" width="30px"/></Navbar.Brand>
        <Navbar.Brand as={Link} to="/" className='text-secondary'>Therapy Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav ">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className='text-secondary'>Home</Nav.Link>
            <NavDropdown title="Patients" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/patients" className='text-secondary'>Patient list</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/new-patient" className='text-secondary'>Add new patient</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link as={Link} to="/calendar" className='text-secondary'>Calendar</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
export default NavbarDashboard;