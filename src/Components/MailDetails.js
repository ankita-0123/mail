import './MailDetails.css';
import React from "react";
import {Col,Row,Container, Card, Dropdown} from 'react-bootstrap'
import { useSelector } from "react-redux";
import {Trash, ArrowLeftShort} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function MailDetails() {
    const mail=useSelector(state=>state.mail.mail)
    const email=useSelector(state=>state.auth.email).split('@')[0];
    const node=useSelector(state=>state.mail.node)
    
const Navigate=useNavigate()
const DeleteHandler=async()=>{
  try{
await axios.delete(`https://netflix-ddcaf-default-rtdb.firebaseio.com/${email}/${node}/${mail.id}.json`)
Navigate(-1)
  }catch(error){
    alert(error.respone.data.error.message)
  }
}
    return (
      <Container className="details">
        <Row className='justify-content-center h-100'>
            <Card>
              <Card.Header>
              <Container className='mb-3'><Row>
                <Col><ArrowLeftShort size={30}onClick={()=>Navigate(-1)} style={{cursor:'pointer'}}/></Col>
                <Col className=' d-flex justify-content-end'> <Trash style={{cursor:'pointer'}} size={30} onClick={DeleteHandler}/></Col></Row></Container>
                <Container>
                     Mail Details
                  <Dropdown>
      <Dropdown.Toggle variant="light" id="dropdown-basic">
        to me 
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>From: { mail.Semail}</Dropdown.Item>
        <Dropdown.Item>To: { mail.Remail} </Dropdown.Item>
        <Dropdown.Item>Date: { mail.date}</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
                  </Container>
        
              </Card.Header>
              <Card.Body>
                <Card.Title>{mail.subject}</Card.Title>
      <hr/>
                <Card.Text>{mail.content}</Card.Text>
              </Card.Body>
            </Card>
        </Row>
      </Container>
    );
  }
  export default MailDetails;