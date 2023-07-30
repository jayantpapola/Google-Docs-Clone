import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signUp } from "../redux/reducer/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const inputStyle = "bg-[whitemsoke] rounded py-2 outline-none px-5";
  const auth = useSelector((state) => state.auth);
  const notify = () =>
    toast.success("User Added Successfully!", { autoClose: 1800 });

  const submitData = (e) => {
    e.preventDefault();
    dispatch(
      signUp({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      })
    );
  };

  useEffect(() => {
    if (auth.authorized) {
      notify();
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    }
  }, [auth]);
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center ">
      <form className="flex flex-col  gap-2 w-[400px]" onSubmit={submitData}>
        <h2 className="text-[30px] text-white font-bold text-center underline">
          Sign Up
        </h2>
        <input
          type="text"
          className={inputStyle}
          placeholder="name"
          required={true}
          ref={name}
        />
        <input
          type="email"
          className={inputStyle}
          placeholder="email"
          required={true}
          ref={email}
        />
        <input
          type="password"
          className={inputStyle}
          placeholder="new password"
          required={true}
          ref={password}
        />
        <button
          type="submit"
          className="bg-[royalblue] mt-2 rounded p-2 font-bold text-white"
          disabled={auth.isLoading}
        >
          {auth.isLoading ? "....." : "Submit"}
        </button>
        {auth.isError && auth.error.message && (
          <p className="text-center text-red-600 text-sm tracking-wider">
            {auth.error.message}
          </p>
        )}
        <hr />
        <b className="text-center text-white">
          Already have an account?{" "}
          <Link to="/Login" className="text-[royalblue] cursor-pointer">
            LogIn
          </Link>
        </b>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
