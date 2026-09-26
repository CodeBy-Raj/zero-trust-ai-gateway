from urllib.parse import urlparse

ALLOWED_DOMAINS = {"api.internal.com", "localhost"}

def check_egress(tool_name: str, args: dict):
    if tool_name != "send_webhook":
        return True, "Egress policy not applicable."

    url = args.get("url", "")
    try:
        parsed = urlparse(url)
        domain = parsed.hostname
    except Exception:
        return False, "Egress Policy: Invalid URL format."

    if domain not in ALLOWED_DOMAINS:
        return False, f"Egress Policy: Unauthorized domain '{domain}'."

    return True, "Egress policy passed."
