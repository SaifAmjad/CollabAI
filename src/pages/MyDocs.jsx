import React, { useEffect, useState } from "react";
import DocsCard from "../components/MyDocs/DocsCard";
import HomeNavbar from "../components/Home/HomeNavbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MyDocs = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [documents, setDocuments] = useState([]);

  const handleNavigate = () => {
    navigate("/");
  };

  useEffect(() => {
    const handleGetDocs = async () => {
      try {
        const response = await axios.get(
          `https://collabaidoc.vercel.app/v2/authenticate/docs/${user.id}`
        );
        if (response.data.success) {
          setDocuments([...response.data.data.documents]);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleGetDocs();
  }, []);

  return (
    <>
      <HomeNavbar />
<div className="absolute inset-0">
                  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                </div>
      <div className="mt-12 ">
        <div className=" relative z-10 flex items-center gap-x-2 font-semibold text-xl mb-5">
          <span
            class="material-symbols-outlined text-sky-600 cursor-pointer"
            onClick={handleNavigate}
          >
            arrow_back
          </span>

          <div>
            <h1 className="text-gray-800">My Documents</h1>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-4">
          {documents.length > 0 &&
            documents?.map((document) => (
              <>
                <Link to={`/editor/${document._id}`}>
                  <DocsCard text={document.data} />
                </Link>
              </>
            ))}
        </div>
      </div>
    </>
  );
};

export default MyDocs;
