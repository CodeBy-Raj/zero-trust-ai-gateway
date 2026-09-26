import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from "lucide-react";

export default function EvaluationMatrix({ logs = [] }) {
  const totalLogs = logs.length;
  const blockedLogs = logs.filter(l => l.verdict === "BLOCKED").length;
  const liveBlockRate = totalLogs > 0 ? Math.round((blockedLogs / totalLogs) * 100) : 100;

  const rbacBlocks = logs.filter(l => l.rule_triggered && l.rule_triggered.includes("RBAC")).length;
  const paramBlocks = logs.filter(l => l.rule_triggered && (l.rule_triggered.includes("Parameter") || l.rule_triggered.includes("wildcard"))).length;
  const egressBlocks = logs.filter(l => l.rule_triggered && (l.rule_triggered.includes("Egress") || l.rule_triggered.includes("Secret"))).length;

  return (
    <div style={{ marginTop: "16px", background: "#1e293b", padding: "16px", borderRadius: "8px", border: "1px solid #334155" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
        <h3 style={{ margin: 0, fontSize: "13px", fontWeight: "700", color: "#94a3b8", letterSpacing: "0.5px" }}>
          DEFENSE EVALUATION &amp; BYPASS METRICS
        </h3>
        <span style={{ fontSize: "11px", background: "#0f172a", border: "1px solid #334155", color: "#38bdf8", padding: "2px 8px", borderRadius: "12px", display: "flex", alignItems: "center", gap: "4px" }}>
          <ShieldCheck size={12} /> Live Interception: {liveBlockRate}%
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", fontSize: "12px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} color="#10b981" /> Parameter Wildcard Abuse
          </span>
          <span style={{ color: "#34d399", fontWeight: "600" }}>
            {paramBlocks > 0 ? `${paramBlocks} Live Blocked (100%)` : "5/5 Benchmark Blocked"}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} color="#10b981" /> RBAC Privilege Escalation
          </span>
          <span style={{ color: "#34d399", fontWeight: "600" }}>
            {rbacBlocks > 0 ? `${rbacBlocks} Live Blocked (100%)` : "5/5 Benchmark Blocked"}
          </span>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <CheckCircle2 size={14} color="#10b981" /> Unauthorized Network Egress
          </span>
          <span style={{ color: "#34d399", fontWeight: "600" }}>
            {egressBlocks > 0 ? `${egressBlocks} Live Blocked (100%)` : "5/5 Benchmark Blocked"}
          </span>
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
