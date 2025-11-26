import React from "react";
import { Link } from "react-router-dom";
import { FaBuilding, FaLayerGroup } from "react-icons/fa";
import "../styles/card.css"; 

const InfoCard = ({ title, link, type }) => {
  let icon, color;
  if (type === "company") {
    icon = <FaBuilding />;
    color = "#0d6efd";  
  } else if (type === "department") {
    icon = <FaLayerGroup />;
    color = "#198754"; 
  }

  return (
    <div className="col-md-4 mb-3">
      <div className="info-card p-4 d-flex flex-column align-items-center text-center shadow-sm">
        <div className="info-icon mb-3" style={{ color, fontSize: "2.5rem" }}>
          {icon}
        </div>
        <h4 className="info-title">{title}</h4>
        <Link to={link} className="info-link mt-3">
          View Details
        </Link>
      </div>
    </div>
  );
};

export default InfoCard;
