def check_rbac(tool_name: str, role: str):
    # Only admins can delete records
    if tool_name == "delete_user" and role != "admin":
        return False, "RBAC Violation: Admin privileges required."
    
    return True, "RBAC check passed."
