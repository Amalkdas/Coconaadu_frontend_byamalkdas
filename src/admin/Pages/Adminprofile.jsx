import React, { useContext } from "react";
import AdminHeader from "../Components/AdminHeader";
import Sidebar from "../Components/Sidebar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useState } from "react";
import { useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import { serverurl } from "../../services/serverurl";
import { newpasswordapi, updateuserapi } from "../../services/allapi";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { toast } from "react-toastify";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { profileupdatecontext } from "../../contextshare/Profilepictureupdate";

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

function Adminprofile() {
  const { profilepicture, setprofilepicture } =
    useContext(profileupdatecontext);
  const nav = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [drawer2, setdrawer2] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const handleOpen = () => setOpen(false);
  const handleClose = () => setOpen(false);
  const [token, settoken] = useState();

  const [data, setdata] = useState({
    email: "",
    lastlogin: "",
  });

  const [existingpic, setexistingpic] = useState("");

  const [preview, setpreview] = useState("");
  const [passwordreset, setpasswordreset] = useState({
    password: "",
    newpassword: "",
    confirmnewpassword: "",
  });
  // console.log(passwordreset);

  // password updating
  const updatepassword = async () => {
    const { password, newpassword, confirmnewpassword, forcheckingpassword } =
      passwordreset;
    if (!password || !newpassword || !confirmnewpassword) {
      toast.info("Please fill all fields", toastConfig);
    } else {
      if (newpassword !== confirmnewpassword) {
        toast.error(
          "Oops! Your new password and confirmation don’t match.",
          toastConfig
        );
      } else {
        const reqheader = {
          Authorization: `Bearer ${token}`,
        };

        try {
          const res = await newpasswordapi(
            { newpassword, password },
            reqheader
          );
          if (res.status === 200) {
            setprofilepicture(res.data);
            setpasswordreset({
              password: "",
              newpassword: "",
              confirmnewpassword: "",
            });
            setOpen2(false)
            toast.success("Password updated Successfully", toastConfig);
            setdrawer2(true);
          } else if (res.status === 400) {
            toast.error(
              "New password can't be the same as current.",
              toastConfig
            );
          } else if (res.status === 401) {
            toast.error(
              "current password Doesn't match our records",
              toastConfig
            );
          }
        } catch (err) {
          toast.error("Something went wrong", toastConfig);
        }
      }
    }
  };

  const passowrdinputreset = async () => {
    setpasswordreset({
      password: "",
      newpassword: "",
      confirmnewpassword: "",
    });
  };

  const [userdata, setuserdata] = useState({
    newusername: "",
    newemail: "",

    profile: "",
  });

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      settoken(sessionStorage.getItem("token"));
      let user = JSON.parse(sessionStorage.getItem("user"));

      const pic =user.profile
      setexistingpic(pic)
     
      setuserdata({
        ...userdata,
        newusername: user.username,
        newemail: user.email,
        profile: pic,
      });

      setdata({ ...data, email: user.email, lastlogin: user.lastlogin });
    }
  }, [profilepicture]);
  //file handling details
  const handleupload = async (e) => {
    console.log(e.target.files[0]);
    setuserdata({ ...userdata, profile: e.target.files[0] });

    if (e.target.value[0] !== "") {
      const url = URL.createObjectURL(e.target.files[0]);
      console.log(url);
      setpreview(url);
    }
  };
  //details submit
  const submit = async () => {
    const { newusername, newemail, profile } = userdata;

    const reqheader = {
      Authorization: `Bearer ${token}`,
    };

    if (preview) {
      const reqbody = new FormData();

      for (let key in userdata) {
        if (key != "confirmpassword") {
          reqbody.append(key, userdata[key]);
        }
      }

      const res = await updateuserapi(reqbody, reqheader);
      console.log(res);
      if (res.status == 200) {
        toast.success("Successfully Updated", toastConfig);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setprofilepicture(res.data)
        setpreview("")
        setOpen(false);
      }
    } else {
      const res = await updateuserapi(
        { newusername, newemail, profile: existingpic },
        reqheader
      );
      console.log(res);
      if (res.status == 200) {
        toast.success("Successfully Updated", toastConfig);
        sessionStorage.setItem("user", JSON.stringify(res.data));
        setprofilepicture(res.data)
        setOpen(false);
      }
    }
  };

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const toggleDrawer2 = (newOpen) => () => {
    setdrawer2(newOpen);
  };
  const DrawerList2 = (
    <Box
      sx={{ width: 300, height: "100%" }}
      role="presentation"
      className=""
      direction="left"
    >
      <div className="flex flex-col h-full justify-center px-10 border gap-8">
        <input
          type="password"
          value={passwordreset.password}
          onChange={(e) =>
            setpasswordreset({ ...passwordreset, password: e.target.value })
          }
          className="py-3 ps-4 text-sm  bg-gray-100 placeholder:text-sm"
          placeholder="Enter password"
        />
        <input
          type="password"
          value={passwordreset.newpassword}
          onChange={(e) =>
            setpasswordreset({ ...passwordreset, newpassword: e.target.value })
          }
          className="py-3 ps-4 text-sm bg-gray-100 placeholder:text-sm"
          placeholder="Enter new password"
        />
        <input
          type="password"
          value={passwordreset.confirmnewpassword}
          onChange={(e) =>
            setpasswordreset({
              ...passwordreset,
              confirmnewpassword: e.target.value,
            })
          }
          className="py-3 ps-4 text-sm  bg-gray-100 placeholder:text-sm"
          placeholder="confirm new password"
        />
        <Stack direction={"row"} className="w-full justify-center mt-2" gap={2}>
          <button
            type="button"
            onClick={updatepassword}
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Update
          </button>
          <button
            type="button"
            onClick={passowrdinputreset}
            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Reset
          </button>
        </Stack>
      </div>
    </Box>
  );

  //details draer
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
                : `${serverurl}/eventimagepath/${existingpic}`
            }
            style={{
              height: "150px",
              width: "150px",
              backgroundPosition: "center",
            }}
            alt=""
            className="object-cover rounded-full"
          />

          <img src="" alt="" />

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
        <div className="flex flex-col px-10  pt-5 pb-5 gap-5 mb-4">
          <input
            type="text"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter new Username"
            value={userdata?.newusername}
            onChange={(e) =>
              setuserdata({ ...userdata, newusername: e.target.value })
            }
          />
          <input
            type="text"
            className="bg-gray-100 py-3 px-4 rounded placeholder:text-xs"
            placeholder="Enter new email"
            value={userdata?.newemail}
            onChange={(e) =>
              setuserdata({ ...userdata, newemail: e.target.value })
            }
          />
        </div>

        <div className="flex gap-3 px-4 mt-2  w-full justify-center">
          <button
            type="button"
            onClick={submit}
            class="focus:outline-none text-white bg-green-700 hover:bg-green-800  font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Update
          </button>
        </div>
      </div>
    </Box>
  );

  //log out button
  const logout = async () => {
    setOpen2(true);
  };
  //confirm
  const confirm = () => {
    const logtoast = toast.loading("Logging out", toastConfig);
    setOpen2(false);

    setTimeout(() => {
      toast.dismiss(logtoast);
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      nav("/login");
    }, 2000);
  };
  //cancel
  const cancel = async () => {
    setOpen2(false);
  };

  return (
    <>
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
              onClick={confirm}
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
      <div className="flex flex-col">
        <div className="fixed right-0 left-0 top-0 z-30">
          {" "}
          <AdminHeader></AdminHeader>
        </div>
        <div className="grid-cols-2 flex mt-30">
          <div className="w-[20%] h-screen fixed  bg-green-700">
            <Sidebar></Sidebar>
          </div>
          <div className="w-[80%] overflow-y-auto ml-[20%] bg-gray-200 p-10 flex flex-col">
            <div className="flex justify-between mb-5">
              {" "}
              <p className=" text-md font-medium   ">My Profile</p>
              <button
                type="button"
                onClick={logout}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Log out
              </button>
            </div>

            <div className="bg-white shadow-lg border pl-10 py-5 items-center rounded flex">
             

              <img
                src={
                  typeof existingpic !== "string"
                    ? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid&w=740&q=80"
                    : existingpic == ""
                    ? "https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?semt=ais_hybrid&w=740&q=80"
                    : `${serverurl}/eventimagepath/${existingpic}`
                }
                alt=""
                className="rounded-full object-cover border-gray-300 border"
                style={{ height: "100px", width: "100px" }}
             
              />
              <div className="flex flex-col justify-center p-10">
                <p className="mt-1 text-sm">Admin</p>
                <p className="text-xs">Last login : {data?.lastlogin}</p>
              </div>
            </div>

            <div className="border bg-white shadow-lg flex flex-col mt-5 rounded">
              <div className="flex justify-between px-10 pt-8 items-center">
                {" "}
                <p className="text-gray-600 text-xl font-semibold ">
                  Information
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={toggleDrawer2(true)}
                    className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Reset Password
                  </button>

                  <button
                    type="button"
                    className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                    onClick={toggleDrawer(true)}
                  >
                    edit details
                  </button>
                </div>
              </div>
              <div className="grid-cols-2 flex w-full mt-5">
                <div className="flex flex-col pl-15 pt-5 w-[50%]">
                  <h1 className="text-sm">Email</h1>
                  <h1 className="text-xs font-light mt-1">{data?.email}</h1>
                </div>
                <div></div>
              </div>
              <div className="grid-cols-2 flex w-full">
                <div className="flex flex-col pl-15 py-10 w-[50%]">
                  <h1 className="text-sm">Password</h1>
                  <h1 className="text-xs font-light mt-1">*******</h1>
                </div>

                <div className="flex flex-col pl-15 py-10 w-[50%]">
                  <h1 className="text-sm">Role</h1>
                  <h1 className="text-xs font-light mt-1">Admin</h1>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* drawer */}

      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        {DrawerList}
      </Drawer>

      <Drawer open={drawer2} onClose={toggleDrawer2(false)} anchor="left">
        {DrawerList2}
      </Drawer>
    </>
  );
}

export default Adminprofile;

//states for handling the boolean , hablers(toogle drawer for controlling the state,)
//drawerlist contains the content , child of darewr component
//and drwer compinent dettermines when to show and and close , open when state is true , or close when the ahndler function passess false
