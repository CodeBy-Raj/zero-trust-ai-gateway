import React from "react";
import { ShieldAlert, ShieldCheck, MessageSquare } from "lucide-react";

export default function SecurityDecision({ result }) {
  if (!result) return null;

  if (result.type === "text") {
    return (
      <div style={{ marginTop: "16px", background: "#1e293b", padding: "14px", borderRadius: "8px", border: "1px solid #334155" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "#94a3b8", fontSize: "14px", fontWeight: "600" }}>
          <MessageSquare size={16} /> Direct LLM Response (No Tool Requested):
        </div>
        <p style={{ marginTop: "8px", fontSize: "13px", color: "#e2e8f0" }}>{result.output}</p>
      </div>
    );
  }

  const isBlocked = result.gateway_decision === "BLOCKED";

  return (
    <div
      style={{
        marginTop: "16px",
        padding: "16px",
        borderRadius: "8px",
        background: isBlocked ? "rgba(127, 29, 29, 0.25)" : "rgba(6, 78, 59, 0.25)",
        border: `1px solid ${isBlocked ? "#ef4444" : "#10b981"}`
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: "700", fontSize: "15px", color: isBlocked ? "#f87171" : "#34d399" }}>
        {isBlocked ? <ShieldAlert size={20} /> : <ShieldCheck size={20} />}
        Gateway Decision: {result.gateway_decision}
      </div>

      <div style={{ marginTop: "10px", fontSize: "13px", display: "flex", flexDirection: "column", gap: "4px" }}>
        <div>
          <span style={{ color: "#94a3b8" }}>Agent Proposed Tool:</span> <code style={{ color: "#f1f5f9" }}>{result.tool_proposed}</code>
        </div>
        <div>
          <span style={{ color: "#94a3b8" }}>Parsed Arguments:</span> <code style={{ color: "#f1f5f9" }}>{JSON.stringify(result.arguments)}</code>
        </div>
        <div style={{ marginTop: "6px", color: isBlocked ? "#fca5a5" : "#6ee7b7" }}>
          <strong>Outcome:</strong> {result.execution_outcome}
        </div>
      </div>
    </div>
  );
}
