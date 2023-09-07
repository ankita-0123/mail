import React, { useState } from 'react';
import { Container,Row,Col, Form, Button } from 'react-bootstrap';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './EmailForm.css'
import useHttp from '../customHooks/useHttp';
import { useSelector } from 'react-redux';
import {ArrowLeft, SendFill} from 'react-bootstrap-icons'
import { useNavigate } from 'react-router-dom';

const EmailForm = () => {
    const mail=useSelector(state=>state.auth.email)
    const Navigate=useNavigate()
 const email=mail.split('@')[0]
  const [editorState, setEditorState] = useState(()=>EditorState.createEmpty());
  const [Remail, setRemail]=useState('');
  const [subject, setSubject]=useState('');
  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
  };

//custome hook
const { isLoading, error, sendRequest}=useHttp()
const handleSubmit = (event) => {
  event.preventDefault();
  const date=new Date()
  const day=date.getDate();
  const month=date.getMonth()+1;
  const year=date.getFullYear();
  const time=`${day}/${month}/${year}`;

  const remail = Remail.split('@')[0];
  const blocks = convertToRaw(editorState.getCurrentContent()).blocks;
const value = blocks.map(block => (!block.text.trim() && '\n') || block.text).join("\n");

sendRequest({url:`https://netflix-ddcaf-default-rtdb.firebaseio.com/${email}/sentbox.json`,  method: 'POST',
body: {Semail:mail,Remail:Remail,subject:subject, content:value, date:time,},
headers: {
  'Content-Type': 'application/json',
}})

sendRequest({url:`https://netflix-ddcaf-default-rtdb.firebaseio.com/${remail}/inbox.json`,  method: 'POST',
body: {Semail:mail,Remail:Remail,subject:subject, content:value, date:time,read:false},
headers: {
  'Content-Type': 'application/json',
}})

Navigate('/sent')
}
  return (
    <>
    <Container className='compose' fluid>
      {isLoading &&<h3>Loading....</h3>}
      {error && alert(error)}
      <Row>
        <Col><ArrowLeft size={30} onClick={()=>Navigate('/')}/></Col>
         <h1 className='text-center'>Compose Mail</h1></Row>
      <Row className='justify-content-center'>
      <Form onSubmit={handleSubmit} className='bg-light p-4 w-75 text-center'>
      <Form.Group controlId="emailForm.From"  as={Row} className="mb-3">
          <Form.Label column sm={1}>From:</Form.Label>
          <Col sm={11}>
          <Form.Control type="email" defaultValue={mail} required />
         </Col>
        </Form.Group>
        <Form.Group controlId="emailForm.To" as={Row} className="mb-3">
          <Form.Label column sm={1}>To:</Form.Label>
          <Col sm={11}>
          <Form.Control type="email" placeholder="Enter recipient email" onChange={(event)=>setRemail(event.target.value)} required />
          </Col>
        </Form.Group>
       
        <Form.Group controlId="emailForm.Subject"  as={Row} className="mb-3">
          <Form.Label column sm={1}>Subject</Form.Label>
          <Col sm={11}>
          <Form.Control type="text" placeholder="Enter subject" onChange={(event)=>setSubject(event.target.value)} required/>
          </Col>
        </Form.Group>
        <Form.Group controlId="emailForm.Body">
          <Editor 
            toolbarStyle={{ height: 60, overflow:'auto'}}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
            editorState={editorState}
            onEditorStateChange={onEditorStateChange}
            placeholder="Compose  email"
          />
        </Form.Group>
        <hr/>
        <Button variant="info" type="submit">
          Send<SendFill/>
        </Button>
      </Form>
      </Row>
    </Container>
    </>
  );
};

export default EmailForm;