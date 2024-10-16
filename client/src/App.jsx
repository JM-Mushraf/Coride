import { useState } from 'react'
import {BrowserRouter as Router,Routes,Route,Navigate} from 'react-router-dom'
import './App.css'
import Loading from './Loader/Loading'
import {Toaster} from 'react-hot-toast'
import axios from 'axios'
import Home from './Pages/Home'
import MyAccount from './Pages/MyAccount'
import LoginRegister from './Pages/LoginRegister'
axios.defaults.baseURL='http://localhost:3000';
axios.defaults.withCredentials=true;
import Navbar from './Components/Navbar'
import CreateTrip from './Pages/CreateTrip'
import Logout from './Pages/Logout'
import TripInfoCard from './Pages/TripInfoCard'
import Login from './Pages/login/Login'
import Register from './Pages/register/Register'
import Notification from './Pages/notifications/Notification'
import AdminLogin from './Pages/admin login/AdminLogin'

// import Footer from "../src/Components/footer.jsx"
import AdminDashboard from './Pages/admin/AdminDashboard'
import { useSelector } from 'react-redux'

function App() {
  const {user}=useSelector((state)=>state.user);
  const {admin}=useSelector((state)=>state.admin);
  
  return (
    <Router>
      <Toaster position='bottom-right' toastOptions={{duration:2000}}/>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/me' element={<MyAccount/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/create' element={<CreateTrip/>} />
        <Route path='/logout' element={<Logout/>} />
        <Route path='/notifications' element={user?<Notification/>:<Navigate to={'/login'}/>} />
        <Route path='/admin/login' element={<AdminLogin/>} />
        <Route path='/admin/dashboard' element={admin?<AdminDashboard/>:<Navigate to={'/admin/login'} />} />
        <Route path='/chat' element={<Notification/>} />
        <Route path='/loadcheck' element={<Loading/>} />
        
        <Route path='/trips/:id' element={<TripInfoCard/>} />
      </Routes>
      {/* <Footer/> */}
    </Router>
  )
}

export default App
