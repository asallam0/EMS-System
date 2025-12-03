import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Employees.css";
import axios from "axios";

const UpdateEmployee = () => {
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(""); 
  const [messageType, setMessageType] = useState(""); 
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  const fields = [
    "employee_name",
    "company",
    "department",
    "mobile_number",
    "email_address",
    "position",
    "hired_on",
    "employee_status",
    "address",
  ];

  useEffect(() => {
    const fetchEmployee = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `/api/method/employee_management_system.api.employee_api.get_employee`,
          { params: { employee_name: id }, withCredentials: true }
        );
        if (res.data.message.success) {
          setForm(res.data.message.data);
        } else {
          setMessage(res.data.message.message);
          setMessageType("error");
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message.message);
        } else {
          setMessage("Error fetching employee data");
        }
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    const fetchCompaniesAndDepartments = async () => {
      try {
        const compRes = await axios.get(
          "/api/method/employee_management_system.api.company_api.get_companies",
          { withCredentials: true }
        );
        setCompanies(compRes.data.message.data || []);

        const depRes = await axios.get(
          "/api/method/employee_management_system.api.department_api.get_departments",
          { withCredentials: true }
        );
        setDepartments(depRes.data.message.data || []);
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          setMessage(err.response.data.message.message);
        } else {
          setMessage("Error fetching companies or departments");
        }
        setMessageType("error");
      }
    };

    fetchEmployee();
    fetchCompaniesAndDepartments();
  }, [id]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(""); 

    try {
      const res = await axios.put(
        "/api/method/employee_management_system.api.employee_api.patch_employee",
        form,
        { withCredentials: true }
      );

      if (res.data.message && res.data.message.message) {
        setMessage(res.data.message.message);
        setMessageType(res.data.message.success ? "success" : "error");
      }

      if (res.data.message.success) {
        setTimeout(() => navigate("/employees"), 1500);
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setMessage(err.response.data.message.message);
      } else {
        setMessage("Unexpected server error");
      }
      setMessageType("error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="loader-container"><div className="spinner"></div></div>;

  return (
    <div className="form-container container mt-4">
      <h2 className="page-title mb-3">Update Employee</h2>

      {message && (
        <div className={`alert ${messageType === "error" ? "alert-danger" : "alert-success"}`}>
          {message}
        </div>
      )}

      <form className="form-card p-3 shadow-sm rounded" onSubmit={handleSubmit}>
        <div className="row g-3">
          {fields.map((field) => {
            if (field === "company") {
              return (
                <div className="col-md-6" key={field}>
                  <label className="form-label">Company</label>
                  <select
                    className="form-control"
                    name={field}
                    value={form[field] || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Company</option>
                    {companies.map((c) => (
                      <option key={c.name} value={c.name}>
                        {c.company_name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            } else if (field === "department") {
              return (
                <div className="col-md-6" key={field}>
                  <label className="form-label">Department</label>
                  <select
                    className="form-control"
                    name={field}
                    value={form[field] || ""}
                    onChange={handleChange}
                  >
                    <option value="">Select Department</option>
                    {departments.map((d) => (
                      <option key={d.name} value={d.name}>
                        {d.department_name}
                      </option>
                    ))}
                  </select>
                </div>
              );
            } else {
              return (
                <div className="col-md-6" key={field}>
                  <label className="form-label">{field.replace(/_/g, " ")}</label>
                  <input
                    type={field === "email_address" ? "email" : "text"}
                    className="form-control"
                    name={field}
                    value={form[field] || ""}
                    onChange={handleChange}
                  />
                </div>
              );
            }
          })}
        </div>
        <button className="btn btn-primary mt-3" type="submit" disabled={saving}>
          {saving ? "Saving..." : "Update Employee"}
        </button>
      </form>
    </div>
  );
};

export default UpdateEmployee;
