import React from "react";
import { FaBuilding, FaLayerGroup } from "react-icons/fa";
import "../styles/card.css"; 

const DetailCard = ({ title, type, details }) => {
  let icon, color;
  if (type === "company") {
    icon = <FaBuilding />;
    color = "#0d6efd"; 
  } else if (type === "department") {
    icon = <FaLayerGroup />;
    color = "#198754"; 
  }

  return (
    <div className="detail-card container mt-4 p-4 shadow-sm rounded">
      <div className="d-flex align-items-center mb-3">
        <div style={{ color, fontSize: "2.5rem", marginRight: "15px" }}>
          {icon}
        </div>
        <h3 className="m-0">{title}</h3>
      </div>
      <div className="detail-body">
        {Object.entries(details).map(([key, value]) => (
          <p key={key}>
            <strong>{key.replace(/_/g, " ")}:</strong> {value ?? "N/A"}
          </p>
        ))}
      </div>
    </div>
  );
};

export default DetailCard;
