import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// Use: <RoleRoute allow={["admin","manager"]}><YourPage/></RoleRoute>
function RoleRoute({ allow = [], children }) {
  const { user } = useAuth();

  // not logged in → go to login
  if (!user) return <Navigate to="/login" replace />;

  // role not allowed → go to shop
  if (!allow.includes(user.role)) return <Navigate to="/shop" replace />;

  return children;
}

export default RoleRoute;

