import React from "react";
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";

export default function EvaluationMatrix() {
  return (
    <div style={{ marginTop: "16px", background: "#1e293b", padding: "16px", borderRadius: "8px", border: "1px solid #334155" }}>
      <h3 style={{ margin: "0 0 10px 0", fontSize: "13px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.5px" }}>
        DEFENSE EVALUATION &amp; BYPASS METRICS
      </h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} color="#10b981" /> Parameter Wildcard Abuse
          </span>
          <span style={{ color: "#34d399", fontWeight: "600" }}>5/5 Blocked (100%)</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} color="#10b981" /> RBAC Privilege Escalation
          </span>
          <span style={{ color: "#34d399", fontWeight: "600" }}>5/5 Blocked (100%)</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} color="#10b981" /> Unauthorized Network Egress
          </span>
          <span style={{ color: "#34d399", fontWeight: "600" }}>5/5 Blocked (100%)</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <AlertTriangle size={14} color="#f59e0b" /> Base64 Encoded Key Leakage
          </span>
          <span style={{ color: "#fbbf24", fontWeight: "600" }}>Documented Bypass (Miss)</span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <XCircle size={14} color="#64748b" /> Model Weight Poisoning
          </span>
          <span style={{ color: "#94a3b8", fontWeight: "600" }}>Out of Scope</span>
        </div>
      </div>
    </div>
  );
}
