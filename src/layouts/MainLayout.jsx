import React from "react";
import { Outlet } from "react-router";
import NavBar from "../components/NavBar";
import { Container } from "@mui/material";
import { ToastContainer } from "react-toastify";

const MainLayout = () => {
  return (
    <>
      <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
      <NavBar />
      {/* Outlet kısmı childları temsil ediyor */}
      <Container sx={{ mt: 3 }}>
        <Outlet />
      </Container>
    </>
  );
};

export default MainLayout;
