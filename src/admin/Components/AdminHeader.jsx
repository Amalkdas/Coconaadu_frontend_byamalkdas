import React, { useContext, useEffect, useState } from 'react'
import { serverurl } from '../../services/serverurl'
import { profileupdatecontext } from '../../contextshare/Profilepictureupdate'
useState


function AdminHeader() {

  const [existingpic,setexistingpic] = useState("")

  const {profilepicture,setprofilepicture} = useContext(profileupdatecontext)



  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      let user = JSON.parse(sessionStorage.getItem("user"))

      setexistingpic(user.profile)
    }
  },[profilepicture])
  return (
  <>

  <div className='flex justify-between p-8 bg-green-700'>
    <h1 className='text-3xl font-bold text-white  '>Coconaadu  </h1>
    <img  src={
                      typeof existingpic !== "string"
                        ? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid&w=740&q=80"
                        : existingpic == ""
                        ? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid&w=740&q=80"
                        : `${serverurl}/eventimagepath/${existingpic}`
                    } className='rounded-full object-cover' style={{height:'60px',width:'60px'}} alt="" />
  </div>
  
  
  
  </>
  )
}

export default AdminHeader
