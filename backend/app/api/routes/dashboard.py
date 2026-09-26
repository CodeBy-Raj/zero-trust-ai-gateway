from fastapi import APIRouter
from app.db.connection import get_db_connection

router = APIRouter()

@router.get("/state")
def get_state():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            # Fetch target infrastructure state
            cur.execute("SELECT * FROM company_users ORDER BY id ASC")
            users = cur.fetchall()

            # Fetch SOC forensics trail
            cur.execute("SELECT * FROM security_audit_logs ORDER BY id DESC LIMIT 10")
            logs = cur.fetchall()

        return {
            "users": users,
            "logs": logs
        }
    finally:
        conn.close()
