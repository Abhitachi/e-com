import { useEffect, useState } from 'react'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import FormContainer from '../components/FormContainer'
import Loader from '../components/Loader'
import { setCredentials } from '../slices/authSlice'
import { useLoginMutation } from '../slices/userApiSlice'

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const[login , {isLoading}] = useLoginMutation();

    const {userInfo} = useSelector((state) => state.auth);

    const {search} = useLocation(); // returns location
    const sp = new URLSearchParams(search); //used to search params in the url
    const redirect = sp.get('redirect') || '/'; //if our url has redirect than set redirect to that thing else set to homie('/);

    console.log(redirect,'redirect')

    useEffect(() => {
        if(userInfo){
            navigate(redirect);
        }
    },[navigate ,redirect, userInfo]);

    const submitHandler = async (e) => {
        e.preventDefault();
        try{
            //login is a hooke returned by userApiSlice out backend verifies the cred and stores a cookie of user
            const res = await login({email,password}).unwrap(); // unwraps the response/error provided by mutation
            console.log(res, 'res')
            dispatch(setCredentials({...res}));
            navigate(redirect);
            toast.success('Logged in Successfully',{duration: 500,})
        }catch(err){
            toast.error(err?.data?.message || err.error,{duration: 500,})
        }
    };


    return (
        <FormContainer>
            <h1>Sign In</h1>
            <Form onSubmit = {submitHandler}>
                <Form.Group className="my-2" controlId = 'email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type = "email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)}>
                    </Form.Control>
                </Form.Group>
                <Form.Group className='my-2' controlId = 'password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    >             
                    </Form.Control>
                </Form.Group>

                <Button disabled={isLoading} type='submit' variant='primary' className='my-2'>Sign In</Button>
                {isLoading && <Loader/>}
            </Form>
            <Row className='py-3'>
                <Col>
                    New User ? {' '}<Link to={redirect ?`/register?redirect=${redirect}`:'/register'}>Register</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;