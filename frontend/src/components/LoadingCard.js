import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingCard = () => {
  return (
<div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
      <FaSpinner className="spin" size={30} />
    </div>
  );
};

export default LoadingCard;