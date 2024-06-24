import React, { useState, useEffect } from "react";
import "daisyui/dist/full.css";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../common/LoadingSpinner";

const VerifyOtpPage = () => {
  const [canResend, setCanResend] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [emailMsg, setEmailMsg] = useState("");
  const [otp, setOtp] = useState(""); // Add OTP input field
  const [isVerifying, setIsVerifying] = useState(false); // Add verifying state

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  useEffect(() => {
    let timerId;
    if (!canResend) {
      timerId = setInterval(() => {
        setCountdown(countdown - 1);
        if (countdown === 0) {
          setCanResend(true);
          clearInterval(timerId);
        }
      }, 1000);
    }
    return () => {
      clearInterval(timerId);
    };
  }, [canResend, countdown]);

  const {
    mutate: resendEmail,
    isError,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/resendOtp", {
          method: "POST",
        });
        const data = await res.json();

        if (data.message) {
          setEmailMsg(data.message);
        }

        if (!res.ok && !data.message) {
          throw new Error(data.error || "Something went wrong!");
        }
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      setCanResend(false);
      setCountdown(60);
      setIsVerifying(false);
      toast.success("Email Resent successfully!");
    },
  });

  const { mutate: verifyOtp, isVerifying: isVerifyingOtp } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/verifyOtp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ otp }),
        });
        const data = await res.json();

        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: (data) => {
      // Redirect to next page or perform next action
      if (data.error) {
        setIsVerifying(false);
        return toast.error(data.error);
      }
      toast.success("OTP verified successfully!");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (data) => {
      toast.error(data.error);
    },
  });

  const { mutate: cancellVerification } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/auth/cancellVerify", {
          method: "POST",
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        console.log(error);
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      // Redirect to login page
      toast.success("Verification cancelled");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: () => {
      toast.error("Failed to log out!");
    },
  });

  const handleResendClick = () => {
    resendEmail();
  };

  const handleVerifyClick = () => {
    setIsVerifying(true);
    verifyOtp();
    console.log(otp);
  };

  const handleCancell = () => {
    cancellVerification();
  };

  return (
    <div className="h-screen flex justify-center items-center bg-base-200">
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Verify Your Email</h2>
          <p className="text-lg">Otp sent to your email!</p>
          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className={`btn btn-primary btn-block mt-3 ${
              isVerifying ? "btn-disabled" : ""
            }`}
            disabled={isVerifying}
            onClick={handleVerifyClick}
          >
            Verify OTP
            {isVerifyingOtp && <LoadingSpinner />}
          </button>
          <button
            className={`btn btn-secondary btn-block mt-3 ${
              canResend ? "" : "btn-disabled"
            }`}
            disabled={!canResend}
            onClick={handleResendClick}
          >
            {canResend
              ? "Resend Verification Email"
              : `Resend in ${formatCountdown(countdown)}`}
            {isPending && <LoadingSpinner />}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
          {emailMsg && (
            <p className="text-green-500">
              <b className="text-black">Note: </b>Check your spam folder if
              email is not visible in inbox field
              <p className="text-black">Enter the latest Otp sent</p>
            </p>
          )}
          <button
            className="btn btn-error btn-sm float-right mt-3"
            onClick={handleCancell}
          >
            Cancel Verification
          </button>
          <p className="text-red-600">
            <b className="text-black">Note: </b>Cancelling verification will
            lead to Signup Again!
          </p>
        </div>
      </div>
    </div>
  );
};

const formatCountdown = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${
    minutes > 0 ? `${minutes} minute${minutes > 1 ? "s" : ""} ` : ""
  }${remainingSeconds} second${remainingSeconds > 1 ? "s" : ""}`;
};

export default VerifyOtpPage;
