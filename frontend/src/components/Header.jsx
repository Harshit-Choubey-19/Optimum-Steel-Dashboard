import React from "react";

const Header = () => {
  return (
    <div className="rounded-md bg-base-100 shadow-md p-2">
      <div className="flex justify-between gap-6">
        <div className="flex space-x-40 max-[765px]:space-x-10 min-[508px]:space-x-8">
          <div className="font-medium">Products</div>
          <div className="font-medium">Brand</div>
          <div className="font-medium">Location</div>
          <div className="font-medium">Prices</div>
        </div>
        <div className="font-medium">Actions</div>
      </div>
    </div>
  );
};

export default Header;
