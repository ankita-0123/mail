import { useEffect, useState } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { App } from 'react-bootstrap-icons';
import { MailAction } from '../store/MailSlice';
import { ArrowLeft } from 'react-bootstrap-icons';
import useHttp from '../customHooks/useHttp';
function Sent() {
    const mail=useSelector(state=>state.auth.email)
    const email=mail.split('@')[0]
    const [inbox, setInbox]=useState([])
    const Navigate=useNavigate()
    const dispatch=useDispatch();
   /*  const getData=useCallback(async()=>{
        let mailArr=[];
        try{
        const response= await axios.get(`https://mail-box-client-406c3-default-rtdb.firebaseio.com/${email}/sentbox.json`);
    for(const key in response.data){
        mailArr.push({
            id:key,
            Semail:response.data[key].Semail,
            Remail:response.data[key].Remail,
            subject:response.data[key].subject,
            content:response.data[key].content,
            date:response.data[key].date
        })
    }
    setInbox(mailArr)
}catch(error){
    alert(error.response.data.error.message)
}
        },[email]);
    

useEffect(()=>{
    getData()
},[getData]) */
const { isLoading, error, sendRequest}=useHttp()
useEffect(()=>{
  const TransferdData=(responseData)=>{
    let mailArr=[];
    for(const key in responseData){
      mailArr.push({
          id:key,
          Semail:responseData[key].Semail,
          Remail:responseData[key].Remail,
          subject:responseData[key].subject,
          content:responseData[key].content,
          date:responseData[key].date
      })
  }
  setInbox(mailArr)
  }
  sendRequest({url:`https://netflix-ddcaf-default-rtdb.firebaseio.com/${email}/sentbox.json`},TransferdData)
},[sendRequest])


const openMailDetails=(mail)=>{
  dispatch(MailAction.AddMail(mail))
  dispatch(MailAction.AddNode('sentbox'))
  Navigate('/mailDetails')
}
    return (
      <Container className='mt-5 w-100 ' fluid>
        {isLoading&&<h3>Loading.....</h3>}
        {error && alert(error)}
      <Row><Col><ArrowLeft size={30} onClick={()=>Navigate('/')} /></Col>
       <h1 className='text-center'>SENT</h1>
         {inbox.length===0 &&<h1 style={{textAlign:"center"}}>No Emails</h1>}</Row>  
        <Row   className="w-100 justify-content-center mt-5">
          <Table className='h-100 w-100 ms-4 '>
            <tbody>
                {inbox.map(mail=>(
<tr style={{cursor:'pointer'}} key={mail.id}  onClick={openMailDetails.bind(null,mail)}>
  <td><App/></td>
  <td>{mail.subject}</td>
  <td>{mail.content.slice(0,10)}...</td>
  <td>{mail.date}</td>
</tr>
                ))}
              </tbody>
            </Table>
        </Row>
      </Container>
    );
  }
  
  export default Sent;