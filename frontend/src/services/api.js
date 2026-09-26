const API_BASE = "http://localhost:8000/api";

export async function executePrompt(prompt, role) {
  const response = await fetch(`${API_BASE}/execute`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
      user_role: role,
    }),
  });
  if (!response.ok) {
    throw new Error(`Execution failed: ${response.statusText}`);
  }
  return response.json();
}

export async function getDashboardState() {
  const response = await fetch(`${API_BASE}/state`);
  if (!response.ok) {
    throw new Error(`Failed to fetch state: ${response.statusText}`);
  }
  return response.json();
}
