# ==============================================================================
# SYNOPSIS
#     Enterprise File & System Utility Suite (Modern PowerShell Edition)
# DESCRIPTION
#     An enterprise-grade, menu-driven PowerShell tool with auto-elevation, 
#     centralized JSON configuration, robust error logging, and standard try-catch 
#     safeguards compatible with PowerShell 5.1+.
# ==============================================================================

# 1. Engine-aware Auto-Elevation Check (works on PowerShell 5.1 and PowerShell 7+)
$currentIdentity = [Security.Principal.WindowsIdentity]::GetCurrent()
$principal = New-Object Security.Principal.WindowsPrincipal($currentIdentity)
if (-not $principal.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)) {
    Write-Host "Restarting script with Administrator privileges..." -ForegroundColor Yellow
    $pwshExe = (Get-Process -Id $PID).Path
    $arguments = "-NoProfile -ExecutionPolicy Bypass -File `"$PSCommandPath`""
    Start-Process $pwshExe -ArgumentList $arguments -Verb RunAs
    Exit
}

# 2. Set Output Encoding to UTF-8
[Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$ErrorActionPreference = "Stop"

# 3. Load Configurations
$ScriptDir = $PSScriptRoot
if ([string]::IsNullOrEmpty($ScriptDir)) { $ScriptDir = $PWD.Path }
$ConfigFile = Join-Path $ScriptDir "settings.json"
$LogFile = Join-Path $ScriptDir "errors.log"

$Config = @{
    default_backup_dir = "mybackup"
    default_web_root = "webroot"
    html_template_dir = "htmlSiteCreation"
    app_template_dir = "app"
    php_oop_dir = "php_oop"
}

if (Test-Path $ConfigFile) {
    try {
        $json = Get-Content -Path $ConfigFile -Raw | ConvertFrom-Json
        foreach ($prop in $json.psobject.properties) {
            $Config[$prop.Name] = $prop.Value
        }
    } catch {
        Write-ErrorLog "Failed to parse settings.json. Using default configurations." $_
    }
}

# 4. Logger Function
function Write-ErrorLog {
    param (
        [string]$message,
        [Exception]$exception
    )
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logMsg = "[$timestamp] ERROR: $message | Details: $($exception.Message)"
    $logMsg | Out-File -FilePath $LogFile -Append -Encoding utf8
    Write-Host "[-] $message (Error logged to errors.log)" -ForegroundColor Red
}

# 5. ANSI UI Styles
$Esc = [char]27
$C_Green = "$Esc[38;2;80;250;123m"
$C_Gray = "$Esc[38;2;90;90;90m"
$C_Cyan = "$Esc[38;2;139;233;253m"
$C_Yellow = "$Esc[38;2;241;250;140m"
$C_Pink = "$Esc[38;2;255;121;198m"
$C_Red = "$Esc[38;2;255;85;85m"
$C_Reset = "$Esc[0m"

function Print-Header {
    param ([string]$title)
    Clear-Host
    Write-Host "+--------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host "| $C_Green$($title.PadRight(54))$C_Cyan |" -ForegroundColor Cyan
    Write-Host "+--------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host ""
}

function Show-MainMenu {
    Clear-Host
    Write-Host "+--------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host "| $C_Green       ELITE FILE & SYSTEM UTILITY SUITE v2.1     $C_Cyan |" -ForegroundColor Cyan
    Write-Host "+--------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host "|  1. Web Templates & Site Creators                      |" -ForegroundColor Cyan
    Write-Host "|  2. File & Folder Creators                             |" -ForegroundColor Cyan
    Write-Host "|  3. Advanced File Operations                           |" -ForegroundColor Cyan
    Write-Host "|  4. Windows System Administrative Tools                |" -ForegroundColor Cyan
    Write-Host "|  5. System Applications & Cache Directories            |" -ForegroundColor Cyan
    Write-Host "|  6. System Diagnostics & Exporters                     |" -ForegroundColor Cyan
    Write-Host "|  7. Exit                                               |" -ForegroundColor Cyan
    Write-Host "+--------------------------------------------------------+" -ForegroundColor Cyan
    Write-Host ""
}

# --- MENU 1: Web Templates ---
function Show-WebTemplatesMenu {
    do {
        Print-Header "WEB TEMPLATE GENERATOR"
        Write-Host "1. PHP Web Project ($($Config.default_web_root))"
        Write-Host "2. HTML Site Template ($($Config.html_template_dir))"
        Write-Host "3. App Structure ($($Config.app_template_dir))"
        Write-Host "4. PHP OOP Structure ($($Config.php_oop_dir))"
        Write-Host "5. Basic Web Template (webTemplate folder)"
        Write-Host "6. Back to Main Menu"
        Write-Host ""
        $choice = Read-Host "Select a template (1-6)"
        switch ($choice) {
            "1" { Create-PHPWebProject; break }
            "2" { Create-HTMLSiteProject; break }
            "3" { Create-AppSiteProject; break }
            "4" { Create-PHPOOPProject; break }
            "5" { Create-BasicWebProject; break }
            "6" { return }
        }
    } while ($true)
}

function Create-PHPWebProject {
    try {
        $base = Join-Path $PWD $Config.default_web_root
        $dirs = @("$base\public\assets\css", "$base\public\assets\common", "$base\public\assets\inc", "$base\public\assets\js", "$base\private\class", "$base\private\config", "$base\private\core")
        foreach ($d in $dirs) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
        $files = @("$base\public\login.php", "$base\public\index.php", "$base\public\admin.php", "$base\public\confirmdelete.php", "$base\public\view.php", "$base\public\test.php", "$base\public\regex.php", "$base\private\class\class.db_connect.inc.php", "$base\private\class\class.calendar.inc.php", "$base\private\class\class.event.inc.php", "$base\private\class\class.admin.inc.php", "$base\private\class\class.db-cred.inc.php", "$base\private\config\class.db-cred.inc.php", "$base\private\core\init.inc.php", "$base\public\assets\css\style.css", "$base\public\assets\css\admin.css", "$base\public\assets\css\ajax.css", "$base\public\assets\js\custom.js", "$base\public\assets\js\init.js", "$base\public\assets\js\valid-date.js", "$base\public\assets\common\header.inc.php", "$base\public\assets\common\footer.inc.php", "$base\public\assets\inc\process.inc.php", "$base\public\assets\inc\ajax.inc.php")
        foreach ($f in $files) { New-Item -ItemType File -Path $f -Force | Out-Null }
        Write-Host "PHP Web Project successfully created inside $base!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create PHP project." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Create-HTMLSiteProject {
    try {
        $base = Join-Path $PWD $Config.html_template_dir
        $dirs = @("$base\css", "$base\img", "$base\js")
        foreach ($d in $dirs) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
        $files = @("$base\.htaccess", "$base\404.html", "$base\humans.txt", "$base\index.html", "$base\robots.txt", "$base\site.webmanifest", "$base\sitemap.xml", "$base\css\style.css", "$base\css\normalize.css", "$base\js\custom.js", "$base\js\modernizr.js", "$base\js\jquery.js")
        foreach ($f in $files) { New-Item -ItemType File -Path $f -Force | Out-Null }
        Write-Host "HTML Site successfully created inside $base!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create HTML project." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Create-AppSiteProject {
    try {
        $base = Join-Path $PWD $Config.app_template_dir
        $dirs = @("$base\temp\styles", "$base\assets\styles", "$base\assets\images\icons")
        foreach ($d in $dirs) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
        $files = @("$base\assets\styles\styles.css", "$base\temp\styles\styles.css", "$base\.htaccess", "$base\404.html", "$base\humans.txt", "$base\index.html", "$base\robots.txt", "$base\site.webmanifest", "$base\sitemap.xml")
        foreach ($f in $files) { New-Item -ItemType File -Path $f -Force | Out-Null }
        Write-Host "App Site successfully created inside $base!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create App project." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Create-PHPOOPProject {
    try {
        $base = Join-Path $PWD $Config.php_oop_dir
        $dirs = @("$base\css", "$base\img", "$base\js")
        foreach ($d in $dirs) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
        $files = @("$base\.htaccess", "$base\404.html", "$base\humans.txt", "$base\index.php", "$base\robots.txt", "$base\site.webmanifest", "$base\sitemap.xml", "$base\css\style.css", "$base\css\normalize.css", "$base\js\custom.js", "$base\js\modernizr.js", "$base\js\jquery.js")
        foreach ($f in $files) { New-Item -ItemType File -Path $f -Force | Out-Null }
        Write-Host "PHP OOP Project successfully created inside $base!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create PHP OOP project." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Create-BasicWebProject {
    try {
        $base = Join-Path $PWD "webTemplate"
        $dirs = @("$base\css", "$base\img", "$base\js")
        foreach ($d in $dirs) { New-Item -ItemType Directory -Path $d -Force | Out-Null }
        for ($i = 1; $i -le 5; $i++) { New-Item -ItemType File -Path "$base\D$i.txt" -Force | Out-Null }
        $files = @("$base\.htaccess", "$base\404.html", "$base\humans.txt", "$base\index.php", "$base\robots.txt", "$base\site.webmanifest", "$base\sitemap.xml", "$base\css\style.css", "$base\css\normalize.css", "$base\js\custom.js", "$base\js\modernizr.js", "$base\js\jquery.js")
        foreach ($f in $files) { New-Item -ItemType File -Path $f -Force | Out-Null }
        Write-Host "Basic Web template files generated inside $base!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create Basic Web template." $_
    }
    [void](Read-Host "Press Enter to continue")
}

# --- MENU 2: File & Folder Creators ---
function Show-CreatorMenu {
    do {
        Print-Header "FILE & FOLDER CREATOR"
        Write-Host "1. Create Project Folders (Project1 to Project10)"
        Write-Host "2. Create Custom File (User-defined Name & Extension)"
        Write-Host "3. Create Batch Dummy Files (index1-10.php, style1-3.css, etc.)"
        Write-Host "4. Back to Main Menu"
        Write-Host ""
        $choice = Read-Host "Select an option (1-4)"
        switch ($choice) {
            "1" { Create-WebProjectFolders; break }
            "2" { Create-SingleCustomFile; break }
            "3" { Create-DummyBatchFiles; break }
            "4" { return }
        }
    } while ($true)
}

function Create-WebProjectFolders {
    try {
        $base = Join-Path $PWD "WebProject"
        New-Item -ItemType Directory -Path $base -Force | Out-Null
        for ($i = 1; $i -le 10; $i++) { New-Item -ItemType Directory -Path "$base\Project$i" -Force | Out-Null }
        Write-Host "10 Project folders created inside $base!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create Project folders." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Create-SingleCustomFile {
    try {
        $name = Read-Host "Enter file name"
        $ext = Read-Host "Enter file extension (without dot)"
        if ([string]::IsNullOrWhiteSpace($name) -or [string]::IsNullOrWhiteSpace($ext)) { return }
        New-Item -ItemType File -Path "$PWD\$name.$ext" -Force | Out-Null
        Write-Host "File $name.$ext created successfully!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create custom file." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Create-DummyBatchFiles {
    try {
        for ($i = 1; $i -le 10; $i++) { New-Item -ItemType File -Path "$PWD\index$i.php" -Force | Out-Null }
        for ($i = 1; $i -le 3; $i++) {
            New-Item -ItemType File -Path "$PWD\style$i.css" -Force | Out-Null
            New-Item -ItemType File -Path "$PWD\custom$i.js" -Force | Out-Null
            New-Item -ItemType File -Path "$PWD\template$i.tpl" -Force | Out-Null
        }
        Write-Host "Dummy files created successfully!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to create dummy files." $_
    }
    [void](Read-Host "Press Enter to continue")
}

# --- MENU 3: Advanced File Operations ---
function Show-FileOpsMenu {
    do {
        Print-Header "ADVANCED FILE OPERATIONS"
        Write-Host "1. Copy File"
        Write-Host "2. Move Text Files (*.txt) to WebProject Folder"
        Write-Host "3. Search & Backup Files (Search by extension recursively to $($Config.default_backup_dir)/)"
        Write-Host "4. Batch Rename Loop (mac-osx-command-line-terminal-X-638.jpg -> X.jpg)"
        Write-Host "5. Bulk Change File Extensions (e.g. *.js -> *.php)"
        Write-Host "6. Bulk Change Extensions (Sequentially rename files, e.g. *.js -> index1.php)"
        Write-Host "7. Change All Extensions to .txt (*.* -> *.txt)"
        Write-Host "8. Back to Main Menu"
        Write-Host ""
        $choice = Read-Host "Select an option (1-8)"
        switch ($choice) {
            "1" { Copy-SingleFile; break }
            "2" { Move-TxtFiles; break }
            "3" { Search-BackupFiles; break }
            "4" { Rename-OSXImages; break }
            "5" { Change-ExtensionsBulk; break }
            "6" { Change-ExtensionsSequential; break }
            "7" { Convert-AllToTxt; break }
            "8" { return }
        }
    } while ($true)
}

function Copy-SingleFile {
    try {
        $src = Read-Host "Enter source file path"
        $dest = Read-Host "Enter destination folder path"
        if (Test-Path $src -PathType Leaf) {
            New-Item -ItemType Directory -Path $dest -Force | Out-Null
            Copy-Item -Path $src -Destination $dest -Force
            Write-Host "File copied successfully!" -ForegroundColor Green
        } else {
            Write-Host "Source file not found!" -ForegroundColor Red
        }
    } catch {
        Write-ErrorLog "Failed to copy file." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Move-TxtFiles {
    try {
        $dest = Join-Path $PWD "WebProject"
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
        $files = Get-ChildItem -Path . -Filter "*.txt" -File
        if ($files.Count -eq 0) {
            Write-Host "No .txt files found to move." -ForegroundColor Yellow
        } else {
            foreach ($f in $files) { Move-Item -Path $f.FullName -Destination $dest -Force }
            Write-Host "Moved $($files.Count) text files to $dest!" -ForegroundColor Green
        }
    } catch {
        Write-ErrorLog "Failed to move .txt files." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Search-BackupFiles {
    try {
        $ext = Read-Host "Enter file extension (e.g., .bat or .txt)"
        if (-not $ext.StartsWith(".")) { $ext = ".$ext" }
        $dest = Join-Path $PWD $Config.default_backup_dir
        New-Item -ItemType Directory -Path $dest -Force | Out-Null
        $files = Get-ChildItem -Path . -Filter "*$ext" -Recurse -File | Where-Object { $_.DirectoryName -ne $dest }
        if ($files.Count -eq 0) {
            Write-Host "No files matching $ext found." -ForegroundColor Yellow
        } else {
            foreach ($f in $files) { Copy-Item -Path $f.FullName -Destination $dest -Force }
            Write-Host "Backed up $($files.Count) files to $dest!" -ForegroundColor Green
        }
    } catch {
        Write-ErrorLog "Failed during search and backup operation." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Rename-OSXImages {
    try {
        $count = 0
        for ($i = 0; $i -le 200; $i++) {
            $f = "mac-osx-command-line-terminal-$i-638.jpg"
            if (Test-Path $f) {
                Rename-Item -Path $f -NewName "$i.jpg" -Force
                $count++
            }
        }
        Write-Host "Renamed $count matching images successfully!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed to rename OSX images." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Change-ExtensionsBulk {
    try {
        $oldExt = Read-Host "Enter old extension to match (without dot, e.g. js)"
        $newExt = Read-Host "Enter new extension (without dot, e.g. php)"
        $files = Get-ChildItem -Path . -Filter "*.$oldExt" -File
        foreach ($f in $files) {
            $newName = [System.IO.Path]::ChangeExtension($f.Name, $newExt)
            Rename-Item -Path $f.FullName -NewName $newName -Force
        }
        Write-Host "Replaced extension for $($files.Count) files!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed bulk extension replacement." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Change-ExtensionsSequential {
    try {
        $oldExt = Read-Host "Enter old extension to match (without dot, e.g. js)"
        $newExt = Read-Host "Enter new extension (without dot, e.g. php)"
        $files = Get-ChildItem -Path . -Filter "*.$oldExt" -File
        $i = 1
        foreach ($f in $files) {
            Rename-Item -Path $f.FullName -NewName "index$i.$newExt" -Force
            $i++
        }
        Write-Host "Sequentially renamed $($files.Count) files to indexX.$newExt!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed sequential extension renaming." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Convert-AllToTxt {
    try {
        $conf = Read-Host "Convert non-script files in $PWD to .txt? Type YES to confirm"
        if ($conf -cne "YES") { Write-Host "Operation canceled." -ForegroundColor Yellow; [void](Read-Host "Press Enter to continue"); return }
        $protectedExts = @(".txt", ".bat", ".ps1", ".py", ".js", ".php", ".json", ".md", ".html", ".reg", ".log")
        $files = Get-ChildItem -Path . -File | Where-Object { $_.Extension -notin $protectedExts -and $_.Name -ne ".gitignore" }
        foreach ($f in $files) {
            $newName = [System.IO.Path]::ChangeExtension($f.Name, "txt")
            Rename-Item -Path $f.FullName -NewName $newName -Force
        }
        Write-Host "Renamed $($files.Count) files to .txt extension (scripts/docs protected)!" -ForegroundColor Green
    } catch {
        Write-ErrorLog "Failed converting all files to .txt." $_
    }
    [void](Read-Host "Press Enter to continue")
}

# --- MENU 4: Windows Administrative Shortcuts ---
function Show-ShortcutsMenu {
    do {
        Print-Header "WINDOWS ADMINISTRATIVE SHORTCUTS"
        Write-Host "1. Control Panel"
        Write-Host "2. Windows Services (services.msc)"
        Write-Host "3. Add/Remove Programs (appwiz.cpl)"
        Write-Host "4. Registry Editor (regedit)"
        Write-Host "5. Windows Terminal / Command Prompt"
        Write-Host "6. Local Users and Groups (lusrmgr.msc / netplwiz)"
        Write-Host "7. Disk Management (diskmgmt.msc)"
        Write-Host "8. Computer Management Console (compmgmt.msc)"
        Write-Host "9. Desktop Icon Settings"
        Write-Host "10. Group Policy Editor (gpedit.msc)"
        Write-Host "11. Network Connections Manager (ncpa.cpl)"
        Write-Host "12. Environment Variables Editor"
        Write-Host "13. System Properties (Advanced Tab)"
        Write-Host "14. Back to Main Menu"
        Write-Host ""
        $choice = Read-Host "Select a system shortcut (1-14)"
        try {
            switch ($choice) {
                "1" { Start-Process control }
                "2" { Start-Process services.msc }
                "3" { Start-Process appwiz.cpl }
                "4" { Start-Process regedit }
                "5" { if (Get-Command wt.exe -ErrorAction SilentlyContinue) { Start-Process wt.exe } else { Start-Process cmd } }
                "6" { if (Test-Path "$env:SystemRoot\System32\lusrmgr.msc") { Start-Process lusrmgr.msc } else { Write-Host "lusrmgr.msc unavailable on Home edition; opening netplwiz..." -ForegroundColor Yellow; Start-Process netplwiz; Start-Sleep -Seconds 1 } }
                "7" { Start-Process diskmgmt.msc }
                "8" { Start-Process compmgmt.msc }
                "9" { Start-Process rundll32.exe -ArgumentList "shell32.dll,Control_RunDLL desk.cpl,,0" }
                "10" { if (Test-Path "$env:SystemRoot\System32\gpedit.msc") { Start-Process gpedit.msc } else { Write-Host "gpedit.msc is only included in Windows Pro/Enterprise editions." -ForegroundColor Yellow; [void](Read-Host "Press Enter...") } }
                "11" { Start-Process ncpa.cpl }
                "12" { Start-Process rundll32.exe -ArgumentList "sysdm.cpl,EditEnvironmentVariables" }
                "13" { Start-Process rundll32.exe -ArgumentList "shell32.dll,Control_RunDLL sysdm.cpl,,3" }
                "14" { return }
            }
        } catch {
            Write-ErrorLog "Failed to open system shortcut option $choice." $_
        }
    } while ($true)
}

# --- MENU 5: System Applications & Cache Folders ---
function Show-AppsMenu {
    do {
        Print-Header "APPLICATIONS & CACHE SYSTEM"
        Write-Host "1. Open Google Chrome"
        Write-Host "2. Open Microsoft Edge"
        Write-Host "3. Open Mozilla Firefox"
        Write-Host "4. Open Opera"
        Write-Host "5. Open Terminal / Command Prompt (Admin)"
        Write-Host "6. Open Notepad"
        Write-Host "7. Open Notepad++"
        Write-Host "8. Open Sublime Text"
        Write-Host "9. Open Visual Studio Code"
        Write-Host "10. Open Phoenix Code"
        Write-Host "11. Open Microsoft Word"
        Write-Host "12. Open Microsoft Excel"
        Write-Host "13. Open Adobe Photoshop"
        Write-Host "14. Open Git Bash"
        Write-Host "15. Open PowerShell (7+ or 5.1)"
        Write-Host "16. Open Deluge Torrent Client"
        Write-Host "17. Open Temp Directory"
        Write-Host "18. Open Local AppData Directory"
        Write-Host "19. Open Downloads Directory"
        Write-Host "20. Back to Main Menu"
        Write-Host ""
        $choice = Read-Host "Select an option (1-20)"
        switch ($choice) {
            "1" { try { Start-Process "chrome.exe" "https://www.google.com" -ErrorAction Stop } catch { Write-Host "Chrome not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "2" { try { Start-Process "msedge.exe" "https://www.google.com" -ErrorAction Stop } catch { Write-Host "Edge not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "3" { try { Start-Process "firefox.exe" -ErrorAction Stop } catch { Write-Host "Firefox not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "4" {
                $opera = @("$env:LOCALAPPDATA\Programs\Opera\opera.exe", "$env:ProgramFiles\Opera\launcher.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
                if ($opera) { Start-Process $opera } else { try { Start-Process "opera.exe" -ErrorAction Stop } catch { Write-Host "Opera not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            }
            "5" { if (Get-Command wt.exe -ErrorAction SilentlyContinue) { Start-Process wt.exe -Verb RunAs } else { Start-Process cmd -Verb RunAs } }
            "6" { Start-Process notepad.exe }
            "7" { try { Start-Process "$env:ProgramFiles\Notepad++\notepad++.exe" -ErrorAction Stop } catch { Write-Host "Notepad++ not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "8" { try { Start-Process "$env:ProgramFiles\Sublime Text\sublime_text.exe" -ErrorAction Stop } catch { Write-Host "Sublime Text not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "9" {
                if (Get-Command code -ErrorAction SilentlyContinue) { Start-Process "code" }
                else {
                    $vsCode = @("$env:LOCALAPPDATA\Programs\Microsoft VS Code\Code.exe", "$env:ProgramFiles\Microsoft VS Code\Code.exe") | Where-Object { Test-Path $_ } | Select-Object -First 1
                    if ($vsCode) { Start-Process $vsCode } else { Write-Host "VS Code not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 }
                }
            }
            "10" { try { Start-Process "$env:LOCALAPPDATA\Phoenix Code\Phoenix Code.exe" -ErrorAction Stop } catch { Write-Host "Phoenix Code not found!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "11" { try { Start-Process winword -ErrorAction Stop } catch { Write-Host "MS Word is not installed!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "12" { try { Start-Process excel -ErrorAction Stop } catch { Write-Host "MS Excel is not installed!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "13" {
                $psExe = Get-ChildItem "$env:ProgramFiles\Adobe\Adobe Photoshop *\Photoshop.exe" -ErrorAction SilentlyContinue | Sort-Object FullName -Descending | Select-Object -First 1 -ExpandProperty FullName
                if ($psExe) { Start-Process $psExe } else { Write-Host "Photoshop is not installed!" -ForegroundColor Red; Start-Sleep -Seconds 1 }
            }
            "14" { try { Start-Process "$env:ProgramFiles\Git\git-bash.exe" -ErrorAction Stop } catch { Write-Host "Git Bash is not installed!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "15" { if (Get-Command pwsh.exe -ErrorAction SilentlyContinue) { Start-Process pwsh.exe } else { Start-Process powershell.exe } }
            "16" { try { Start-Process "$env:ProgramFiles\Deluge\deluge.exe" -ErrorAction Stop } catch { Write-Host "Deluge is not installed!" -ForegroundColor Red; Start-Sleep -Seconds 1 } }
            "17" { Start-Process explorer.exe $env:TEMP }
            "18" { Start-Process explorer.exe $env:LOCALAPPDATA }
            "19" { Start-Process explorer.exe "$env:USERPROFILE\Downloads" }
            "20" { return }
        }
    } while ($true)
}

# --- MENU 6: System Diagnostics & Exporters ---
function Show-DiagnosticsMenu {
    do {
        Print-Header "SYSTEM DIAGNOSTICS & EXPORTERS"
        Write-Host "1. Export Environment Variables to 'output.txt'"
        Write-Host "2. Export Installed Program List to 'AllProgramFilesListing.txt'"
        Write-Host "3. Export Directory Listing of '$($Config.app_template_dir)' to 'Listing.txt'"
        Write-Host "4. Open Elevated Terminal / CMD at Current Location"
        Write-Host "5. Back to Main Menu"
        Write-Host ""
        $choice = Read-Host "Select an option (1-5)"
        switch ($choice) {
            "1" { Export-EnvVariables; break }
            "2" { Export-ProgramList; break }
            "3" { Export-DirListing; break }
            "4" { Launch-AdminCMD; break }
            "5" { return }
        }
    } while ($true)
}

function Export-EnvVariables {
    try {
        Get-ChildItem env: | Select-Object Name, Value | Format-Table -AutoSize | Out-String | Out-File -FilePath "$PWD\output.txt" -Encoding utf8
        Write-Output "Environment variables saved to $PWD\output.txt!"
    } catch {
        Write-ErrorLog "Failed to export environment variables." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Export-ProgramList {
    try {
        $regPaths = @(
            "HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*",
            "HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*",
            "HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*"
        )
        Get-ItemProperty $regPaths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName, DisplayVersion, Publisher, InstallDate | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File -FilePath "$PWD\AllProgramFilesListing.txt" -Encoding utf8
        Write-Output "Installed program list (64/32-bit + User) exported to $PWD\AllProgramFilesListing.txt!"
    } catch {
        Write-ErrorLog "Failed to export program listings." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Export-DirListing {
    try {
        $appPath = Join-Path $PWD $Config.app_template_dir
        if (Test-Path $appPath) {
            Get-ChildItem -Path $appPath -Recurse | Select-Object FullName, Length, CreationTime | Format-Table -AutoSize | Out-String | Out-File -FilePath "$PWD\Listing.txt" -Encoding utf8
            Write-Output "Directory structure of '$($Config.app_template_dir)' exported to $PWD\Listing.txt!"
        } else {
            Write-Host "'$($Config.app_template_dir)' folder does not exist! Please create it via the Web Templates menu." -ForegroundColor Red
        }
    } catch {
        Write-ErrorLog "Failed to export directory listing." $_
    }
    [void](Read-Host "Press Enter to continue")
}

function Launch-AdminCMD {
    if (Get-Command wt.exe -ErrorAction SilentlyContinue) {
        Start-Process wt.exe -ArgumentList "-d `"$PWD`"" -Verb RunAs
    } else {
        Start-Process cmd -ArgumentList "/K cd /d `"$PWD`"" -Verb RunAs
    }
}

# --- RUNNER LOOP ---
do {
    Show-MainMenu
    $opt = Read-Host "Select a utility category (1-7)"
    switch ($opt) {
        "1" { Show-WebTemplatesMenu }
        "2" { Show-CreatorMenu }
        "3" { Show-FileOpsMenu }
        "4" { Show-ShortcutsMenu }
        "5" { Show-AppsMenu }
        "6" { Show-DiagnosticsMenu }
        "7" { Write-Host "Goodbye!" -ForegroundColor Green; break }
        default { Write-Host "Invalid choice! Press Enter to continue..." -ForegroundColor Red; [void](Read-Host) }
    }
} while ($opt -ne "7")
