# terminal 1
$env:GGML_VK_VISIBLE_DEVICES="0"
$env:HIP_VISIBLE_DEVICES="0"
ollama serve

# terminal 2
# in C:\Users\Usuario\Documents\GitHub\Test Daltonismo> 
@"
model_list:
  - model_name: local
    litellm_params:
      model: ollama/gemma4:31b
      api_base: http://localhost:11434
      drop_params: true
"@ | Out-File -FilePath config.yaml -Encoding utf8
litellm --config .\config.yaml

# terminal 3
$env:ANTHROPIC_API_KEY="sk-local-fake-key"
$env:ANTHROPIC_BASE_URL="http://localhost:4000"
claude --model local

Opción 2

# terminal 1
$env:GGML_VK_VISIBLE_DEVICES="0"
$env:HIP_VISIBLE_DEVICES="0"
ollama serve

# terminal 2
Remove-Item Env:ANTHROPIC_AUTH_TOKEN -ErrorAction SilentlyContinue
$env:ANTHROPIC_AUTH_TOKEN="ollama"
$env:ANTHROPIC_BASE_URL="http://localhost:11434"
$env:ANTHROPIC_API_KEY=""
claude --model qwen2.5-coder:32b


# claude settings C:\Users\Usuario\.claude\settings.json
{
  "model": "qwen3.5:35b-a3b",
  "theme": "light",
  "env": {
    "CLAUDE_CODE_ATTRIBUTION_HEADER": "0",
    "ANTHROPIC_AUTH_TOKEN": "ollama",
    "ANTHROPIC_BASE_URL": "http://localhost:11434"
  }
}

# option 3

$env:OLLAMA_API_BASE="http://localhost:11434"
aider --model ollama/qwen3.5:35b-a3b --edit-format whole

