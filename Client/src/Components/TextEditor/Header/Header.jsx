import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const [showMenu, setShowMenu] = useState({ show: false, menu: "" });
  const fileMenu = () => {
    return (
      <div
        className="p-[10px] text-[#111] min-w-[200px] rounded bg-[whitesmoke] absolute  shadow-lg shadow-indigo-500/40 flex flex-col"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <p className="font-semibold w-[100%] px-[10px] py-[5px] hover:bg-[#d3d3d371] rounded">
          New Doc
        </p>
        <p className="font-semibold w-[100%] px-[10px] py-[5px] hover:bg-[#d3d3d371] rounded">
          Share
        </p>
      </div>
    );
  };

  window.addEventListener("click", () => {
    if (showMenu.show) {
      setShowMenu({ show: false, menu: "" });
    }
  });

  const onMenuClick = (val) => {
    if (showMenu.show) {
      setShowMenu({ show: false, menu: "" });
    } else {
      setShowMenu({ show: true, menu: val });
    }
  };

  return (
    <div
      className="px-5 h-[80px] bg-[#111] flex text-[whitesmoke] gap-[10px]"
      id="TextEditor__Header"
    >
      <Link to="/" className="h-[100%] w-[max-content] flex items-center">
        <img
          className="h-[80%]"
          src="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
          alt="Logo"
        />
      </Link>
      <div className="h-[100%] w-[max-content] flex justify-center flex-col gap-[10px]">
        <b>Doc Name</b>
        <div className="flex gap-[1px] text-[14px]">
          <span
            className="hover:bg-[#222] px-[10px] rounded cursor-pointer relative"
            onClick={(e) => {
              e.stopPropagation();
              onMenuClick("file");
            }}
          >
            File
            {showMenu.show && showMenu.menu == "file" && fileMenu()}
          </span>
          <span className="hover:bg-[#222] px-[10px] rounded cursor-pointer">
            Edit
          </span>
          <span className="hover:bg-[#222] px-[10px] rounded cursor-pointer">
            View
          </span>
          <span className="hover:bg-[#222] px-[10px] rounded cursor-pointer">
            Tools
          </span>
          <span className="hover:bg-[#222] px-[10px] rounded cursor-pointer">
            Help
          </span>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default Header;
