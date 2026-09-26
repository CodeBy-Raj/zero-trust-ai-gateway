from fastapi import APIRouter
from app.schemas.requests import PromptRequest
from app.agent.service import AgentService
from app.security.gateway import SecurityGateway
from app.tools.executor import ToolExecutor

router = APIRouter()
agent_service = AgentService()

@router.post("/execute")
def execute_prompt(req: PromptRequest):
    # 1. LLM evaluates prompt and proposes a tool
    agent_result = agent_service.process(req.prompt)

    # Return immediately if no tool is requested
    if agent_result["type"] == "text":
        return agent_result

    tool_name = agent_result["tool"]
    tool_args = agent_result["arguments"]

    # 2. Deterministic Gateway evaluates the proposed tool call
    allowed, reason = SecurityGateway.evaluate(
        tool_name,
        tool_args,
        req.user_role
    )

    # 3. Block execution and return forensics if policies fail
    if not allowed:
        return {
            "type": "tool_call",
            "tool_proposed": tool_name,
            "arguments": tool_args,
            "gateway_decision": "BLOCKED",
            "execution_outcome": reason
        }

    # 4. Execute against real infrastructure if approved
    success, outcome = ToolExecutor.execute(tool_name, tool_args)

    return {
        "type": "tool_call",
        "tool_proposed": tool_name,
        "arguments": tool_args,
        "gateway_decision": "ALLOWED",
        "execution_success": success,
        "execution_outcome": outcome
    }
