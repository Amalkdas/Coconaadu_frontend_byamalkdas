import React, { useEffect, useRef } from "react";
import Header from "../../Components/Header";
import Profilesidebar from "./Profilesidebar";
import { Button } from "flowbite-react";
import { FaCamera } from "react-icons/fa";
import { useState } from "react";
import { toast } from "react-toastify";
import { addeventapi } from "../../services/allapi";


function Createevent() {
  const [token, settoken] = useState("");

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const imguploadref = useRef();
  const [eventdetails, seteventdetails] = useState({
    eventimage: "",
    title: "",
    location: "",
    locationurl: "",
    date: "",
    startingtime: "",
    endingtime: "",
    numberofparticipants: 0,
    description: "",
    district: "",
    category: "",
    plan: "",
  });

  const [preview, setpreview] = useState("");

  const resetall = () => {
    seteventdetails({
      eventimage: "",
      title: "",
      location: "",
      locationurl: "",
      date: "",
      startingtime: "",
      endingtime: "",
      numberofparticipants: 0,
      description: "",
      district: "",
      category: "",
      plan: "",
    });

    setpreview("");
    seteventdetails((prevdata) => ({ ...prevdata, eventimage: "" }));
  };
  console.log(eventdetails);

  const handleupload = async (e) => {
    console.log(e.target.files);

    const img = e.target.files[0];

    if (img) {
      seteventdetails((prevdata) => ({ ...prevdata, eventimage: img }));
    }
    const url = URL.createObjectURL(img);

    console.log(url);

    setpreview(url);
  };

  const replace = async () => {
    seteventdetails((prevdata) => ({ ...prevdata, eventimage: "" }));

    if (imguploadref.current) {
      imguploadref.current.click();
    }
  };

  const submitevent = async () => {
    const {
      eventimage,
      title,
      location,
      locationurl,
      date,
      startingtime,
      endingtime,
      numberofparticipants,
      description,
      district,
      category,
      plan,
    } = eventdetails;

   

    if (
      !eventimage ||
      !title ||
      !location ||
      !locationurl ||
      !date ||
      !startingtime ||
      !endingtime ||
      !numberofparticipants ||
      !description ||
      !district ||
      !category ||
      !plan
    ) {
      toast.info("Please Fill all fields", toastConfig);
    } else {
      const eventdetailscopy = { ...eventdetails };

      const dateinput = eventdetails.date;

      if (dateinput) {
        ///foing this to get the adte in a particular formar 15 november 2025

        //foing all this toensure the date formatting by not doing in the onchannge function,and to reset the adye input while reset button

        const dateobject = new Date(dateinput);
        const day = dateobject.getDate();

        const month = dateobject.toLocaleString("default", { month: "long" });
        console.log(month);
        const year = dateobject.getFullYear();

        eventdetailscopy.date = `${day} ${month} ${year}`;
      }

      const reqbody = new FormData();

      for (let key in eventdetailscopy) {

       
           reqbody.append(key, eventdetailscopy[key]);

      
        
       
      }
      

      const reqheader = {
        Authorization: `Bearer ${token}`,
      };

      try {
        const res = await addeventapi(reqbody, reqheader);
        console.log(res);
        if(res.status===200){
          toast.success("successfully posted",toastConfig)


          seteventdetails({
      eventimage: "",
      title: "",
      location: "",
      locationurl: "",
      date: "",
      startingtime: "",
      endingtime: "",
      numberofparticipants: 0,
      description: "",
      district: "",
      category: "",
      plan:"",
    });
     setpreview("")
        }
        else if(res.status===409){

          toast.warning(res.data,toastConfig)

        }
       
        
      } catch(err){
        toast.error("something went wrong",toastConfig)
        
      }
    }
  };

  useEffect(() => {
    const tok = sessionStorage.getItem("token");

    if (tok) {
      settoken(tok);
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="top-0 fixed left-0 right-0 z-40">
          <Header></Header>
        </div>

        <div className="grid-cols-2 mt-32 flex  gap-5">
          <div className="w-[20%]  h-screen fixed  border-gray-200    rounded ">
            <Profilesidebar></Profilesidebar>
          </div>
          <div className="w-[80%]  z-2 border-2 ml-[22%] py-15 overflow-y-auto bg-green-700  border-gray-200 rounded shadow-lg flex flex-col">
            <h2 className="text-center  text-4xl mb-15 font-bold text-white  ">
              Host a Community Event
            </h2>
            <div className="flex grid-cols-3 ">
              <div className="w-[33%] flex justify-center items-center ">
                <input
                  type="file"
                  id="imgupload"
                  ref={imguploadref}
                  style={{ display: "none" }}
                  onChange={(e) => handleupload(e)}
                />
                {preview ? (
                  <div className="flex flex-col">
                    <img
                      src={preview}
                      className="border-white border-2 "
                      height={"250px"}
                      width={"250px"}
                    ></img>

                    <button
                      onClick={() => {
                        replace();
                      }}
                      className="mt-5 bg-blue-400 text-white rounded p-2"
                    >
                      Replace Photo
                    </button>
                  </div>
                ) : (
                  <div
                    className=" border-dotted border border-white flex flex-col justify-center items-center"
                    style={{ height: "250px", width: "250px" }}
                  >
                    <label htmlFor="imgupload" className="flex flex-col">
                      {" "}
                      <FaCamera className="text-white text-4xl mx-auto" />
                      <p className="mt-5 text-white font-medium text-sm">
                        Upload Event Image
                      </p>
                    </label>
                  </div>
                )}
              </div>
              <div className="w-[33%] flex flex-col">
                <input
                  type="text"
                  className="p-2 mb-4 border bg-white border-gray-300 rounded   placeholder:text-sm "
                  placeholder="Even Title"
                  value={eventdetails.title}
                  onChange={(e) =>
                    seteventdetails({ ...eventdetails, title: e.target.value })
                  }
                />

                <input
                  type="text"
                  className="p-2 mb-4 border bg-white border-gray-300 rounded   placeholder:text-sm "
                  placeholder="Location"
                  value={eventdetails.location}
                  onChange={(e) =>
                    seteventdetails({
                      ...eventdetails,
                      location: e.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  className="p-2 mb-4 border bg-white border-gray-300 rounded   placeholder:text-sm "
                  placeholder="Location URL"
                  value={eventdetails.locationurl}
                  onChange={(e) =>
                    seteventdetails({
                      ...eventdetails,
                      locationurl: e.target.value,
                    })
                  }
                />

                <div className="flex  ">
                  <input
                    type="date"
                    placeholder="Select Date"
                    value={eventdetails.date}
                    onChange={(e) =>
                      seteventdetails({ ...eventdetails, date: e.target.value })
                    }
                    className="p-2 w-full   border bg-white border-gray-300 rounded   placeholder:text-sm "
                  />
                </div>

                <div className="flex mt-4 mb-4 gap-2  ">
                  <input
                    type="text"
                    placeholder="Starting time"
                    value={eventdetails.startingtime}
                    onChange={(e) => {
                      seteventdetails({
                        ...eventdetails,
                        startingtime: e.target.value,
                      });
                    }}
                    className="p-2 w-1/2  border bg-white border-gray-300 rounded  placeholder:text-sm "
                  />
                  <input
                    type="text"
                    placeholder="Ending time"
                    value={eventdetails.endingtime}
                    onChange={(e) => {
                      seteventdetails({
                        ...eventdetails,
                        endingtime: e.target.value,
                      });
                    }}
                    className="p-2 w-1/2  border bg-white border-gray-300 rounded placeholder:text-sm "
                  />
                </div>

                <input
                  type="number"
                  placeholder="No of participants"
                  value={eventdetails.numberofparticipants}
                  className="mt-1 text-black bg-white p-3 border-gray-300 border rounded placeholder:text-sm"
                  onChange={(e) =>
                    seteventdetails({
                      ...eventdetails,
                      numberofparticipants: Number(e.target.value),
                    })
                  }
                />
              </div>

              <div className="w-[33%] flex flex-col px-5">
                <textarea
                  style={{ height: "100px", resize: "vertical" }}
                  name=""
                  className="p-2 bg-white border mb-4 border-gray-400 rounded   placeholder:text-sm "
                  placeholder="Description"
                  value={eventdetails.description}
                  onChange={(e) =>
                    seteventdetails({
                      ...eventdetails,
                      description: e.target.value,
                    })
                  }
                  id=""
                  cl
                ></textarea>

                <input
                  type="text"
                  className="p-2 bg-white border mb-4 border-gray-400 rounded   placeholder:text-sm "
                  placeholder="District"
                  value={eventdetails.district}
                  onChange={(e) => {
                    seteventdetails({
                      ...eventdetails,
                      district: e.target.value,
                    });
                  }}
                />

                <input
                  type="text"
                  className=" py-2.5 px-2 text-sm mb-4  border bg-white border-gray-300 rounded  placeholder:text-sm "
                  placeholder="Category"
                  value={eventdetails.category}
                  onChange={(e) =>
                    seteventdetails({
                      ...eventdetails,
                      category: e.target.value,
                    })
                  }
                />

                <textarea
                  name=""
                  className=" border-gray-300 border rounded placeholder:text-sm bg-white p-2 text-sm"
                  id=""
                  placeholder="Plan"
                  style={{ height: "110px", resize: "vertical" }}
                  value={eventdetails.plan}
                  onChange={(e) =>
                    seteventdetails({ ...eventdetails, plan: e.target.value })
                  }
                ></textarea>
              </div>
            </div>

            <div className="w-full flex justify-center mt-10 gap-5">
              <button
                type="button"
                onClick={submitevent}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br font-medium rounded-lg text-sm px-6 py-2.5 text-center me-2 mb-2"
              >
                publish event
              </button>
              <button
                type="button"
                onClick={resetall}
                class="py-2.5 px-8 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Createevent;
