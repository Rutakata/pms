import React, { ChangeEvent, useState, FormEvent, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from 'react-bootstrap/Alert';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { getUserData } from '../../store/userReducer';


type FormValues = {
    email: string,
    password: string
}

const Authorization = () => {
    const { hotel, email } = useAppSelector(state => state.userReducer);
    const [formValues, setFormValues] = useState<FormValues>({email: '', password: ''});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { logIn } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (logIn !== null) {
            setLoading(true);
            try {
                await logIn(formValues.email, formValues.password);
                dispatch(getUserData(formValues.email));
            }catch (e) {
                console.log(e);
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        if (email.length > 0) {
            if (hotel.length > 0) {
                navigate('/profile');
            }else {
                navigate('/setup');
            }
        }
    }, [hotel, email])

    return <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <Form className="border p-3" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="mb-3">Authorization</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" value={formValues.email} onChange={handleFormValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleFormValues}/>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-2">
                <Form.Text>Don't have an account? You can <Link to='/signup'>sign up</Link></Form.Text>
            </Form.Group>
            
            <Form.Group className="d-flex justify-content-between">
                <Link to='/'> 
                    <Button variant="primary">Back</Button>
                </Link> 
                <Button variant="primary" type="submit" disabled={loading}>Submit</Button>
            </Form.Group>
        </Form>
    </Container>
}

export default Authorization;