import React from "react";
import Header from "../../Components/Header";
import Profilesidebar from "./Profilesidebar";
import { Card } from "flowbite-react";
import { useState } from "react";
import { useEffect } from "react";
import { deleteeventapi, getusereventstatusapi } from "../../services/allapi";
import { serverurl } from "../../services/serverurl";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { IoIosChatboxes } from "react-icons/io";
import { Link } from "react-router-dom";

Link

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0",
  boxShadow: 0,
  p: 4,
};

function Eventstatus() {
  const [token, settoken] = useState("");
  const [isdeletingid, setisdeletingid] = useState(null);
  const [deleteid, setdeleteid] = useState("");
  const handleClose = () => setOpen2(false);
  const [open2, setOpen2] = React.useState(false);

  const [eventstatus, seteventstatus] = useState([]);
  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    const tok = sessionStorage.getItem("token");
    if (tok) {
      settoken(tok);
    }
  }, []);

  const getusereventstatus = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getusereventstatusapi(reqheader);
      console.log(res);
      if (res.status === 200) {
        seteventstatus(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (token) {
      getusereventstatus();
    }
  }, [token]);

  const cancel = async () => {
    setOpen2(false);
  };

  const confirmdeletevent = async () => {
    setisdeletingid(deleteid);

    const reqheader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const res = await deleteeventapi(deleteid, reqheader);
      console.log(res);
      if (res.status === 200) {
        console.log(res);

        setOpen2(false);

        const toastload = toast.loading("deleting...", toastConfig);
        setTimeout(() => {
          toast.update(toastload, {
            render: "Successfully deleted",
            isLoading: false,
            type: "success",
            ...toastConfig,
          });
        }, 1500);
        await getusereventstatus();
        setdeleteid("");
        setisdeletingid(null);
      }
    } catch (err) {
      toast.error("Something went wrong", toastConfig);
    }
  };

  const deleteevent = async (id) => {
    setOpen2(true);
    setdeleteid(id);
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
          <Typography id="modal-modal-title" variant="h6" component="h1">
            <h1 className="text-sm"> Are You Sure ?</h1>
          </Typography>
          <Stack
            direction="row"
            gap={5}
            style={{ marginTop: "40px", justifyContent: "center" }}
          >
            <button
              onClick={() => confirmdeletevent()}
              className="text-white bg-gradient-to-r shadow-lg  from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-2 px-8 text-center"
            >
              <Typography>Yes</Typography>
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
      <div className="flex flex-col h-screen">
        <div className="fixed right-0 left-0 top-0 z-40">
          <Header></Header>
        </div>

        <div className="flex grid-cols-2 mt-32  gap-5">
          <div className="w-[20%] fixed h-screen ">
            <Profilesidebar></Profilesidebar>
          </div>
          <div
            className="w-[80%]   gap-8 p-10 items-start rounded    ml-[22%] overflow-y-auto flex  "
            style={{ minHeight: "80vh" }}
          >
            {eventstatus?.length > 0 ? (
              eventstatus.map((item) => {
                return (
                  <div className="relative max-w-xs bg-white  rounded-t-sm p-5 shadow-lg max-h-sm pb-5 rounded-b-sm">
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

                    {item?.status === "pending" ? (
                      <>
                        <div className="flex justify-center  mt-4 items-center gap-3">
                          <div className="bg-amber-400 w-[120px] shadow-lg  flex justify-center py-2 rounded text-white font-semibold">
                            <p>PENDING</p>
                          </div>

                          {isdeletingid == item?._id ? (
                            <></>
                          ) : (
                            <button
                              type="button"
                              onClick={() => deleteevent(item?._id)}
                              className="text-white bg-gradient-to-r from-red-400 w-[120px] via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded text-sm py-2.5 text-center me-2 "
                            >
                              <p>DELETE</p>
                            </button>
                          )}
                        </div>
                      </>
                    ) : item?.status === "approved" ? (

<>

<div className="flex justify-center items-center gap-5">


 <div className="bg-blue-400 w-[120px] shadow-lg mt-3 flex justify-center p-2 rounded text-white font-semibold">
                        <p>LIVE</p>
                      </div>

<Link to={`/chat/${item._id}`} state={{from : "/eventstatus"}}>  <div type="button" className="bg-blue-400 w-[120px] shadow-lg  items-center mt-3 flex justify-center py-2.5 rounded text-white font-semibold">

                        <IoIosChatboxes className="text-xl" />
                      </div></Link>
                    





</div>


</>


                     
                    ) : (
                      item?.status === "rejected" && (
                        <div className="flex justify-center mt-4 gap-3 items-center ">
                          <div className="bg-red-400 group relative cursor-pointer w-[120px] shadow-lg  flex justify-center py-2 rounded text-white font-semibold">
                            <p className="">REJECTED</p>
                            <div
                              style={{ width: "300px" }}
                              className="opacity-0 z-50 p-4 font-light text-base rounded shadow-lg bg-white left-20 bottom-20 border-black  group-hover:opacity-100 absolute transition ease-in-out duration-300"
                            >
                              <p className="text-black">{item?.response}</p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteevent(item?._id)}
                            className="text-white bg-gradient-to-r from-red-400 w-[120px] via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded text-sm py-2.5 text-center  "
                          >
                            <p>DELETE</p>
                          </button>
                        </div>
                      )
                    )}
                    
                  </div>
                );
              })
            ) : (
              <div className="w-full flex flex-col gap-5 justify-center items-center pt-40">
                <h2 className="text-4xl font-semibold">No Events Yet</h2>
                <p className="text-sm text-gray-500">
                  Start by creating your first event — it only takes a minute!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Eventstatus;

//state fr id storage , deletingid for which id is deleting to hide the delte button while deleting to avoid user doble clicks
