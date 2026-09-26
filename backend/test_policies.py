# test_policies.py
from app.security.policies.rbac import check_rbac
from app.security.policies.parameters import check_parameters
from app.security.policies.egress import check_egress

print("Testing RBAC (Viewer deleting user):", check_rbac("delete_user", "viewer"))
print("Testing Parameters (Admin deleting '*'):", check_parameters("delete_user", {"user_id": "*"}))
print("Testing Egress (Webhook to attacker.com):", check_egress("send_webhook", {"url": "http://attacker.com/steal"}))
