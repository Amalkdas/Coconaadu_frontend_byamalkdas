

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Authentication from './Pages/Authentication'
import Events from './user/Pages/Events'
import Userprofile from './user/Pages/Profilesidebar'
import About from './user/Pages/About'
import Contact from './user/Pages/Contact'
import Mainprofile from './user/Pages/Mainprofile'
import Createevent from './user/Pages/Createevent'
import Eventstatus from './user/Pages/Eventstatus'
import Viewevent from './user/Pages/Viewevent'
Joined
import Pnf from './Pages/Pnf'
import { useEffect, useState } from 'react'
import Preloader from './Components/Preloader'
import Adminhome from './admin/Pages/Dashboard'
import Dashboard from './admin/Pages/Dashboard'
import Adminevents from './admin/Pages/Adminevents'
import Users from './admin/Pages/Users'
import Adminprofile from './admin/Pages/Adminprofile'
import Adminviewevent from './admin/Pages/Adminviewevent'
import { ToastContainer} from 'react-toastify';
import Paymentsuccess from './user/Pages/Paymentsuccess'
import Paymenterror from './user/Pages/Paymenterror'
import Chat from './user/Pages/Chat'
import Joined from './user/Pages/Joined'






function App() {


  const [isloading,setisloading] = useState(false)


  useEffect(()=>{
    setTimeout(()=>{
      setisloading(true)
    },4000)
  },[])



  

  return (
    <>
    <ToastContainer style={{ top: '50px' }}  />

    <Routes>
       
      

      <Route path='/' element={ isloading ? <Home></Home> : <Preloader></Preloader>   }></Route>
      <Route path='/login' element={<Authentication></Authentication>}></Route>
      <Route path='/register' element={<Authentication register></Authentication>}></Route>
      <Route path='/events' element={<Events></Events>}></Route>
      <Route path='/about' element={<About></About>}></Route>
      <Route path='/contact' element={<Contact></Contact>}></Route>
      <Route path='/profile' element={<Mainprofile></Mainprofile>}></Route>
      <Route path='/createevent' element={<Createevent></Createevent>}></Route>
      <Route path='/eventstatus' element={<Eventstatus></Eventstatus>}></Route>
      <Route path='/joined' element={<Joined></Joined>}></Route>
      <Route path='/viewevent/:id' element={<Viewevent></Viewevent>}></Route>
      <Route path='/paymentsuccess' element={<Paymentsuccess></Paymentsuccess>}></Route>
      <Route path='/paymenterror' element={<Paymenterror></Paymenterror>}> </Route>
      <Route path='/chat/:eventid' element={<Chat></Chat>}></Route>
   {/* //admin// */}
    <Route path='/admindashboard' element={<Dashboard></Dashboard>}></Route>
    <Route path='/adminevents' element={<Adminevents></Adminevents>}></Route>
    <Route path='/users' element={<Users></Users>}></Route>
    <Route path='/adminprofile' element={<Adminprofile></Adminprofile>}></Route>
    <Route path='/adminviewevent/:id' element={<Adminviewevent></Adminviewevent>}></Route>

      <Route path='/*' element={<Pnf></Pnf>}>

   

     

      </Route>





    </Routes>

     
    </>
  )
}

export default App
