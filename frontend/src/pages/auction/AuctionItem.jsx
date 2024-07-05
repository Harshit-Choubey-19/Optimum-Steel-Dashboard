import React from "react";

const AuctionItem = ({ item }) => {
  return (
    <>
      <tr className="text-lg max-[765px]:text-sm">
        <td>
          <p>{item.name}</p>
        </td>
        <td>
          <p>{item.startDate}</p>
        </td>
        <td>
          <p className="text-xl max-[760px]:text-sm font-semibold text-green-500">
            TODAY
          </p>
        </td>
        <td>
          <p>{item.duration}</p>
        </td>
        <td className="cursor-pointer hover:underline">
          <a className="text-blue-500" href={`/auction/${item._id}`}>
            View details
          </a>
        </td>
      </tr>
    </>
  );
};

export default AuctionItem;
