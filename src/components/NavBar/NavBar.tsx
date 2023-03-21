import { Navbar, Container, Nav } from "react-bootstrap"
import { Link } from "react-router-dom";

const NavBar = () => {
    return <Navbar bg='primary' variant="dark">
        <Container>
          <Navbar.Brand>PMS</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link>
              <Link to='/home' style={{color: 'inherit'}} className='text-decoration-none'>Home</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to='/reservation' style={{color: 'inherit'}} className='text-decoration-none'>Reservation</Link>
            </Nav.Link>
            <Nav.Link>Employees</Nav.Link>
          </Nav>
        </Container>
    </Navbar>
}

export default NavBar;