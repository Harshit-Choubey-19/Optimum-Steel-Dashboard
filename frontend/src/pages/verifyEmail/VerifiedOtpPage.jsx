import React from "react";
import { useParams } from "react-router-dom";
import successImage from "../../images/success.png";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../common/LoadingSpinner";

const VerifiedOtpPage = () => {
  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="max-w-md p-6 bg-white rounded-lg shadow-md">
        <img
          src={successImage}
          alt="Success"
          className="w-24 h-24 mx-auto mb-4"
        />
        <h2 className="text-2xl font-bold mb-2">
          Email Verified Successfully!
        </h2>
        <p className="text-lg text-gray-600">
          Congratulations! Your email has been verified successfully.
        </p>
        <button
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-4"
          onClick={() => (window.location.href = "/login")}
        >
          Go to Login
        </button>
      </div>
    </div>
  );
};

export default VerifiedOtpPage;
