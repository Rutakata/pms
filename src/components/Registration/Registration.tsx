import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Alert from 'react-bootstrap/Alert';
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";


type FormValues = {
    email: string, 
    password: string, 
    confirmPassword: string
}

const Registration = () => {
    const [formValues, setFormValues] = useState<FormValues>({email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleFormValues = (e: ChangeEvent<HTMLInputElement>) => {
        setFormValues({...formValues, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (formValues.password.length < 6) {
            setError("Password length must be 6 or more characters");
        }else if (formValues.password !== formValues.confirmPassword) {
            setError("Passwords don't match");
        }else if ((formValues.password === formValues.confirmPassword) && signUp !== null) {
            e.preventDefault();
            setError(null);
            setLoading(true);
            try {
                await signUp(formValues.email, formValues.password);
                setFormValues({email: '', password: '', confirmPassword: ''});
                navigate('/setup');
            }catch (e) {
                console.error(e);
            } 
            setLoading(false);
        }
    }

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

export default Registration;