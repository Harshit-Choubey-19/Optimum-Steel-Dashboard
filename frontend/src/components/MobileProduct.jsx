import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const MobileProduct = ({ product }) => {
  return (
    <div className="card bg-base-100 image-full shadow-xl m-4 hover:scale-105 transition-all duration-500 cursor-pointer">
      <figure>
        <img src={product.itemImg} alt="" />
      </figure>
      <div className="card-body">
        <div className="flex items-center justify-center">
          <h2 className="card-title font-extrabold">{product.itemName}</h2>
        </div>

        <p>
          Dimension:&nbsp;<span className="text-xs">{product.dimension}</span>
        </p>

        <p>
          Grade:&nbsp;<span className="text-sm">{product.grade}</span>
        </p>
        <div className="mt-4">
          <p>
            Price:&nbsp;<b className="text-lg">{product.price}</b>
          </p>
          <p>
            Location:&nbsp;<span className="text-sm">{product.location}</span>
          </p>
        </div>
        <div className="card-actions justify-end mt-3 items-center">
          <button className="btn btn-outline btn-success">Buy</button>
          <button className="bg-transparent rounded-full pl-2">
            <FaWhatsapp className="size-8 text-white bg-green-400" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MobileProduct;
