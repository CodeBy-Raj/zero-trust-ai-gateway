from app.audit.service import AuditService
from app.security.policies.rbac import check_rbac
from app.security.policies.parameters import check_parameters
from app.security.policies.egress import check_egress
from app.security.policies.secrets import check_secrets

class SecurityGateway:
    @staticmethod
    def evaluate(tool_name: str, args: dict, role: str):
        # 1. Evaluate RBAC Policy
        allowed, reason = check_rbac(tool_name, role)
        if not allowed:
            AuditService.log(role, tool_name, args, "BLOCKED", reason)
            return False, reason

        # 2. Evaluate Parameter Bounds
        allowed, reason = check_parameters(tool_name, args)
        if not allowed:
            AuditService.log(role, tool_name, args, "BLOCKED", reason)
            return False, reason

        # 3. Evaluate Network Egress
        allowed, reason = check_egress(tool_name, args)
        if not allowed:
            AuditService.log(role, tool_name, args, "BLOCKED", reason)
            return False, reason

        # 4. Evaluate Secret Leakage
        allowed, reason = check_secrets(args)
        if not allowed:
            AuditService.log(role, tool_name, args, "BLOCKED", reason)
            return False, reason

        # If all policies pass, approve and log the action
        AuditService.log(role, tool_name, args, "ALLOWED", "Passed all security policies.")
        return True, "Approved"

# --- Manual Test Block ---
if __name__ == "__main__":
    print("Testing Security Gateway Pipeline...")
    
    # Test 1: Viewer trying to delete a user (Should be blocked by RBAC)
    print("\n--- Test 1: Unauthorized Viewer ---")
    success, reason = SecurityGateway.evaluate("delete_user", {"user_id": "2"}, "viewer")
    print(f"Result: Allowed={success} | Reason={reason}")

    # Test 2: Admin trying to use a wildcard (Should be blocked by Parameters)
    print("\n--- Test 2: Admin Wildcard Abuse ---")
    success, reason = SecurityGateway.evaluate("delete_user", {"user_id": "*"}, "admin")
    print(f"Result: Allowed={success} | Reason={reason}")

    # Test 3: Admin executing a valid, targeted deletion (Should be Allowed)
    print("\n--- Test 3: Valid Admin Action ---")
    success, reason = SecurityGateway.evaluate("delete_user", {"user_id": "2"}, "admin")
    print(f"Result: Allowed={success} | Reason={reason}")
