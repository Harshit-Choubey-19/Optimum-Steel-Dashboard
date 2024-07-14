import React, { useState, useEffect } from "react";
import NavBar from "../../components/NavBar";
import Footer from "../../components/Footer";
import { IoIosArrowDown } from "react-icons/io";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import LoadingSpinner from "../../common/LoadingSpinner";

const AuctionItemDetail = () => {
  const { id } = useParams();

  const [startingIn, setStartingIn] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [isBidAllowed, setIsBidAllowed] = useState(true);
  const [showBidForm, setShowBidForm] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
  });

  const queryClient = useQueryClient();

  const { data: auctionItem } = useQuery({
    queryKey: [`auctionItem`],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/auctions/${id}`);
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

  const {
    mutate: placeBid,
    isPending: isBiding,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({ amount }) => {
      try {
        const res = await fetch(`/api/auctions/${id}/bid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Something went wrong!");
        }
        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    onSuccess: () => {
      toast.success("Bid Placed!");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auctionItem"] }),
        setShowBidForm(false),
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
      setShowBidForm(false);
    },
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (auctionItem) {
        const startDate = new Date(auctionItem.startDate);
        const endDate = new Date(auctionItem.endDate);
        const currentTime = new Date();

        if (
          currentTime.getTime() < startDate.getTime() ||
          currentTime.getDate() < startDate.getDate()
        ) {
          setIsBidAllowed(false);
        }
        if (
          currentTime.getTime() > endDate.getTime() ||
          currentTime.getDate() > endDate.getDate()
        ) {
          setIsBidAllowed(false);
          setStartingIn("Auction has ended");
        }
        const timeDiff =
          new Date(auctionItem.endDate).getTime() - currentTime.getTime();
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          setTimeLeft(
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
          );
        } else {
          setTimeLeft("Auction has ended");
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [auctionItem, isBidAllowed, startingIn]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (auctionItem) {
        const currentTime = new Date();
        const timeDiff =
          new Date(auctionItem.startDate).getTime() - currentTime.getTime();
        if (timeDiff > 0) {
          const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor(
            (timeDiff % (1000 * 60 * 60)) / (1000 * 60)
          );
          const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

          setStartingIn(
            `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
          );
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [auctionItem, isBidAllowed, startingIn]);

  const handleClick = () => {
    setShowBidForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowBidForm(false);
    placeBid(formData);
  };

  return (
    <>
      <NavBar />
      <div className="p-4 pt-6 md:p-6 lg:p-12 m-8 bg-white shadow-2xl relative">
        <Link to={"/auction"}>
          <IoCloseSharp className="absolute right-3 top-4 size-8 cursor-pointer hover:scale-105 transition-all ease-linear" />
        </Link>
        <div className="flex flex-wrap mx-2">
          <div className="w-full md:w-1/2 xl:w-1/3 p-4">
            <img
              src={
                auctionItem?.image
                  ? auctionItem?.image
                  : "https://via.placeholder.com/350x250"
              }
              alt="Auction Item Image"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 xl:w-2/3 p-4">
            <h2 className="text-xl font-bold mb-2">
              Company Name:&nbsp;
              <span className="font-normal">{auctionItem?.companyName}</span>
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              {auctionItem?.itemName}
            </p>
            <div className="flex items-center mb-4">
              <span className="text-lg font-bold">Starting Bid:</span>
              <span className="text-lg text-black ml-2">
                ₹&nbsp;{auctionItem?.startPrice}&nbsp;per MT
              </span>
            </div>
            <div className="flex items-center mb-4">
              <span className="text-lg font-bold">Highest Bid:</span>
              <span className="text-lg text-black ml-2">
                &nbsp;
                {auctionItem?.highestBid?.amount
                  ? `₹ ${auctionItem?.highestBid?.amount} per MT by: ${auctionItem?.highestBid?.user.fullName}`
                  : "Empty"}
              </span>
            </div>
            <div
              className={`flex items-center mb-4 ${isBidAllowed && "hidden"}`}
            >
              <span className="text-lg font-bold">Starting in:</span>
              <span
                className={`text-lg text-green-500 ml-2 ${
                  startingIn === "Auction has ended" && "text-red-500"
                }`}
              >
                {startingIn}
              </span>
            </div>
            <div
              className={`flex items-center mb-4 ${!isBidAllowed && "hidden"}`}
            >
              <span className="text-lg font-bold">Time Left:</span>
              <span className="text-lg text-red-500 ml-2">{timeLeft}</span>
            </div>
            <button
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                !isBidAllowed && "btn btn-disabled"
              }`}
              onClick={handleClick}
            >
              {isBiding ? <LoadingSpinner /> : "Place Bid"}
            </button>
            <span className="ml-6 font-semibold">
              Users Bided:
              <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn m-1">
                  <IoIosArrowDown />
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content menu bg-base-100 rounded-box z-[1] w-56 p-2 shadow"
                >
                  {auctionItem?.bids.length > 0 ? (
                    auctionItem?.bids?.map((bidder) => (
                      <li key={bidder._id}>
                        <p className="text-xs">
                          {bidder?.user.fullName.split(" ")[0]} - ₹
                          {bidder.amount.toLocaleString("en-IN")}
                          &nbsp;per MT
                        </p>
                      </li>
                    ))
                  ) : (
                    <li>
                      <p className="text-xs">Empty</p>
                    </li>
                  )}
                </ul>
              </div>
            </span>
          </div>
        </div>
      </div>
      <div>
        <Footer />
      </div>
      {showBidForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Place Bid</h2>
            <div className="mb-4">
              <label
                htmlFor="amount"
                className="block text-gray-700 font-bold mb-2"
              >
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Submit
            </button>
            <button
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-4"
              onClick={() => setShowBidForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default AuctionItemDetail;
