// EmployeeDetail.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Employees.css";
import axios from "axios";

const EmployeeDetail = () => {
  const { name } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/method/employee_management_system.api.employee_api.get_employee`,
          { params: { employee_name: name }, withCredentials: true }
        );
        if (res.data.message.success) setEmployee(res.data.message.data);
        else setAlert({ type: "error", message: res.data.message.message });
      } catch {
        setAlert({ type: "error", message: "Failed to load employee" });
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [name]);

  const fields = [
    "employee_name",
    "company",
    "department",
    "mobile_number",
    "email_address",
    "position",
    "hired_on",
    "days_employed",
    "employee_status",
    "address"
  ];

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;
  if (!employee) return null;

  return (
    <div className="employee-detail-container container mt-4">
      {alert.message && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

      <h2 className="page-title mb-3">Employee Details</h2>

      <div className="employee-card p-3 shadow-sm rounded row g-3">
        {fields.map((field) => (
          <div key={field} className="col-md-6">
            <strong className="text-dark">{field.replace(/_/g, " ")}:</strong>
            <span className="d-block text-secondary">{employee[field] || "-"}</span>
          </div>
        ))}
      </div>

      <button className="btn btn-primary mt-3" onClick={() => navigate("/employees")}>
        Back to List
      </button>
    </div>
  );
};

export default EmployeeDetail;
