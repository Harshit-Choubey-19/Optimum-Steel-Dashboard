import { Link } from "react-router-dom";
import { useState } from "react";

import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../common/LoadingSpinner";

import toast from "react-hot-toast";

const SignUpPage = () => {
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    fullName: "",
    password: "",
  });

  const [emailMsg, setEmailMsg] = useState("");

  const { mutate, isError, isPending, error } = useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
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
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-md mx-auto flex h-screen px-10 bg-base-200">
      {/* <div className="flex-1 hidden lg:flex items-center  justify-center"></div> */}

      <div className="flex-1 flex flex-col justify-center items-center bg-base-100 shadow-lg">
        <h2 className="text-4xl mb-16">Optimum Steels</h2>
        <form
          className="lg:w-2/3 mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-extrabold text-black ml-2">
            Join today.
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail />
            <input
              type="email"
              className="grow"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>
          <div className="flex gap-4 flex-wrap">
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <FaUser />
              <input
                type="text"
                className="grow "
                placeholder="Username"
                name="username"
                onChange={handleInputChange}
                value={formData.username}
              />
            </label>
            <label className="input input-bordered rounded flex items-center gap-2 flex-1">
              <MdDriveFileRenameOutline />
              <input
                type="text"
                className="grow"
                placeholder="Full Name"
                name="fullName"
                onChange={handleInputChange}
                value={formData.fullName}
              />
            </label>
          </div>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword />
            <input
              type="password"
              className="grow"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? <LoadingSpinner /> : "Signup"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
          {emailMsg && (
            <p className="text-green-500">
              <b className="text-black">Note: </b>Check your spam folder if
              email is not visible in inbox field
            </p>
          )}
        </form>
        <div className="flex flex-col lg:w-2/3 gap-2 mt-4">
          <p className="text-black text-lg">Already have an account?</p>
          <Link to="/login">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign in
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SignUpPage;