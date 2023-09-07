import './App.css';
import SignUp from './pages/SignUp';
import { Route, Routes } from 'react-router-dom';
import ClientPage from './pages/ClientPage';
import Login from './pages/Login';
import Root from './Components/Root';
import EmailForm from './Components/EmailForm';
import Inbox from './Components/Inbox';
import Sent from './Components/Sent';
import ForgetPass from './Components/ForgetPassWord';
import MailDetails from './Components/MailDetails';
import NotFound from './pages/NotFound';
import { useSelector } from 'react-redux';
function App() {
  const isLoggedIn=useSelector(state=>state.auth.isLoggedIn)
  return (
    <Root>
    <Routes>
<Route path='/' element={<ClientPage/>}/>
{!isLoggedIn&&<Route path='/login' element={<Login/>}/>}
{!isLoggedIn&& <Route path='/signup' element={<SignUp/>}/>}
{isLoggedIn&&<Route path='/newmail' element={<EmailForm/>}/>}
{isLoggedIn&&<Route path='/inbox' element={<Inbox/>}/>}
{isLoggedIn&&<Route path='/sent' element={<Sent/>}/>}
<Route path='/forgetpass' element={<ForgetPass/>}/>
{isLoggedIn&&<Route path='/mailDetails' element={<MailDetails/>}/>}
<Route path='*' element={<NotFound/>}/>
    </Routes>
    </Root>
  );
}

export default App;