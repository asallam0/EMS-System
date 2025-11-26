# Copyright (c) 2025, BrainWiseTask and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re

class Department(Document):

    def validate(self):
        self.validate_department_name()

    def validate_department_name(self):
        pattern = r'^[A-Za-z\s]+$'
        if self.department_name and not re.match(pattern, self.department_name):
            frappe.throw("Department name is invalid — only letters allowed")


    def get_number_of_employees(self):
        return frappe.db.count('Employee', filters={'department': self.name})

    @property
    def number_of_employees(self):
        return self.get_number_of_employees()

	# def on_trash(self):
	# 	if self.number_of_employees and self.number_of_employees > 0:
	# 		frappe.throw(
	# 			f"Cannot delete Department because it still has {self.number_of_employees} employees.",
	# 			exc=frappe.ValidationError
	# 		)
