import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdEventNote } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";


function Sidebar() {
  return (
   <>

   <div className='flex flex-col  w-full text-gray-500 font-medium text-sm  '>
        <Link to={"/admindashboard"}> <div className='flex py-5  justify-center text-white bg-green-700 items-center gap-4 items-center hover:bg-green-500/15  '>
       
       <MdOutlineSpaceDashboard className='text-2xl' />
Dashboard</div></Link>
   
       <Link to={"/adminprofile"}> <div className='flex py-5  justify-center text-white bg-green-700 items-center gap-4 items-center hover:bg-green-500/15  '> <CgProfile className='text-2xl' />View Profile</div></Link>
   
       <Link to={"/users"}> <div className='flex py-5  justify-center text-white bg-green-700 items-center gap-4 items-center hover:bg-green-500/15  '>
       
       <FaUsers  className='text-2xl mr-2' />App Users</div></Link>


        <Link to={"/adminevents"}> <div className='flex py-5  justify-center text-white bg-green-700 items-center gap-4 items-center hover:bg-green-500/15  '>
       
      <MdEventNote className='text-2xl' />New Events</div></Link>


       
      
        
       
       </div> 
   
   
   </>
  )
}

export default Sidebar
