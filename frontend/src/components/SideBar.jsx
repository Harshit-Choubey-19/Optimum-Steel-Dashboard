import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { IoCloseOutline } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";

const SideBar = () => {
  const [isFlatProductsOpen, setIsFlatProductsOpen] = useState(true);
  const [isLongProductsOpen, setIsLongProductsOpen] = useState(true);
  const [show, setShow] = useState(true);
  const isDesktop = useMediaQuery({ query: "(min-width: 1024px)" });

  const toggleFlatProducts = () => {
    setIsFlatProductsOpen(!isFlatProductsOpen);
  };

  const toggleLongProducts = () => {
    setIsLongProductsOpen(!isLongProductsOpen);
  };

  useEffect(() => {
    if (isDesktop) {
      setShow(true);
    }
  }, [isDesktop]);

  return (
    <>
      {!show && (
        <div className=" w-8 h-8 transition-all duration-500">
          <IoMdMenu
            className="size-8 cursor-pointer hover:scale-x-110"
            onClick={() => setShow(true)}
          />
        </div>
      )}
      <div
        className={`bg-blue-100 p-4 rounded-md shadow-md w-auto block transition-all duration-500  ${
          show ? "" : "hidden"
        }`}
      >
        <div className="flex justify-between">
          <h2 className="text-xl font-bold text-gray-800 mb-2">Products</h2>
          <IoCloseOutline
            className="size-8 lg:hidden cursor-pointer hover:scale-110"
            onClick={() => setShow(false)}
          />
        </div>

        <div className="flex items-center mb-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            className="ml-2 px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search"
          />
        </div>
        <div className="bg-white rounded-md shadow-md p-4">
          <div
            className="flex justify-between items-center mb-2 cursor-pointer"
            onClick={toggleFlatProducts}
          >
            <h3 className="text-lg font-medium text-gray-800">Flat Products</h3>
            {isFlatProductsOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
          {isFlatProductsOpen && (
            <ul className="space-y-2 cursor-pointer">
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">CRC</span>
              </li>
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">GI Coil</span>
              </li>
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">GP Coil</span>
              </li>
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">HR Plate</span>
              </li>
              <li className="flex justify-between items-center">
                <a href="#" className="text-blue-500 underline">
                  View All
                </a>
                <ChevronDownIcon className="h-5 w-5 text-gray-500" />
              </li>
            </ul>
          )}

          <div
            className="flex justify-between items-center mt-4 cursor-pointer"
            onClick={toggleLongProducts}
          >
            <h3 className="text-lg font-medium text-gray-800">Long Products</h3>
            {isLongProductsOpen ? (
              <ChevronUpIcon className="h-5 w-5 text-gray-500" />
            ) : (
              <ChevronDownIcon className="h-5 w-5 text-gray-500" />
            )}
          </div>
          {isLongProductsOpen && (
            <ul className="space-y-2">
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">Binding Wire</span>
              </li>
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">HB Wire</span>
              </li>
              <li className="flex justify-between items-center hover:bg-slate-100 rounded-md">
                <span className="text-gray-700">HRPO</span>
              </li>
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
