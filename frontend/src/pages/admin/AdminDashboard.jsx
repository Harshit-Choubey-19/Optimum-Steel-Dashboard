import React, { useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";

import { useMediaQuery } from "react-responsive";
import AdminSidebar from "../../components/AdminSidebar";
import AdminProduct from "./components/AdminProduct";
import MobileAdminProduct from "./components/MobileAdminProduct";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../common/LoadingSpinner";

const AdminDashboard = () => {
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
  const isDesktop = useMediaQuery({ query: "(min-width: 769px)" });

  useEffect(() => {
    refetch();
  }, [products, refetch]);

  return (
    <>
      <NavBar />
      <div className="flex overflow-auto custom-scrollbar">
        <AdminSidebar />
        <div className="w-full p-3">
          <div className="bg-white rounded-md p-4 shadow-xl mb-12 mt-1">
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
                    products?.map((product) => (
                      <AdminProduct key={product._id} product={product} />
                    ))
                  )}
                </tbody>
                {/* foot */}
              </table>
              <div className="min-[650px]:hidden">
                {isLoading ? (
                  <LoadingSpinner size="3xl" />
                ) : (
                  products?.map((product) => (
                    <MobileAdminProduct key={product._id} product={product} />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {isDesktop && <Footer />}
      <style>
        {`
         .custom-scrollbar::-webkit-scrollbar {
            width: 30px;
            height: 10px;
          }
         .custom-scrollbar::-webkit-scrollbar-thumb {
            background-color: #ccc;
            border-radius: 10px;
          }
         .custom-scrollbar::-webkit-scrollbar-track {
            background-color: #f0f0f0;
          }
        `}
      </style>
    </>
  );
};

export default AdminDashboard;
