import React from 'react'
import { CgProfile } from "react-icons/cg";
import { MdEventNote } from "react-icons/md";
import { GrStatusInfo } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { LuHandshake } from "react-icons/lu";
Link

function Profilesidebar() {
  return (
   <>

   <div className='flex flex-col  w-full text-gray-500 font-medium text-sm  '>

    <Link to={"/profile"}> <div className='flex py-5 rounded justify-center items-center gap-4 items-center hover:bg-green-500/15  hover:text-green-500'> <CgProfile className='text-2xl' /> View Profile</div></Link>
   
     <Link to={"/createevent"}><div className='flex py-5 justify-center rounded items-center gap-4 hover:bg-green-500/15  hover:text-green-500'><MdEventNote className='text-2xl' />Create Event</div></Link>
     <Link to={"/eventstatus"}><div className='flex py-5 justify-center rounded items-center hover:bg-green-500/15 gap-5  hover:text-green-500'><GrStatusInfo className='text-2xl ' />Event status </div></Link> 
     <Link to={"/joined"}><div className='flex py-5 justify-center rounded items-center hover:bg-green-500/15 gap-5  hover:text-green-500'><LuHandshake className='text-2xl ' />Joined Event</div></Link> 
    
    
    
    </div> 
   
   
   </>
  )
}

export default Profilesidebar

