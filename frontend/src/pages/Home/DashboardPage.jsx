import { useState } from "react";
import NavBar from "../../components/NavBar";
import SideBar from "../../components/SideBar";
import Product from "../../components/Product";
import img from "../../images/steel.jpg";
import MobileProduct from "../../components/MobileProduct";

const DashboardPage = () => {
  const [products, setProducts] = useState([
    {
      id: 1,
      itemName: "CRC IS513",
      grade: "Primary",
      itemImg: img,
      dimension: "Primary 0.90mm",
      location: "Delhi",
      price: "₹62,000",
      createdAt: "1 day ago",
    },
    {
      id: 2,
      itemName: "CRC IS514",
      grade: "-",
      itemImg: img,
      dimension: "Primary 0.90mm",
      location: "Delhi",
      price: "₹65,000",
      createdAt: "21 hours ago",
    },
    {
      id: 3,
      itemName: "CRC IS515",
      grade: "-",
      itemImg: img,
      dimension: "Primary 0.80mm",
      location: "Faridabad",
      price: "₹75,000",
      createdAt: null,
    },
    {
      id: 4,
      itemName: "CRC IS516",
      grade: "-",
      itemImg: img,
      dimension: "Primary 0.60mm",
      location: "Ludhiana",
      price: "₹25,000",
      createdAt: null,
    },
    {
      id: 5,
      itemName: "CRC IS517",
      grade: "-",
      itemImg: img,
      dimension: "Primary 0.70mm",
      location: "Ahmedabad",
      price: "₹15,000",
      createdAt: null,
    },
  ]);

  return (
    <>
      <NavBar />

      <div className="flex">
        <SideBar />
        <div className="w-full p-3">
          <div className="bg-white rounded-md p-4 shadow-md mb-4">
            <h2 className="text-2xl font-bold mb-2 text-black">
              CRC Prices Today
            </h2>
            <div className="flex gap-4 mb-4 max-[630px]:w-2/3 w-2/12">
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
          <div className="bg-white rounded-md p-4 shadow-md">
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
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </tbody>
                {/* foot */}
              </table>
              <div className="min-[650px]:hidden">
                {products.map((product) => (
                  <MobileProduct key={product._id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
