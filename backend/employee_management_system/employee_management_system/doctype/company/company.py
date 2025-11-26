# Copyright (c) 2025, BrainWiseTask and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re

class Company(Document):

    def validate(self):
        self.validate_company_name()

    def validate_company_name(self):
        pattern = r'^[A-Za-z\s]+$'
        if self.company_name and not re.match(pattern, self.company_name):
            frappe.throw("Company name is invalid — only letters allowed")

 

    def get_number_of_departments(self):
        return frappe.db.count('Department', filters={'company': self.name})


    def get_number_of_employees(self):
        return frappe.db.count('Employee', filters={'company': self.name})


    @property
    def number_of_departments(self):
        return self.get_number_of_departments()

    @property
    def number_of_employees(self):
        return self.get_number_of_employees()


    # def on_trash(self):
    #     if self.number_of_departments > 0:
    #         frappe.throw(
    #             f"Cannot delete Company because it still has {self.number_of_departments} departments.",
    #             exc=frappe.ValidationError
    #         )

    #     if self.number_of_employees > 0:
    #         frappe.throw(
    #             f"Cannot delete Company because it still has {self.number_of_employees} employees.",
    #             exc=frappe.ValidationError
    #         )
