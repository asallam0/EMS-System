import frappe
import re

def validate_employee_exists(employee_id):
    """Check if an employee with the given ID exists in the system."""
    if not frappe.db.exists('Employee', employee_id):
        frappe.throw(f"Employee with ID {employee_id} does not exist.")
    return employee_id


def validate_employee_name(name):
    """Validate the given employee name."""
    if not name or len(name.strip()) == 0:
        frappe.throw("Employee name is required.")
    pattern = r'^[a-zA-Z\s]+$'
    if not re.match(pattern, name):
        frappe.throw("Employee name is invalid — must contain only letters and spaces.")
    return name



def validate_employee_email(email, current_employee_name=None):
    """Validate the given email address."""
    if not email:
        frappe.throw("Email address is required.")
    
    email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    if not re.match(email_pattern, email):
        frappe.throw(f"Invalid email format: {email}")
    
    existing = frappe.db.get_value('Employee', {'email_address': email}, 'name')
    if existing and existing != current_employee_name:
        frappe.throw(f"Email address {email} is already in use by another employee.")
    
    return email


def validate_employee_mobile(mobile, current_employee_name=None):
    """Validate the given mobile number (optional field)."""
    if mobile:
        mobile_pattern = r'^01[0125]\d{8}$'
        if not re.match(mobile_pattern, mobile):
            frappe.throw(f"Invalid mobile number format: {mobile}")
        
        existing = frappe.db.get_value('Employee', {'mobile_number': mobile}, 'name')
        if existing and existing != current_employee_name:
            frappe.throw(f"Mobile number {mobile} is already in use by another employee.")
    
    return mobile


def validate_employee_position(position):
    """Validate the given employee position (optional field)."""
    if position:
        pattern = r'^[A-Za-z0-9\s]+$'
        if not re.match(pattern, position):
            frappe.throw("Employee position is invalid — must contain only letters, numbers, and spaces.")
    return position


def validate_employee_address(address):
    """Validate the given employee address (optional field)."""
    if address:
        pattern = r'^[A-Za-z0-9, \(\)\-]+$'
        if not re.match(pattern, address):
            frappe.throw("Employee address is invalid — must contain only letters, numbers, commas, parentheses, hyphens, and spaces.")
    return address


def validate_department_belongs_to_company(department, company):
    """Validate that the given department belongs to the specified company."""
    if department and company:
        dept_doc = frappe.get_doc("Department", department)
        if dept_doc.company != company:
            frappe.throw(f"Department {department} does not belong to company {company}.")
    return True
