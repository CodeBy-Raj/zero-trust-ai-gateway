import React from "react";
import { Database } from "lucide-react";

export default function DatabaseView({ users }) {
  return (
    <div style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", border: "1px solid #334155" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <Database size={18} color="#38bdf8" />
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>
          Target Infrastructure: Neon PostgreSQL (`company_users`)
        </h3>
      </div>

      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px", textAlign: "left" }}>
        <thead>
          <tr style={{ background: "#0f172a", borderBottom: "1px solid #334155" }}>
            <th style={{ padding: "8px 10px", color: "#94a3b8" }}>ID</th>
            <th style={{ padding: "8px 10px", color: "#94a3b8" }}>Employee Name</th>
            <th style={{ padding: "8px 10px", color: "#94a3b8" }}>Role</th>
            <th style={{ padding: "8px 10px", color: "#94a3b8" }}>Sensitive Field</th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((u) => (
              <tr key={u.id} style={{ borderBottom: "1px solid #334155" }}>
                <td style={{ padding: "8px 10px", fontWeight: "bold" }}>{u.id}</td>
                <td style={{ padding: "8px 10px" }}>{u.name}</td>
                <td style={{ padding: "8px 10px" }}>{u.role}</td>
                <td style={{ padding: "8px 10px", color: "#f87171", fontFamily: "monospace" }}>{u.sensitive_data}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} style={{ padding: "12px", textAlign: "center", color: "#ef4444" }}>
                All records deleted or table empty.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
