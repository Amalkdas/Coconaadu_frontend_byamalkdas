import React, { useEffect } from "react";
import { useState } from "react";
import img from "../images/home2.png";
import Header from "../Components/Header";
import { MdArrowOutward } from "react-icons/md";
import Preloader from "../Components/Preloader";
import Footer from "../Components/Footer";
Link;

import { CiStar } from "react-icons/ci";
import { FaLocationDot } from "react-icons/fa6";
import { IoMdTime } from "react-icons/io";
import { SlCalender } from "react-icons/sl";
import { Link } from "react-router-dom";
import a from "../images/contact.png";
import { gethomebooksapi } from "../services/allapi";
import { serverurl } from "../services/serverurl";

function Home() {
  const [homeevents, sethomevents] = useState([]);

  const gethomebooks = async () => {
    try {
      const res = await gethomebooksapi();
      // console.log(res);
      if (res.status === 200) {
        sethomevents(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    gethomebooks();
  }, []);

  const darkmode = () => {
    setisdark(!isdark);
  };

  return (
    <>
      <div
        className="first w-full flex flex-col bg-white"
        style={{
          backgroundSize: "cover",
          height: "650px",
          backgroundImage: `url(${img})`,
        }}
      >
        <Header></Header>
        <div className="flex flex-col  text-white justify-center  items-end h-full   px-20 py-10   ">
          <h2
            className="text-white/90 text-8xl font-bold mb-6"
            style={{ textShadow: "1px 1px 1px black" }}
          >
            Find your people
            <br /> <span className="">Find your fun</span>
          </h2>
          <p className="text-sm font-medium mb-15">
            {" "}
            - In a world of digital connections, we help you find the joy of
            real-world experiences and true community.
          </p>

          <div className=" items-center border-white px-5 py-3 bg-white/20 backdrop-blur-2xl rounded-full flex gap-3">
            <Link to={"/register"}>
              <div className="flex justify-center bg-white rounded-full p-2 text-black items-center hover:bg-white/50 transition ease-in-out  hover:text-white transit">
                <MdArrowOutward className="" />
              </div>
            </Link>
            <p className="text-xs">Join The Community</p>
          </div>
        </div>
      </div>
      <div className="p-10 bg-white  text-3xl flex justify-center items-center flex-col ">
        <h1 className=" text-xl ">Check Out Latest Events</h1>

        <div className="flex flex-wrap py-10 gap-10">
          {homeevents?.length > 0 ? (
            homeevents.map((item, index) => {
              return (
                <div key={item?._id}
                  className="relative p-5  rounded-t-sm  shadow-lg  max-h-md pb-4 rounded-b-sm"
                  style={{ width: "350px" }}
                >
                  <img
                    src={`${serverurl}/eventimagepath/${item?.eventimage}`}
                    className="block rounded-t-sm m-0 p-0 align-top h-[250px] w-full object-cover"
                    alt=""
                  />

                  <div className="flex w-full gap-4 mt-4 ">
                    <div
                      className="bg-blue-500 justify-center flex-1  text-white flex gap-2 py-3  rounded  px-4 items-center"
                      style={{ fontSize: "0.3em" }}
                    >
                      <CiStar className="" />
                      <p className="">{item?.title}</p>
                    </div>
                    <div
                      className="bg-green-600  justify-center flex-1 py-3 text-white flex gap-2   rounded  px-4 items-center"
                      style={{ fontSize: "0.3em" }}
                    >
                      <p className="">{item?.district}</p>
                      <FaLocationDot />
                    </div>
                  </div>

                  <div className="flex justify-between text-gray-500 mt-4">
                    <h1 className="text-xs">{item?.startingtime}  -  {item?.endingtime}</h1>
                    <IoMdTime className="text-sm" />
                  </div>

                  <div className="flex justify-between text-gray-500 mt-3  ">
                    <h1 className="text-xs">{item?.date}</h1>{" "}
                    <SlCalender className="text-sm" />
                  </div>
                </div>
              );
            })
          ) : (
            <p>No preview available</p>
          )}
        </div>
        <div>
          <Link to={"/events"}>
            <button
              type="button"
              className="text-white bg-gradient-to-r shadow-lg  from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-3 px-6 text-center "
            >
              See More
            </button>
          </Link>
        </div>
      </div>

      <div className="flex  grid-cols-2 mb-10">
        <div className="w-[60%] flex flex-col p-15">
          <h2 className="text-3xl font-medium">
            Our Mission : Connecting Communities
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            More Than just events - It's a Movement
          </p>
          <p className="mt-10 text-justify text-md">
            In an increasingly digital world, we stand firm in our belief in the
            profound and irreplaceable power of real-life connections. Our
            mission at [Your Platform Name] is to bridge the gap between online
            interactions and meaningful in-person engagement, uniting
            individuals through their common passions and hobbies. We are
            dedicated to empowering local communities by providing an accessible
            and intuitive platform to discover exciting events, or even to
            effortlessly create and host their own. Together, we are building a
            vibrant, supportive network where genuine friendships are forged,
            new adventures are sparked, and every participant contributes to a
            thriving ecosystem of real-world experiences.
          </p>
          <div className="mt-15">
            <Link to={"/about"}>
              <button
                type="button"
                className="text-white bg-gradient-to-r shadow-lg  from-green-600 via-green-700 to-green-800 hover:bg-gradient-to-br   rounded-lg text-sm font-semibold py-3 px-6 text-center "
              >
                Learn More About Us
              </button>
            </Link>
          </div>
        </div>
        <div className="w-[40%] p-10">
          <img src={a} alt="" />
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default Home;
