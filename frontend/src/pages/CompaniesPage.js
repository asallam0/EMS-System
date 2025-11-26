import React, { useEffect, useState } from "react";
import InfoCard from "../components/InfoCard";
import LoadingCard from "../components/LoadingCard";
import axios from "axios";

const CompaniesPage = ({ authUser }) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!authUser) return;

    const fetchCompanies = async () => {
      try {
        const res = await axios.get(
          "api/method/employee_management_system.api.company_api.get_companies",
          { withCredentials: true }
        );
        setCompanies(res.data.message.data);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to load companies");
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [authUser]);

  if (!authUser) return <p>Please login to see companies</p>;
  if (loading) return <LoadingCard />;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="container mt-4">
      <h2>All Companies</h2>
      <div className="row">
        {companies.map((c) => (
          <InfoCard
            key={c.name}
            title={c.company_name || c.name}
            link={`/companies/${c.name}`}
            type="company"
          />
        ))}
      </div>
    </div>
  );
};

export default CompaniesPage;
