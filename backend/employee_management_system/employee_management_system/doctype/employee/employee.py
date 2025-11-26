# Copyright (c) 2025, BrainWiseTask and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
from frappe.utils import getdate, today
import re

class Employee(Document):

    def validate(self):
        self.validate_employee_name()
        self.validate_employee_email()
        self.validate_employee_mobile()
        self.validate_employee_address()
        self.validate_employee_position()
        self.validate_department_belongs_to_company()


    def validate_employee_name(self):
        if not self.employee_name:
            frappe.throw("Employee name is required")

        pattern = r'^[A-Za-z\s]+$'
        if not re.match(pattern, self.employee_name):
            frappe.throw("Employee name is invalid — must contain only letters and spaces")

    def validate_employee_email(self):
        if not self.email_address:
            frappe.throw("Email address is required")

        pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
        if not re.match(pattern, self.email_address):
            frappe.throw("Invalid email address format")

    def validate_employee_mobile(self):
        if not self.mobile_number:
            return  

        pattern = r'^01[0125]\d{8}$'
        if not re.match(pattern, self.mobile_number):
            frappe.throw("Invalid mobile number — must be Egyptian format")

    def validate_employee_address(self):
        if not self.address:
            return

        pattern = r'^[A-Za-z0-9\s,().\-]+$'
        if not re.match(pattern, self.address):
            frappe.throw(
                "Invalid address — allowed: letters, numbers, commas, parentheses, hyphens, spaces"
            )

    def validate_employee_position(self):
        if not self.position:
            return

        pattern = r'^[A-Za-z0-9\s]+$'
        if not re.match(pattern, self.position):
            frappe.throw("Invalid position — must contain only letters, numbers, and spaces")

    def validate_department_belongs_to_company(self):
        if self.department and self.company:
            department_doc = frappe.get_doc("Department", self.department)
            if department_doc.company != self.company:
                frappe.throw("Selected department does not belong to the selected company")

    def calculate_days_employed(self):
        hired_on_date = getdate(self.hired_on)
        current_date = getdate(today())
        days_employed = (current_date - hired_on_date).days
        return days_employed
    @property
    def days_employed(self):
        return self.calculate_days_employed()	