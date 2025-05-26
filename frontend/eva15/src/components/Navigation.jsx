import React, { useEffect } from "react";
import NavBar from "./NavBar";
import {
 
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Employees from "../pages/Employees/Employees.jsx";
import { PrivateRoute } from "./PrivateRoute";
import { useAuth } from "../context/AuthContext.jsx";
import Products from "../pages/Products/Products.jsx";
import Clients from "../pages/Clientes/Clients.jsx";

function Navegation() {
  const { authCookie } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {

    if (authCookie && window.location.pathname === "/") {
      navigate("/dashboard");
    }
  }, [authCookie, navigate]);

  return (
    <>
      <NavBar />
      <Routes>

  
        <Route path="/products" element={<Products />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/clients" element={<Clients />} />

        <Route element={<PrivateRoute />}>
 
  
        </Route>
      </Routes>
    </>
  );
}

export default Navegation;
