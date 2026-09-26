from app.db.connection import get_db_connection

def check_rbac(tool_name: str, role: str):
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("SELECT allowed_tools FROM role_permissions WHERE role_name = %s", (role,))
            result = cur.fetchone()
            
            if not result:
                return False, f"RBAC Violation: Role '{role}' does not exist in IAM table."
            
            allowed_tools = result['allowed_tools']
            
            if tool_name not in allowed_tools:
                return False, f"RBAC Violation: Role '{role}' lacks permission for '{tool_name}'."
                
            return True, "RBAC check passed."
    except Exception as e:
        return False, f"RBAC Database Error: {str(e)}"
    finally:
        conn.close()
