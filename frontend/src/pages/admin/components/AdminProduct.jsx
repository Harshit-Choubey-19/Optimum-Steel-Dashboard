import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaRegTrashAlt, FaCheck, FaPencilAlt } from "react-icons/fa";

import LoadingSpinner from "../../../common/LoadingSpinner";

const AdminProduct = ({ product }) => {
  const { data: user } = useQuery({ queryKey: ["authUser"] });
  const isOwner = user._id === product.owner._id;

  const queryClient = useQueryClient();

  const [editMode, setEditMode] = useState(false);
  const [itemName, setItemName] = useState(product.itemName);
  const [dimension, setDimension] = useState(product.dimension);
  const [grade, setGrade] = useState(product.grade);
  const [location, setLocation] = useState(product.location);
  const [price, setPrice] = useState(product.price);

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

  const { mutate: updateProd, isLoading: isUpdating } = useMutation({
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
            location,
            price,
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

  const handleDoubleClick = (e) => {
    if (isOwner) {
      setEditMode(true);
    }
  };

  const handleEditChange = (e, field) => {
    switch (field) {
      case "itemName":
        setItemName(e.target.value);
        break;
      case "dimension":
        setDimension(e.target.value);
        break;
      case "grade":
        setGrade(e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "price":
        setPrice(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProd();
    }
  };

  const handleUpdate = () => {
    updateProd();
    setEditMode(false);
  };

  if (isDeleting || isUpdating) {
    return (
      <tr>
        <LoadingSpinner size="xl" />;
      </tr>
    );
  }

  return (
    <>
      <tr>
        <td onDoubleClick={handleDoubleClick}>
          {editMode ? (
            <input
              type="text"
              value={itemName}
              onChange={(e) => handleEditChange(e, "itemName")}
            />
          ) : (
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle h-12 w-12">
                  <img src={product?.itemImg} alt="" />
                </div>
              </div>
              <div>
                <div className="font-bold">
                  {itemName}
                  <span
                    className={`tooltip cursor-pointer ml-2 ${
                      !isOwner && "hidden"
                    }`}
                    data-tip="Double-click to edit"
                  >
                    <FaPencilAlt className="text-gray-500 size-2.5" />
                  </span>
                </div>

                <div className="text-sm opacity-50">{dimension}</div>
              </div>
            </div>
          )}
        </td>
        <td onDoubleClick={handleDoubleClick}>
          {editMode ? (
            <select
              value={grade}
              onChange={(e) => handleEditChange(e, "grade")}
            >
              <option value="Grade 1">Grade 1</option>
              <option value="Grade 2">Grade 2</option>
            </select>
          ) : (
            <p className="text-sm">
              {grade}
              <span
                className={`tooltip cursor-pointer ml-2 ${
                  !isOwner && "hidden"
                }`}
                data-tip="Double-click to edit"
              >
                <FaPencilAlt className="text-gray-500 size-2.5" />
              </span>
            </p>
          )}
        </td>
        <td onDoubleClick={handleDoubleClick}>
          {editMode ? (
            <select
              value={location}
              onChange={(e) => handleEditChange(e, "location")}
            >
              <option value="New Delhi">New Delhi</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Faridabad">Faridabad</option>
              <option value="Banglore">Banglore</option>
            </select>
          ) : (
            <p className="text-sm">
              {location}
              <span
                className={`tooltip cursor-pointer ml-2 ${
                  !isOwner && "hidden"
                }`}
                data-tip="Double-click to edit"
              >
                <FaPencilAlt className="text-gray-500 size-2.5" />
              </span>
            </p>
          )}
        </td>
        <td onDoubleClick={handleDoubleClick}>
          {editMode ? (
            <input
              type="number"
              value={price}
              onChange={(e) => handleEditChange(e, "price")}
            />
          ) : (
            <p>
              ₹&nbsp;{price.toLocaleString("en-IN")}
              <span
                className={`tooltip cursor-pointer ml-2 ${
                  !isOwner && "hidden"
                }`}
                data-tip="Double-click to edit"
              >
                <FaPencilAlt className="text-gray-500 size-2.5" />
              </span>
            </p>
          )}
        </td>
        <th className="flex gap-1">
          {isOwner && !isDeleting && (
            <button className="ml-2 hover:text-red-500" onClick={handleDelete}>
              <FaRegTrashAlt className="size-5" />
            </button>
          )}
          {isOwner && editMode && (
            <button
              className="ml-2 hover:text-green-500"
              onClick={handleUpdate}
            >
              <FaCheck className="size-5" />
            </button>
          )}
          {isOwner && editMode && (
            <button
              className="ml-2 hover:text-red-500"
              onClick={() => setEditMode(false)}
            >
              Cancel
            </button>
          )}
        </th>
      </tr>
    </>
  );
};

export default AdminProduct;
