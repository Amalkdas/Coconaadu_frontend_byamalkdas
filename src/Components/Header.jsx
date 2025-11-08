import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
// import Toggle from './Toggle';
import { Dropdown, DropdownDivider, DropdownItem } from "flowbite-react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
profileupdatecontext



import pfp from "../images/pfp.png";
import { serverurl } from "../services/serverurl";
import { profileupdatecontext } from "../contextshare/Profilepictureupdate";

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

function Header() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(false);
  const label = { inputProps: { "aria-label": "Switch demo" } };
  const location = useLocation();
  const nav = useNavigate();


  const {profilepicture,setprofilepicture} = useContext(profileupdatecontext)

  const ishomepage = location.pathname == "/";

  const [isdark, setisdark] = useState(false);

  const [profileimage,setprofileimage] = useState("")

  const [token, settoken] = useState("");

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"));
      let user = JSON.parse(sessionStorage.getItem("user"))
      setprofileimage(user.profile)
    }
  }, [profilepicture]);
  console.log(token);

  const logout = async () => {
    setOpen(true)
  }

    

      const confirm = ()=>{
         const logtoast = toast.loading("Logging out",toastConfig)
         setOpen(false)

    setTimeout(() => {

      toast.dismiss(logtoast)
       sessionStorage.removeItem("user")
        sessionStorage.removeItem("token")
      nav("/login")

    },2000);

      }
      
 

    
    

     
  

  const cancel = async()=>{
    setOpen(false)
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="p" component="p">
          <p className="text-sm font-light">  Are You Sure ?</p>
          </Typography>
          <Stack
            direction="row"
            gap={5}
            style={{ marginTop: "40px", justifyContent: "center" }}
          >
            <button onClick={confirm} className="text-white bg-gradient-to-r shadow-lg  from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-2 px-8 text-center">
              <Typography>Yes</Typography>
            </button>
                <button onClick={cancel} className="text-white bg-gradient-to-r shadow-lg  from-blue-600 via-blue-700 to-blue-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-2 px-8 text-center">
              <Typography>Cancel</Typography>
            </button>
          </Stack>
        </Box>
      </Modal>

      <div
        className={
          ishomepage
            ? "flex justify-between  py-8 px-10 items-center bg-transparent "
            : "flex justify-between   py-10 px-10 items-center bg-white"
        }
      >
        <h1 className="text-4xl text-green-500 font-bold  ">
          Coco<span className="text-green-500">naadu </span>{" "}
        </h1>

        <div className="flex justify-between gap-2 items-center ">
          <nav
            className={
              ishomepage
                ? "flex text-xs py-4 px-15 text-white  items-center font-semibold gap-8"
                : "flex text-xs py-4 text-black  px-15  items-center font-semibold gap-8"
            }
          >
            <Link to={"/"}>
              <a href="">
                <p>Home</p>
              </a>
            </Link>
            <Link to={"/events"}>
              <a href="">
                <p>Events</p>
              </a>
            </Link>
            <Link to={"/about"}>
              <a href="">
                <p>About</p>
              </a>
            </Link>
            <Link to={"/contact"}>
              <a href="">
                <p>Contact</p>
              </a>
            </Link>
          </nav>

          <div className=" flex items-center gap-8">
            {/* <Toggle></Toggle> */}

            {token ? (
              <Dropdown
                className="transition ease-in-out !border-none"
                arrowIcon={false}
                label={
                  <img
                    src={ profileimage == "" ? "https://img.freepik.com/premium-vector/gray-picture-person-with-gray-background_1197690-22.jpg?semt=ais_hybrid&w=740&q=80" : profileimage.startsWith("https") ? profileimage : `${serverurl}/eventimagepath/${profileimage}`}
                    className="rounded-full object-cover"
                   
                    id="Dropdown button"
                    referrerPolicy="no-referrer"
                    alt=""
                    style={{height:'50px',width:'50px'}}
                  />
                }
              >
                <Link to={"/profile"}>
                  <DropdownItem className="drop !bg-white !shadow-lg !py-3 !px-4 text-xs !rounded-bl-none !rounded-br-none !text-black rounded  !cursor-pointer">
                    Profile
                  </DropdownItem>
                </Link>

                <DropdownItem
                  onClick={logout}
                  className="!bg-white !shadow-lg  rounded  text-xs !py-3 !px-4 !rounded-tl-none hover:bg-red-400 !rounded-tr-none   !text-black pb-2 "
                >
                  Log out
                </DropdownItem>
              </Dropdown>
            ) : (
              <Link to="/login">
                <button
                  type="button"
                  className="text-white bg-gradient-to-r shadow-lg  from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-3 px-6 text-center "
                >
                  Get Started
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* dropdown */}
      {/* modal */}
    </>
  );
}

export default Header;
