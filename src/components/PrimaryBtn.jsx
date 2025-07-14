import React from "react";
import Spinner from "./Spinner";

const PrimaryBtn = ({
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
        className={`bg-sky-500 text-white font-semibold px-3 py-1 rounded-[0.3rem] flex items-center align-middle hover:bg-sky-600 ${classname}`}
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

export default PrimaryBtn;
