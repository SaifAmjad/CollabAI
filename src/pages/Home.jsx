import React from "react";
import PrimaryBtn from "../components/PrimaryBtn";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import SecondaryBtn from "../components/SecondaryBtn";
import SvgImage from "../components/Home/SvgImage";
import { motion } from "framer-motion";
import TitleText from "../components/Home/TitleText";
import HomeNavbar from "../components/Home/HomeNavbar";
import Alert from "../components/Alert";

const Home = ({ visible, setVisible }) => {
  return (
    <>
      <Alert
        msg={"Logged in"}
        description={"Logged in successfully"}
        visible={visible}
        setVisible={setVisible}
        theme="success"
      />
      <HomeNavbar />
      <section className=" relative z-10 bg-none lg:grid h-[90vh] lg:h-[90vh] lg:place-content-center">
        <div className="mx-auto h-[70vh] sm:h-auto flex items-center sm:px-6 md:grid md:grid-cols-2 md:items-center md:gap-4 lg:px-8">
          <div className="max-w-prose text-left flex flex-col gap-y-5 sm:block sm:gap-y-0">
            <TitleText />

            <p className="mt-4 text-base text-pretty text-gray-700 sm:text-lg/relaxed">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque,
              nisi. Natus, provident accusamus impedit minima harum corporis
              iusto.
            </p>

            <div className="mt-4 flex gap-4 sm:mt-6">
              <Link to={`/editor/${uuid()}`}>
                <PrimaryBtn classname={"py-3 flex items-center"}>
                  Create document{" "}
                  <span className="ml-3 h-5 px-1 pb-1 flex justify-center items-center rounded-full bg-sky-300">
                    +
                  </span>
                </PrimaryBtn>
              </Link>

              <Link to={"/mydocs"}>
                <SecondaryBtn classname={"py-3 rounded-md"}>
                  My documents
                </SecondaryBtn>
              </Link>
            </div>

          </div>

          <SvgImage />
        </div>
      </section>
    </>
  );
};

export default Home;
