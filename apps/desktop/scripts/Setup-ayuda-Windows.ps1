<#
  Setup-ayuda-Windows.ps1
  ---------------------------------------------------------------------------
  Helper script for Windows contributors. The script checks for Node.js and
  pnpm, guiding the developer through basic environment preparation. It will be
  extended with automatic installation steps in future iterations.
#>

Write-Host "=== GestionVida :: Comprobación de entorno ===" -ForegroundColor Cyan

function Assert-Command {
  param(
    [Parameter(Mandatory = $true)][string]$Command,
    [Parameter(Mandatory = $true)][string]$FriendlyName,
    [string]$InstallUrl
  )

  if (-not (Get-Command $Command -ErrorAction SilentlyContinue)) {
    Write-Warning "No se encontró $FriendlyName."
    if ($InstallUrl) {
      Write-Host "Descarga e instala desde: $InstallUrl" -ForegroundColor Yellow
    }
  }
  else {
    Write-Host "✔ $FriendlyName detectado." -ForegroundColor Green
  }
}

Assert-Command -Command "node" -FriendlyName "Node.js 18+" -InstallUrl "https://nodejs.org/en/download/"
Assert-Command -Command "pnpm" -FriendlyName "pnpm" -InstallUrl "https://pnpm.io/es/installation"

Write-Host "";
Write-Host "Siguiente paso recomendado: ejecutar 'pnpm install' dentro de apps/desktop cuando el package.json esté disponible." -ForegroundColor Cyan
