# migrate-scene-ja.ps1
# 为 hsk-fallback-data.ts 的所有 FallbackDialogue 添加 scene_ja 字段
# scene_ja = scene（不做翻译，只是字段统一，供前端统一用）

$file = "C:\Users\quent\Desktop\my-chinese-app\lib\hsk-fallback-data.ts"
$content = Get-Content $file -Raw

# Pattern: find each FallbackDialogue block with scene: '...' and add scene_ja after it
# For existing entries that already have scene_jp, leave them
# For entries without scene_jp, add scene_ja: same value as scene

# Strategy: Add scene_ja field right after scene field in every dialogue block
# We need to be careful not to break existing structure

# Read the file
$lines = Get-Content $file
$output = @()
$inDialogue = $false
$sceneAdded = $false

foreach ($line in $lines) {
    if ($line -match "^\s*scene:\s*'") {
        # This is a scene line, add scene_jp right after
        $output += $line
        # Check if next line already has scene_jp
        # For simplicity, just insert scene_jp: line right after
        # Extract scene value
        if ($line -match "scene:\s*'([^']+)'") {
            $sceneVal = $matches[1]
            # Find indentation
            $indent = $line -replace "^(.*?)\w.*$", '$1'
            $output += "${indent}scene_ja: '$sceneVal',"
        }
        $sceneAdded = $true
    } else {
        $output += $line
    }
}

# Write back
Set-Content -Path $file -Value $output -NoNewline
Write-Host "Done. Updated $file"