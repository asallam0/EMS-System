import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailCard from "../components/DetailCard";
import LoadingCard from "../components/LoadingCard";

const DepartmentDetail = () => {
  const { name } = useParams();
  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDepartment = async () => {
      try {
        const res = await axios.get(
          `/api/method/employee_management_system.api.department_api.get_department?department_name=${encodeURIComponent(name)}`,
          { withCredentials: true }
        );
        setDepartment(res.data.message.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load department");
      } finally {
        setLoading(false);
      }
    };
    fetchDepartment();
  }, [name]);

  if (loading) return <LoadingCard />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!department) return <p>No department found</p>;

  const details = {
    Company: department.company,
    "Number of Employees": department.number_of_employees,
    "Creation Date": department.creation ? new Date(department.creation).toLocaleString() : "N/A",
    "Modified By": department.modified_by,
  };

  return <DetailCard title={department.department_name || department.name} type="department" details={details} />;
};

export default DepartmentDetail;
