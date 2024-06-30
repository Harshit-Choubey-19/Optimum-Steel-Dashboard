import React, { useState } from "react";
import NavBar from "../../../components/NavBar";
import AdminSidebar from "../../../components/AdminSidebar";
import Footer from "../../../components/Footer";
import LoadingSpinner from "../../../common/LoadingSpinner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    itemName: "",
    itemImg: "",
    grade: "",
    brand: "",
    dimension: "",
    location: "",
    price: "",
  });

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const {
    mutate: createProduct,
    isPending: isCreating,
    error,
  } = useMutation({
    mutationFn: async ({
      itemName,
      itemImg,
      grade,
      brand,
      dimension,
      location,
      price,
    }) => {
      try {
        const res = await fetch("/api/products/create", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            itemName,
            itemImg,
            grade,
            brand,
            dimension,
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
      toast.success("Product Created");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["products"] }),
        navigate("/admin", { replace: true }), // Redirect to /admin
      ]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleProductInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct({ ...product, itemImg: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(product);
  };

  return (
    <>
      <NavBar />
      <div className="flex overflow-auto">
        <AdminSidebar />
        <div className="flex-1 flex flex-col justify-center items-center bg-base-100 shadow-xl m-4">
          <div className="card-body items-center">
            <h2 className="text-xl font-semibold absolute">Create Product</h2>
            <form
              className="lg:w-2/3 md:mx-20 flex gap-4 flex-col mt-8"
              onSubmit={handleSubmit}
            >
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="text"
                    name="itemName"
                    placeholder="Product Name"
                    value={product.itemName}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label">Upload Product Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProductInputChange}
                  className="file-input file-input-bordered"
                />
              </div>
              <div className="form-control mt-2">
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="grade"
                  onChange={handleChange}
                >
                  <option disabled selected value="Grade">
                    Grade
                  </option>
                  <option value="Grade 1">Grade 1</option>
                  <option value="Grade 2">Grade 2</option>
                </select>
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="text"
                    name="brand"
                    placeholder="Brand"
                    value={product.brand}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="text"
                    name="dimension"
                    placeholder="Dimension"
                    value={product.dimension}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-2">
                <select
                  className="select select-bordered w-full max-w-xs"
                  name="location"
                  onChange={handleChange}
                >
                  <option disabled selected value="Location">
                    Location
                  </option>
                  <option value="New Delhi">New Delhi</option>
                  <option value="Hyderabad">Hyderabad</option>
                </select>
              </div>
              <div className="form-control mt-2">
                <label className="input input-bordered rounded flex items-center gap-2">
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter Price in IR"
                    value={product.price}
                    onChange={handleChange}
                    className="grow"
                  />
                </label>
              </div>
              <div className="form-control mt-4">
                <button className="btn rounded-full btn-success text-white">
                  {isCreating ? <LoadingSpinner /> : "Create"}
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

export default CreateProduct;
