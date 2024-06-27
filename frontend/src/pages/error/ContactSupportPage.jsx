import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../components/Footer";

const ContactSupportPage = () => {
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl shadow-md">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Contact Us
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Home / Contact Us
            </p>
            <p className="mt-6 text-center text-base text-gray-700">
              Products are sourced from the finest tinmills with the highest
              standards in Canada, America, Germany, France, Spain, Thailand
              etc. Optimum Steel aspires to supply material at fair and
              economical prices and meet customer requirements as always. We
              hope to be favoured with your patronage.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Name"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="text"
                  autoComplete="phone"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Phone"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Message"
                ></textarea>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
              >
                Send Message
              </button>
            </div>
          </form>
          <div className="mt-8 text-gray-700">
            <p>
              <strong>Address:</strong> KN/B-11 Anand Parvat, New Delhi -110005
            </p>
            <p>
              <strong>Proprietor:</strong> Vinnay Bansal
            </p>
            <p>
              <strong>Phone number:</strong> +91-9818287365
            </p>
            <p>
              <strong>Whatsapp number:</strong> +91-9818287365
            </p>
            <p>
              <strong>Email address:</strong> optimumsteels@yahoo.com
            </p>
          </div>
        </div>
        <div className="fixed top-4 right-4">
          <button className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded">
            <Link to={"/"}>Go to Home Page</Link>
          </button>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactSupportPage;
