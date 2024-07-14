import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import AdminSidebar from "../../../components/AdminSidebar";
import Footer from "../../../components/Footer";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { useNavigate } from "react-router-dom";

const CreateAuction = () => {
  const [auctionItem, setAuctionItem] = useState({
    companyName: "",
    itemName: "",
    image: "",
    startPrice: "",
    startDate: "",
    endDate: "",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    mutate: createAuction,
    isPending,
    isError,
    error,
  } = useMutation({
    mutationFn: async ({
      companyName,
      itemName,
      image,
      startPrice,
      startDate,
      endDate,
    }) => {
      try {
        const res = await fetch("/api/auctions/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            companyName,
            itemName,
            image,
            startPrice,
            startDate,
            endDate,
          }),
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
      toast.success("Auction created");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["auctionItems"] }),
        navigate("/admin", { replace: true }), // Redirect to /admin
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuctionItem({ ...auctionItem, [name]: value });
  };

  const handleAuctionImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAuctionItem({ ...auctionItem, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createAuction(auctionItem);
  };

  return (
    <>
      <NavBar />
      <div className="flex overflow-auto">
        <AdminSidebar />
        <div className="flex-1 flex flex-col justify-center items-center bg-base-100 shadow-xl m-4">
          <div className="card-body items-center">
            <h2 className="text-xl font-semibold absolute">Create Auction</h2>
            <form
              className="lg:w-2/3 md:mx-20 flex gap-4 flex-col mt-8"
              onSubmit={handleSubmit}
            >
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Company Name"
                    value={auctionItem.companyName}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="text"
                    name="itemName"
                    placeholder="Item Name"
                    value={auctionItem.itemName}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">Upload Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAuctionImageChange}
                  className="file-input file-input-bordered"
                />
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="number"
                    name="startPrice"
                    placeholder="Start Price"
                    value={auctionItem.startPrice}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="datetime-local"
                    name="startDate"
                    placeholder="Start Date"
                    value={auctionItem.startDate}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="datetime-local"
                    name="endDate"
                    placeholder="End Date"
                    value={auctionItem.endDate}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-4">
                <button className="btn rounded-full btn-success text-white">
                  {isPending ? <LoadingSpinner /> : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateAuction;
