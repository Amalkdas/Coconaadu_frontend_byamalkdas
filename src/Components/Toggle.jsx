import React, { useEffect, useState } from 'react'


// function Toggle() {

//     const [isdarkmode,setisdarkmode] = useState(()=>{
//         const savedtheme = localStorage.getItem("flowbite-theme-mode");

//         if(savedtheme){
//             return savedtheme == 'dark';
//         }
//          return false
//     })

//     useEffect(()=>{
//         const root = window.document.documentElement;
//          console.log("Toggle is OFF, trying to remove 'dark' class.");

//         if(isdarkmode){
//             root.classList.add('dark');
//             localStorage.setItem('flowbite-theme-mode', 'dark'); 
           
//         }
//         else{
//             root.classList.remove('dark')
//             localStorage.setItem('flowbite-theme-mode', 'light'); 
//         }
//     },[isdarkmode])

//     const handletoggle=(e)=>{
//         e.preventDefault(); 
//         setisdarkmode(prev=>!prev)
//     }
//   return (
//    <>

   

// <label className="inline-flex items-center cursor-pointer" onClick={(e)=>handletoggle(e)}>
//   <input type="checkbox" value="" class="sr-only peer" checked={isdarkmode} ></input>
//   <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none  rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>

// </label>


   
//    </>
//   )
// }

export default Toggle
