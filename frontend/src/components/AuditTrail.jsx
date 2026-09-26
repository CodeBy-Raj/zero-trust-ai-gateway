import React from "react";
import { History } from "lucide-react";

export default function AuditTrail({ logs }) {
  return (
    <div style={{ background: "#1e293b", padding: "16px", borderRadius: "8px", border: "1px solid #334155" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "12px" }}>
        <History size={18} color="#38bdf8" />
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "600" }}>
          SOC Forensics Audit Trail (`security_audit_logs`)
        </h3>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", maxHeight: "280px", overflowY: "auto" }}>
        {logs && logs.length > 0 ? (
          logs.map((log) => {
            const isBlocked = log.verdict === "BLOCKED";
            return (
              <div
                key={log.id}
                style={{
                  background: "#0f172a",
                  padding: "10px",
                  borderRadius: "6px",
                  borderLeft: `4px solid ${isBlocked ? "#ef4444" : "#10b981"}`,
                  fontSize: "12px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: "bold", color: isBlocked ? "#f87171" : "#34d399" }}>
                    {log.verdict}: <code style={{ color: "#f1f5f9" }}>{log.tool_attempted}</code>
                  </span>
                  <span style={{ color: "#64748b" }}>{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div style={{ color: "#94a3b8" }}>
                  <strong>Triggered Policy:</strong> {log.rule_triggered}
                </div>
                <div style={{ color: "#64748b", marginTop: "2px" }}>
                  <strong>Role:</strong> {log.user_role} | <strong>Args:</strong> {JSON.stringify(log.raw_arguments)}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ color: "#64748b", fontSize: "12px" }}>No audit records generated yet.</div>
        )}
      </div>
    </div>
  );
}
