import frappe
from employee_management_system.utils.response.success import success_response
from employee_management_system.utils.response.error import error_response


@frappe.whitelist(allow_guest=False)
def get_companies():
    """
    Retrieve a list of all companies in the system.
    """
    try:
        companies = frappe.get_all('Company', fields=['name', 'company_name'])
        return success_response(
            message="Companies retrieved successfully",
            data=companies
        )
    except Exception as e:
        return error_response(message=f"Error retrieving companies: {str(e)}")


@frappe.whitelist(allow_guest=True)
def get_company(company_name):
    """
    Retrieve details of a specific company by its name.
    """
    try:
        company_name = validate_company_exists(company_name)
        company = frappe.get_doc('Company', company_name)
        return success_response(
            message="Company retrieved successfully",
            data=company.as_dict()
        )
    except Exception as e:
        return error_response(message=f"Error retrieving company: {str(e)}")


def validate_company_exists(company_name):
    """
    Check if a company with the given name exists in the system.
    Raises an exception if not found.
    """
    if not company_name:
        frappe.throw("Company name is required")

    if not frappe.db.exists('Company', company_name):
        frappe.throw(f"Company with name {company_name} does not exist.")

    return company_name
