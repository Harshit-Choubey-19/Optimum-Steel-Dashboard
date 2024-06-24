import React from "react";
import { Link } from "react-router-dom";

const ContactSupportPage = () => {
  return (
    <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
      <h1 className="text-3xl font-bold mb-4">Contact Support</h1>
      <div className="flex-col flex-wrap mx-4">
        <div className="w-full md:w-1/2 xl:w-1/3 p-4 justify-center items-center">
          <div className="bg-white shadow-md rounded p-4 transition duration-300 ease-in-out hover:shadow-lg">
            <h2 className="text-lg font-bold mb-2">Phone</h2>
            <p className="text-gray-600">+91-9818287365</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white shadow-md rounded p-4 transition duration-300 ease-in-out hover:shadow-lg">
            <h2 className="text-lg font-bold mb-2">Email</h2>
            <p className="text-gray-600">optimumsteels@yahoo.com</p>
          </div>
        </div>
        <div className="w-full md:w-1/2 xl:w-1/3 p-4">
          <div className="bg-white shadow-md rounded p-4 transition duration-300 ease-in-out hover:shadow-lg">
            <h2 className="text-lg font-bold mb-2">Address</h2>
            <p className="text-gray-600">
              Address: KN/B-11 Anand Parvat, New Delhi -110005
            </p>
          </div>
        </div>
      </div>
      <div className="fixed top-4 right-4">
        <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
          <Link to={"/"}>Go to Home Page</Link>
        </button>
      </div>
    </div>
  );
};

export default ContactSupportPage;
