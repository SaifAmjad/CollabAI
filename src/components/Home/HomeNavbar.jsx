import React, { useContext, useState } from "react";
import PrimaryBtn from "../PrimaryBtn";
import { Link, useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { AuthContext } from "../../context/AuthContext";
import Alert from "../Alert";

const HomeNavbar = () => {
  const [visible, setVisible] = useState(false);

  const { setIsAuthenticad } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      
      <nav className="mx-auto w-[90%] sticky top-0 z-10 max-w-4xl rounded-full bg-black/80 backdrop-blur-md shadow-lg px-6 py-4 flex justify-between items-center mirror-navbar">
        <div className="text-white font-bold">CollabAI</div>
        <div className="flex justify-between space-x-3">
          <Link to={`/editor/${uuid()}`}>
            <a
              className="flex rounded-full border border-white p-1 text-white hover:bg-sky-600 hover:text-white hover:border-sky-500 focus:ring-3 focus:outline-hidden"
              href="#"
            >
              <span className="material-symbols-outlined">add</span>
            </a>
          </Link>
          {localStorage.getItem("user") ? (
            <PrimaryBtn
              onclick={() => {
                localStorage.removeItem("user");
                setVisible(true);
                setIsAuthenticad(null);
              }}
            >
              Logout
            </PrimaryBtn>
          ) : (
            <PrimaryBtn onclick={() => navigate("/login")}>Login</PrimaryBtn>
          )}
        </div>
      </nav>
    </>
  );
};

export default HomeNavbar;
