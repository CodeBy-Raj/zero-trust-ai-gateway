TOOLS_SCHEMA = [
    {
        "type": "function",
        "function": {
            "name": "delete_user",
            "description": "Delete a specific user from the company database.",
            "parameters": {
                "type": "object",
                "properties": {
                    "user_id": {
                        "type": "string",
                        "description": "The ID of the user to delete. Can be a specific ID or a wildcard."
                    }
                },
                "required": ["user_id"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "send_webhook",
            "description": "Send a payload of data to a specified external URL.",
            "parameters": {
                "type": "object",
                "properties": {
                    "url": {
                        "type": "string",
                        "description": "The destination URL."
                    },
                    "payload": {
                        "type": "string",
                        "description": "The data to send."
                    }
                },
                "required": ["url", "payload"]
            }
        }
    }
]
