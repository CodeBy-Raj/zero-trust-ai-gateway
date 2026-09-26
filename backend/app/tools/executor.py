from app.db.connection import get_db_connection

class ToolExecutor:
    @staticmethod
    def execute(tool_name: str, args: dict):
        conn = get_db_connection()
        try:
            with conn.cursor() as cur:
                if tool_name == "delete_user":
                    target_id = args.get("user_id")
                    cur.execute(
                        """
                        DELETE FROM company_users 
                        WHERE id = %s 
                        RETURNING id
                        """,
                        (target_id,)
                    )
                    deleted = cur.fetchone()
                    conn.commit()
                    
                    if deleted:
                        return True, f"Record {deleted['id']} deleted."
                    return True, "Record not found."

                if tool_name == "send_webhook":
                    # Simulated network egress for the hackathon demo
                    return True, f"Data dispatched to {args.get('url')}."

                return False, f"Unknown tool: {tool_name}"

        except Exception as e:
            conn.rollback()
            return False, f"Execution error: {str(e)}"
        finally:
            conn.close()

# --- Manual Test Block ---
if __name__ == "__main__":
    print("Testing ToolExecutor directly...")
    
    # Test deleting User ID 1
    success, outcome = ToolExecutor.execute("delete_user", {"user_id": "1"})
    print(f"Delete test result: {success} | {outcome}")