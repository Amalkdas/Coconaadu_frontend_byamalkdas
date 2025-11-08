import React from 'react'
import { useState } from "react";
import { useEffect } from "react";

import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import Header from '../../Components/Header';
import Footer from '../../Components/Footer';
import failed from '../../images/failed.json'


function Paymenterror() {

     const [token, settoken] = useState("");
    
      useEffect(() => {
        if (sessionStorage.getItem("token")) {
          settoken(sessionStorage.getItem("token"));
        }
      }, []);
  return (
   <>
   <Header></Header>
      <div className=" flex w-full mb-10 ">
        <div className="flex w-[60%] justify-center ">
          <Lottie
            animationData={failed}
            autoPlay={true}
            loop={true}
            style={{ height: "500px", width: "700px" }}
          ></Lottie>
        </div>

        <div className=" w-[40%]  flex flex-col py-25 pr-10 gap-10">
          <p className="text-4xl font-bold text-black">OOPS ! Payment Failed</p>

          <p>
                We weren’t able to process your payment just now.<br />
    It might’ve been a network hiccup or a card issue. We're truly sorry for the inconvenience, but we couldn't process your payment
 
          </p>

          <div className="flex justify-center gap-4">

            <Link to={"/viewevent/:id"}> <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2"
            >
              Back
            </button></Link>
           
<Link to={"/events"}>            <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2">Events</button>
 </Link>
         </div>
        </div>
      </div>

      <Footer></Footer>
   </>
  )
}

export default Paymenterror
