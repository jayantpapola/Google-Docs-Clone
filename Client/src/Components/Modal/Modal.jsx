import React from "react";

const Modal = ({ show, component }) => {
  return (
    <div
      className={`bg-[#000000dc] fixed top-0 left-0 right-0 bottom-0 z-[99] duration-500 
      ${!show && "hidden"} flex items-center justify-center text-white`}
    >
      <div className="bg-[whitesmoke] px-[50px] py-[20px] min-w-[300px] rounded ">
        {component}
      </div>
    </div>
  );
};

export default Modal;
