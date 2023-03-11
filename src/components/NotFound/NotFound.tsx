import { Link } from 'react-router-dom';
import Container from "react-bootstrap/esm/Container";


const NotFound = () => {
    return <Container className='d-flex justify-content-center align-items-center flex-column' style={{height: '100vh'}}>
        <h1>This page is not found</h1>
        <Link to='/'>Go to home page</Link>
    </Container>
}

export default NotFound;