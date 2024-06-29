import React from "react";
import NavBar from "../../components/NavBar";
import AdminSidebar from "../../components/AdminSidebar";
import Footer from "../../components/Footer";

import { useMediaQuery } from "react-responsive";

const AdminDashboard = () => {
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

  return (
    <>
      <NavBar />
      <AdminSidebar />
      {isDesktop && <Footer />}
    </>
  );
};

export default AdminDashboard;
