import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center ">
      <form className="flex flex-col  gap-2 w-[400px]">
        <h2 className="text-[30px] text-white font-bold text-center underline">
          Login Up
        </h2>
        <input
          type="email"
          className="bg-[whitemsoke] rounded py-2 outline-none px-5"
          placeholder="email"
          required={true}
        />
        <input
          type="password"
          className="bg-[whitemsoke] rounded py-2 outline-none px-5"
          placeholder="new password"
          required={true}
        />
        <button className="bg-[royalblue] mt-2 rounded p-2 font-bold text-white">
          Submit
        </button>
        <hr />
        <b className="text-center text-white">
          Don't have an account?{" "}
          <Link to="/SignUp" className="text-[royalblue] cursor-pointer">
            SignUp
          </Link>
        </b>
      </form>
    </div>
  );
};

export default Login;
