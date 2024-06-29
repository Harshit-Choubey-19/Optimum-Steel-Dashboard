import { useState } from "react";
import { Link } from "react-router-dom";

import { MdOutlineMail, MdPassword } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import { BiHide } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../common/LoadingSpinner";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const queryClient = useQueryClient();

  const [show, setShow] = useState(false);

  const {
    mutate: loginMutation,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ email, password }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();

        if (!res.ok && !data.message) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log(data);
      if (
        data.message === "An OTP sent to your email please verify!" ||
        data.message === "OTP already sent please verify!"
      ) {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      } else {
        toast.success(data.message);
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation(formData);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="max-w-screen-sm mx-auto flex px-10 h-screen">
      {/* <div className="flex-2 hidden lg:flex items-center  justify-center"></div> */}
      <div className="flex-1 flex flex-col justify-center items-center bg-base-100 shadow-xl">
        <Link to={"/"}>
          <IoMdClose className="size-8 absolute top-5 hover:scale-105" />
        </Link>
        <h2 className="text-4xl mb-16 text-black">Optimum Steels</h2>
        <form
          className="lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col"
          onSubmit={handleSubmit}
        >
          <h1 className="text-4xl font-extrabold text-black ml-2">
            {"Let's"} go.
          </h1>
          <label className="input input-bordered rounded flex items-center gap-2">
            <MdOutlineMail className="text-black" />
            <input
              type="email"
              className="grow text-black"
              placeholder="Email"
              name="email"
              onChange={handleInputChange}
              value={formData.email}
            />
          </label>

          <label className="input input-bordered rounded flex items-center gap-2">
            <MdPassword className="text-black" />
            <input
              type={show ? "text" : "password"}
              className="grow text-black"
              placeholder="Password"
              name="password"
              onChange={handleInputChange}
              value={formData.password}
            />
            {show ? (
              <BiHide
                className="text-black cursor-pointer size-7 hover:bg-slate-200 hover:rounded-full"
                onClick={() => setShow(!show)}
              />
            ) : (
              <BiShow
                className="text-black cursor-pointer size-7 hover:bg-slate-200 hover:rounded-full"
                onClick={() => setShow(!show)}
              />
            )}
          </label>
          <button className="btn rounded-full btn-primary text-white">
            {isPending ? <LoadingSpinner /> : "Login"}
          </button>
          {isError && <p className="text-red-500">{error.message}</p>}
        </form>
        <div className="flex flex-col gap-2 mt-4">
          <p className="text-black text-lg">{"Don't"} have an account?</p>
          <Link to="/signup">
            <button className="btn rounded-full btn-primary text-white btn-outline w-full">
              Sign up
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
