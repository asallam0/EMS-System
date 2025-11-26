import frappe

@frappe.whitelist(allow_guest=True)
def get_current_user_info():

    user = frappe.session.user
    roles = frappe.get_roles(user) if user != "Guest" else []

    permissions = {}
    if user != "Guest":
        for doctype in ["Employee", "Company", "Department"]:
            permissions[doctype] = frappe.has_permission(doctype, "read", user=user)

    return {
        "user": user,
        "roles": roles,
        "permissions": permissions
    }
