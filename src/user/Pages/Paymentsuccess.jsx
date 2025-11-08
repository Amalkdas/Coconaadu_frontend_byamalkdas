import React from "react";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import { useState } from "react";
import { useEffect } from "react";
import successimage from "../../images/success.json";
import Lottie from "lottie-react";
import { Link } from "react-router-dom";


function Paymentsuccess() {
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
            animationData={successimage}
            autoPlay={true}
            loop={true}
            style={{ height: "500px", width: "700px" }}
          ></Lottie>
        </div>

        <div className=" w-[40%]  flex flex-col p-15 gap-10">
          <p className="text-5xl font-bold text-black">Payment Successfull</p>

          <p>
            You're all set for event ! Get a head start on the fun. The event
            chat is now open for you to meet other attendees, share excitement,
            and plan with your group.
          </p>

          <div className="flex justify-center gap-4">

            <Link to={"/"}> <button
              type="button"
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2"
            >
              Home
            </button></Link>
           
<Link to={"/profile"}>            <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-3 text-center me-2 mb-2">Profile</button>
 </Link>
         </div>
        </div>
      </div>

      <Footer></Footer>
    </>
  );
}

export default Paymentsuccess;
