import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';

const ShareModal = ({ openModal, setOpenModal }) => {
  const [textCopy, setTextCopy] = useState(false);

  const location = useLocation();

  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  function copyText() {
   
    const textToCopy = fullUrl;
    

    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        setTextCopy(true);
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  }

  return (
    <div>
      {openModal ? (
        <>
          <div
            className="fixed inset-0 z-50 grid place-content-center bg-black/50 p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalTitle"
          >
            <div className="w-[90vw] max-w-md rounded-lg bg-white shadow-lg">
              <div className="w-full flex justify-end pt-2 pr-2 ">
                <span
                  onClick={() => {
                    setOpenModal(false);
                  }}
                  className="material-symbols-outlined cursor-pointer text-gray-500 h-6 w-6 rounded-full hover:bg-black/10 "
                >
                  close
                </span>
              </div>

              <div className="px-6  pb-6">
                <div className="mt-4">
                  <p className="text-pretty text-gray-700">
                    Share this link for collaboration
                  </p>
                </div>

                <div className="mt-4 flex items-center outline outline-1 outline-gray-400 rounded-md">
                  <div className=" text-gray-500 p-1 ">
                    {fullUrl}
                  </div>

                  <div>
                    {textCopy ? (
                      <span class="material-symbols-outlined mr-1 text-sky-500">
                        check_circle
                      </span>
                    ) : (
                      <span
                        onClick={copyText}
                        className="material-symbols-outlined cursor-pointer text-gray-500 hover:text-sky-500"
                      >
                        content_copy
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default ShareModal;
