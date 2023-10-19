import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import homeImg from "../assets/images/home-cover.webp";
import logo from "../assets/images/logo_blue.png";
import { login } from "../features/auth/authSlice";
import axios from "axios";
import routes from "../routes/apiroutes";

const Login = () => {
  const [reg_no, setReg] = useState("");
  const [password, setPassword] = useState("");
  const [wardReg, setWardReg] = useState("");
  const [response, setResponse] = useState(""); // State to hold the API response message
  const [isReqSuccess, setIsReqSuccess] = useState(false); // State to track the success state
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [displayMsg, setMsg] = useState("")
  const [forgotPwdMsg, setforgotMsg] = useState("")
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      setMsg("Invalid Login Credentials")
    }

    if (isSuccess || user) {
      navigate("/dashboard");
    }

    // dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Dispatch the login action
      await dispatch(login({ reg_no, password }));
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleForgotPasswordClick = () => {
    setShowModal(true);
  };

  const navigateToLogin = () => {
    navigate("/login");
  };
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleForgetPassword = async (e) => {
    setforgotMsg("Generating a New Password...")
    e.preventDefault();
    if (wardReg) {
      const formData = new FormData();
      formData.append("reg_no", wardReg);
      try {
        const response = await axios.post(routes.forgotpassword, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setforgotMsg(response.data)
        setResponse(response.data); // Update response message on success
        setIsReqSuccess(true); // Set the success state to true
      } catch (error) {
 
        setResponse("Error Inserting"); // Update response message on error
        setIsReqSuccess(false); // Set the success state to false
      }
    }
  };
  return (
    <div className="flex">
      <div className="hidden sm:block sm:w-[60%] lg:w-[70%]">
        <img
          alt="Img"
          src={homeImg}
          className="h-screen object-cover shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]"
        />
      </div>

      <div className="h-screen w-[100%] sm:w-[40%] lg:w-[30%] flex m-auto px-6">
        <div className="w-full max-w-md m-auto  rounded-lg">
          <img src={logo} className="w-[200px]  mx-auto " alt="" />
          <h1 className="text-[18px] outfit-500 font-medium mt-10 mb-4">
            Login to Parent Portal
          </h1>
          <form onSubmit={handleLogin}>
            <div>
              <input
                type="text"
                placeholder="Registration No"
                value={reg_no}
                onChange={(e) => setReg(e.target.value)}
                className={`w-full px-2 py-3 outfit-300 border rounded-[8px] outline-none text-sm transition duration-150 ease-in-out mb-6`}
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-2 py-3  outfit-300 border rounded-[8px] outline-none text-sm transition duration-150 ease-in-out mb-4`}
              />
            </div>
            <p className="text-red-500 text-[14px] font-medium">{displayMsg}</p>
            <a
              href="#/"
              className="text-[15px] outfit-400 text-[#646464] font-medium cursor-pointer transition-colors duration-300 hover:text-[#000000]"
              onClick={handleForgotPasswordClick}
            >
              Forgot password
            </a>

            <div className="flex justify-center font-medium bg-[#005197] hover:bg-black py-[8px] duration-[300ms] rounded-[8px] text-white items-center mt-6">
              <button className="w-full outfit-500" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
      {showModal === true ? (
        <>
          <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
            <div className="relative w-[40%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-4 z-[3]">
              <div className="flex  text-center my-1 flex-col relative mb-[12px]">
                <h1 className="outfit-600 text-[24px]">Forgot Password</h1>

                <p className="outfit-400 text-[16px]">
                  Remember your password?
                  <a
                    href="#/"
                    className="text-[15px] outfit-400 text-[#646464] font-medium cursor-pointer transition-colors duration-[300ms] hover:text-[#000000] "
                    onClick={navigateToLogin}
                  >
                    {" "}
                    Login here
                  </a>
                </p>
                <button
                  className=" text-black font-medium bottom-1 absolute h-full right-2 hover:scale-[1.2] duration-[300ms]"
                  onClick={handleModalClose}
                >
                  X
                </button>
              </div>
              <form onSubmit={handleForgotPasswordClick}>
                <div className="text-[16px] mt-6 nuns-font-500 flex flex-col items-center justify-center">
                  <input
                    type="text"
                    name="text"
                    id="text"
                    placeholder="Enter your Ward's Registration No"
                    value={wardReg}
                    className="w-[90%] px-4 py-2.5 rounded-[10px] outline-none  duration-[300ms] mb-6"
                    onChange={(e) => setWardReg(e.target.value)}
                  />
                  <div className={`outfit-400 text-green-600"}`}>
                    {forgotPwdMsg}
                  </div>
                </div>
                <div className="flex nuns-font-500 text-[14px] md:text-[16px] items-center mb-2">
                  <button
                    className="bg-[#005197] outfit-500 mx-auto px-6 py-2.5 rounded-[10px] mt-4 text-white  hover:bg-black duration-[300ms]"
                    type="submit"
                    onClick={(e) => handleForgetPassword(e)}
                  >
                    Get Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default Login;
