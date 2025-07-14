import React from "react";
import Spinner from "./Spinner";

const SecondaryBtn = ({
  children,
  classname,
  onclick,
  loader = false,
  type = "button",
  ...restProps
}) => {
  return (
    <>
      <button
        {...restProps}
        type={type}
        onClick={onclick}
        className={`border border-sky-600 px-3 py-1.5 text-sm font-medium text-sky-600 hover:bg-sky-500 hover:text-white focus:ring-3 focus:outline-hidden  ${classname} `}
      >
        {loader ? (
          <>
            <Spinner />
          </>
        ) : (
          children
        )}
      </button>
    </>
  );
};

export default SecondaryBtn;
