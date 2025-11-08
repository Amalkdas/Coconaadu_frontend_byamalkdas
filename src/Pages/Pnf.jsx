import React from 'react'
import pnf from '../images/error.json'
Link
import Lottie from 'lottie-react'
import { Link } from 'react-router-dom'


function Pnf() {
  return (
   <>

   <div className='h-screen flex-col border pt-35'>
    <Lottie animationData={pnf} loop={true} 
    autoPlay={true} style={{width:"100%",height:'70%'}} ></Lottie>
    <div className=' flex justify-center p-5 '>
        <h2 className='text-md font-medium '>OOPS ! NOTHING WAS FOUND</h2>
    </div>
    <div className='justify-center flex w-full'>
        <Link to={"/"}><button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">GO Back Home</button></Link></div>
   </div>

   
   
   </>
  )
}

export default Pnf
