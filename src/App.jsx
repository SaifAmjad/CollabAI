import "./App.css";
import Home from "./pages/Home";
import TextEditor from "./pages/TextEditor";
import { Route, Routes } from "react-router-dom";
import MyDocs from "./pages/MyDocs";
import Login from "./pages/Login";
import { useState } from "react";
import ProtectedRoutes from "./utils/ProtectedRoutes";
import { AuthProvider } from "./context/AuthContext";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login setVisible={setVisible} />} />
          <Route
            path="/"
            element={
              <>
                <div className="absolute inset-0">
                  <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
                </div>
                <div className="relative z-10">
                  <Home visible={visible} setVisible={setVisible} />
                </div>
              </>
            }
          />
          <Route
            path="/mydocs"
            element={
              <ProtectedRoutes>
                <MyDocs />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/editor/:id"
            element={
              <ProtectedRoutes>
                
                <TextEditor />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </AuthProvider>
    </>
  );
}

export default App;
