from app.db.connection import get_db_connection

def init_db():
    conn = get_db_connection()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS company_users (
                    id SERIAL PRIMARY KEY,
                    name VARCHAR(100),
                    role VARCHAR(50),
                    sensitive_data VARCHAR(100)
                )
            """)
            
            cur.execute("SELECT COUNT(*) FROM company_users")
            if cur.fetchone()["count"] == 0:
                cur.execute("""
                    INSERT INTO company_users (name, role, sensitive_data) VALUES
                    ('Alice Stone', 'Staff Engineer', 'SALARY:$160k_SSN:4821'),
                    ('Bob Smith', 'Financial Analyst', 'SALARY:$120k_SSN:9012'),
                    ('Charlie Ray', 'System Admin', 'SALARY:$190k_SSN:1143')
                """)

            cur.execute("""
                CREATE TABLE IF NOT EXISTS security_audit_logs (
                    id SERIAL PRIMARY KEY,
                    timestamp TIMESTAMPTZ DEFAULT NOW(),
                    user_role VARCHAR(20),
                    tool_attempted VARCHAR(100),
                    raw_arguments JSONB,
                    verdict VARCHAR(20),
                    rule_triggered TEXT
                )
            """)

            cur.execute("""
                CREATE TABLE IF NOT EXISTS role_permissions (
                    role_name VARCHAR(50) PRIMARY KEY,
                    allowed_tools JSONB
                )
            """)

            cur.execute("SELECT COUNT(*) FROM role_permissions")
            if cur.fetchone()["count"] == 0:
                cur.execute("""
                    INSERT INTO role_permissions (role_name, allowed_tools) VALUES
                    ('viewer', '[]'),
                    ('editor', '["send_webhook"]'),
                    ('admin', '["delete_user", "send_webhook"]')
                """)

        conn.commit()
    finally:
        conn.close()

if __name__ == "__main__":
    init_db()
    print("Database initialized.")
