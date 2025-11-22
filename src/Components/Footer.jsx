import React from 'react'
import { FaRegCopyright } from "react-icons/fa6";

function Footer() {
  return (
  <>

  <footer class="!bg-green-700 dark:bg-gray-900" style={{backgroundSize:'cover'}}>
    <div class=" w-full max-w-screen-xl mx-auto p-8">
        <div class="grid grid-cols-2   lg:py-8 md:grid-cols-4 w-full">
            <div style={{fontSize:'0.8em'}} className='justify-center items-center flex flex-col '>
    <ul className="font-medium">
        <li className="mb-4">
            <a href="/about" className="text-white hover:underline">About Us</a>
        </li>
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Careers </a> 
        </li>
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Blog</a>
        </li>
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Press Kit</a>
        </li>
    </ul>
</div>

















           <div style={{fontSize:'0.7em'}} className='justify-center items-center flex flex-col'>
    <ul className="font-medium">
        <li className="mb-4">
            <a href="mailto:support@yourplatform.com" className="text-white hover:underline">Support</a> 
        </li>
        <li className="mb-4">
            <a href="" className="text-white hover:underline">FAQ</a>
        </li>
        <li className="mb-4">
            <a href="" target="_blank"  className="text-white hover:underline">Discord Community</a>
        </li>
       
        <li className="mb-4">
            <a href="" target="_blank" className="text-white hover:underline">Facebook</a>
        </li>
      
    </ul>
</div>
           <div style={{fontSize:'0.7em'}} className='justify-center items-center flex flex-col'>
    <ul className="font-medium">
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Privacy Policy</a>
        </li>
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Terms of Service</a>
        </li>
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Community Guidelines</a> 
        </li>
        
        <li className="mb-4">
            <a href="" className="text-white hover:underline">Cookie Policy</a>
        </li>
    </ul>
</div>
            <div style={{fontSize:'0.7em'}} className='  gap-2 flex flex-col border-white  justify-center items-center'>
                
          <img src="https://hf-files-oregon.s3.amazonaws.com/hdpconcord_kb_attachments/2020/09-18/9501d8c2-babe-4f54-8df8-92692dfbc657/google-play-badge.png" alt="" />

     
              
              
                
            
        </div>
        
    </div>
    </div>
    <div className='w-full p-3 gap-3 flex justify-center items-center text-white text-xs font-semibold'>
        <FaRegCopyright />  <a className='ml-2' href="https://www.linkedin.com/in/amalkdas"> Amal K Das</a> 
    </div>
</footer>

  
  </>
  )
}

export default Footer
