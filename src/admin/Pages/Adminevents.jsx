import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import AdminHeader from "../Components/AdminHeader";
import { CiStar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { admingetalleventsapi } from "../../services/allapi";
import { serverurl } from "../../services/serverurl";
admingetalleventsapi;
import empty from '../../images/greenempty.json'
import Lottie from "lottie-react";

function Adminevents() {
  const [events, setevents] = useState([]);

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const [token, settoken] = useState("");

  const admingetallevents = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };

    try {
      const res = await admingetalleventsapi(reqheader);
      console.log(res);
      if (res.status === 200) {
        setevents(res.data);
      }
    } catch (err) {
      toast.error("Something went wrong", toastConfig);
    }
  };

  useEffect(() => {
    const tok = sessionStorage.getItem("token");

    if (tok) {
      settoken(tok);
    }
  },[]);
  console.log(token);

  useEffect(() => {
    if (token) {
      admingetallevents();
    }
  }, [token]);

  return (
    <>
      <div className="flex flex-col">
        <div className="fixed right-0 left-0 top-0 z-30">
          {" "}
          <AdminHeader></AdminHeader>
        </div>
        <div className="grid-cols-2 flex mt-30">
          <div className="w-[20%] h-screen fixed  bg-green-700">
            <Sidebar></Sidebar>
          </div>
          <div className="w-[80%] overflow-y-auto ml-[20%] p-10 flex flex-wrap gap-10 ">
            {events?.length > 0 ? (
              events.map((item) => {
                return (
                  <Link to={`/adminviewevent/${item?._id}`}>
                    <div key={item?._id}
                      className="relative p-5  rounded-t-sm  shadow-lg max-h-md pb-4 rounded-b-sm"
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
                        <h1 className="text-xs">{item?.startingtime} - {item?.endingtime}</h1>
                        <IoMdTime className="text-md" />
                      </div>

                      <div className="flex justify-between text-gray-500 p-2 ">
                        <h1 className="text-xs">{item?.date}</h1>{" "}
                        <SlCalender className="text-md" />
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
             <div className="flex justify-center items-center w-full flex-col">


              <Lottie animationData={empty} loop={true} autoPlay={true} style={{height:'400px',marginTop:'30px'}}></Lottie>

<h2 className="mt-5">All caught up — no events need your approval right now!</h2>

             </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Adminevents;
