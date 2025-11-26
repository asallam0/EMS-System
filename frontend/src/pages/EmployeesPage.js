// EmployeesPage.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Employees.css";
import { FaTrash, FaEdit, FaEye, FaPlus } from "react-icons/fa";
import axios from "axios";

const EmployeesPage = ({ authUser }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) return;

    const fetchEmployees = async () => {
      try {
        const res = await axios.get(
          "/api/method/employee_management_system.api.employee_api.get_employees",
          { withCredentials: true }
        );
        if (res.data.message.success) setEmployees(res.data.message.data);
        else setAlert({ type: "error", message: res.data.message.message });
      } catch {
        setAlert({ type: "error", message: "Failed to load employees" });
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, [authUser]);

  const handleDelete = async (name) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      const res = await axios.delete(
        "/api/method/employee_management_system.api.employee_api.delete_employee",
        {
          data: { name },
          withCredentials: true,
        }
      );
      if (res.data.message.success) {
        setEmployees(employees.filter((emp) => emp.name !== name));
        setAlert({ type: "success", message: "Employee deleted successfully" });
      } else {
        setAlert({ type: "error", message: res.data.message.message });
      }
    } catch {
      setAlert({ type: "error", message: "Failed to delete employee" });
    }
  };

  if (!authUser) return <p>Please login to continue...</p>;
  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

  return (
    <div className="employees-container container mt-4">
      <h2 className="page-title mb-3">Employees</h2>
      {alert.message && <div className={`alert alert-${alert.type}`}>{alert.message}</div>}

      <button
        className="btn btn-primary mb-3"
        onClick={() => navigate("/employees/create")}
      >
        <FaPlus className="me-2" /> Add Employee
      </button>

      <div className="table-responsive shadow-sm rounded">
        <table className="table table-hover align-middle">
          <thead className="table-primary">
            <tr>
              <th>Name</th>
              <th>Company</th>
              <th>Department</th>
              <th>Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp) => (
              <tr key={emp.name}>
                <td>{emp.employee_name}</td>
                <td>{emp.company}</td>
                <td>{emp.department}</td>
                <td>{emp.employee_status}</td>
                <td className="text-center">
                  <FaEye
                    className="icon-view mx-1"
                    onClick={() => navigate(`/employees/${emp.name}`)}
                  />
                  <FaEdit
                    className="icon-edit mx-1"
                    onClick={() => navigate(`/employees/update/${emp.name}`)}
                  />
                  <FaTrash
                    className="icon-delete mx-1"
                    onClick={() => handleDelete(emp.name)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeesPage;
