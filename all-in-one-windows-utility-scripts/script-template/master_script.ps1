# ==============================================================================
# Modern Windows 11 Utility Master Script (PowerShell 5.1 / 7+ Edition)
# Self-contained administrative dashboard with CIM queries and registry helpers.
# ==============================================================================

$currentUser = [Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()
if (-not $currentUser.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Requesting Administrator elevation..." -ForegroundColor Yellow
    $pwshExe = (Get-Process -Id $PID).Path
    Start-Process -FilePath $pwshExe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit 0
}

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8

function Show-Header {
    Clear-Host
    Write-Host "====================================================================" -ForegroundColor Cyan
    Write-Host "         MODERN WINDOWS 11 UTILITY MASTER SCRIPT (POWERSHELL)" -ForegroundColor Cyan
    Write-Host "====================================================================" -ForegroundColor Cyan
}

function Show-Menu {
    Show-Header
    Write-Host " [1] SYSTEM & INFO TOOLS" -ForegroundColor Yellow
    Write-Host "     1A. OS Version, Uptime & Date/Time"
    Write-Host "     1B. View System PATH & Environment Variables"
    Write-Host "     1C. Create System Restore Point"
    Write-Host ""
    Write-Host " [2] NETWORK DIAGNOSTICS & UTILITIES" -ForegroundColor Yellow
    Write-Host "     2A. Reset Network Stack (IP, DNS Cache, Winsock)"
    Write-Host "     2B. Ping Diagnostic Test (Loopback, 1.1.1.1, Custom Host)"
    Write-Host "     2C. Mount Network Share (UNC Path Prompt)"
    Write-Host "     2D. Unmount All Mapped Network Drives (with Confirmation)"
    Write-Host "     2E. Default Gateway & Captive Portal Diagnostics"
    Write-Host ""
    Write-Host " [3] SYSTEM MAINTENANCE & SERVICES" -ForegroundColor Yellow
    Write-Host "     3A. Clear & Restart Print Spooler"
    Write-Host "     3B. Enable & Start Windows Update Service (wuauserv)"
    Write-Host "     3C. Stop & Disable Windows Update Service (wuauserv)"
    Write-Host "     3D. Clean Modern User & System Temp Caches"
    Write-Host "     3E. Check Windows Activation Status (CIM)"
    Write-Host "     3F. Install 'Open Admin Terminal Here' Context Menu"
    Write-Host "     3G. Uninstall 'Open Admin Terminal Here' Context Menu"
    Write-Host "     3H. Install 'Take Ownership' Context Menu"
    Write-Host "     3I. Uninstall 'Take Ownership' Context Menu"
    Write-Host ""
    Write-Host " [4] APPLICATION LAUNCHER" -ForegroundColor Yellow
    Write-Host "     4A. Quick Launch Utilities & Windows Settings Menu"
    Write-Host ""
    Write-Host " [5] SYSTEM POWER" -ForegroundColor Yellow
    Write-Host "     5R. Schedule System Restart (30s with Confirmation)"
    Write-Host "     5A. Abort Scheduled System Restart (shutdown /a)"
    Write-Host "     E.  Exit"
    Write-Host "====================================================================" -ForegroundColor Cyan
}

do {
    Show-Menu
    $selection = (Read-Host "Select an option (e.g. 1A, 2B, 3E, 4A, 5R, 5A, E)").ToUpper().Trim()

    switch ($selection) {
        "1A" {
            Show-Header
            $os = Get-CimInstance Win32_OperatingSystem
            [pscustomobject]@{
                Computer   = $env:COMPUTERNAME
                OS         = $os.Caption
                Version    = $os.Version
                Build      = $os.BuildNumber
                LastBoot   = $os.LastBootUpTime
                CurrentNow = Get-Date -Format "yyyy-MM-dd HH:mm:ss zzz"
            } | Format-List
            [void](Read-Host "Press Enter to return...")
        }
        "1B" {
            Show-Header
            Write-Host "--- SYSTEM PATH ---" -ForegroundColor Green
            $env:PATH -split ";" | Where-Object { $_ } | ForEach-Object { Write-Host "  $_" }
            Write-Host "`n--- ENVIRONMENT VARIABLES ---" -ForegroundColor Green
            Get-ChildItem env: | Sort-Object Name | ForEach-Object { Write-Host "$($_.Name) = $($_.Value)" }
            [void](Read-Host "`nPress Enter to return...")
        }
        "1C" {
            Show-Header
            Write-Host "Creating System Restore Point..." -ForegroundColor Green
            try {
                # Use powershell.exe 5.1 explicitly so Checkpoint-Computer works even if launched from pwsh 7
                powershell.exe -NoProfile -Command "Checkpoint-Computer -Description 'Windows Utility Restore Point' -RestorePointType MODIFY_SETTINGS -ErrorAction Stop"
                Write-Host "[OK] Restore point created successfully." -ForegroundColor Green
            } catch {
                Write-Host "[WARNING] System Restore Point failed: $($_.Exception.Message)" -ForegroundColor Yellow
            }
            [void](Read-Host "Press Enter to return...")
        }
        "2A" {
            Show-Header
            Write-Host "Resetting Network Stack..." -ForegroundColor Green
            ipconfig /release | Out-Null
            ipconfig /renew | Out-Null
            Clear-DnsClientCache
            ipconfig /registerdns | Out-Null
            netsh winsock reset | Out-Null
            netsh int ip reset | Out-Null
            Write-Host "[OK] Network reset complete. Reboot if prompted for Winsock." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "2B" {
            Show-Header
            Write-Host "Running Ping Diagnostics..." -ForegroundColor Green
            Test-Connection -ComputerName 127.0.0.1 -Count 3 -ErrorAction SilentlyContinue
            Test-Connection -ComputerName 1.1.1.1 -Count 3 -ErrorAction SilentlyContinue
            $customHost = (Read-Host "Enter custom IP/domain for 4-ping test (Enter to skip)").Trim()
            if ($customHost) {
                Test-Connection -ComputerName $customHost -Count 4 -ErrorAction SilentlyContinue
            }
            [void](Read-Host "Press Enter to return...")
        }
        "2C" {
            Show-Header
            $share = (Read-Host "Enter UNC share path (e.g. \\SERVER\ShareName)").Trim()
            if ($share) {
                net use * $share /persistent:yes
            } else {
                Write-Host "[INFO] No UNC path entered. Canceled." -ForegroundColor Yellow
            }
            [void](Read-Host "Press Enter to return...")
        }
        "2D" {
            Show-Header
            $confirm = (Read-Host "Disconnect ALL mapped network drives? [Y/N]").Trim().ToUpper()
            if ($confirm -eq "Y") {
                net use * /delete /y
            } else {
                Write-Host "Operation canceled."
            }
            [void](Read-Host "Press Enter to return...")
        }
        "2E" {
            Show-Header
            $gw = Get-NetRoute -DestinationPrefix "0.0.0.0/0" -ErrorAction SilentlyContinue | Sort-Object RouteMetric | Select-Object -First 1 -ExpandProperty NextHop
            if ($gw) {
                Write-Host "Default Gateway: $gw" -ForegroundColor Cyan
                Test-Connection -ComputerName $gw -Count 2 -ErrorAction SilentlyContinue
            } else {
                Write-Host "[INFO] No active IPv4 default gateway detected." -ForegroundColor Yellow
            }
            $portal = (Read-Host "Enter router or captive-portal URL to open (Enter to skip)").Trim()
            if ($portal) { Start-Process $portal }
            [void](Read-Host "Press Enter to return...")
        }
        "3A" {
            Show-Header
            Stop-Service spooler -Force -ErrorAction SilentlyContinue
            Remove-Item "$env:SystemRoot\System32\spool\PRINTERS\*" -Force -Recurse -ErrorAction SilentlyContinue
            Start-Service spooler
            Write-Host "[OK] Print Spooler cleared and restarted." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3B" {
            Show-Header
            Set-Service wuauserv -StartupType Automatic
            Start-Service wuauserv -ErrorAction SilentlyContinue
            Write-Host "[OK] Windows Update service enabled and started." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3C" {
            Show-Header
            Stop-Service wuauserv -Force -ErrorAction SilentlyContinue
            Set-Service wuauserv -StartupType Disabled
            Write-Host "[OK] Windows Update service stopped and disabled." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3D" {
            Show-Header
            Write-Host "Cleaning User Temp ($env:TEMP) and System Temp ($env:SystemRoot\Temp)..." -ForegroundColor Green
            Remove-Item "$env:TEMP\*" -Force -Recurse -ErrorAction SilentlyContinue
            Remove-Item "$env:SystemRoot\Temp\*" -Force -Recurse -ErrorAction SilentlyContinue
            Write-Host "[OK] Temp cleanup finished (locked in-use files safely skipped)." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3E" {
            Show-Header
            $lic = Get-CimInstance SoftwareLicensingProduct -Filter "ApplicationID='55c92734-d682-4d71-983e-d6ec3f16059f' AND PartialProductKey IS NOT NULL"
            if ($lic) {
                $statusMap = @{0="Unlicensed";1="Licensed";2="OOB Grace";3="OOT Grace";4="Non-Genuine";5="Notification";6="Extended Grace"}
                $lic | ForEach-Object {
                    [pscustomobject]@{
                        Name       = $_.Name
                        Channel    = $_.Description
                        PartialKey = $_.PartialProductKey
                        Status     = $statusMap[[int]$_.LicenseStatus]
                    }
                } | Format-List
            } else {
                cscript //nologo "$env:windir\system32\slmgr.vbs" /xpr
            }
            [void](Read-Host "Press Enter to return...")
        }
        "3F" {
            Show-Header
            $hasWt = [bool](Get-Command wt.exe -ErrorAction SilentlyContinue)
            $cmdVal = if ($hasWt) { 'powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList ''-d'', ''%V'' -Verb RunAs"' } else { 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList ''/s /k pushd'', ''%V'' -Verb RunAs"' }
            foreach ($base in @("HKCR\Directory\shell\OpenAdminTerminal", "HKCR\Directory\Background\shell\OpenAdminTerminal")) {
                reg.exe add $base /ve /d "Open Admin Terminal Here" /f | Out-Null
                reg.exe add $base /v "Icon" /d "cmd.exe" /f | Out-Null
                reg.exe add "$base\command" /ve /d $cmdVal /f | Out-Null
            }
            Write-Host "[OK] Self-contained 'Open Admin Terminal Here' context menu installed." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3G" {
            Show-Header
            reg.exe delete "HKCR\Directory\shell\OpenAdminTerminal" /f 2>$null
            reg.exe delete "HKCR\Directory\Background\shell\OpenAdminTerminal" /f 2>$null
            Write-Host "[OK] Context menu removed." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3H" {
            Show-Header
            $fileCmd = 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList ''/c takeown /f \"%1\" && icacls \"%1\" /grant Administrators:F /c'' -Verb RunAs -WindowStyle Hidden"'
            $dirCmd  = 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList ''/c takeown /f \"%1\" /r /d y && icacls \"%1\" /grant Administrators:F /t /c'' -Verb RunAs -WindowStyle Hidden"'
            reg.exe add "HKCR\*\shell\TakeOwnership" /ve /d "Take Ownership (Admin)" /f | Out-Null
            reg.exe add "HKCR\*\shell\TakeOwnership\command" /ve /d $fileCmd /f | Out-Null
            reg.exe add "HKCR\Directory\shell\TakeOwnership" /ve /d "Take Ownership (Admin)" /f | Out-Null
            reg.exe add "HKCR\Directory\shell\TakeOwnership\command" /ve /d $dirCmd /f | Out-Null
            Write-Host "[OK] 'Take Ownership' context menu installed." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "3I" {
            Show-Header
            reg.exe delete "HKCR\*\shell\TakeOwnership" /f 2>$null
            reg.exe delete "HKCR\Directory\shell\TakeOwnership" /f 2>$null
            Write-Host "[OK] 'Take Ownership' context menu removed." -ForegroundColor Green
            [void](Read-Host "Press Enter to return...")
        }
        "4A" {
            do {
                Show-Header
                Write-Host " [1] Notepad | [2] Terminal/CMD | [3] Settings | [4] Temp | [5] HTTPS Browser | [6] Back"
                $appSel = (Read-Host "Select (1-6)").Trim()
                switch ($appSel) {
                    "1" { Start-Process notepad.exe }
                    "2" { if (Get-Command wt.exe -ErrorAction SilentlyContinue) { Start-Process wt.exe } else { Start-Process cmd.exe } }
                    "3" { Start-Process "ms-settings:" }
                    "4" { Start-Process explorer.exe $env:TEMP }
                    "5" { Start-Process "https://www.google.com" }
                }
            } while ($appSel -ne "6")
        }
        { $_ -in @("5R", "R") } {
            Show-Header
            $conf = (Read-Host "Type YES to schedule full restart in 30 seconds").Trim()
            if ($conf -ceq "YES") {
                shutdown /r /t 30 /f /c "PowerShell Master Script: Scheduled system reboot."
                Write-Host "Use option 5A or 'shutdown /a' to abort." -ForegroundColor Yellow
            } else {
                Write-Host "Restart canceled."
            }
            [void](Read-Host "Press Enter to return...")
        }
        "5A" {
            Show-Header
            shutdown /a
            [void](Read-Host "Press Enter to return...")
        }
        "E" {
            Write-Host "Goodbye!" -ForegroundColor Green
            break
        }
        default {
            Write-Host "Invalid option." -ForegroundColor Red
            Start-Sleep -Seconds 1
        }
    }
} while ($selection -ne "E")
