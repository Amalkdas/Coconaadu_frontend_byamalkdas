import React, { useEffect, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { FaPeopleGroup } from "react-icons/fa6";
import { getspecificeventapi, joineventapi } from "../../services/allapi";
import { serverurl } from "../../services/serverurl";
import { loadStripe } from '@stripe/stripe-js';



function Viewevent() {
  

  const [token, settoken] = useState("");
  const [specificevent, setspecificevent] = useState({});
  const [userid,setuserid] = useState("")
  const [joinedpeople,setjoinedpeople] = useState([])

  useEffect(()=>{
const userforid = JSON.parse(sessionStorage.getItem("user"))

if(userforid){
 setuserid(userforid._id)
}
  },[])

  const { id } = useParams();
  // console.log(id);

  const max = specificevent?.numberofparticipants;
  const joined = specificevent?.noofparticipantsjoined;
  const rem = max - joined;
  const percentage = Math.round((joined / max) * 100);
  const pathcolor = percentage >= 80 ? "#FF7043" : "#4CAF50";

  const getspecificevent = async (id) => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {


      const res = await getspecificeventapi(id,reqheader);

      

      console.log(res);
      if (res.status === 200) {
        setspecificevent(res.data);
        setjoinedpeople(res.data.joinedparticipants)
        
      }
    } catch (err) {
      console.log(err);
    }
  };


  const stripePromise = loadStripe('pk_test_51SOxb6JWHDta8vGkA6l9uneIm6d4WNyvaAYY0OBNqpfN8JEIEgaGVk80tfvffvAeOtfd6gtVdimVuVHBxS9ApldL00nZfHqMal'); 

  const joinevent=async(id)=>{


    const currentoken = token

    const reqheader = {
      'Authorization' : `Bearer ${currentoken}`
    }
    try{

      const res = await joineventapi(id,reqheader)
      const {sessionId} = res.data

          const stripe = await stripePromise;
    window.location.href = res.data.sessionUrl;

      console.log(res);
      

    }
    catch(err){

      console.log(err);
      

    }
  }

useEffect(()=>{
  const tok = sessionStorage.getItem("token")
  settoken(tok)
  }
,[])

useEffect(()=>{
  if(token && id){
    getspecificevent(id)
  }
},[token,id])
  

  return (
    <>
      <div className="grid-cols-2 flex w-full ">
        <div
          className='w-[50%] h-screen'
          key={specificevent?._id}
          style={{ backgroundSize: "cover",backgroundImage:`url("${serverurl}/eventimagepath/${specificevent?.eventimage}")` }}
        >
          <Link to={"/events"}>
            <div
              className="absolute flex justify-center mt-140 ml-10 rounded-full bg-green-600 p-4 text-white"
              style={{ height: "60px", width: "60px" }}
            >
              <IoArrowUndo className="text-2xl" />
            </div>
          </Link>
        </div>
        <div className="w-[50%] p-10 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-6 flex items-center  text-gray-800">
            {specificevent?.title}
            <span className="px-6 py-2 text-white bg-blue-400/80 text-sm ml-5 rounded">
              {specificevent?.category}
            </span>
          </h2>
          <div className="flex text-gray-400 font-semibold mb-6 items-center ">
            <div className="flex items-center">
              <SlCalender className="text-3xl mr-5 text-green-600" />
              <p>{specificevent?.date}</p>
            </div>
            <div className="flex items-center ml-20">
              <FaLocationDot className="text-2xl mr-5 text-green-600" />
              <a href={specificevent?.locationurl}>
                <p className="cursor-pointer hover:text-green-600">
                  {specificevent?.location}{" "}
                </p>
              </a>

              <p>, {specificevent?.district}</p>
            </div>
          </div>
          <div className="flex mb-6 text-gray-400 font-semibold items-center ">
            {" "}
            <FaRegClock className="text-3xl mr-5 text-green-600" />
            <p>
              {specificevent?.startingtime} - {specificevent?.endingtime}
            </p>
            <div className="flex text-green-500 font-semibold pl-32 items-center">
              <FaPeopleGroup className="text-3xl" />
              <p className="ml-8">{specificevent?.numberofparticipants}</p>
            </div>
          </div>
          <p className="text-sm font-semibold mb-4">About The event</p>
          <p className="text-gray-500 font-medium mb-5  text-sm text-justify">
            {specificevent?.description}
          </p>

          <p className="text-sm font-semibold mb-4">The plan</p>
          <p className="text-gray-500 font-medium mb-4 text-sm text-justify">
            {specificevent?.plan}
          </p>

          <div className="flex text-xl items-center  py-2 rounded">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              style={{ height: "50px" }}
              alt=""
            />
            <p className="ml-4 text-sm">
              Posted by{" "}
              <span className="text-blue-600 ml-2">
                [ {specificevent?.createdby?.username} ]
              </span>
            </p>

            <div
              style={{ width: 60, height: 60, marginLeft: "80px" }}
              className=""
            >
              <CircularProgressbar
                value={percentage}
                text={
                  <tspan>
                    <tspan
                      dy={12}
                      dx={-5}
                      style={{ fontSize: 28, fontWeight: "bold" }}
                      className="border"
                    >
                      {rem}
                    </tspan>
                  </tspan>
                }
                styles={buildStyles({
                  pathColor: pathcolor,
                  textColor: "#1f2937",
                  trailColor: "#e5e7eb",
                  strokeLinecap: "butt",
                  textSize: "20px",
                })}
              />
            </div>
            <p className="text-xs ml-4">
              {rem<=1 ? 'spot' : 'spots'} <br /> Remaining
            </p>
          </div>
          <div className="mt-1 flex gap-4">
{


  joinedpeople.some(users => users.id == userid) ? <><button className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded text-sm px-10 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 ">Joined</button></> :  <>
            {

              rem === 0 ? <button  className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded text-sm px-8 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 " >Full</button>:  <button
              type="button" onClick={()=>joinevent(specificevent?._id)}
              className="text-white bg-green-700 hover:bg-green-800 focus:outline-none font-medium rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 "
            >
              Join Now
            </button>
            }</>
}



           

           
          </div>
        </div>
      </div>
    </>
  );
}

export default Viewevent;
