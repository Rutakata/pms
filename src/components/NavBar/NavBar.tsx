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
            <Nav.Link>
              <Link to='/bookings' style={{color: 'inherit'}} className='text-decoration-none'>Bookings</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to='/employees' style={{color: 'inherit'}} className='text-decoration-none'>Employees</Link>
            </Nav.Link>
            <Nav.Link>
              <Link to='/profile' style={{color: 'inherit'}} className='text-decoration-none'>Profile</Link>
            </Nav.Link>
          </Nav>
        </Container>
    </Navbar>
}

export default NavBar;