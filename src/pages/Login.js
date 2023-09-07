import React,{ useState} from "react";
import axios from "axios";
import { Form, Button, Container, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux";
import { AuthActions } from "../store/AuthSlice";
const Login=()=>{
    const [isLoding, setIsLoading] = useState(false)
    const dispatch=useDispatch()
    // Initialize state for form fields
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
const Navigate=useNavigate()
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true)
            try {
                const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBlaWHlQ3l0Vl9O48MJaBlp7fzXFC_8RFE', {
                    email: email, password: password, returnSecureToken: true
                })
                const emailid = response.data.email//.split('@')[0];
                const token=response.data.idToken
            dispatch(AuthActions.login({token:token, emailid:emailid}))
Navigate('/inbox')

            } catch (error) {
                alert(error.response.data.error.message)
            }
            setEmail('')
            setPassword('')
            setIsLoading(false)
            setIsLoading(false)
    };


return (
    <>
    <Container  className="rounded p-4 mb-4 mt-5  w-100" fluid>
    {isLoding && <p>Loading...</p>}
        <Row className="justify-content-center h1">
    Login
    </Row>
      <Row className="justify-content-center">
 <Form onSubmit={handleSubmit} className="w-75 bg-success bg-opacity-50 p-4 text-center">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control type="email" placeholder="Enter email" value={email}
     onChange={(event) => setEmail(event.target.value)} required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control type="password" placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)} required/>
      </Form.Group>  
      <Button variant="primary" type="submit">
Login      </Button>
</Form>
</Row>
<Row className="justify-content-center p-4">
   <NavLink to='/forgetpass' style={{textAlign:'center', color:'black'}}>   forgot password?</NavLink>
    </Row>
    <Row className="justify-content-center">
    <NavLink to='/signup' style={{textAlign:'center', color:'black'}}>Dont have an account? signUp</NavLink>
    </Row>
    </Container>
   
    </>
)
}
export default Login;