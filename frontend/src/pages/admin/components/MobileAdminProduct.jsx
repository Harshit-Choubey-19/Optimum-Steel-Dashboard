import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit, MdCheck, MdClose } from "react-icons/md";

import LoadingSpinner from "../../../common/LoadingSpinner";

const MobileAdminProduct = ({ product }) => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const isOwner = user._id === product.owner._id;

  const [isClicked, setIsClicked] = useState(false);
  const [itemName, setItemName] = useState(product.itemName);
  const [dimension, setDimension] = useState(product.dimension);
  const [grade, setGrade] = useState(product.grade);
  const [price, setPrice] = useState(product.price);
  const [location, setLocation] = useState(product.location);

  const {
    data: products,
    isLoading,
    refetch,
  } = useQuery({ queryKey: ["products"] });

  const queryClient = useQueryClient();

  const { mutate: deleteProd, isDeleting: isDeleting } = useMutation({
    mutationKey: ["deleteProd"],
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/products/${product._id}`, {
          method: "DELETE",
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
      toast.success("Product deleted!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Something went wrong! Try again later");
    },
  });

  const { mutate: updateProd, isUpdating: isUpdating } = useMutation({
    mutationKey: ["updateProd"],
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/products/${product._id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemName,
            dimension,
            grade,
            price,
            location,
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
      toast.success("Product updated!");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Something went wrong! Try again later");
    },
  });

  useEffect(() => {
    refetch();
  }, [products, refetch]);

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProd();
    }
  };

  const handleUpdate = () => {
    updateProd();
    setIsClicked(false);
  };

  if (isLoading) {
    return <LoadingSpinner size="xl" />;
  }

  return (
    <div className="card bg-base-100 image-full shadow-xl m-4 hover:scale-105 transition-all duration-500 cursor-pointer">
      <figure>
        <img src={product?.itemImg} alt="" />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-center">
          {isClicked ? (
            <input
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              className="input input-bordered w-full text-gray-500"
            />
          ) : (
            <h2 className="card-title font-extrabold">{product?.itemName}</h2>
          )}
          {isClicked && (
            <button
              className=" hover:text-red-500 absolute top-1 right-2"
              onClick={() => setIsClicked(false)}
            >
              <MdClose className="size-6" />
            </button>
          )}
        </div>

        <p>
          Dimension:&nbsp;
          {isClicked ? (
            <input
              type="text"
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              className="input input-bordered w-full text-gray-500"
            />
          ) : (
            <span className="text-xs">{product?.dimension}</span>
          )}
        </p>

        <p>
          Grade:&nbsp;
          {isClicked ? (
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="select select-bordered w-full text-gray-500"
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
              <option value="Grade 3">Grade 3</option>
            </select>
          ) : (
            <span className="text-sm">{product?.grade}</span>
          )}
        </p>
        <div className="mt-4">
          <p>
            Price:&nbsp;
            {isClicked ? (
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input input-bordered w-full text-gray-500"
              />
            ) : (
              <b className="text-lg">
                ₹&nbsp;{product?.price.toLocaleString("en-IN")}
              </b>
            )}
          </p>
          <p>
            Location:&nbsp;
            {isClicked ? (
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="select select-bordered w-full text-gray-500"
              >
                <option value="New Delhi">New Delhi</option>
                <option value="Hyderabad">Hyderabad</option>
                <option value="Faridabad">Faridabad</option>
              </select>
            ) : (
              <span className="text-sm">{product?.location}</span>
            )}
          </p>
        </div>
        <div className="card-actions justify-end mt-3 items-center">
          {isOwner && !isDeleting && (
            <button className="ml-2 hover:text-red-500" onClick={handleDelete}>
              <FaRegTrashAlt className="size-5" />
            </button>
          )}
          {isDeleting && <LoadingSpinner size="sm" />}
          {isOwner && (
            <button
              className="hover:scale-125 ml-2"
              onClick={
                isClicked ? handleUpdate : () => setIsClicked(!isClicked)
              }
            >
              {isClicked ? (
                <MdCheck className="size-5 hover:text-green-500" />
              ) : (
                <MdEdit className="size-5" />
              )}
            </button>
          )}
          {isUpdating && <LoadingSpinner size="sm" />}
        </div>
      </div>
    </div>
  );
};

export default MobileAdminProduct;
