import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewDocument } from "../../redux/reducer/document";

const Templates = () => {
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([
    {
      title: "Blank",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
    },
    {
      title: "Resume",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/1wyFqxsRmKm9q--7j4WRmBMn694YdhV6hmNrfh4rVm2E_400.png",
    },
    {
      title: "Project proposal",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/1XykI9TfWo4IoUqGLjQ-D8NIU4jZ1Ml9OI8-Euj5FrA0_400_3.png",
    },
    {
      title: "Brochure",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/1TojfPV3jurwEV2RpmVqnCCCR4z9g2eQBZ40XTHPBqk8_400_3.png",
    },
    {
      title: "Resume",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/10bJALGfGJG8BrzBSmG6EznIq6-84l1TZkQ-HC8jO368_400.png",
    },
    {
      title: "Letter",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/10e8_E36oj6_LuCRzckBFX_9oqbCHntmYB-jxB5U9gsw_400_2.png",
    },
    {
      title: "Blank",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
    },
    {
      title: "Blank",
      img: "https://ssl.gstatic.com/docs/templates/thumbnails/docs-blank-googlecolors.png",
    },
  ]);
  const [show, setShow] = useState(false);

  const newDocument = () => {
    dispatch(createNewDocument());
  };

  return (
    <div className="min-h-[300px] bg-gray-100 py-[20px] px-[150px] ease-in">
      <div className="py-[20px] px-[10px] flex text-[#444]">
        <p>Start a new document</p>
        <p className="ml-auto" onClick={() => setShow(!show)}>
          templates
        </p>
      </div>
      <div className=" gap-[10px] grid grid-flow-row grid-cols-6 overflow-x-auto">
        {templates.map((temp, index) => {
          if (!show && index > 5) {
            return;
          }
          return (
            <div
              className=" p-[5px] min-w-[130px]"
              onClick={newDocument}
              key={temp.img + index}
            >
              <img
                src={temp.img}
                alt=""
                className="h-[180px] border-[0.5px] border-[#222] cursor-pointer hover:border-blue-400"
              />
              <p className="m-[5px] mt-[10px] font-semibold text-[15px]">
                {temp.title}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Templates;
