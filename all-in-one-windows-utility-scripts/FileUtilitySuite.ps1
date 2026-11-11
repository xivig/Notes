# ==============================================================================
# Enterprise File & System Utility Suite (Modern Windows 11 PowerShell Edition)
# Engine-aware RunAs elevation (PowerShell 5.1 / 7+), temp logging, modern
# scaffolds, pattern renamer, Home-safe consoles, and full Uninstall exporter.
# ==============================================================================

$currentIdentity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentIdentity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Restarting script with Administrator privileges..." -ForegroundColor Yellow
    $pwshExe = (Get-Process -Id $PID).Path
    Start-Process $pwshExe -ArgumentList "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`"" -Verb RunAs
    exit 0
}

[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"

$ScriptDir = if ($PSScriptRoot) { $PSScriptRoot } else { $PWD.Path }
$ConfigFile = Join-Path $ScriptDir "settings.json"
$LogFile = Join-Path $env:TEMP "windows-utility-suite-errors.log"

$Config = @{
    default_backup_dir = "mybackup"
    default_web_root   = "webroot"
    html_template_dir  = "htmlSiteCreation"
    app_template_dir   = "app"
    php_oop_dir        = "php_oop"
}

if (Test-Path $ConfigFile) {
    try {
        $json = Get-Content -Path $ConfigFile -Raw | ConvertFrom-Json
        foreach ($prop in $json.psobject.properties) { $Config[$prop.Name] = $prop.Value }
    } catch {
        Write-Warning "Failed to parse settings.json; using defaults."
    }
}

function Write-ErrorLog {
    param([string]$Message, [System.Management.Automation.ErrorRecord]$ErrorRecord)
    $ts = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $detail = if ($ErrorRecord) { " | Details: $($ErrorRecord.Exception.Message)" } else { "" }
    "[$ts] ERROR: $Message$detail" | Out-File -FilePath $LogFile -Append -Encoding utf8
    Write-Host "[-] $Message (Logged to $LogFile)" -ForegroundColor Red
}

function Print-Header {
    param([string]$Title)
    Clear-Host
    Write-Host "+--------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host ("| {0,-54} |" -f $Title) -ForegroundColor Green
    Write-Host "+--------------------------------------------------------+`n" -ForegroundColor Cyan
}

function Show-MainMenu {
    Print-Header "MODERN FILE & SYSTEM UTILITY SUITE (POWERSHELL)"
    Write-Host "  1. Web & App Project Scaffolds (4 Starters)"
    Write-Host "  2. File & Folder Creators"
    Write-Host "  3. Advanced File Operations (Copy, Move, Pattern Rename)"
    Write-Host "  4. Windows 11 Administrative Consoles"
    Write-Host "  5. Applications & System Folders"
    Write-Host "  6. System Diagnostics & Exporters"
    Write-Host "  7. Exit`n"
}

function Show-WebTemplatesMenu {
    do {
        Print-Header "PROJECT SCAFFOLD GENERATORS"
        Write-Host "1. Modern Static Web Starter ($($Config.html_template_dir))"
        Write-Host "2. PHP App Starter ($($Config.default_web_root))"
        Write-Host "3. Minimal App Starter ($($Config.app_template_dir))"
        Write-Host "4. PHP OOP Starter ($($Config.php_oop_dir))"
        Write-Host "5. Back to Main Menu`n"
        switch (Read-Host "Select a template (1-5)") {
            "1" {
                $base = Join-Path $PWD $Config.html_template_dir
                New-Item -ItemType Directory -Path "$base\css", "$base\js" -Force | Out-Null
                Set-Content "$base\css\styles.css" "" -Encoding utf8
                Set-Content "$base\js\app.js" "" -Encoding utf8
                Set-Content "$base\index.html" "<!DOCTYPE html><html lang=`"en`"><head><meta charset=`"UTF-8`"><title>App</title><link rel=`"stylesheet`" href=`"./css/styles.css`"></head><body><h1>Ready</h1><script src=`"./js/app.js`"></script></body></html>" -Encoding utf8
                Write-Host "[OK] Created HTML starter in $base" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "2" {
                $base = Join-Path $PWD $Config.default_web_root
                New-Item -ItemType Directory -Path "$base\public", "$base\src", "$base\config" -Force | Out-Null
                Set-Content "$base\public\index.php" "<?php declare(strict_types=1); echo 'PHP App Ready';" -Encoding utf8
                Set-Content "$base\README.md" "# PHP App" -Encoding utf8
                Write-Host "[OK] Created PHP starter in $base" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "3" {
                $base = Join-Path $PWD $Config.app_template_dir
                New-Item -ItemType Directory -Path "$base\src", "$base\assets\styles" -Force | Out-Null
                Set-Content "$base\assets\styles\app.css" "" -Encoding utf8
                Set-Content "$base\index.html" "" -Encoding utf8
                Write-Host "[OK] Created App starter in $base" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "4" {
                $base = Join-Path $PWD $Config.php_oop_dir
                New-Item -ItemType Directory -Path "$base\src", "$base\tests" -Force | Out-Null
                Set-Content "$base\index.php" "<?php declare(strict_types=1);" -Encoding utf8
                Set-Content "$base\README.md" "# PHP OOP Package" -Encoding utf8
                Write-Host "[OK] Created PHP OOP starter in $base" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "5" { return }
        }
    } while ($true)
}

function Show-CreatorMenu {
    do {
        Print-Header "FILE & FOLDER CREATORS"
        Write-Host "1. Create Project Folders (Project1..ProjectN in WebProject)"
        Write-Host "2. Create Custom File (Name + Extension)"
        Write-Host "3. Batch Create Indexed Files (prefix1..N.ext)"
        Write-Host "4. Back to Main Menu`n"
        switch (Read-Host "Select option (1-4)") {
            "1" {
                $nRaw = Read-Host "Count [10]"
                $n = if ($nRaw -as [int]) { [int]$nRaw } else { 10 }
                $base = Join-Path $PWD "WebProject"
                for ($i = 1; $i -le $n; $i++) { New-Item -ItemType Directory -Path "$base\Project$i" -Force | Out-Null }
                Write-Host "[OK] Created $n folders inside $base" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "2" {
                $name = Read-Host "File name"
                $ext = Read-Host "Extension (without dot)"
                if ($name -and $ext) {
                    New-Item -ItemType File -Path "$PWD\$name.$ext" -Force | Out-Null
                    Write-Host "[OK] Created $name.$ext" -ForegroundColor Green
                }
                [void](Read-Host "Press Enter...")
            }
            "3" {
                $pfx = Read-Host "Prefix [item]"; if (-not $pfx) { $pfx = "item" }
                $ext = Read-Host "Extension [txt]"; if (-not $ext) { $ext = "txt" }
                $cRaw = Read-Host "Count [5]"; $c = if ($cRaw -as [int]) { [int]$cRaw } else { 5 }
                for ($i = 1; $i -le $c; $i++) { New-Item -ItemType File -Path "$PWD\$pfx$i.$ext" -Force | Out-Null }
                Write-Host "[OK] Created $pfx(1..$c).$ext" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "4" { return }
        }
    } while ($true)
}

function Show-FileOpsMenu {
    do {
        Print-Header "ADVANCED FILE OPERATIONS"
        Write-Host "1. Copy File"
        Write-Host "2. Move *.txt Files to WebProject Folder"
        Write-Host "3. Recursive Backup by Extension to $($Config.default_backup_dir)/"
        Write-Host "4. Pattern Filename Replace (Find & Replace)"
        Write-Host "5. Bulk Extension Replace (*.old -> *.new)"
        Write-Host "6. Sequential Rename (item1.ext..itemN.ext)"
        Write-Host "7. Safe Convert Non-Script Files to .txt"
        Write-Host "8. Back to Main Menu`n"
        $protectedExts = @(".txt", ".bat", ".ps1", ".py", ".js", ".php", ".json", ".md", ".html", ".reg", ".log")
        switch (Read-Host "Select option (1-8)") {
            "1" {
                $src = Read-Host "Source file path"; $dest = Read-Host "Destination folder"
                if (Test-Path $src -PathType Leaf) {
                    New-Item -ItemType Directory -Path $dest -Force | Out-Null
                    Copy-Item $src $dest -Force
                    Write-Host "[OK] Copied." -ForegroundColor Green
                } else { Write-Host "Source not found." -ForegroundColor Red }
                [void](Read-Host "Press Enter...")
            }
            "2" {
                $dest = Join-Path $PWD "WebProject"
                New-Item -ItemType Directory -Path $dest -Force | Out-Null
                $skip = @("output.txt", "Listing.txt", "AllProgramFilesListing.txt", "file_list.txt")
                $files = Get-ChildItem -Path . -Filter "*.txt" -File | Where-Object { $_.Name -notin $skip }
                foreach ($f in $files) { Move-Item $f.FullName $dest -Force }
                Write-Host "[OK] Moved $($files.Count) .txt file(s) to $dest" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "3" {
                $ext = Read-Host "Extension (e.g. log or txt)"
                if (-not $ext.StartsWith(".")) { $ext = ".$ext" }
                $dest = Join-Path $PWD $Config.default_backup_dir
                New-Item -ItemType Directory -Path $dest -Force | Out-Null
                $files = Get-ChildItem -Path . -Filter "*$ext" -Recurse -File | Where-Object { $_.DirectoryName -ne $dest }
                foreach ($f in $files) { Copy-Item $f.FullName $dest -Force }
                Write-Host "[OK] Backed up $($files.Count) file(s) to $dest" -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "4" {
                $find = Read-Host "Text to find in filenames"; $rep = Read-Host "Replacement text"
                if ($find) {
                    $files = Get-ChildItem -File | Where-Object { $_.Name -like "*$find*" -and $_.Extension -notin $protectedExts }
                    foreach ($f in $files) { Rename-Item $f.FullName ($f.Name -replace [regex]::Escape($find), $rep) -Force }
                    Write-Host "[OK] Renamed $($files.Count) file(s)." -ForegroundColor Green
                }
                [void](Read-Host "Press Enter...")
            }
            "5" {
                $o = Read-Host "Old extension"; $n = Read-Host "New extension"
                $files = Get-ChildItem -File -Filter "*.$o"
                foreach ($f in $files) { Rename-Item $f.FullName ([System.IO.Path]::ChangeExtension($f.Name, $n)) -Force }
                Write-Host "[OK] Updated $($files.Count) file(s)." -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "6" {
                $o = Read-Host "Old extension"; $n = Read-Host "New extension"; $i = 1
                $files = Get-ChildItem -File -Filter "*.$o"
                foreach ($f in $files) { Rename-Item $f.FullName "item$i.$n" -Force; $i++ }
                Write-Host "[OK] Sequentially renamed $($files.Count) file(s)." -ForegroundColor Green
                [void](Read-Host "Press Enter...")
            }
            "7" {
                if ((Read-Host "Type YES to convert non-script files in $PWD to .txt") -ceq "YES") {
                    $files = Get-ChildItem -File | Where-Object { $_.Extension -notin $protectedExts -and $_.Name -ne ".gitignore" }
                    foreach ($f in $files) { Rename-Item $f.FullName ([System.IO.Path]::ChangeExtension($f.Name, "txt")) -Force }
                    Write-Host "[OK] Renamed $($files.Count) file(s)." -ForegroundColor Green
                }
                [void](Read-Host "Press Enter...")
            }
            "8" { return }
        }
    } while ($true)
}

function Show-ShortcutsMenu {
    do {
        Print-Header "WINDOWS 11 ADMINISTRATIVE CONSOLES"
        Write-Host "1. Control Panel | 2. Services | 3. Installed Programs (appwiz.cpl) | 4. Regedit"
        Write-Host "5. Windows Terminal / CMD | 6. Local Users (lusrmgr/netplwiz) | 7. Disk Management"
        Write-Host "8. Computer Management | 9. Desktop Icon Settings | 10. Group Policy (Pro/Ent)"
        Write-Host "11. Network Connections | 12. Environment Variables | 13. System Properties | 14. Back`n"
        switch (Read-Host "Select (1-14)") {
            "1" { Start-Process control }
            "2" { Start-Process services.msc }
            "3" { Start-Process appwiz.cpl }
            "4" { Start-Process regedit }
            "5" { if (Get-Command wt.exe -ErrorAction SilentlyContinue) { Start-Process wt.exe } else { Start-Process cmd } }
            "6" { if (Test-Path "$env:SystemRoot\System32\lusrmgr.msc") { Start-Process lusrmgr.msc } else { Start-Process netplwiz } }
            "7" { Start-Process diskmgmt.msc }
            "8" { Start-Process compmgmt.msc }
            "9" { Start-Process rundll32.exe -ArgumentList "shell32.dll,Control_RunDLL desk.cpl,,0" }
            "10" { if (Test-Path "$env:SystemRoot\System32\gpedit.msc") { Start-Process gpedit.msc } else { Write-Host "Pro/Enterprise edition only." -ForegroundColor Yellow; [void](Read-Host "Press Enter...") } }
            "11" { Start-Process ncpa.cpl }
            "12" { Start-Process rundll32.exe -ArgumentList "sysdm.cpl,EditEnvironmentVariables" }
            "13" { Start-Process rundll32.exe -ArgumentList "shell32.dll,Control_RunDLL sysdm.cpl,,3" }
            "14" { return }
        }
    } while ($true)
}

function Show-AppsMenu {
    do {
        Print-Header "APPLICATIONS & SYSTEM FOLDERS"
        Write-Host "1. Chrome | 2. Edge | 3. Firefox | 4. Admin Terminal | 5. Notepad | 6. PowerShell 7+/5.1"
        Write-Host "7. Notepad++ | 8. Sublime Text | 9. VS Code | 10. Git Bash | 11. Word | 12. Excel"
        Write-Host "13. Windows Settings | 14. Temp | 15. Local AppData | 16. Downloads | 17. Back`n"
        switch (Read-Host "Select (1-17)") {
            "1" { try { Start-Process chrome.exe "https://www.google.com" } catch { Write-Host "Chrome not found." -ForegroundColor Red; Start-Sleep 1 } }
            "2" { try { Start-Process msedge.exe "https://www.google.com" } catch { Write-Host "Edge not found." -ForegroundColor Red; Start-Sleep 1 } }
            "3" { try { Start-Process firefox.exe } catch { Write-Host "Firefox not found." -ForegroundColor Red; Start-Sleep 1 } }
            "4" { if (Get-Command wt.exe -ErrorAction SilentlyContinue) { Start-Process wt.exe -Verb RunAs } else { Start-Process cmd -Verb RunAs } }
            "5" { Start-Process notepad.exe }
            "6" { if (Get-Command pwsh.exe -ErrorAction SilentlyContinue) { Start-Process pwsh.exe } else { Start-Process powershell.exe } }
            "7" { try { Start-Process "$env:ProgramFiles\Notepad++\notepad++.exe" } catch { Write-Host "Notepad++ not found." -ForegroundColor Red; Start-Sleep 1 } }
            "8" { try { Start-Process "$env:ProgramFiles\Sublime Text\sublime_text.exe" } catch { Write-Host "Sublime Text not found." -ForegroundColor Red; Start-Sleep 1 } }
            "9" {
                $code = (Get-Command code -ErrorAction SilentlyContinue | Select-Object -ExpandProperty Source -ErrorAction SilentlyContinue)
                if (-not $code) { $code = @("$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe", "$env:ProgramFiles\Microsoft VS Code\Code.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1 }
                if ($code) { Start-Process $code } else { Write-Host "VS Code not found." -ForegroundColor Red; Start-Sleep 1 }
            }
            "10" { try { Start-Process "$env:ProgramFiles\Git\git-bash.exe" } catch { Write-Host "Git Bash not found." -ForegroundColor Red; Start-Sleep 1 } }
            "11" { try { Start-Process winword } catch { Write-Host "MS Word not found." -ForegroundColor Red; Start-Sleep 1 } }
            "12" { try { Start-Process excel } catch { Write-Host "MS Excel not found." -ForegroundColor Red; Start-Sleep 1 } }
            "13" { Start-Process "ms-settings:" }
            "14" { Start-Process explorer.exe $env:TEMP }
            "15" { Start-Process explorer.exe $env:LOCALAPPDATA }
            "16" { Start-Process explorer.exe "$env:USERPROFILE\Downloads" }
            "17" { return }
        }
    } while ($true)
}

function Show-DiagnosticsMenu {
    do {
        Print-Header "SYSTEM DIAGNOSTICS & EXPORTERS"
        Write-Host "1. Export Environment Variables to 'output.txt'"
        Write-Host "2. Export Installed Software List to 'AllProgramFilesListing.txt'"
        Write-Host "3. Export Directory Listing of '$($Config.app_template_dir)' to 'Listing.txt'"
        Write-Host "4. Open Elevated Terminal / CMD at Current Location"
        Write-Host "5. Back to Main Menu`n"
        switch (Read-Host "Select (1-5)") {
            "1" { Get-ChildItem env: | Sort-Object Name | Format-Table -AutoSize | Out-String | Out-File "$PWD\output.txt" -Encoding utf8; Write-Host "[OK] Saved output.txt" -ForegroundColor Green; [void](Read-Host "Press Enter...") }
            "2" {
                $regPaths = @("HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*", "HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*", "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*")
                Get-ItemProperty $regPaths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName, DisplayVersion, Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File "$PWD\AllProgramFilesListing.txt" -Encoding utf8
                Write-Host "[OK] Saved AllProgramFilesListing.txt" -ForegroundColor Green; [void](Read-Host "Press Enter...")
            }
            "3" {
                $appPath = Join-Path $PWD $Config.app_template_dir
                if (Test-Path $appPath) {
                    Get-ChildItem $appPath -Recurse | Select-Object FullName, Length | Format-Table -AutoSize | Out-String | Out-File "$PWD\Listing.txt" -Encoding utf8
                    Write-Host "[OK] Saved Listing.txt" -ForegroundColor Green
                } else { Write-Host "'$($Config.app_template_dir)' folder not found." -ForegroundColor Red }
                [void](Read-Host "Press Enter...")
            }
            "4" {
                if (Get-Command wt.exe -ErrorAction SilentlyContinue) { Start-Process wt.exe -ArgumentList "-d `"$PWD`"" -Verb RunAs }
                else { Start-Process cmd -ArgumentList "/K cd /d `"$PWD`"" -Verb RunAs }
            }
            "5" { return }
        }
    } while ($true)
}

do {
    Show-MainMenu
    $opt = Read-Host "Select a utility category (1-7)"
    try {
        switch ($opt) {
            "1" { Show-WebTemplatesMenu }
            "2" { Show-CreatorMenu }
            "3" { Show-FileOpsMenu }
            "4" { Show-ShortcutsMenu }
            "5" { Show-AppsMenu }
            "6" { Show-DiagnosticsMenu }
            "7" { Write-Host "Goodbye!" -ForegroundColor Green; break }
        }
    } catch {
        Write-ErrorLog "Menu error on choice $opt" $_
        [void](Read-Host "Press Enter...")
    }
} while ($opt -ne "7")
