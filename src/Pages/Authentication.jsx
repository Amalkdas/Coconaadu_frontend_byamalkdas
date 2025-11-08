import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import image from "../images/regfinal.png";
import limage from "../images/loginimg.png";
import { googleloginapi, loginapi, registerapi } from "../services/allapi";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function Authentication({ register }) {
  const nav = useNavigate();

  const toastConfig = {
    position: "top-center",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
  };

  const googleauthlogin = async (credentialResponse) => {
    // console.log(credentialResponse);

    const decoded = jwtDecode(credentialResponse.credential);
    console.log(decoded);

    try {
      const res = await googleloginapi({
        email: decoded.email,
        profile: decoded.picture,
        username: decoded.name
        
      });
      console.log(res);

      const toastmessage = toast.loading("Logging in ...", toastConfig);
      if (res.status === 200) {
        

        sessionStorage.setItem("user", JSON.stringify(res.data.user));
        sessionStorage.setItem("token", res.data.token);

        setTimeout(() => {

            toast.update(toastmessage, {
          ...toastConfig, // spreaded prperties of toastconfig here , bcoz if i agve it as third argument , toast ignores it
          render: "Logged in",
          isLoading: false,
          type: "success",
onClose:()=> nav("/")
        });
          
        }, 2000);

      

      
      }
    } catch (err) {
      toast.error("Something Went wrong", toastConfig);
    }
  };

  const navigate = useNavigate();
  const [logindetails, setlogindetails] = useState({
    email: "",
    password: "",
  });
  const [registerdetails, setregisterdetails] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registeruser = async () => {
    const { username, email, password } = registerdetails;
    if (!username || !email || !password) {
      toast.warn("Please fill in all required fields.", toastConfig);
    } else {
      try {
        const res = await registerapi(registerdetails);
        console.log(res);

        if (res.status === 200) {
          toast.success("Account created , Start exploring !", {
            ...toastConfig,

            onClose: () => navigate("/login"),
          });

          setregisterdetails({
            username: "",
            email: "",
            password: "",
          });
        } else if (res.status === 409) {
          toast.warning(res.data, toastConfig);
        }
      } catch (err) {}
    }
  };

  const userlogin = async () => {
    const { email, password } = logindetails;

    if (!email || !password) {
      toast.warn("Please fill in all required fields.", toastConfig);
    } else {
      try {
        const res = await loginapi(logindetails);
        console.log(res);

        if (res.status === 200) {
          if (res.data.updateduser.isAdmin === true) {
            toast.success(`Welcome back admin`, {
              ...toastConfig,
              onClose: () => navigate("/admindashboard"),
            });
          } else {
            toast.success(
              `Login Successful. Welcome back! ${res.data.updateduser.username}`,
              { ...toastConfig, onClose: () => navigate("/") }
            );
          }

          sessionStorage.setItem("user", JSON.stringify(res.data.updateduser));
          sessionStorage.setItem("token", res.data.token);
        } else if (res.status === 401) {
          toast.error(res.data, toastConfig);
        } else if (res.status === 409) {
          toast.error(res.data, toastConfig);
        } else {
          toast.error(
            "An unexpected error occurred. Please try again later.",
            toastConfig
          );
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <>
      {register ? (
        <>
          <div className="w-full grid-cols-2 flex h-screen">
            <div
              className="w-[50%] regdiv1"
              style={{ backgroundImage: `url(${image})` }}
            ></div>
            <div className="w-[50%] flex flex-col p-15">
              <h1 class="text-3xl font-bold  text-green-600 mb-20  ">
                Coconaadu{" "}
              </h1>

              <form action="" className="flex flex-col  px-15  ">
                <h2 className="font-bold text-3xl mb-3">Create an Account</h2>
                <p className="font-medium text-xs text-gray-600 mb-6">
                  Your next adventure begins here. Sign up to find your tribe
                </p>

                <input
                  type="text"
                  className="bg-white in border-1 text-xs py-3 mb-5 font-medium placeholder:text-xs ps-3 placeholder:font-semibold"
                  placeholder="Username ( e.g., ThrissurGeek )"
                  onChange={(e) =>
                    setregisterdetails({
                      ...registerdetails,
                      username: e.target.value,
                    })
                  }
                  value={registerdetails.username}
                  autocomplete="off"
                />
                <input
                  type="text"
                  onChange={(e) =>
                    setregisterdetails({
                      ...registerdetails,
                      email: e.target.value,
                    })
                  }
                  value={registerdetails.email}
                  className="in bg-white border-1  py-3 mb-5 text-xs font-medium placeholder:text-xs ps-3 placeholder:font-semibold"
                  placeholder="Enter a Valid Email"
                  autocomplete="email"
                />

                <input
                  type="password"
                  onChange={(e) =>
                    setregisterdetails({
                      ...registerdetails,
                      password: e.target.value,
                    })
                  }
                  value={registerdetails.password}
                  className="bg-white in border-1 font-medium text-xs py-3 mb-5 placeholder:text-xs px-3 placeholder:font-semibold"
                  placeholder="Password"
                  autocomplete="new-password"
                />

                <div className="w-full mb-2">
                  <button
                    type="button"
                    onClick={registeruser}
                    class="text-white w-full bg-green-700 hover:bg-green-800   rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-semibold"
                  >
                    Sign Up
                  </button>
                </div>

             

                <p className="text-center text-xs text-gray-700 font-semibold">
                  Already have an account ?
                  <Link to={"/login"}>
                    <span className="text-green-600 ms-2 hover:underline">
                      Login
                    </span>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="grid-cols-2 flex  h-screen border">
            <div className="w-[50%] flex overflow-hidden flex-col p-16 ">
              <h1 class="text-3xl font-bold  text-green-600 mb-10  ">
                Coconaadu{" "}
              </h1>

              <form action="" className="flex flex-col py-10 px-15  ">
                <h2 className="font-bold text-3xl mb-3">
                  Login to your account
                </h2>
                <p className="font-medium text-xs text-gray-600 mb-10">
                  Welcome back ! Please Enter your details
                </p>

                <input
                  type="text"
                  className="in bg-white border-1 font-medium  py-3 mb-5 text-xs placeholder:text-xs ps-3 placeholder:font-semibold"
                  placeholder="Enter Your Email"
                  value={logindetails.email}
                  autocomplete="email"
                  onChange={(e) =>
                    setlogindetails({ ...logindetails, email: e.target.value })
                  }
                />
                <input
                  type="password"
                  className="bg-white in border-1 text-xs font-medium py-3 mb-3 placeholder:text-xs ps-3 placeholder:font-medium"
                  placeholder="Password"
                  autoComplete="new-password"
                  value={logindetails.password}
                  onChange={(e) =>
                    setlogindetails({
                      ...logindetails,
                      password: e.target.value,
                    })
                  }
                />

                <div className="w-full mb-2 mt-4">
                  <button
                    type="button"
                    onClick={userlogin}
                    class="text-white  w-full bg-green-700 hover:bg-green-800   rounded text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 font-semibold"
                  >
                    Login
                  </button>
                </div>
                <div className="flex justify-center my-4 w-full">
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      console.log(credentialResponse);
                      googleauthlogin(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>

                <p className="text-center text-xs text-gray-700 font-semibold">
                  Don't have an account ?
                  <Link to={"/register"}>
                    <span className="text-green-600 ms-2 hover:underline">
                      Signup
                    </span>
                  </Link>
                </p>
              </form>
            </div>
            <div
              className="w-[50%] logindiv2 overflow-hidden"
              style={{ backgroundImage: `url(${limage})` }}
            ></div>
          </div>
        </>
      )}
    </>
  );
}

export default Authentication;
