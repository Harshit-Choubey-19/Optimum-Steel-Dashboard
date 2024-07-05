import React, { useState } from "react";
import NavBar from "../../components/NavBar";
import AuctionItem from "./AuctionItem";
import Footer from "../../components/Footer";

const MainAuctionPage = () => {
  const auctionItems = [
    {
      _id: 1,
      name: "Auction Item 1",
      description: "This is the description of auction item 1",
      image: "https://picsum.photos/200/300",
      bid: 0,
      highestBid: 0,
      highestBidder: "No one",
      startDate: "10 July 2024",
      duration: "14:00 - 15:15",
    },
    {
      _id: 2,
      name: "Auction Item 2",
      description: "This is the description of auction item 2",
      image: "https://picsum.photos/200/300",
      bid: 0,
      highestBid: 0,
      highestBidder: "No one",
      startDate: "12 July 2024",
      duration: "16:00 - 17:15",
    },
  ];

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
                  {auctionItems.map((item) => (
                    <AuctionItem key={item.id} item={item} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <div className="sticky mt-[100px]">
        <Footer />
      </div>
    </>
  );
};

export default MainAuctionPage;
