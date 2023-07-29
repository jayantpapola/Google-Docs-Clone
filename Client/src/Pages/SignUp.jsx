import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUp } from "../redux/reducer/auth";

const SignUp = () => {
  const dispatch = useDispatch();
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const inputStyle = "bg-[whitemsoke] rounded py-2 outline-none px-5";

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
        >
          Submit
        </button>
        <hr />
        <b className="text-center text-white">
          Already have an account?{" "}
          <Link to="/Login" className="text-[royalblue] cursor-pointer">
            LogIn
          </Link>
        </b>
      </form>
    </div>
  );
};

export default SignUp;
