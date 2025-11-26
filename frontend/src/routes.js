import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "./App";

import LoginPage from "./pages/LoginPage";

import Dashboard from "./pages/Dashboard";

import CompaniesPage from "./pages/CompaniesPage";
import CompanyDetail from "./pages/CompanyDetail";

import DepartmentsPage from "./pages/DepartmentsPage";
import DepartmentDetail from "./pages/DepartmentDetail";

import EmployeesPage from "./pages/EmployeesPage";
import CreateEmployee from "./pages/CreateEmployee";
import UpdateEmployee from "./pages/UpdateEmployee";
import EmployeeDetail from "./pages/EmployeeDetail";

const storedUser = JSON.parse(localStorage.getItem("authUser"));

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "login", element: <LoginPage /> },

      { path: "dashboard", element: <Dashboard authUser={storedUser} /> },

      // ===== COMPANIES =====
      { path: "companies", element: <CompaniesPage authUser={storedUser} /> },
      {
        path: "companies/:name",
        element: <CompanyDetail authUser={storedUser} />,
      },

      // ===== DEPARTMENTS =====
      { path: "departments", element: <DepartmentsPage authUser={storedUser} /> },
      {
        path: "departments/:name",
        element: <DepartmentDetail authUser={storedUser} />,
      },

      // ===== EMPLOYEES =====
      { path: "employees", element: <EmployeesPage authUser={storedUser} /> },
      { path: "employees/:name", element: <EmployeeDetail authUser={storedUser} /> },
      { path: "employees/create", element: <CreateEmployee authUser={storedUser} /> },
      { path: "employees/update/:id", element: <UpdateEmployee authUser={storedUser} /> }
    ],
  },
]);
