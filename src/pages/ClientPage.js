import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function ClientPage() {
  const Navigate=useNavigate()
  return (
    <Container className="mt-5 p-3" fluid>
      <Row>
        <Col>
          <h1 className="mb-3">Welcome to Mailbox</h1>
          <p className="mb-4">Thank you for choosing Mailbox as your email provider. With Mailbox, you can organize your email like never before and enjoy a clutter-free inbox.</p>
          <Button variant="primary" onClick={()=>Navigate('/Login')}>Get Started</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ClientPage;