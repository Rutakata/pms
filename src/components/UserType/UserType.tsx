import { useEffect } from 'react';
import { Alert, Container, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';


type To = {
    to: {
      pathname: string;
      state: { isWorker: boolean };
    };
}

const UserType = () => {
    const { currentUser } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (currentUser) {
            return navigate('/home');
        }
    }, [])

    return <Container style={{height: "100vh"}} className='justify-content-center d-flex align-items-center flex-column'>
        <Link to='/owner-signup'>
            <Alert variant='primary'>
                I'm hotel owner {'>'}
            </Alert> 
        </Link>
        <Link to='/signup' state={{isWorker: true}}>
            <Alert variant='primary'>
                I'm hotel worker {'>'}
            </Alert> 
        </Link>
    </Container>
}


export default UserType;