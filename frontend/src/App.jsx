import { Navigate, Route, Routes, useParams } from "react-router-dom";

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

function App() {
  const [check, setCheck] = useState(false);

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
        console.log("AuthUser is here:", data);

        if (data.verified) {
          setCheck(true);
        } else {
          setCheck(false);
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
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
