import Editor from "../components/TextEditor/Editor";
import Navbar from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import Alert from "../components/Alert";

const TextEditor = () => {
  const { id } = useParams();

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [flagVisible, setFlagVisible] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);

  const handleSaveDocument = async () => {
    try {
      if (!JSON.parse(localStorage.getItem("user"))) {
        setErrorFlag(true);
        return;
      }
      const { data } = await axios.post(
        `https://collabaidoc.vercel.app/v2/authenticate/save/${user.id}`,
        {
          documentId: id,
        }
      );

      if (data.success) {
        setFlagVisible(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Alert
        msg={"Saved to the library."}
        description={
          "You can view this documents in your My documents section now"
        }
        visible={flagVisible}
        setVisible={setFlagVisible}
        theme="success"
        duration={4000}
      />
      <Alert
        msg={"Login to continue"}
        description={"You are not logged in to continue this step"}
        visible={errorFlag}
        setVisible={setErrorFlag}
        theme="error"
        duration={4000}
      />
      <Navbar handleSaveDocument={handleSaveDocument} />
      <div className="mt-16">
         <div className="absolute inset-0">
                  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                </div>
        <Editor />
      </div>
    </>
  );
};

export default TextEditor;
