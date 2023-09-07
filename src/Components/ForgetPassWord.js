import React, { useState, useRef } from "react";
import { Button, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import axios from "axios";
const ForgetPass=()=>{
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData]=useState(null);
    const emailRef=useRef()
    const emailSubmiHandler=async(event)=>{
        event.preventDefault()
        setIsLoading(true)
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBlaWHlQ3l0Vl9O48MJaBlp7fzXFC_8RFE',
            {requestType:"PASSWORD_RESET",email:emailRef.current.value})
            setData(response.data)
        } catch (error) {
       alert(error.response.data.error.message)
        }  
        setIsLoading(false)
    }
return(
    <>
    <Container className="rounded p-4 mb-4 mt-5 w-75">
        {isLoading&& <Row><h2>loading....</h2></Row>}
        {!isLoading&&data &&<Row><NavLink style={{textAlign:'center', fontSize:'20px'}} to='/Login'>Login</NavLink></Row>}
    </Container>
 {!isLoading&& !data&& <Container className="rounded p-4 mb-4  w-100" fluid>
     <Row className="justify-content-center mb-4 ">
<Form onSubmit={emailSubmiHandler} className='w-75 h-100 rounded shadow text-center '>
    <Form.Group className="mb-3">
        <Form.Label>
            Enter the email with which you have registered
        </Form.Label>
        <Form.Control type="email" placeholder="example@gmail.com" ref={emailRef}/>
    </Form.Group>

    <Button variant="light"  type="submit">Send Link</Button>{' '}
</Form>
</Row>
<Row>
    <NavLink style={{textAlign:'center'}} to='/Login'>Already user? Login</NavLink>
    </Row>
</Container>}


</>
)
}
export default ForgetPass;