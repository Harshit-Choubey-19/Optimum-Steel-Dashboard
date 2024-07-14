import React from "react";

const AuctionItem = ({ item }) => {
  const startDate = new Date(item.startDate);
  const endDate = new Date(item.endDate);
  const currentDate = new Date();
  const currentTime = currentDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const formatDateTime = (date) => {
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };

  const calculateDuration = () => {
    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${startTime} - ${endTime}`;
  };

  const getStatus = () => {
    if (startDate.toDateString() === currentDate.toDateString()) {
      if (
        currentTime >=
        startDate.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })
      ) {
        if (
          currentTime <=
          endDate.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })
        ) {
          return "IN PROGRESS";
        } else {
          return "COMPLETED";
        }
      } else {
        return "TODAY";
      }
    } else if (startDate > currentDate) {
      return "UPCOMING";
    } else {
      return "COMPLETED";
    }
  };

  const getStatusColor = () => {
    switch (getStatus()) {
      case "TODAY":
        return "text-green-500";
      case "UPCOMING":
        return "text-yellow-500";
      case "IN PROGRESS":
        return "text-orange-500";
      case "COMPLETED":
        return "text-red-500";
      default:
        return "";
    }
  };

  return (
    <>
      <tr className="text-lg max-[765px]:text-sm">
        <td>
          <p>{item.companyName || "Not available"}</p>
        </td>
        <td>
          <p>{formatDateTime(startDate) || "Not available"}</p>
        </td>
        <td>
          <p
            className={`text-xl max-[760px]:text-sm font-semibold ${getStatusColor()}`}
          >
            {getStatus()}
          </p>
        </td>
        <td>
          <p>{calculateDuration() || "Not available"}</p>
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
