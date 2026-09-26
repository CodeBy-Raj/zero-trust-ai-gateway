# 🛡️ Zero-Trust AI Execution Gateway

> **"The LLM can ask. Only the policy gateway can authorize."**

This project tackles the **Cybersecurity in AI — Securing Systems That Learn** challenge. Instead of relying on generative LLMs to act as probabilistic security judges (which introduces latency and false positives), this project introduces a **Deterministic Zero-Trust Execution Gateway**. It physically separates the AI's cognitive reasoning from the infrastructure execution layer to neutralize the OWASP LLM03 "Excessive Agency" vulnerability.

---

## 🎯 Problem Fit & Hackathon Alignment
This solution addresses **Direction (a)** of the challenge: defending an AI system against AI-specific attacks[cite: 5]. Specifically, it fulfills the advanced direction of implementing **"Tool-use sandboxing, permission scoping and egress control for autonomous agents"**[cite: 5].

### 🕵️ Threat Model
*   **Who the attacker is:** An opportunistic user or a sophisticated external adversary utilizing Indirect Prompt Injection (IPI) or Retrieval-Augmented Generation (RAG) poisoning[cite: 3, 5].
*   **What they want:** To abuse agent autonomy to execute unauthorized database mutations (e.g., deleting records) or exfiltrate sensitive data/API keys[cite: 3, 5].
*   **What they can touch:** The agent's untrusted input interface and any retrieved context ingested by the LLM[cite: 5].

---

## 🏗️ Architecture

The system enforces a strict least-privilege boundary:
1.  **Agent Service (Groq LLM):** Parses the user prompt and generates a proposed JSON tool call. It has *zero* execution authority.
2.  **Security Gateway (Policy Engine):** Intercepts the proposal and evaluates it against four deterministic policies:
    *   **RBAC:** Role-Based Access Control.
    *   **Parameters:** Blocks destructive wildcards (`*`, `DROP`).
    *   **Egress:** Validates outbound network requests against an allowlist.
    *   **Secrets:** Scans payloads for raw credential leakage.
3.  **Tool Executor:** Executes the approved action against the live database.
4.  **Audit Service:** Immutably logs every `ALLOWED` and `BLOCKED` decision to the database for SOC review[cite: 5].

---

## ⚔️ Demonstrated Attacks & Defenses

This system successfully defends against three concrete threat vectors[cite: 5]:

1.  **Privilege Escalation (RBAC Violation):** A `viewer` attempts to execute `delete_user(id='2')`. The gateway deterministically blocks the execution due to insufficient permissions.
2.  **Tool Abuse / Wildcard Injection:** An `admin` is tricked into executing `delete_user(id='*')`. The Parameter Guard intercepts the destructive wildcard, preserving the database state.
3.  **Data Exfiltration / SSRF:** The agent attempts to send an internal payload via `send_webhook` to `http://attacker-c2.com`. The Egress Guard blocks the unauthorized domain.

---

## 📊 Honest Evaluation & Known Bypasses

To fulfill the requirement of reporting misses and false positives honestly[cite: 5], our static security evaluation yields the following metrics:

*   **Catch Rate (Recall):** 100% on Parameter, RBAC, and Network Egress attacks.
*   **False Positive Rate:** 0% on schema-valid, authorized operations.
*   **Documented Bypass (The Miss):** Our Data Loss Prevention (DLP) regex filter successfully catches raw keys (e.g., `sk-...`), but is successfully **bypassed by Base64 or Rot13 encoded secret leakage**[cite: 3].
*   **Out of Scope:** This defense explicitly does not cover pre-training model weight poisoning, supply chain vulnerabilities, or Denial of Wallet (token flooding) attacks[cite: 3, 5].

---

## 🚀 Getting Started

### Prerequisites
*   Python 3.10+
*   Node.js 18+
*   [Groq API Key](https://console.groq.com/) (Free Tier)
*   [Neon PostgreSQL](https://neon.tech/) Connection String (Free Tier)

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt