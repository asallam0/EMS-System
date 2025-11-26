# Copyright (c) 2025, BrainWiseTask and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document
import re


class UserAccounts(Document):
	def validate(self):
		self.validate_username()
		self.validate_email()	
    def validate_username(self):
        pattern = r'^[A-Za-z0-9._]+$'
        if not re.match(pattern, self.user_name):
            frappe.throw("Invalid username. Allowed characters: letters , numbers , dot (.), underscore (_)")
    def validate_email(self):
		pattern =r"[^@]+@[^@]+\.[^@]+"
		if not re.match(pattern,self.email_address):
			frappe.throw("Invalid email address")