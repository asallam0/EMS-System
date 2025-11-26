import frappe
from employee_management_system.utils.response.success import success_response
from employee_management_system.utils.response.error import error_response


@frappe.whitelist(allow_guest=False)
def get_departments():
    """
    Retrieve a list of all departments in the system.
    """
    try:
        departments = frappe.get_all('Department', fields=['name', 'department_name'])
        return success_response(
            message="Departments retrieved successfully",
            data=departments
        )
    except Exception as e:
        return error_response(message=f"Error retrieving departments: {str(e)}")


@frappe.whitelist(allow_guest=False)
def get_department(department_name):
    """
    Retrieve details of a specific department by its name.
    """
    try:
        department_name = validate_department_exists(department_name)
        department = frappe.get_doc('Department', department_name)
        return success_response(
            message="Department retrieved successfully",
            data=department.as_dict()
        )
    except Exception as e:
        return error_response(message=f"Error retrieving department: {str(e)}")


def validate_department_exists(department_name):
    """
    Check if a department with the given name exists in the system.
    Raises an error if not found.
    """
    if not department_name:
        frappe.throw("Department name is required")

    if not frappe.db.exists('Department', department_name):
        frappe.throw(f"Department '{department_name}' does not exist.")
        
    return department_name
