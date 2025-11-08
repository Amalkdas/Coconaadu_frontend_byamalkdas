import React from 'react'
import Header from '../../Components/Header';
import Profilesidebar from './Profilesidebar';
import { useState } from 'react';
import { useEffect } from 'react';
import { joinedeventsapi, leaveapi } from '../../services/allapi';
import { serverurl } from '../../services/serverurl';
import { CiStar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
Link
import { IoIosChatboxes } from "react-icons/io";
import { Link } from 'react-router-dom';
import { GiExitDoor } from "react-icons/gi";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { toast } from 'react-toastify';
import empty from '../../images/greenempty.json'
import Lottie from 'lottie-react';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};



function Joined() {

  const [eventid,seteventid] = useState(null)

 

   const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  
   const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

    const [token,settoken] = useState("")

    useEffect(()=>{
        const tok = sessionStorage.getItem("token")

        if(tok){
            settoken(tok)
        }
    },[])

    const [joinedevents,setjoinedeevnts] = useState([])


    const getjoinedevents = async()=>{
        const reqheader = {
            'Authorization' : `Bearer ${token}`
        }
        try{

            const res = await joinedeventsapi(reqheader)
            console.log(res);
            if(res.status==200){
                setjoinedeevnts(res.data)
            }
            

        }
        catch(err){
            console.log(err);
            
        }
    }



    const cancel =()=>{
      handleClose()
    }


    // delete


      const handleOpen = async (id) => {

      
seteventid(id)
        setOpen(true)
}

// leaveevent


  const leave = async()=>{
            const reqheader = {
          'Authorization' : `Bearer ${token}`


          




        }
        try{
    const res = await leaveapi(eventid,reqheader)
    console.log(res);
    if(res.status===200){
      toast.success("Left the event , Payment not refunded",toastConfig)
      seteventid(null)
      setOpen(false)
      getjoinedevents()
    }
    

}
catch(err){
  console.log(err);
  
}

        }
    useEffect(()=>{

        if(token){

             getjoinedevents()

        }
       
    },[token])
  return (
   <>
   
     <div className="flex flex-col h-screen">
        <div className="fixed right-0 left-0 top-0 z-40">
          <Header></Header>
        </div>

        <div className="flex grid-cols-2 mt-32  gap-5">
          <div className="w-[20%] fixed h-screen ">
            <Profilesidebar></Profilesidebar>
          </div>
          <div
            className="w-[80%]   gap-8 p-10 items-start rounded flex-wrap     ml-[22%] overflow-y-auto flex  "
            style={{ minHeight: "80vh" }}
          >

{


    joinedevents.length>0 ? joinedevents.map((item)=>{
        return (

            <>

              <div  className="relative max-w-xs bg-white  rounded-t-sm p-5 shadow-lg max-h-sm pb-5 rounded-b-sm">

 <img
                      src={`${serverurl}/eventimagepath/${item?.eventimage}`}
                      className="block  m-0 p-0 align-top rounded-t-sm h-[200px] w-[400px] object-cover"
                      alt="Playstation"
                    />

                     <div className=" pt-5">
                      <h2 className="font-semibold text-2xl">{item?.title}</h2>
                      <p className="mt-1 text-xs font-medium text-gray-400">
                        {item?.date}, {item?.location}
                      </p>
                    </div>
                    

                                           

<div className='flex justify-center gap-3 items-center mt-2'>

    
     <Link to={`/chat/${item?._id}`} state={{ from : "/joined"}} className='w-full '> <div  type="button" className='w-full flex cursor-pointer items-center justify-center mt-2 rounded bg-blue-500 py-2.5 text-white'>


 <IoIosChatboxes className="text-xl" />

                                                                </div></Link>                                                          


                                                                <div onClick={()=>handleOpen(item?._id)} className='w-full cursor-pointer flex justify-center mt-2 rounded bg-red-500 py-3 text-white'><GiExitDoor className='text-lg' /></div>




</div>


              </div>
           
            
            
            
            
            </>

        )
    }) : <div className='w-full flex items-center justify-center flex-col'>


      <Lottie animationData={empty} autoPlay={true} loop={true} style={{height:'400px'}}></Lottie>
      <h2 className='mt-5'>No joined events yet. Browse upcoming events and start participating!</h2>



    </div>
}


{/* modal for events */}

 <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{}}>
            <p className='justify' >  You have requested to leave the event. Please note that as per our policy, payments are non-refundable once confirmed. By proceeding, you acknowledge and accept that no refund will be issued.
</p>
         

          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} style={{}}>

            <p className='justify'>If you agree , To confirm, please click the Leave button below
</p>

            <p></p>
          </Typography>
          <div className='flex justify-center gap-4 mt-10'>

<button className='bg-blue-500 px-6 py-2 text-white rounded' onClick={leave}>Leave</button>
<button className='bg-red-500 px-6 py-2 text-white rounded' onClick={cancel}>Cancel</button>

          </div>
        </Box>
      </Modal>

          
          </div>
        </div>
      </div>
   </>
  )
}

export default Joined
