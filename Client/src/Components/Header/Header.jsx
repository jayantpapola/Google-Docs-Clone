import React from "react";

const Header = () => {
  return (
    <div className=" h-[60px] px-[20px] flex items-center justify-between sticky top-0 bg-white">
      <div className=" flex items-center gap-[5px]">
        <img
          src="https://cdn-icons-png.flaticon.com/512/5968/5968517.png"
          alt="Google-Docs"
          height={40}
          width={40}
        />
        <span className="text-[20px] font-bold text-[#333]">Docs</span>
      </div>
      <div className="grow flex justify-center">
        <input
          type="text"
          placeholder="Search"
          className="bg-gray-100 h-[40px] w-[60%] px-6 rounded outline-none"
        />
      </div>

      <div className="h-[40px] w-[40px] bg-[whitesmoke] flex items-center justify-center rounded-[40px]">
        J
      </div>
    </div>
  );
};

export default Header;
