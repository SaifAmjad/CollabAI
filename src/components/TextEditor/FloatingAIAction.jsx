import React from "react";
import { useState } from "react";
import {
  Sparkles,
  Scissors,
  ArrowUpRight,
  FileText,
  Wand2,
} from "lucide-react";

const FloatingAIAction = ({
  handleTextOperation,
  loading,
}) => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: <Wand2 size={20} />, label: "Rewrite", action: ()=>{
      handleTextOperation('rewrite')
    } },
    {
      icon: <Scissors size={20} />,
      label: "Shorten",
      action: ()=>{
        handleTextOperation('shorten')
      },
    },
    {
      icon: <ArrowUpRight size={20} />,
      label: "Expand",
      action: ()=>{
        handleTextOperation('expand')
      },
    },
    {
      icon: <FileText size={20} />,
      label: "Format",
      action:()=>{
        handleTextOperation('summarize') 
      },
    },
  ];

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <div
          className={`flex flex-col items-end space-y-3 mb-4 transition-all duration-300 ${
            open ? "opacity-100" : "opacity-0 pointer-events-auto"
          }`}
        >
          {menuItems.map((item, index) => (
            <button
              key={index}
              disabled={loading ? true : false}
              onClick={item.action}
              className={`flex items-center gap-2 ${
                loading
                  ? "bg-slate-50 hover:bg-slate-50"
                  : "bg-white/90 hover:bg-white"
              }  text-gray-800 px-4 py-2 rounded-full shadow-lg backdrop-blur-md border border-gray-200 transition-transform transform hover:scale-110`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="bg-sky-600 hover:bg-sky-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
        >
          <Sparkles size={24} />
        </button>
      </div>
    </>
  );
};

export default FloatingAIAction;
