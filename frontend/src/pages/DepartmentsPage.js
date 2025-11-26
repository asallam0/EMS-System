import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import LoadingCard from "../components/LoadingCard";
import axios from "axios";

const DepartmentsPage = ({ authUser }) => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authUser) return;

    const fetchDepartments = async () => {
      try {
        const res = await axios.get(
          "/api/method/employee_management_system.api.department_api.get_departments",
          { withCredentials: true }
        );
        setDepartments(res.data.message.data || []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load departments");
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, [authUser]);

  if (!authUser) return <p>Please login to see departments</p>;
  if (loading) return <LoadingCard />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>All Departments</h2>
      <div className="row">
        {departments.map((d) => (
          <InfoCard
            key={d.name}
            title={d.department_name || d.name}
            link={`/departments/${d.name}`}
            type="department"
          />
        ))}
      </div>
    </div>
  );
};

export default DepartmentsPage;
