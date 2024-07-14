import React from "react";
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
        } menu bg-white rounded-md w-60 h-screen shadow-xl m-4`}
      >
        <h2 className="ml-8">
          <b>Weclome Admin</b>
        </h2>
        <li className="mt-14 w-full text-lg">
          <a href="/admin">
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
          <a href="/admin/auction/create">
            <IoAddCircle className="size-5" /> Create Auction
          </a>
        </li>
      </ul>
      {isMobile && (
        <ul className="menu menu-horizontal bg-base-200 rounded-box mt-8 fixed bottom-0 left-0 w-full flex z-30 justify-evenly items-center">
          <li className="text-center">
            <a href="/admin" className="tooltip" data-tip="Home">
              <MdHome className="size-6" />
            </a>
          </li>
          <li className="text-center">
            <div className="dropdown dropdown-top dropdown-end hover:bg-base-200">
              <div tabIndex={0} role="button" className="btn">
                <IoAddCircle className="size-6" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
              >
                <li>
                  <a href="/admin/create">Create Product</a>
                </li>
                <li>
                  <a href="/admin/auction/create">Create Auction</a>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      )}
    </>
  );
};

export default AdminSidebar;
