import React, { useEffect, useState } from 'react'
import AdminHeader from '../Components/AdminHeader'
import Sidebar from '../Components/Sidebar'
import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from "flowbite-react";
import { getallusersapi } from '../../services/allapi';
import { serverurl } from '../../services/serverurl';



function Users() {

    const [token,settoken] = useState("")

    const [userdetails,setuserdetails] = useState([])
    useEffect(()=>{
        const tok = sessionStorage.getItem("token")
        if(tok){
            settoken(tok)
        }
    },[])

    const getusers=async()=>{
        const reqheader = {
            'Authorization' : `Bearer ${token}`
        }
        try{

            const res = await getallusersapi(reqheader)
            console.log(res);
            if(res.status===200){
                setuserdetails(res.data)
            }
            

        }
        catch(err){
            console.log(err);
            
        }
    }

    console.log(userdetails);
    
    useEffect(()=>{
        if(token){
            getusers()
        }
    },[token])
  return (

  <>


    <div className='flex flex-col'>

<div className='fixed right-0 left-0 top-0 z-40'> <AdminHeader></AdminHeader></div>
<div className='grid-cols-2 flex mt-30'>

<div className='w-[20%] h-screen fixed  bg-green-700 z-30'>
<Sidebar></Sidebar>
</div>
<div className='w-[80%] overflow-y-auto relative  z-20 ml-[20%]  p-15'>




<div class="relative overflow-x-auto shadow-md sm:rounded-lg !bg-white">
  {userdetails?.length > 0 ? (
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 !bg-white">
      <thead class="text-xs text-gray-700 uppercase !bg-gray-100 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-4">Name</th>
          <th scope="col" class="px-6 py-4">Email</th>
          <th scope="col" class="px-6 py-4">REGISTERED</th>
        </tr>
      </thead>
      <tbody>
        {userdetails.map((item, index) => (
          <tr key={index} class="!bg-white border-b border-gray-300 hover:bg-gray-700">
            <td class="px-6 py-3 text-gray-500 font-semibold flex items-center gap-4">
              <img
                src={
                  item?.profile === ""
                    ? "https://thumbs.dreamstime.com/b/default-avatar-profile-trendy-style-social-media-user-icon-187599373.jpg"
                    : `${serverurl}/eventimagepath/${item.profile}`
                }
                className="rounded-full object-cover"
                style={{ height: "40px", width: "40px" }}
                alt=""
              />
              {item?.username}
            </td>
            <td class="px-6 py-3 text-gray-500 font-semibold">{item?.email}</td>
            <td class="px-6 py-3 text-gray-500 font-semibold">{item?.registered}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ) : (
    <div className="text-center flex justify-center py-6 text-gray-500 font-semibold">Loading....</div>
  )}
</div>

 


  

{/* <div className='border shadow-lg'>2</div> */}


  </div>
 
  
</div>

</div>

 
  
  
  
  </>)
}

export default Users
