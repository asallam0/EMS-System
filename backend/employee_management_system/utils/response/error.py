import frappe

def error_response(message=None, error=None, status_code=400):
    frappe.local.response["http_status_code"] = status_code
    return {
        "success": False,
        "message": message,
        "error": error
    }
