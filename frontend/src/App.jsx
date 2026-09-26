import React, { useState, useEffect } from "react";
import ThreatConsole from "./components/ThreatConsole";
import SecurityDecision from "./components/SecurityDecision";
import DatabaseView from "./components/DatabaseView";
import AuditTrail from "./components/AuditTrail";
import EvaluationMatrix from "./components/EvaluationMatrix";
import { getDashboardState } from "./services/api";
import { Shield } from "lucide-react";

export default function App() {
  const [role, setRole] = useState("viewer");
  const [result, setResult] = useState(null);
  const [dashboardState, setDashboardState] = useState({ users: [], logs: [] });

  const refreshState = async () => {
    try {
      const data = await getDashboardState();
      setDashboardState(data);
    } catch (e) {
      console.error("Failed to refresh state:", e);
    }
  };

  useEffect(() => {
    refreshState();
    // Auto-poll state every 2 seconds for live telemetry stream
    const interval = setInterval(refreshState, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleResult = (res) => {
    setResult(res);
    refreshState();
  };

  return (
    <div style={{ minHeight: "100vh", background: "#0f172a", color: "#f8fafc", padding: "24px", fontFamily: "sans-serif" }}>
      {/* Top Header */}
      <header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #334155",
          paddingBottom: "16px",
          marginBottom: "24px"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ background: "#2563eb", padding: "8px", borderRadius: "8px", display: "flex" }}>
            <Shield size={24} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "700", margin: 0 }}>Zero-Trust AI Execution Gateway</h1>
            <p style={{ margin: "2px 0 0 0", fontSize: "13px", color: "#94a3b8" }}>
              The LLM can ask. Only the policy gateway can authorize.
            </p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "13px", color: "#94a3b8" }}>Simulated User Role:</span>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            style={{
              background: "#1e293b",
              color: "#f8fafc",
              border: "1px solid #475569",
              padding: "6px 12px",
              borderRadius: "4px",
              fontSize: "13px",
              cursor: "pointer"
            }}
          >
            <option value="viewer">Viewer (Restricted)</option>
            <option value="admin">Admin (Privileged)</option>
          </select>
        </div>
      </header>

      {/* Main Grid: Left Panel (Attacker) vs Right Panel (SOC & DB) */}
      <main style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: "24px" }}>
        <section>
          <ThreatConsole role={role} onResult={handleResult} />
          <SecurityDecision result={result} />
          <EvaluationMatrix logs={dashboardState.logs} />
        </section>

        <section style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <DatabaseView users={dashboardState.users} />
          <AuditTrail logs={dashboardState.logs} />
        </section>
      </main>
    </div>
  );
}
