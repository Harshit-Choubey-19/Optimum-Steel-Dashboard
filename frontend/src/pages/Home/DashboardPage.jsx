import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Product from "../../components/Product";
import MobileProduct from "../../components/MobileProduct";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../common/LoadingSpinner";

import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [products, refetch]);

  return (
    <>
      <NavBar />

      <div className="flex overflow-auto">
        <SideBar />
        <div className="w-full p-3">
          <div className="bg-white rounded-md p-4 shadow-2xl mb-4">
            <h2 className="text-2xl font-bold mb-2 text-black">
              CRC Prices Today
            </h2>
            <div className="grid grid-cols-4 gap-4 mb-4 max-[630px]:grid-cols-2 lg:w-1/2 md:w-auto">
              <select className="bg-blue-400 rounded-md px-3 py-2 text-white">
                <option
                  disabled
                  selected
                  value=""
                  className="bg-white text-black"
                >
                  Locations
                </option>
                <option value="" className="bg-white text-black">
                  New Delhi
                </option>
                <option value="" className="bg-white text-black">
                  Hyderabad
                </option>
                {/* Add more options for locations */}
              </select>
              <select className=" bg-blue-400 rounded-md px-3 py-2 text-white">
                <option value="" disabled selected>
                  Brands
                </option>
                {/* Add more options for brands */}
              </select>
              <select className="bg-blue-400 rounded-md px-3 py-2 text-white">
                <option value="" disabled selected>
                  Grade
                </option>
                {/* Add more options for grades */}
              </select>
              <select className="bg-blue-400 rounded-md px-3 py-2 text-white">
                <option value="" disabled selected>
                  Dimension
                </option>
                {/* Add more options for dimensions */}
              </select>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 shadow-xl">
            <div className="overflow-x-auto">
              <table className="table max-[650px]:hidden">
                {/* head */}
                <thead>
                  <tr className="text-lg">
                    <th>Products</th>
                    <th>Grade</th>
                    <th>Location</th>
                    <th>Prices</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <LoadingSpinner size="3xl" />
                  ) : (
                    products.map((product) => (
                      <Product key={product._id} product={product} />
                    ))
                  )}
                </tbody>
                {/* foot */}
              </table>
              <div className="min-[650px]:hidden">
                {isLoading ? (
                  <LoadingSpinner size="3xl" />
                ) : (
                  products.map((product) => (
                    <MobileProduct key={product._id} product={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DashboardPage;
