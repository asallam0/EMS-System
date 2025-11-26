import frappe
from employee_management_system.utils.response.success import success_response
from employee_management_system.utils.response.error import error_response
from employee_management_system.utils.validate.employee import (
    validate_employee_exists,
    validate_employee_name,
    validate_employee_email,
    validate_employee_mobile,
    validate_employee_position,
    validate_employee_address,
    validate_department_belongs_to_company
)


@frappe.whitelist(allow_guest=True)
def get_employees():
    """Retrieve a list of all employees in the system."""
    try:
        employees = frappe.get_all('Employee', fields="*")
        return success_response(
            message="Employees retrieved successfully",
            data=employees
        )
    except Exception as e:
        return error_response(message=f"Error retrieving employees: {str(e)}")


@frappe.whitelist(allow_guest=True)
def get_employee(employee_name):
    """Retrieve details of a specific employee by their name."""
    try:
        if not employee_name:
            return error_response(message="Employee name is required")

        employee_name = validate_employee_exists(employee_name)
        employee = frappe.get_doc('Employee', employee_name)

        return success_response(
            message="Employee retrieved successfully",
            data=employee.as_dict()
        )
    except Exception as e:
        return error_response(message=f"Error retrieving employee: {str(e)}")


@frappe.whitelist(allow_guest=False)
def create_employee(**data):
    """Create a new employee in the system."""
    try:
        data["employee_name"] = validate_employee_name(data.get('employee_name'))
        data["email_address"] = validate_employee_email(data.get('email_address'))
        data["mobile_number"] = validate_employee_mobile(data.get('mobile_number'))
        data["position"] = validate_employee_position(data.get('position'))
        data["address"] = validate_employee_address(data.get('address'))

        company = data.get('company')
        department = data.get('department')
        validate_department_belongs_to_company(department, company)

        employee = frappe.new_doc('Employee')
        employee.update(data)
        employee.insert()
        frappe.db.commit()

        return success_response(
            message="Employee created successfully",
            data=employee.as_dict()
        )
    except Exception as e:
        return error_response(message=f"Error creating employee: {str(e)}")


@frappe.whitelist(allow_guest=False)
def patch_employee(name, **data):
    """PATCH API to update an existing employee partially."""
    try:
        name = validate_employee_exists(name)
        employee = frappe.get_doc("Employee", name)

        if "employee_name" in data:
            employee.employee_name = validate_employee_name(data.get("employee_name"))
        if "email_address" in data:
            employee.email_address = validate_employee_email(data.get("email_address"), employee.name)
        if "mobile_number" in data:
            employee.mobile_number = validate_employee_mobile(data.get("mobile_number"), employee.name)
        if "position" in data:
            employee.position = validate_employee_position(data.get("position"))
        if "address" in data:
            employee.address = validate_employee_address(data.get("address"))
        if "company" in data:
            employee.company = data.get("company")
        if "department" in data:
            validate_department_belongs_to_company(data.get("department"), employee.company)
            employee.department = data.get("department")
        if "hired_on" in data:
            employee.hired_on = data.get("hired_on")


        employee.save()
        frappe.db.commit()

        return success_response(
            message="Employee updated successfully",
            data=employee.as_dict()
        )
    except Exception as e:
        return error_response(message=f"Error updating employee: {str(e)}")


@frappe.whitelist(allow_guest=True)
def delete_employee(name):
    """Delete an existing employee safely."""
    try:
        name = validate_employee_exists(name)
        employee = frappe.get_doc("Employee", name)

        
        # if employee.has_linked_records():
        #     frappe.throw("Cannot delete employee, linked records exist")

        frappe.delete_doc("Employee", name, force=True)
        frappe.db.commit()

        return success_response(
            message=f"Employee {name} deleted successfully"
        )
    except Exception as e:
        return error_response(message=f"Error deleting employee: {str(e)}")
