import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { IoIosSend } from "react-icons/io";
import { Link, useLocation, useParams } from "react-router-dom";
import { useCallback } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
Link

const url = "http://localhost:4000";
// this connects to the backend serv
const socket = io(url);

function Chat() {

  const location = useLocation()

  const frompage = location?.state.from || "/eventstatus"
  const [messages, setmessages] = useState([]);
  const [message, setmessage] = useState("");
  const [username, setusername] = useState("");

  const { eventid } = useParams();
  console.log(eventid);

  const handleLoadMessages = useCallback((messageArray) => {
    setmessages(messageArray);
  }, []);

  const handleMessage = useCallback((data) => {
    setmessages((prev) => [...prev, data]);
  }, []);

  //

  useEffect(() => {
  //for clean up this is the hostiry messages
    socket.on("load_messages", handleLoadMessages);
    ///real time messages
    socket.on("message_recieved", handleMessage);

   
    return () => {
      socket.off("load_messages", handleLoadMessages);
      socket.off("message_recieved", handleMessage);
    };
  }, [handleLoadMessages, handleMessage]);

  useEffect(() => {
    if (eventid) {
      socket.emit("join_event", eventid);
    }
  }, [eventid]);

  // Rerun whenever the room ID changes

  const sendmessage = () => {
    console.log("message state at send:", message);

    console.log("coming");

    console.log("Emitting:", {
      eventid,
      message,
      sender: username,
    });

    if (message.trim()) {
      socket.emit("send_message", {
        eventid,
        message,
        sender: username,
        timestamp: new Date().toISOString(),
      });
      setmessage("");
    }
  };

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    if (user) {
      setusername(user.username);
    }
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen ">
        {" "}
        <div className=" relative z-50 px-10 flex items-center rounded justify-between  shadow-lg w-full h-30">
          <Link to={frompage}><FaArrowLeftLong  className=""/></Link>
          <h1 className="ml-5 text-xl font-semibold text-green-500">
            Coconaadu <span className="ml-2 text-black text-sm">Chat</span>
          </h1>
        </div>
        <div className=" bg-green-700 flex-col z-10 overflow-y-auto h-screen flex gap-10 p-10  min-w-xl">
          {messages.length === 0 ? (
            <div>No messages yet</div>
          ) : (
            <div className="flex flex-col justify-center w-full  gap-10">
              {" "}
              {messages.map((item) => {
                const formattedTime = new Date(
                  item.timestamp
                ).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return item.sender === username ? (
                  <div className="flex w-full justify-end">
                    <div
                      key={item._id}
                      className="shadow-lg rounded  bg-gray-200  inline-block  h-auto p-5 flex flex-col "
                    >
                      <h1 className="mb-3 text-base">
                        {item.sender}{" "}
                        <span
                          className="mt-5 ml-10"
                          style={{ fontSize: "0.6em" }}
                        >
                          {formattedTime}
                        </span>
                      </h1>
                      <p className="text-sm">{item.message}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex w-full justify-start">
                    <div
                      key={item._id}
                      className="shadow-lg rounded   inline-block bg-gray-200 h-auto p-5 flex flex-col "
                    >
                      <h1 className="mb-3 text-base">
                        {item.sender}{" "}
                        <span
                          className="mt-5 ml-10"
                          style={{ fontSize: "0.6em" }}
                        >
                          {formattedTime}
                        </span>
                      </h1>
                      <p className="text-sm">{item.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="flex w-full   p-4  gap-8 ">
          <input
            value={message}
            type="text"
            onChange={(e) => setmessage(e.target.value)}
            placeholder="Type Your Message"
            className="bg-gray-100 rounded px-4 w-full py-2"
          />
          <button
            onClick={sendmessage}
            className="bg-blue-500 shadow-lg text-white rounded px-15 cursor-pointer py-3 flex justify-center"
          >
            <IoIosSend className="text-3xl" />
          </button>
        </div>
      </div>
    </>
  );
}

export default Chat;
