import json
import re

SECRET_PATTERNS = [
    r"sk-[a-zA-Z0-9]{20,}",  # Standard OpenAI-style key format
    r"API_KEY_[A-Z0-9_]+"    # Custom mock key format
]

def check_secrets(args: dict):
    serialized_args = json.dumps(args)
    
    for pattern in SECRET_PATTERNS:
        if re.search(pattern, serialized_args):
            return False, "Secret Policy: Sensitive credential detected in payload."
            
    return True, "Secret policy passed."
