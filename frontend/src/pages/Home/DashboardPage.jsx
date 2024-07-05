import { useEffect, useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Product from "../../components/Product";
import MobileProduct from "../../components/MobileProduct";
import Footer from "../../components/Footer";
import LoadingSpinner from "../../common/LoadingSpinner";

import { useQuery } from "@tanstack/react-query";

const DashboardPage = () => {
  const [locationFilter, setLocationFilter] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [dimensionFilter, setDimensionFilter] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

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
    console.log(filteredProducts);
    refetch();
  }, [products, refetch]);

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        if (locationFilter && product.location !== locationFilter) return false;
        if (gradeFilter && product.grade !== gradeFilter) return false;
        if (dimensionFilter && product.dimension !== dimensionFilter)
          return false;
        return true;
      });
      setFilteredProducts(filtered);
    }
  }, [locationFilter, gradeFilter, dimensionFilter, products]);

  const handleFilterChange = (filterType, value) => {
    switch (filterType) {
      case "location":
        setLocationFilter(value);
        break;
      case "grade":
        setGradeFilter(value);
        break;
      case "dimension":
        setDimensionFilter(value);
        break;
      default:
        break;
    }
  };

  const handleClearFilters = () => {
    setLocationFilter("");
    setGradeFilter("");
    setDimensionFilter("");
    setFilteredProducts(products);
  };

  return (
    <>
      <NavBar />

      <div className="flex overflow-auto">
        <SideBar />
        <div className="w-full p-3">
          <div className="bg-white rounded-md p-4 shadow-2xl mb-4">
            <p className="text-lg mb-2 font-semibold">Filter by:</p>
            <div className="grid grid-cols-4 gap-4 mb-4 max-[630px]:grid-cols-2 lg:w-1/2 md:w-auto">
              <select
                className="bg-blue-400 rounded-md px-3 py-2 text-white"
                value={locationFilter}
                onChange={(e) => handleFilterChange("location", e.target.value)}
              >
                <option value="" disabled selected className="bg-white">
                  Locations
                </option>
                <option value="Banglore" className="bg-white text-black">
                  Banglore
                </option>
                <option value="Faridabad" className="bg-white text-black">
                  Faridabad
                </option>
                <option value="Hyderabad" className="bg-white text-black">
                  Hyderabad
                </option>
                <option value="New Delhi" className="bg-white text-black">
                  New Delhi
                </option>
                {/* Add more options for locations */}
              </select>
              <select
                className="bg-blue-400 rounded-md px-3 py-2 text-white"
                value={gradeFilter}
                onChange={(e) => handleFilterChange("grade", e.target.value)}
              >
                <option value="" disabled selected className="bg-white">
                  Grade
                </option>
                <option value="Grade 1" className="bg-white text-black">
                  Grade 1
                </option>
                <option value="Grade 2" className="bg-white text-black">
                  Grade 2
                </option>
                <option value="Grade 3" className="bg-white text-black">
                  Grade 3
                </option>
                {/* Add more options for grades */}
              </select>
              <select
                className="bg-blue-400 rounded-md px-3 py-2 text-white"
                value={dimensionFilter}
                onChange={(e) =>
                  handleFilterChange("dimension", e.target.value)
                }
              >
                <option value="" disabled selected className="bg-white">
                  Dimension
                </option>
                <option value="500mm" className="bg-white text-black">
                  500mm
                </option>
                <option value="600mm" className="bg-white text-black">
                  600mm
                </option>
                <option value="700mm" className="bg-white text-black">
                  700mm
                </option>
                <option value="800mm" className="bg-white text-black">
                  800mm
                </option>
                <option value="900mm" className="bg-white text-black">
                  900mm
                </option>
                {/* Add more options for dimensions */}
              </select>
              <p
                className="px-3 py-2 text-blue-400 cursor-pointer hover:text-blue-700"
                onClick={handleClearFilters}
              >
                Clear all
              </p>
            </div>
          </div>
          <div className="bg-white rounded-md p-4 shadow-xl">
            <div className="overflow-x-auto">
              <table className="table max-[650px]:hidden">
                {/* head*/}
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
                    filteredProducts?.map((product) => (
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
                  filteredProducts?.map((product) => (
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
