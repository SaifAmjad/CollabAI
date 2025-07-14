import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Alert from "../components/Alert";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  if (isAuthenticated) {
    return children;
  }

  return <Navigate to="/login" state={{ showAlert: true }} />
   
};

export default ProtectedRoutes;
