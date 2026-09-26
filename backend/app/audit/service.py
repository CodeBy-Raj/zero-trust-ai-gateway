import json
from app.db.connection import get_db_connection

class AuditService:
    @staticmethod
    def log(role: str, tool: str, args: dict, verdict: str, reason: str):
        conn = get_db_connection()
        try:
            with conn.cursor() as cur:
                cur.execute(
                    """
                    INSERT INTO security_audit_logs 
                    (user_role, tool_attempted, raw_arguments, verdict, rule_triggered) 
                    VALUES (%s, %s, %s, %s, %s)
                    """,
                    (role, tool, json.dumps(args), verdict, reason)
                )
            conn.commit()
            return True
        except Exception as e:
            print(f"Audit log failed: {e}")
            return False
        finally:
            conn.close()

# --- Manual Test Block ---
if __name__ == "__main__":
    print("Testing AuditService directly...")
    
    # Simulating a blocked wildcard deletion attempt
    success = AuditService.log(
        role="viewer",
        tool="delete_user",
        args={"user_id": "*"},
        verdict="BLOCKED",
        reason="Parameter Policy: Wildcards forbidden."
    )
    
    print(f"Audit log test result: {success}")