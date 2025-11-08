import React, { useEffect, useState } from "react";
import Header from "../../Components/Header";
import Switch from "@mui/material/Switch";
import { IoIosFootball } from "react-icons/io";

import { RiMovie2Line } from "react-icons/ri";
import { IoBrushOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { getalleventsapi } from "../../services/allapi";
import { serverurl } from "../../services/serverurl";
import pleaselogin from '../../images/login.json'
import Lottie from "lottie-react";
import greenempty from '../../images/greenempty.json'
import { RiServiceLine } from "react-icons/ri";
import { RiFilterOffLine } from "react-icons/ri";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdModeOfTravel } from "react-icons/md";
import { CiMusicNote1 } from "react-icons/ci";

function Events() {
  const [token, settoken] = useState("");
  const [allevents, setallevents] = useState([]);
  const [tempevents,settempevents] = useState([])
  const [searchkey,setsearchkey] = useState("")
  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const getevents = async (token) => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getalleventsapi(reqheader,searchkey || "");
      console.log(res);
      if (res.status === 200) {
        setallevents(res.data);
        settempevents(res.data)
      }
    } catch (err) {
      toast.error("something went wrong", toastConfig);
    }
  };

  const filterbycategory =(category)=>{


    if(category==='No-filter'){
      setallevents(tempevents)

      //firstly make a temp state and assign the allevents data,we only amke use of the temporary data no original,
      //if no filter we assign the original state the value of temporarry data
    }
    else{
      setallevents(tempevents.filter((item)=>

        //else we filter the events from the temporary dta and assign to the original data , therefore it displays the filteted events

      (

        item.category.toLowerCase() === category.toLowerCase()

      )))
    }

    
    

  }

  useEffect(() => {
    const tok = sessionStorage.getItem("token");
    if (tok) {
      settoken(tok);
    }
  }, []);
  //empty array , runs only once
  useEffect(() => {
    if (token) {
      getevents(token);
    }
  }, [token,searchkey]);

  console.log(searchkey);
  
  return (
    <>
    <div>
      <div className="flex flex-col   h-screen">
        <div className="fixed w-full top-0 left-0 right-0  z-10">
          {" "}
          <Header></Header>
        </div>

       { 
       token ? <><div className=" flex flex-wrap grid-cols-2 mt-32 p-5">
          <div className="w-[15%]  border-gray-500 rounded fixed  flex flex-col   ">
            <div onClick={()=>filterbycategory("Sports")} id="sports" className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-500 font-semibold">
              {" "}
              <IoIosFootball className="mr-5 text-xl" />
              <p className="font-medium">Sports</p>
            </div>
            <div onClick={()=>filterbycategory("Music")} id="Music" className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
             <CiMusicNote1 className="mr-5 text-xl" />
              <p className="font-medium">Music</p>
            </div>
            <div onClick={()=>filterbycategory("Movie")} id="Movie" className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
             <RiMovie2Line className="mr-5 text-xl" />

              <p className="font-medium ">Movie</p>
            </div>

            <div onClick={()=>filterbycategory("Art")} id="Art" className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
              <IoBrushOutline className="mr-5 text-xl" />

              <p className="font-medium">Art</p>
            </div>
            

            <div id="Service"  onClick={()=>filterbycategory("Service")} className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
             <RiServiceLine className="mr-5 text-xl"/>
              <p className="font-medium">Service</p>
            </div>

             <div id="Food"  onClick={()=>filterbycategory("Food")} className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
              <IoFastFoodOutline className="mr-5 text-xl" />
              <p className="font-medium">Food</p>
            </div>

              <div id="Travel"  onClick={()=>filterbycategory("Travel")} className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
             <MdModeOfTravel className="mr-5 text-xl" />
              <p className="font-medium">Travel</p>
            </div>

            
              <div onClick={()=>filterbycategory("No-filter")} id="No-filter" className="p-4  cursor-pointer flex items-center rounded hover:text-green-600 transition ease-in-out hover:bg-green-600/20 text-gray-600">
             <RiFilterOffLine className="mr-5 text-xl" />

              <p className="font-medium">No filter</p>
            </div>
          </div>
          <div className="w-[85%]  ml-[16%] min-h-screen items-start flex-col  gap-5    flex  overflow-y-auto    ">
            <input
              type="text"
              className="border px-5 py-2 ml-5 w-80 placeholder:text-xs  placeholder:text-gray-500"
              placeholder="Search By  District"
              onChange={(e)=>setsearchkey(e.target.value)}
            />
            <div className="flex flex-wrap w-full gap-8 pb-5">
               { allevents.length > 0 ? (
                allevents.map((item, index) => (
                   
                  <Link to={`/viewevent/${item?._id}`}>
                    <div
                      key={item?._id}
                      className="relative p-5 rounded-t-sm  shadow-2xl max-h-md pb-4 rounded-b-sm"
                      style={{ width: "340px" }}
                    >
                      <img
                        src={`${serverurl}/eventimagepath/${item?.eventimage}`}
                        className="block rounded-t-sm m-0 p-0 align-top h-[250px] w-full object-cover"
                        alt="Playstation"
                      />

                      <div className="flex w-full gap-4 mt-4 ">
                        <div
                          className="bg-blue-500 justify-center flex-1  text-white flex gap-2 py-3  rounded  px-4 items-center"
                          style={{ fontSize: "0.5em" }}
                        >
                          <CiStar className="" />
                          <p className="">{item?.title}</p>
                        </div>
                        <div
                          className="bg-green-600  justify-center flex-1 py-3 text-white flex gap-2   rounded  px-4 items-center"
                          style={{ fontSize: "0.5em" }}
                        >
                          <p className="">{item?.district}</p>
                          <FaLocationDot />
                        </div>
                      </div>

                      <div className="flex justify-between text-gray-500 p-2 mt-2">
                        <h1 className="text-xs">
                          {item?.startingtime} - {item?.endingtime}
                        </h1>
                        <IoMdTime className="text-md" />
                      </div>

                      <div className="flex justify-between text-gray-500 p-2 ">
                        <h1 className="text-xs">{item?.date}</h1>{" "}
                        <SlCalender className="text-md" />
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="w-full flex justify-center items-center"><Lottie animationData={greenempty} loop={true} autoPlay={true} style={{height:'400px',marginTop:'30px'}}></Lottie></div>
                 
              )}
            </div>
             
              </div>
            </div></>: 
            <div className="flex  w-full justify-center h-full items-center">
              <Lottie animationData={pleaselogin} className="mt-20"
    loop={true} autoplay={true} style={{width:'40%'}}></Lottie>
    <p className=" text-2xl ">Please <Link className="hover:text-green-500 hover:underline" to={"/login"}>Login</Link> <br /> to access events</p>
            </div>
        
         }
            
          </div>
          </div>
        
      </>
  
  );
}

export default Events;
