import React, { useState } from "react";
import { IoAddCircle } from "react-icons/io5";
import { MdOutlinePreview } from "react-icons/md";
import { IoIosStats } from "react-icons/io";
import { MdHome } from "react-icons/md";
import { useMediaQuery } from "react-responsive";

const AdminSidebar = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  return (
    <>
      <ul
        className={`${
          isMobile && "hidden"
        } menu bg-white rounded-md w-56 h-screen shadow-xl m-4`}
      >
        <h2 className="ml-8">
          <b>Weclome Admin</b>
        </h2>
        <li className="mt-14 w-full text-lg">
          <a href="/">
            <MdHome className="size-5" />
            Home
          </a>
        </li>
        <li className="mt-14 w-full text-lg">
          <a href="/admin/create">
            <IoAddCircle className="size-5" />
            Create Product
          </a>
        </li>
        <li className="mt-14 w-full text-lg">
          <a>
            <MdOutlinePreview className="size-5" /> Review Products
          </a>
        </li>
        <li className="mt-14 w-full text-lg">
          <a>
            <IoIosStats className="size-5" /> Stats
          </a>
        </li>
      </ul>
      {isMobile && (
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-6 absolute bottom-0 w-full flex justify-between">
          <li className="flex-1 text-center">
            <a
              href="/"
              className="tooltip hover:rounded-full w-1/2"
              data-tip="Home"
            >
              <MdHome className="size-5" />
            </a>
          </li>
          <li className="flex-1 text-center">
            <a className="tooltip hover:rounded-full w-1/2" data-tip="Create">
              <IoAddCircle className="size-5" />
            </a>
          </li>
          <li className="flex-1 text-center">
            <a className="tooltip hover:rounded-full w-1/2" data-tip="Review">
              <MdOutlinePreview className="size-5" />
            </a>
          </li>
          <li className="flex-1 text-center">
            <a className="tooltip hover:rounded-full w-1/2" data-tip="Stats">
              <IoIosStats className="size-5" />
            </a>
          </li>
        </ul>
      )}
    </>
  );
};

export default AdminSidebar;
