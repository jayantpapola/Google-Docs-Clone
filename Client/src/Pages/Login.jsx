import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/reducer/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef();
  const password = useRef();
  const inputStyle = "bg-[whitemsoke] rounded py-2 outline-none px-5";
  const auth = useSelector((state) => state.auth);
  const notify = () =>
    toast.success("Logged In Successfully!", { autoClose: 1800 });

  const submitData = (e) => {
    e.preventDefault();
    dispatch(
      logIn({
        email: email.current.value,
        password: password.current.value,
      })
    );
  };

  useEffect(() => {
    if (auth.authorized) {
      notify();
      setTimeout(() => {
        navigate("/");
      }, 2000);
    }
    console.log(auth);
  }, [auth]);
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center ">
      <form className="flex flex-col  gap-2 w-[400px]" onSubmit={submitData}>
        <h2 className="text-[30px] text-white font-bold text-center underline">
          LogIn
        </h2>

        <input
          type="email"
          className={inputStyle}
          placeholder="email"
          required={true}
          ref={email}
        />
        {auth.isError && auth.error.email && (
          <p className="text-center text-red-600 text-sm tracking-wider">
            {auth.error.email}
          </p>
        )}
        <input
          type="password"
          className={inputStyle}
          placeholder="new password"
          required={true}
          ref={password}
        />
        {auth.isError && auth.error.password && (
          <p className="text-center text-red-600 text-sm tracking-wider">
            {auth.error.password}
          </p>
        )}
        <button
          type="submit"
          className="bg-[royalblue] mt-2 rounded p-2 font-bold text-white"
          disabled={auth.isLoading}
        >
          {auth.isLoading ? "....." : "Submit"}
        </button>

        <hr />
        <b className="text-center text-white">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-[royalblue] cursor-pointer">
            SignUp
          </Link>
        </b>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
