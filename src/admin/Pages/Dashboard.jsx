import React, { useEffect, useState } from "react";
import AdminHeader from "../Components/AdminHeader";
import Sidebar from "../Components/Sidebar";
import {
  eventcategoryapi,
  getalleventslengthapi,
  getallusersapi,
  getalluserslengthapi,
  getbydistrictapi,
  getlast30daysregapi,
  getpendingeventsapi,
} from "../../services/allapi";
eventcategoryapi;
import { Bar } from "react-chartjs-2";
import { IoMdFootball } from "react-icons/io";
import { RiMovie2AiFill } from "react-icons/ri";
import { TbHeartHandshake } from "react-icons/tb";
import { FaMusic } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";
import { IoFastFood } from "react-icons/io5";
import { MdModeOfTravel } from "react-icons/md";


function Dashboard() {
  const [allusers, setallusers] = useState([]);
  const [allevents, setallevents] = useState([]);
  const [pending, setpending] = useState([]);
  const [chartData, setChartData] = useState(null);

  const [token, settoken] = useState("");
  const [category, setcategory] = useState([]);
  const [district,setdistrict] = useState([])

  const getlast30days = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getlast30daysregapi(reqheader);
      console.log(res);
      setChartData(res.data);
    } catch (err) {
      console.log(res);
    }
  };

  const eventcategory = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await eventcategoryapi(reqheader);
      console.log(res);
      setcategory(res.data);
    } catch (err) {
      console.log(res);
    }
  };
  const getalleventslength = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      console.log("Calling getalleventslengthapi...");
      const res = await getalleventslengthapi(reqheader);
      console.log(res);
      if (res.status === 200) {
        setallevents(res.data.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getpending = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getpendingeventsapi(reqheader);
      console.log(res);
      if (res.status === 200) {
        if (typeof res.data === String) {
          setpending(0);
        } else if (Array.isArray(res.data)) {
          setpending(res.data.length);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getalluserslength = async () => {
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try {
      const res = await getalluserslengthapi(reqheader);
      console.log(res);
      if (res.status === 200) {
        setallusers(res.data.length);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getbydistrict = async()=>{
    const reqheader = {
      Authorization: `Bearer ${token}`,
    };
    try{
      const res = await getbydistrictapi(reqheader)
      console.log(res);
      setdistrict(res.data)
      

    }
    catch(err){
      console.log(err);
      
    }
  }

  useEffect(() => {
    const tok = sessionStorage.getItem("token");
    if (tok) {
      console.log(tok);

      settoken(tok);
    }
  }, []);

  useEffect(() => {
    if (token) {
      getalleventslength();
      getalluserslength();
      getpending();
      getlast30days();
      eventcategory();
      getbydistrict()
    }
  }, [token]);
  // chartdata
  useEffect(() => {
    if (chartData && chartData.labels && chartData.data) {
      const ctx = document.getElementById("userGrowthChart");
      if (!ctx || typeof window.Chart === "undefined") return;

      // Destroy old chart instance if it exists
      if (window.Chart.getChart(ctx)) {
        window.Chart.getChart(ctx).destroy();
      }

      new window.Chart(ctx.getContext("2d"), {
        type: "line", // or 'bar', 'pie', etc.
        data: {
          labels: chartData.labels,
          datasets: [
            {
              label: "New Users",
              data: chartData.data,
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              borderColor: "rgba(54, 162, 235, 1)",
              borderWidth: 2,
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: "top",
            },
            title: {
              display: true,
              text: "User Growth Over Last 30 Days",
            },
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Users",
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  const iconmap = {
    sports: <IoMdFootball />,
    movie: <RiMovie2AiFill />,
    service: <TbHeartHandshake />,
    music: <FaMusic />,
    art: <FaPaintBrush />,
    food: <IoFastFood />,
    travel: <MdModeOfTravel />,
  };
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
          <div className="w-[80%] overflow-y-auto flex flex-col ml-[20%]">
            <div className="grid-cols-3 flex p-20 gap-10">
              <div className="w-[33.3%] flex text-3xl text-gray-200 font-bold flex-col bg-blue-500/50 shadow-lg justify-center rounded items-center p-10">
                {allevents} <span className="text-xl mt-4">Live Events</span>
              </div>
              <div className="w-[33.3%] flex flex-col text-3xl text-gray-200 font-bold bg-red-500/50  shadow-lg justify-center rounded items-center p-10">
                {allusers}{" "}
                <span className="text-xl mt-4">Registered Users</span>
              </div>
              <div className="w-[33.3%] flex flex-col text-3xl text-gray-200 font-bold bg-orange-500/50  shadow-lg justify-center rounded items-center p-10">
                {pending} <span className="text-xl mt-4">Pending Events</span>
              </div>
            </div>

            <div className="w-full">
              <div
                class="chart-container flex items-center justify-center flex-col mx-auto"
                style={{ width: "100%" }}
              >
                <canvas
                  id="userGrowthChart"
                  className=""
                  style={{ height: "300px", width: "800px" }}
                ></canvas>
              </div>
            </div>

            <div className="w-full gap-10 flex  justify-center p-20">

              <div className="w-1/2 flex flex-col"> <h2 className="mx-auto">Live Event Categories Summary</h2>

              <div className=" shadow-lg border px-10 py-5 w-full mt-8 rounded">
                {category.map((item, index) => {
                  const icon = iconmap[item._id.toLowerCase()];
                  return (
                    <>
                      <div className="flex justify-between mt-2">
                        {" "}
                        <span className="text-blue-300 text-4xl gap-5 flex items-center">
                          {icon}
                          <span className="text-gray-500 text-sm">{item._id}</span>
                        </span>{" "}
                        {" "}
                        <span className="font-bold">{item.count}</span>
                        {" "}
                      </div>
                    </>
                  );
                })}
              </div></div>
              <div className="w-1/2 flex flex-col">
              <h2 className="mx-auto">Live events District Summary</h2>
              

              <div className=" shadow-lg border px-10 py-10 w-full mt-8 rounded">


                {
                  district.length>0 && 

                  district.map((item,index)=>{
                    return (


                      <>

                      <div className="flex justify-between mt-4  px-4">
                        <p>{item._id}</p>
                        <p className="font-bold">{item.count}</p>
                      </div>
                      
                      
                      </>
                    )
                  })
                }
              </div>
              
              </div>
             
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
