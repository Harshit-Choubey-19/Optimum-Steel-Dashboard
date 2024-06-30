import { Navigate, Route, Routes } from "react-router-dom";

import DashboardPage from "./pages/Home/DashboardPage";
import LoginPage from "./pages/auth/LoginPage";
import SignUpPage from "./pages/auth/SignUpPage";
import VerifyOtpPage from "./pages/verifyEmail/VerifyOtpPage";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./common/LoadingSpinner";
import { useState } from "react";
import ErrorPage from "./pages/error/ErrorPage";
import ContactSupportPage from "./pages/error/ContactSupportPage";
import ProfilePage from "./pages/user/ProfilePage";
import CreateProduct from "./pages/admin/pages/CreateProduct";
import AdminDashboard from "./pages/admin/AdminDashboard";

function App() {
  const [check, setCheck] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: authUser,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.error) return null;

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }

        if (data.verified) {
          setCheck(true);
        } else {
          setCheck(false);
        }

        if (data.role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route
          path="/signup"
          element={!authUser ? <SignUpPage /> : <Navigate to="/verifyOtp" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/verifyOtp" />}
        />
        <Route
          path="/verifyOtp"
          element={authUser && !check ? <VerifyOtpPage /> : <Navigate to="/" />}
        />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/contact" element={<ContactSupportPage />} />
        <Route
          path="/profile/:id"
          element={authUser && check ? <ProfilePage /> : <Navigate to="/" />}
        />
        <Route
          path="/admin"
          element={
            authUser && check && isAdmin ? (
              <AdminDashboard />
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/admin/create"
          element={
            authUser && check && isAdmin ? (
              <CreateProduct />
            ) : (
              <Navigate to="/" />
            )
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
