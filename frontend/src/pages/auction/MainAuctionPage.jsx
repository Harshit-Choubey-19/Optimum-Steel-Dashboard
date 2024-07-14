import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import AuctionItem from "./AuctionItem";
import Footer from "../../components/Footer";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../common/LoadingSpinner";

const MainAuctionPage = () => {
  const {
    data: auctionItems,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["auctionItems"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auctions");
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [auctionItems, refetch]);

  return (
    <>
      <NavBar />
      <div className=" flex justify-center items-center mt-5">
        <h1 className="text-2xl font-bold underline">Auction</h1>
      </div>
      <div className="flex overflow-auto">
        <div className="w-full ml-6 mr-6 mt-1 max-[760px]:ml-1">
          <div className="bg-white rounded-md p-4 shadow-xl mb-12 mt-1 max-[760px]:p-0">
            <div className="overflow-x-auto">
              <table className="table">
                {/* head */}
                <thead>
                  <tr className="text-lg max-[765px]:text-sm max-[630px]:text-xs">
                    <th>Company Name</th>
                    <th>Auction Date</th>
                    <th>Status</th>
                    <th>Time Duration</th>
                    <th>View Details</th>
                  </tr>
                </thead>
                {/* body */}
                <tbody>
                  {isLoading ? (
                    <LoadingSpinner size="3xl" />
                  ) : (
                    auctionItems?.map((item) => (
                      <AuctionItem key={item.id} item={item} />
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className={`sticky ${auctionItems?.length <= 3 && "mt-40"}`}>
        <Footer />
      </div>
    </>
  );
};

export default MainAuctionPage;
