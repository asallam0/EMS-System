import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DetailCard from "../components/DetailCard";
import LoadingCard from "../components/LoadingCard";

const CompanyDetail = () => {
  const { name } = useParams();
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await axios.get(
          `/api/method/employee_management_system.api.company_api.get_company?company_name=${encodeURIComponent(name)}`,
          { withCredentials: true }
        );
        setCompany(res.data.message.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load company");
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, [name]);

  if (loading) return <LoadingCard />;
  if (error) return <div className="alert alert-danger">{error}</div>;
  if (!company) return <p>No company found</p>;

  const details = {
    "Number of Departments": company.number_of_departments,
    "Number of Employees": company.number_of_employees,
    Owner: company.owner,
    "Creation Date": new Date(company.creation).toLocaleString(),
    "Modified By": company.modified_by,
  };

  return <DetailCard title={company.company_name || company.name} type="company" details={details} />;
};

export default CompanyDetail;
