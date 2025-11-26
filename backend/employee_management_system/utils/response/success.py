import frappe

def success_response(message="Success", data=None, status_code=200):
    frappe.local.response["http_status_code"] = status_code
    return {
        "success": True,
        "message": message,
        "data": data
    }
