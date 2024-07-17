// AdminRoute.jsx
import React from "react";
import { Route, Navigate } from "react-router-dom";

const AdminRoute = ({ element: Element, ...rest }) => {
  // Your authentication logic goes here
  const isAdmin = true; // Example: assume the user is an admin

  return isAdmin ? (
    <Route {...rest} element={<Element />} />
  ) : (
    <Navigate to="/login" />
  );
};

export default AdminRoute;
