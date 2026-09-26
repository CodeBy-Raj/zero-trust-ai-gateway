def check_parameters(tool_name: str, args: dict):
    if tool_name == "delete_user":
        user_id = str(args.get("user_id", "")).strip().lower()
        forbidden_wildcards = ["*", "all", "%", "drop"]
        
        if user_id in forbidden_wildcards:
            return False, "Parameter Policy: Destructive wildcards are forbidden."
            
    return True, "Parameter policy passed."
