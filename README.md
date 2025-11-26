# EMS-System (Employee Management System)

نظام إدارة الموظفين المتكامل لإدارة الشركات، الإدارات، والموظفين بشكل احترافي وآمن.

---

## 🧩 **المميزات**

### 🔹 **Backend (Frappe Framework)**
- واجهة REST API لإدارة:
  - الشركات
  - الإدارات
  - الموظفين
- التحقق من صحة بيانات الإدخال:
  - صياغة الأسماء
  - صحة وخصوصية الإيميل
  - عدم تكرار الإيميل
  - التحقق من رقم الجوال
  - ربط الإدارة بالشركة بشكل صحيح
- حساب آلي (Days Employed)
- أنواع مستندات مخصصة (DocTypes)
- إدارة صلاحيات المستخدمين (Authentication & Roles)
- معالجة الاستجابة (نجاح/خطأ) بشكل موحد

---

### 🔹 **Frontend (React.js)**
- لوحة تحكم حديثة (تصميم احترافي متجاوب)
- صفحات إدارة كاملة:
  - عرض/إنشاء/تحديث الشركات
  - عرض/إنشاء/تحديث الإدارات
  - عرض/إنشاء/تحديث الموظفين
- تحقق نماذج الإدخال
- إشعارات فورية (Toast)
- دمج كامل مع واجهات برمجة التطبيقات
- مكونات قابلة لإعادة الاستخدام
- حماية الروابط (Protected Routes)
- أيقونات عالية الجودة
- متجاوب مع الجوال والكمبيوتر

---

## 📦 **التقنيات المستخدمة**

### 🔹 **Backend**
- Python
- Frappe Framework
- MariaDB
- REST API
- Frappe ORM
- Utilties للتحقق

### 🔹 **Frontend**
- React.js
- React Router
- Axios
- TailwindCSS / CSS
- FontAwesome & React Icons

---

## 🧪 **واجهات برمجة التطبيقات (API Endpoints)**

### الشركات (Companies)
| Method | Endpoint                              | Description         |
|--------|---------------------------------------|---------------------|
| GET    | `/api/method/.../get_companies`       | جميع الشركات        |
| GET    | `/api/method/.../get_company/{name}`  | شركة واحدة          |

### الإدارات (Departments)
| Method | Endpoint                               | Description            |
|--------|----------------------------------------|------------------------|
| GET    | `/api/method/.../get_departments`      | جميع الإدارات           |
| GET    | `/api/method/.../get_department/{name}`| إدارة واحدة             |

### الموظفين (Employees)
| Method | Endpoint                               | Description            |
|--------|----------------------------------------|------------------------|
| GET    | `/api/method/.../get_employees`        | قائمة الموظفين          |
| GET    | `/api/method/.../get_employee/{name}`  | موظف محدد               |
| POST   | `/api/method/.../create_employee`      | إضافة موظف جديد         |
| PATCH  | `/api/method/.../patch_employee/{name}`| تحديث بعض الحقول        |
| DELETE | `/api/method/.../delete_employee/{name}`| حذف موظف               |

---

## 🖥️ **تركيب النظام (Installation & Setup)**

### **Backend (Frappe Framework)**
```bash
bench init ems-bench
cd ems-bench
bench new-site ems.local
bench get-app employee_management_system
bench --site ems.local install-app employee_management_system
bench start
```

---

يمكنك تطوير النظام وإضافة خصائص جديدة، أو تعديل الواجهة لتناسب احتياجك.

### 📚 للمزيد من المعلومات أو المساهمة في المشروع، يرجى مراجعة مستند التوثيق أو فتح Issue على GitHub.
