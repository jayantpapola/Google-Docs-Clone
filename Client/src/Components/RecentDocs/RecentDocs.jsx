import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RecentDocs = () => {
  const dashboard = useSelector((state) => state.docs);
  return (
    <div className="px-[100px] py-[20px]">
      <h2 className="font-bold">Recent Documents</h2>
      <div className="flex gap-[20px]">
        {dashboard?.docs?.map((doc) => (
          <Link to={`/Editor/${doc._id}`} className=" p-[5px]" key={doc._id}>
            <img
              src={
                "https://ssl.gstatic.com/docs/templates/thumbnails/1wyFqxsRmKm9q--7j4WRmBMn694YdhV6hmNrfh4rVm2E_400.png"
              }
              alt=""
              className="h-[180px] border-[0.5px] border-[#222] cursor-pointer hover:border-blue-400"
            />
            <p className="m-[5px] mt-[10px] font-semibold text-[15px]">
              asdasd
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentDocs;
