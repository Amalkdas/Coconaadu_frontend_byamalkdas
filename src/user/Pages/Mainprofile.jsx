"use client";

import React, { useContext, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { LuPencil } from "react-icons/lu";
import Header from "../../Components/Header";
import Profilesidebar from "./Profilesidebar";
import img from "../../images/bg.png";
import { FaUserEdit } from "react-icons/fa";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import { useEffect } from "react";


import {
  getuserapi,
  updatepassworduserapi,
  updateuserapi,
  updateuseronlyapi,
} from "../../services/allapi";
import { toast } from "react-toastify";
import { serverurl } from "../../services/serverurl";
import { profileupdatecontext } from "../../contextshare/Profilepictureupdate";


function Mainprofile() {
  const [token, settoken] = useState("");
  const [existingpic, setexistingpic] = useState("");

  const {googleauthusers,setgoogleauthusers} = useContext(profileupdatecontext)
  const [userpassword, setuserpassword] = useState({
    password: "",
    newpassword: "",
    confirmnewpassword: "",
    usinggoogleauth:""
  });
  const [userdata, setuserdata] = useState({
    username: "",
    email: "",
    bio: "",
  });

  const { profilepicture, setprofilepicture } =
    useContext(profileupdatecontext);

  console.log(userdata);

  const [preview, setpreview] = useState("");

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleDrawer2 = (newOpen) => () => {
    setOpen2(newOpen);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"));
      let user = JSON.parse(sessionStorage.getItem("user"));
      setuserdata({
        ...userdata,
        username: user.username,
        email: user.email,
        bio: user.bio,
      });
      setexistingpic(user.profile);

      setuserpassword({...userpassword,
            password: "",
    newpassword: "",
    confirmnewpassword: "",
    usinggoogleauth:user.usinggoogleauth

      })
    }
  }, [profilepicture,googleauthusers]);

  const handleupload = async (e) => {
    console.log(e.target.files[0]);

    if (e.target.value[0] !== "") {
      const url = URL.createObjectURL(e.target.files[0]);
      console.log(url);
      setpreview(url);
      setexistingpic(e.target.files[0]);
    }
  };

  const reset = async () => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    setuserdata({
      ...userdata,
      newusername: user.username,
      newemail: user.email,
    });
    setexistingpic(user.profile);

    setpreview("");
  };

  const submit = async () => {
    const { username, email, bio, profile } = userdata;

    if (!username || !email || !bio) {
      toast.warn("Please Fill all Fields");
    } else {
      const reqheader = {
        Authorization: `Bearer ${token}`,
      };

      if (preview) {
        const reqbody = new FormData();

        for (let key in userdata) {
          reqbody.append(key, userdata[key]);
        }
        reqbody.append("profile", existingpic);
        try {
          const res = await updateuseronlyapi(reqbody, reqheader);
          console.log(res);
          if (res.status == 200) {
            toast.success("Successfully Updated", toastConfig);
            sessionStorage.setItem("user", JSON.stringify(res.data));
            setprofilepicture(res.data);
            setOpen(false)
          }
        } catch (err) {
          console.log(err);
        }
      } else if (!preview) {
        try {
          const res = await updateuseronlyapi(
            { username, email, profile: existingpic, bio },
            reqheader
          );
          console.log(res);
          if (res.status == 200) {
            toast.success("Successfully Updated", toastConfig);
            sessionStorage.setItem("user", JSON.stringify(res.data));
            setprofilepicture(res.data);
            setOpen(false)
          }
        } catch (err) {
          console.log(err);
        }
      }
    }
  };

  const DrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <div className="flex flex-col justify-center ">
        <div className="flex justify-center py-15 relative">
          <img
            src={
              preview
                ? preview
                : existingpic == ""
                ? "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
                : existingpic.startsWith("https")
                ? existingpic
                : `${serverurl}/eventimagepath/${existingpic}`
            }
            alt=""
            style={{
              height: "150px",
              width: "150px",
              backgroundPosition: "center",
            }}
            alt=""
            className="object-cover rounded-full"
          />

          <label htmlFor="pic">
            {" "}
            <div className="absolute bottom-12 border-2 border-white left-45 bg-blue-500 rounded-full text-white flex justify-center p-2">
              <FaPlus className="" />
            </div>
          </label>

          <input
            type="file"
            id="pic"
            onChange={(e) => handleupload(e)}
            style={{ display: "none" }}
          />
        </div>
        <div className="flex flex-col px-10  pt-2 pb-5 gap-5 mb-4">
          <input
            type="text"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter new Username"
            value={userdata?.username}
            onChange={(e) =>
              setuserdata({ ...userdata, username: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter new email"
            value={userdata?.email}
            onChange={(e) =>
              setuserdata({ ...userdata, email: e.target.value })
            }
          />
          <textarea
            name=""
            id=""
            type="text"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Bio"
            value={userdata?.bio}
            onChange={(e) => setuserdata({ ...userdata, bio: e.target.value })}
          ></textarea>
        </div>

        <div className="flex gap-3 px-4 mt-2  w-full justify-center">
          <button
            type="button"
            onClick={submit}
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Update
          </button>

          <button
            type="button"
            class="py-2.5 px-6 !bg-red-500 me-2 mb-2 text-sm font-medium !text-white focus:outline-none  rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            onClick={reset}
          >
            Reset
          </button>
        </div>
      </div>
    </Box>
  );

   const passwordcancel =()=>{
    if(userpassword.usinggoogleauth==false){

      setuserpassword({...userpassword,
        password:"",
        newpassword:"",
        confirmnewpassword:""
      })

    }else if(userpassword.usinggoogleauth==true){
      setuserpassword({...userpassword,
        newpassword:"",
        confirmnewpassword:""
      })
    }
  }

  const passwordsubmit=async()=>{

    const {password,newpassword,confirmnewpassword,usinggoogleauth} = userpassword

    const reqheader = {
      'Authorization' : `Bearer ${token}`
    }

    if(userpassword.usinggoogleauth==false){

      if(!password || !newpassword || !confirmnewpassword){
        toast.warn("Please Fill all Fields",toastConfig)
      }
      else{

        if(newpassword !== confirmnewpassword){
          toast.warn("Oops! Those passwords don’t match. Let’s try again.",toastConfig)
        }
        else{
          try{

            const res = await updatepassworduserapi({password,newpassword},reqheader)
            console.log(res);

            if(res.status===200){
              toast.success("Updated Successfully",toastConfig)
              setOpen2(false)
              sessionStorage.setItem("user",JSON.stringify(res.data))
              setgoogleauthusers(res.data)
              setOpen2(false)
            }
            else if(res.status===409){
              toast.error(res.data,toastConfig)
            }
            
            else if(res.status==402){
              toast.error(res.data,toastConfig)
            }

          }
          catch(err){
            toast.error(err.response.message)
            
          }
        }

      }

    }
    else if(userpassword.usinggoogleauth==true){

      if(!newpassword || !confirmnewpassword){
        toast.warn("Please Fill all Fields",toastConfig)
      }
      else if(newpassword !== confirmnewpassword){
        toast.warn("Oops! Those passwords don’t match. Let’s try again.",toastConfig)
      }
      else{
        try{

          const res =  await updatepassworduserapi({newpassword},reqheader) 
            if(res.status===200){
              toast.success("Update Successfull",toastConfig)
              sessionStorage.setItem("user",JSON.stringify(res.data))
              setOpen2(false)
              setgoogleauthusers(res.data)
            }
              else if(res.status===400){
              toast.error(res.data.response,toastConfig)
            }

        }
        catch(err){
          toast.error("Something went wrong")
          
        }

      }

    }
    
  }

  const passwordDrawerList = (
    <Box sx={{ width: 300 }} role="presentation">
      <div className="flex flex-col items-center justify-center ">
        <img
          src="https://static.vecteezy.com/system/resources/previews/035/333/327/non_2x/reset-password-icon-repeat-safety-icon-lock-reload-icon-on-white-background-vector.jpg"
          alt=""
          style={{ height: "150px", width: "150px" }}
          className="mt-15"
        />

        <div className="mt-10 w-full flex justify-center flex-col px-8 gap-5">
          {" "}{


userpassword.usinggoogleauth == true ? <>
 <input
            type="password"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter New Password"
            onChange={(e)=>setuserpassword({...userpassword,
              newpassword:e.target.value

            })}
            value={userpassword?.newpassword}

          />
           <input
            type="password"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Confirm  New Password"
            onChange={(e)=>setuserpassword({...userpassword,confirmnewpassword:e.target.value})}
            value={userpassword?.confirmnewpassword}
            
          />
          
          </>:<>
            <input
            type="password"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter Password"
             onChange={(e)=>setuserpassword({...userpassword,password:e.target.value})}
             value={userpassword?.password}
          />
          <input
            type="password"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter New Password"
             onChange={(e)=>setuserpassword({...userpassword,newpassword:e.target.value})}
             value={userpassword?.newpassword}
          />
          <input
            type="password"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Confirm New Password"
             onChange={(e)=>setuserpassword({...userpassword,confirmnewpassword:e.target.value})}
             value={userpassword?.confirmnewpassword}
          /></>
          }
        
        </div>

        <div className="w-full flex justify-center mt-10 gap-4">
          <button
            type="button"
            onClick={passwordsubmit}
            class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br  dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Submit
          </button>
          <button
            type="button"
            onClick={passwordcancel}
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br  font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </Box>
  );

 

  return (
    <>
      <div className="flex flex-col h-screen ">
        <div className="fixed z-40  top-0 left-0 right-0 ">
          <Header></Header>
        </div>
        <div className="grid-cols-2 mt-34 flex  gap-5 ">
          <div className="w-[20%] h-screen fixed   border-gray-200    rounded ">
            <Profilesidebar></Profilesidebar>
          </div>
          <div className=" z-2 border-2 ml-[22%] w-full overflow-y-auto  border-gray-200 rounded shadow-lg flex flex-col">
            <div
              className=""
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                height: "450px",
                backgroundPosition: "bottom",
              }}
            ></div>
            <div className="flex px-15 py-10 gap-10 ">
              <img
                src={
                  typeof existingpic !== "string"
                    ? "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
                    : existingpic == ""
                    ? "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
                    : existingpic.startsWith("https")
                    ? existingpic
                    : `${serverurl}/eventimagepath/${existingpic}`
                }
                className="rounded-full object-cover"
                style={{ height: "120px", width: "120px" }}
                alt=""
              />

              <div className="flex flex-col ">
                <h1 className="text-xl mb-1">{userdata?.username}</h1>
                <p className="text-md text-green-600 font-medium mb-5">
                  @communityuser
                </p>
                <p className="text-sm text-justify mb-5">{userdata?.bio}</p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    className="text-white bg-green-700 hover:bg-green-800  font-medium rounded shadow-lg text-sm px-6 py-3 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700"
                    onClick={toggleDrawer(true)}
                  >
                    Edit user details
                  </button>
                  <button
                    onClick={toggleDrawer2(true)}
                    className="text-white bg-blue-700 hover:bg-blue-800  font-medium rounded shadow-lg text-sm px-4 py-3 text-center me-2 mb-2  dark:hover:bg-blue-700 "
                  >
                    Reset password
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* drawer */}

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>
      <Drawer open={open2} onClose={toggleDrawer2(false)} anchor="left">
        {passwordDrawerList}
      </Drawer>
    </>
  );
}

export default Mainprofile;
