function Install-CodexPet {
  param(
    [Parameter(Position = 0)]
    [string]$PetId,

    [switch]$List,

    [string]$CodexHome = $env:CODEX_HOME,

    [string]$RawBase = $env:AWESOME_CODEX_PET_RAW_BASE
  )

  if ([string]::IsNullOrWhiteSpace($RawBase)) {
    $RawBase = "https://raw.githubusercontent.com/burgleaf/qdog-community/main"
  }

  if ([string]::IsNullOrWhiteSpace($CodexHome)) {
    $CodexHome = Join-Path $env:USERPROFILE ".codex"
  }

  if ($List) {
    $catalog = Invoke-RestMethod -Uri "$RawBase/pets.json"
    $catalog | ForEach-Object {
      $version = if ($null -eq $_.spriteVersionNumber) { 1 } else { $_.spriteVersionNumber }
      "{0} - {1} (v{2})" -f $_.slug, $_.name, $version
    }
    return
  }

  if ([string]::IsNullOrWhiteSpace($PetId)) {
    Write-Host "Usage: Install-CodexPet <pet-slug--author-slug>"
    Write-Host "List:  Install-CodexPet -List"
    throw "Missing pet id"
  }

  if ($PetId -notmatch "^[a-z0-9]+(-[a-z0-9]+)*--[a-z0-9]+(-[a-z0-9]+)*$") {
    throw "Invalid pet id: $PetId. Expected format: pet-slug--author-slug"
  }

  $targetDir = Join-Path (Join-Path $CodexHome "pets") $PetId
  New-Item -ItemType Directory -Force -Path $targetDir | Out-Null

  Invoke-WebRequest -UseBasicParsing -Uri "$RawBase/pets/$PetId/pet.json" -OutFile (Join-Path $targetDir "pet.json")
  Invoke-WebRequest -UseBasicParsing -Uri "$RawBase/pets/$PetId/spritesheet.webp" -OutFile (Join-Path $targetDir "spritesheet.webp")

  Write-Host "Installed $PetId to $targetDir"

  if ($env:AWESOME_CODEX_PET_NO_STATS -ne "1") {
    $statsApi = $env:AWESOME_CODEX_PET_STATS_API
    if ([string]::IsNullOrWhiteSpace($statsApi)) {
      $statsApi = "https://resource.q.dog"
    }
    try {
      $eventId = [guid]::NewGuid().ToString("N")
      Invoke-WebRequest -UseBasicParsing -Method Post -TimeoutSec 3 -Headers @{ "X-Event-ID" = $eventId } -Uri "$statsApi/track/install?slug=$PetId" | Out-Null
    } catch {
      Write-Warning ("Installed successfully, but anonymous install statistics could not be reported: {0}`n{1}" -f $_.Exception.Message, $_.ScriptStackTrace)
    }
  }
}

if ($args.Count -gt 0) {
  Install-CodexPet @args
}
