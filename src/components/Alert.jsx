import React, { useEffect, useState } from "react";

const Alert = ({
  msg,
  description,
  duration = 3000,
  visible,
  setVisible,
  theme = "success",
  className
}) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, duration);

    return () => {
      clearTimeout(timer);
    };
  }, [visible]);

  const alertTheme = {
    success: {
      border: "border-green-700",
      color: "text-green-700",
      bg: "bg-green-50",
      icon:<span className="material-symbols-outlined">
      check_circle
      </span>
    },
    error: {
      border: "border-red-700",
      color: "text-red-700",
      bg: "bg-red-50",
      icon:<span className="material-symbols-outlined">
      error
      </span>
    },
    warning: {
        border: "border-yellow-700",
        color: "text-yellow-700",
        bg: "bg-yellow-50",
        icon: (
          <span className="material-symbols-outlined">
            warning
          </span>
        ),
      }
  };

  const colortheme = alertTheme[theme] || alertTheme["success"];

  return (
    <div className={`absolute left-0 top-3 z-50 w-[20rem] ml-2 ${className}`}>
      {visible ? (
        <div
          role="alert"
          className={`border-s-4 ${colortheme.border} ${colortheme.bg} p-3`}
        >
          <div className={`flex items-center gap-2 ${colortheme.color}`}>
            {colortheme.icon}
        

            <strong className="font-medium">{msg}</strong>
          </div>

          <p className={` flex mt-2 text-sm text-left ${colortheme.color}`}>
            {description}
          </p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Alert;
