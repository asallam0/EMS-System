import React from "react";
import { Link } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaBuilding, FaUsersCog, FaUserTie } from "react-icons/fa";

const Dashboard = ({ authUser }) => {
  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2 className="dash-title">Dashboard</h2>
        <p>Welcome back! Choose a section to manage your system.</p>
      </div>

      <div className="dashboard-grid">
        <Link to="/companies" className="dash-card blue">
          <FaBuilding className="dash-icon company-icon" />
          <h3 className="company-title">Companies</h3>
          <p>View, create and manage companies</p>
        </Link>

        <Link to="/departments" className="dash-card green">
          <FaUsersCog className="dash-icon dept-icon" />
          <h3 className="department-title">Departments</h3>
          <p>Browse departments inside each company</p>
        </Link>

        <Link to="/employees" className="dash-card orange">
          <FaUserTie className="dash-icon employee-icon" />
          <h3 className="employee-title">Employees</h3>
          <p>View and manage employees</p>
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;
