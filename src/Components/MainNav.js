import React,{useState} from 'react';
import { Navbar, Nav, Container, Offcanvas, Badge} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { PersonCircle,Inbox, UnlockFill,LockFill , SendFill, FileEarmark, Pencil} from 'react-bootstrap-icons';
import { AuthActions } from '../store/AuthSlice';
import { NavLink } from 'react-router-dom';
import './Mainnav.css';
function MainNav() {
  const email=useSelector(state=>state.auth.email)
  const inbox=useSelector(state=>state.mail.mailData)
  const unreadMail=inbox.filter(mail=>mail.read===false)
  const dispatch=useDispatch();
  const [expanded, setExpanded] = useState(false);
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn);
  return (
    <>
        <Navbar  bg="dark" variant='dark' expand='true'expanded={expanded} fixed='top'>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"onClick={()=>setExpanded(!expanded)} />
            <Navbar.Offcanvas className='w-auto bg-light h5 justify-content-center'onHide={()=>setExpanded(false)}
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="start"
        
            >
              <Offcanvas.Header  closeButton onClick={()=>setExpanded(false)}>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                <PersonCircle/><br/>
                  {email}
                </Offcanvas.Title>
              </Offcanvas.Header>
              <hr/>
              <Offcanvas.Body>
                <Nav className="justify-content-center color-light flex-grow-2 gap-2 ">
              {isLoggedIn&&  <Nav.Link as={NavLink} className='my-navbar' to="/newmail" onClick={()=>setExpanded(false)}><Pencil/>Compose</Nav.Link>}
               {!isLoggedIn&&   <Nav.Link as={NavLink} className='my-navbar' to="/Login"
                onClick={()=>setExpanded(false)}><UnlockFill/> Login</Nav.Link>}
               {!isLoggedIn&&  <Nav.Link as={NavLink} className='my-navbar' to="/SignUp"
                onClick={()=>setExpanded(false)}><UnlockFill/> SignUp</Nav.Link>}
               {isLoggedIn&&  <Nav.Link as={NavLink} className='my-navbar' to="/inbox"
                onClick={()=>setExpanded(false)}><Inbox size={30} color='dark'/>  Inbox<Badge bg='info' >{`${unreadMail.length}  Unread`}</Badge> </Nav.Link>}
               {isLoggedIn&&   <Nav.Link as={NavLink}  className='my-navbar' to="/sent"
               onClick={()=>setExpanded(false)}><SendFill/>Sent</Nav.Link>}
               {isLoggedIn&& <Nav.Link as={NavLink}  className='my-navbar' to="/drafts"onClick={()=>setExpanded(false)}><FileEarmark/>Drafts</Nav.Link>}
               {isLoggedIn&&  <Nav.Link as={NavLink} className='my-navbar' to="/" onClick={()=>{setExpanded(false); dispatch(AuthActions.logout())}}><LockFill/> Logout</Nav.Link>}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
            <Navbar.Brand href="/">Mail Box</Navbar.Brand>
        </Navbar>
      
      </>
  );
}

export default MainNav;