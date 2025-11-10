import React, { useEffect, useState } from "react";
import { IoArrowUndo } from "react-icons/io5";
import { Link, useNavigate, useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import { FaRegClock } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import CircularProgress from "@mui/material/CircularProgress";
import { FaPeopleGroup } from "react-icons/fa6";
import Box from "@mui/material/Box";

import { approveapi, getspecificeventadminapi, rejecteventapi } from "../../services/allapi";
import { serverurl } from "../../services/serverurl";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
rejecteventapi


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
 
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 0,
  p: 4,
};
function Adminviewevent() {
   const [open2, setOpen2] = React.useState(false);
   
    const handleClose = () => setOpen2(false);
  const [token, settoken] = useState("");
  const [event, setevent] = useState({});
  const [approvechange,setapprovechange] = useState(false)
  const nav = useNavigate()
  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const [response,setresponse] = useState("")

  const { id } = useParams();

  const confirmreject=async()=>{
    if(!response){
      toast.info("Please provide a valid reason for Rejection",toastConfig)
    }
    else{

        const reqheader = {
      Authorization: `Bearer ${token}`,
    };

    try{

      const res = await rejecteventapi(id,{response , status : "rejected"},reqheader)
      console.log(res);

      if(res.status===200){
        setOpen2(false)
        nav("/adminevents")
        toast.success("Rejected",toastConfig)
      }
      

    }
    catch(err){
      toast.error("Something went wrong",toastConfig)
    }

      

    }
  }

  const getspecificeventadmin = async (id) => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getspecificeventadminapi(id, reqheader);
      // console.log(res);
      if (res.status === 200) {
        setevent(res.data);
      }
    } catch (err) {
      toast.error("Something went wrong", toastConfig);
    }
  };

  const approve = async(id)=>{

    const reqheader={
      'Authorization':`Bearer ${token}`
    }


    try{

      const  res = await approveapi(id,{status : "approved" },reqheader)
      console.log(res);
      if(res.status===200){
        toast.success("Post approved",toastConfig)
        nav("/adminevents")

      }
      

    }
    catch(err){
      toast.error("Something went wrong , Try again later..",toastConfig)
      
    }

    
    
  }

   

  useEffect(() => {
    const tok = sessionStorage.getItem("token");
    if (tok) {
      settoken(tok);
    }
  }, []);

  useEffect(() => {
    if (token && id) {
      getspecificeventadmin(id);
    }
  }, [token, id]);

  const rejectbutton = ()=>{
    setOpen2(true)
  }

   const cancel = async () => {
    setOpen2(false);
  };

  
  return (
    <>
    {/* modal */}
      <Modal
        open={open2}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Stack><textarea name="" value={response} onChange={(e)=>setresponse(e.target.value)} className="placeholder:text-gray-600 text-black  pl-4 pt-4" style={{height:'100px',width:'450px'}} placeholder="Reason For Rejection" id=""></textarea></Stack>
          <Stack
            direction="row"
            gap={5}
            style={{ marginTop: "30px", justifyContent: "center" }}
          >
            <button
              onClick={confirmreject}
              className="text-white bg-gradient-to-r shadow-lg  from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-2 px-8 text-center"
            >
              <Typography>Confirm</Typography>
            </button>
            <button
              onClick={cancel}
              className="text-white bg-gradient-to-r shadow-lg  from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-2 px-8 text-center"
            >
              <Typography>Cancel</Typography>
            </button>
          </Stack>
        </Box>
      </Modal>
      <div className="grid-cols-2 flex w-full">
        <div
          className='w-[50%] h-screen'
          style={{ backgroundSize: "cover",backgroundImage:`url("${serverurl}/eventimagepath/${event?.eventimage}")` }}
        >
          <Link to={"/adminevents"}>
            <div
              className="absolute flex justify-center mt-140 ml-10 rounded-full bg-green-600 p-4 text-white"
              style={{ height: "60px", width: "60px" }}
            >
              <IoArrowUndo className="text-2xl" />
            </div>
          </Link>
        </div>
        <div className="w-[50%] p-10 flex flex-col overflow-y-auto">
          <h2 className="text-3xl font-semibold mb-8  flex items-center text-gray-800">
            {event?.title}
            <span className="px-6 py-2 text-white bg-blue-400/80 text-sm ml-5 rounded">
              {event?.category}
            </span>
          </h2>
          <div className="flex text-gray-400 font-semibold mb-6 items-center ">
            <div className="flex items-center">
              <SlCalender className="text-3xl mr-5 text-green-600" />
              <p>{event?.date}</p>
            </div>
            <div className="flex items-center ml-10">
              <FaLocationDot className="text-3xl mr-5 text-green-600" />
              <a href={event?.locationurl}><p className="cursor-pointer hover:text-green-600">
                {event?.location}
              </p></a>
              <p>,{event?.district}</p>
            </div>
          </div>
          <div className="flex mb-6 text-gray-400 font-semibold items-center ">
            {" "}
            <FaRegClock className="text-3xl mr-5 text-green-600" />
            <p>
              {event?.startingtime} - {event?.endingtime}
            </p>
            <div className="flex text-green-500 font-semibold pl-20 items-center">
              <FaPeopleGroup className="text-3xl" />
              <p className="ml-8">{event?.numberofparticipants}</p>
            </div>
          </div>
          <p className="text-sm font-semibold mb-4">About The event</p>
          <p className="text-gray-500 font-medium mb-5  text-sm text-justify">
            {event?.description}
          </p>

          <p className="text-sm font-semibold mb-4">The plan</p>
          <p className="text-gray-500 font-medium mb-2 text-sm text-justify">
            {event?.plan}
          </p>

          <div className="flex text-xl items-center  py-2 rounded">
            <img
              src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2281862025.jpg"
              style={{ height: "50px" }}
              alt=""
            />
            <p className="ml-4 text-sm">
              Posted by <span className="text-blue-600 ml-2">[ {event?.createdby?.username} ]</span>
            </p>
          </div>
          <div className="mt-2 flex gap-4">
            <button
              type="button"
              onClick={()=>approve(event?._id)}
              class="text-white bg-green-700 hover:bg-green-800 focus:outline-none  font-medium rounded text-sm px-6 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Approve
            </button>

            <button onClick={()=>rejectbutton()}
              type="button"
              class="text-white bg-red-700 hover:bg-red-800 focus:outline-none  font-medium rounded text-sm px-7 py-3 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            >
              Reject
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminviewevent;
