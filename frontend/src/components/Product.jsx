import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Product = ({ product }) => {
  return (
    <>
      <tr>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle h-12 w-12">
                <img src={product?.itemImg} alt="" />
              </div>
            </div>
            <div>
              <div className="font-bold">{product?.itemName}</div>
              <div className="text-sm opacity-50">{product?.dimension}</div>
            </div>
          </div>
        </td>
        <td>
          <p className="text-sm">{product?.grade}</p>
        </td>
        <td>
          <p className="text-sm">{product?.location}</p>
        </td>
        <td>₹&nbsp;{product?.price.toLocaleString("en-IN")}</td>
        <th className="flex gap-1">
          <button className="btn btn-outline btn-success">Buy</button>
          <button className="btn bg-transparent rounded-full">
            <FaWhatsapp className="size-6 text-white bg-green-400" />
          </button>
        </th>
      </tr>
    </>
  );
};

export default Product;
