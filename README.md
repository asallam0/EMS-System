# EMS-System

**Employee Management System**

A comprehensive solution for managing companies, departments, and employees, built with a robust Frappe backend and a modern React.js frontend.

---

## 🧩 Features

### 🔹 Backend (Frappe Framework)
- REST APIs for:
  - Companies
  - Departments
  - Employees  
- Data validations, including:
  - Name formatting  
  - Email syntax + uniqueness  
  - Mobile number validation  
  - Ensuring departments belong to their respective companies  
- Auto-calculated fields (e.g., Days Employed)
- Custom DocTypes:
  - Company  
  - Department  
  - Employee  
- Role-based authentication  
- Unified error and success response wrappers

---

### 🔹 Frontend (React.js)
- Modern dashboard UI (Sidebar, Topbar, Layout)
- Feature-rich pages:
  - Company: List / Create / Update
  - Department: List / Create / Update
  - Employee: List / Create / Update
- Form validation and error handling
- Toast notifications for feedback
- Full API integration with backend
- Modular & reusable components
- Protected routes (authentication/authorization)
- Icon library (React Icons, FontAwesome)
- Fully responsive design (desktop & mobile)

---

## 📦 Technologies Used

### 🔹 Backend
- Python
- Frappe Framework
- MariaDB
- REST API
- Frappe ORM
- Validation utilities

### 🔹 Frontend
- React.js
- React Router
- Axios
- TailwindCSS / Custom CSS
- FontAwesome / React Icons

---

## 🧪 API Endpoints

### Companies
| Method | Endpoint                                   | Description           |
|--------|--------------------------------------------|-----------------------|
| GET    | `/api/method/.../get_companies`            | Retrieve all companies |
| GET    | `/api/method/.../get_company/{name}`       | Retrieve a company by name |

### Departments
| Method | Endpoint                                   | Description                 |
|--------|--------------------------------------------|-----------------------------|
| GET    | `/api/method/.../get_departments`          | Retrieve all departments    |
| GET    | `/api/method/.../get_department/{name}`    | Retrieve a department by name |

### Employees
| Method | Endpoint                                   | Description                     |
|--------|--------------------------------------------|----------------------------------|
| GET    | `/api/method/.../get_employees`            | Retrieve all employees          |
| GET    | `/api/method/.../get_employee/{name}`      | Retrieve an employee by name    |
| POST   | `/api/method/.../create_employee`          | Create a new employee           |
| PATCH  | `/api/method/.../patch_employee/{name}`    | Update employee fields          |
| DELETE | `/api/method/.../delete_employee/{name}`   | Delete an employee              |

---

## 🖥️ Installation & Setup

### 🔹 Backend (Frappe Framework)
```bash
bench init ems-bench
cd ems-bench
bench new-site ems.local
bench get-app employee_management_system
bench --site ems.local install-app employee_management_system
bench start
```

---

You can further customize the system, add features, or modify the UI to fit your requirements.

For more details or to contribute, please see the documentation or open an issue on GitHub.