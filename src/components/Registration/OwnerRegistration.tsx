import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Link, useLocation } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from 'react-bootstrap/Alert';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks";
import { createUser, getUserData } from "../../store/userReducer";
import { createHotelEmployee } from "../../store/employeesReducer";


type FormValues = {
    email: string, 
    password: string, 
    confirmPassword: string,
    employeeCode: string,
    roles: { [key: string]: boolean }
}

type Props = {
    isWorker?: boolean
}

const OwnerRegistration = () => {
    const [formValues, setFormValues] = useState<FormValues>(
        {email: '', password: '', confirmPassword: '', employeeCode: '', roles: {owner: false, receptionist: true, cleaner: false}}
    );
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp, currentUser } = useAuth();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const location = useLocation()

    const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('test');
        
        if (formValues.email.length <= 0) {
            setError("Email can't be empty");
        }else if (formValues.password.length < 6) {
            setError("Password length must be 6 or more characters");
        }else if (formValues.password !== formValues.confirmPassword) {
            setError("Passwords don't match");
        }else {
            e.preventDefault();
            setError(null);
            setLoading(true);
            console.log('teeeeeeeeest');
            try {
                if (signUp) {
                    signUp(formValues.email, formValues.password);
                }
                console.log('test 4');
                dispatch(createUser(formValues.email));
                setFormValues({email: '', password: '', confirmPassword: '', 
                                employeeCode: '', roles: {owner: false, receptionist: true, cleaner: false}});
            }catch (e) {
                console.error(e);
            } 
            setLoading(false);
        }
    }

    useEffect(() => {
        if (currentUser !== null) {
            navigate('/setup');
        }
    }, [currentUser])

    return <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
        <Form className="border p-3" onSubmit={(e) => handleSubmit(e)}>
            <h1 className="mb-3">Registration</h1>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" name='email' placeholder="Enter email" value={formValues.email} onChange={handleFormValues} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" name="password" placeholder="Password" value={formValues.password} onChange={handleFormValues}/>
            </Form.Group>
            
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Confirmation password</Form.Label>
                <Form.Control type="password" name='confirmPassword' placeholder="Confirm password" value={formValues.confirmPassword} onChange={handleFormValues}/>
            </Form.Group>

            {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group className="mb-2">
                <Form.Text>Already have an account? You can <Link to='/login'>log in</Link></Form.Text>
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

export default OwnerRegistration;