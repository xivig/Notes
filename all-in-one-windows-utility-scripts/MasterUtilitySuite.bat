@echo off
chcp 65001 >nul
:: ==============================================================================
:: Enterprise File & System Utility Suite (Modern Windows 11 Batch Edition)
:: Menu-driven CMD utility with PowerShell RunAs UAC elevation, centralized
:: settings.json config, confirmation-guarded file ops, and Win11 admin tools.
:: ==============================================================================

net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrative privileges...
    powershell -NoProfile -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b 0
)

pushd "%~dp0"
cls
color 0B

set "default_backup_dir=mybackup"
set "default_web_root=webroot"
set "html_template_dir=htmlSiteCreation"
set "app_template_dir=app"
set "php_oop_dir=php_oop"

if exist "%~dp0settings.json" (
    for /f "tokens=1,2 delims==" %%a in ('powershell -NoProfile -Command "$j = Get-Content -Path '%~dp0settings.json' -Raw | ConvertFrom-Json; $j.psobject.properties | ForEach-Object { $_.Name + '=' + $_.Value }"') do set "%%a=%%b"
)

:main_menu
cls
echo +--------------------------------------------------------+
echo ^|     MODERN FILE ^& SYSTEM UTILITY SUITE (WIN11 CMD)     ^|
echo +--------------------------------------------------------+
echo ^|  1. Web ^& App Project Scaffolds (4 Starters)           ^|
echo ^|  2. File ^& Folder Creators                             ^|
echo ^|  3. Advanced File Operations (Copy, Move, Rename)      ^|
echo ^|  4. Windows 11 Administrative Consoles                 ^|
echo ^|  5. Applications ^& System Folders                      ^|
echo ^|  6. System Diagnostics ^& Exporters                     ^|
echo ^|  7. Exit                                               ^|
echo +--------------------------------------------------------+
echo.
set "opt="
set /p opt="Select an option (1-7): "
if "%opt%"=="1" goto web_templates
if "%opt%"=="2" goto creators
if "%opt%"=="3" goto file_ops
if "%opt%"=="4" goto admin_tools
if "%opt%"=="5" goto apps_cache
if "%opt%"=="6" goto diagnostics
if "%opt%"=="7" goto exit_program
goto main_menu

:: ==========================================
:: 1. Project Scaffolds
:: ==========================================
:web_templates
cls
echo === PROJECT SCAFFOLD GENERATORS ===
echo 1. Modern Static Web Starter (%html_template_dir%)
echo 2. PHP App Starter (%default_web_root%)
echo 3. Minimal App Starter (%app_template_dir%)
echo 4. PHP OOP Starter (%php_oop_dir%)
echo 5. Back to Main Menu
set "web_opt="
set /p web_opt="Select a template (1-5): "
if "%web_opt%"=="1" goto create_html_proj
if "%web_opt%"=="2" goto create_php_proj
if "%web_opt%"=="3" goto create_app_proj
if "%web_opt%"=="4" goto create_oop_proj
if "%web_opt%"=="5" goto main_menu
goto web_templates

:create_html_proj
mkdir "%CD%\%html_template_dir%\css" "%CD%\%html_template_dir%\js" 2>nul
type NUL > "%CD%\%html_template_dir%\css\styles.css"
type NUL > "%CD%\%html_template_dir%\js\app.js"
echo ^<!DOCTYPE html^>^<html lang="en"^>^<head^>^<meta charset="UTF-8"^>^<title^>App^</title^>^<link rel="stylesheet" href="./css/styles.css"^>^</head^>^<body^>^<h1^>Ready^</h1^>^<script src="./js/app.js"^>^</script^>^</body^>^</html^> > "%CD%\%html_template_dir%\index.html"
echo [OK] Created HTML starter in "%CD%\%html_template_dir%".
pause
goto web_templates

:create_php_proj
mkdir "%CD%\%default_web_root%\public" "%CD%\%default_web_root%\src" "%CD%\%default_web_root%\config" 2>nul
echo ^<?php declare^(strict_types=1^); echo 'PHP App Ready'; > "%CD%\%default_web_root%\public\index.php"
echo # PHP App > "%CD%\%default_web_root%\README.md"
echo [OK] Created PHP starter in "%CD%\%default_web_root%".
pause
goto web_templates

:create_app_proj
mkdir "%CD%\%app_template_dir%\src" "%CD%\%app_template_dir%\assets\styles" 2>nul
type NUL > "%CD%\%app_template_dir%\assets\styles\app.css"
type NUL > "%CD%\%app_template_dir%\index.html"
echo [OK] Created App structure in "%CD%\%app_template_dir%".
pause
goto web_templates

:create_oop_proj
mkdir "%CD%\%php_oop_dir%\src" "%CD%\%php_oop_dir%\tests" 2>nul
echo ^<?php declare^(strict_types=1^); > "%CD%\%php_oop_dir%\index.php"
echo # PHP OOP Package > "%CD%\%php_oop_dir%\README.md"
echo [OK] Created PHP OOP package in "%CD%\%php_oop_dir%".
pause
goto web_templates

:: ==========================================
:: 2. File & Folder Creators
:: ==========================================
:creators
cls
echo === FILE ^& FOLDER CREATORS ===
echo 1. Create Project Folders (Project1..ProjectN inside WebProject)
echo 2. Create Custom File (User-defined Name ^& Extension)
echo 3. Batch Create Indexed Files (prefix1..N.ext)
echo 4. Back to Main Menu
set "create_opt="
set /p create_opt="Select an option (1-4): "
if "%create_opt%"=="1" goto create_proj_folders
if "%create_opt%"=="2" goto create_custom_file
if "%create_opt%"=="3" goto create_indexed_batch
if "%create_opt%"=="4" goto main_menu
goto creators

:create_proj_folders
set "cnt=10"
set /p cnt="How many Project folders to create inside WebProject? [10]: "
mkdir "%CD%\WebProject" 2>nul
for /L %%A in (1,1,%cnt%) do mkdir "%CD%\WebProject\Project%%A" 2>nul
echo [OK] Created Project1..Project%cnt% in "%CD%\WebProject".
pause
goto creators

:create_custom_file
set "filename="
set /p filename="File name: "
set "extension="
set /p extension="Extension (without dot): "
if "%filename%"=="" goto creators
if "%extension%"=="" goto creators
type NUL > "%filename%.%extension%"
echo [OK] Created "%filename%.%extension%".
pause
goto creators

:create_indexed_batch
set "pfx=item"
set "ext=txt"
set "cnt=5"
set /p pfx="Filename prefix [item]: "
set /p ext="Extension (without dot) [txt]: "
set /p cnt="Count [5]: "
for /L %%A in (1,1,%cnt%) do type NUL > "%pfx%%%A.%ext%"
echo [OK] Created %pfx%1.%ext% .. %pfx%%cnt%.%ext%.
pause
goto creators

:: ==========================================
:: 3. Advanced File Operations
:: ==========================================
:file_ops
cls
echo === ADVANCED FILE OPERATIONS ===
echo 1. Copy File
echo 2. Move Text Files (*.txt) to WebProject Folder
echo 3. Recursive Extension Backup to %default_backup_dir%/
echo 4. Pattern Filename Replace (Find ^& Replace in filenames)
echo 5. Bulk Extension Replace (e.g. *.js -^> *.ts)
echo 6. Sequential Rename (e.g. *.log -^> log1.txt)
echo 7. Safe Convert Non-Script Files to .txt
echo 8. Back to Main Menu
set "file_opt="
set /p file_opt="Select an option (1-8): "
if "%file_opt%"=="1" goto op_copy
if "%file_opt%"=="2" goto op_move_txt
if "%file_opt%"=="3" goto op_search_backup
if "%file_opt%"=="4" goto op_pattern_rename
if "%file_opt%"=="5" goto op_change_ext_bulk
if "%file_opt%"=="6" goto op_change_ext_seq
if "%file_opt%"=="7" goto op_convert_txt
if "%file_opt%"=="8" goto main_menu
goto file_ops

:op_copy
set "src="
set /p src="Source file path: "
set "dest="
set /p dest="Destination folder path: "
if not exist "%src%" (echo [ERROR] Source not found. & pause & goto file_ops)
if not exist "%dest%" mkdir "%dest%"
copy /Y "%src%" "%dest%\"
pause
goto file_ops

:op_move_txt
if not exist "%CD%\WebProject" mkdir "%CD%\WebProject"
set /a moved_cnt=0
for %%F in ("%CD%\*.txt") do (
    if /i not "%%~nxF"=="output.txt" if /i not "%%~nxF"=="Listing.txt" if /i not "%%~nxF"=="AllProgramFilesListing.txt" if /i not "%%~nxF"=="file_list.txt" (
        move /Y "%%~fF" "%CD%\WebProject\" >nul && set /a moved_cnt+=1
    )
)
echo [OK] Moved %moved_cnt% .txt file(s) to "%CD%\WebProject\".
pause
goto file_ops

:op_search_backup
set "ext="
set /p ext="Extension to back up (without dot): "
if "%ext%"=="" goto file_ops
mkdir "%CD%\%default_backup_dir%" 2>nul
for /R %%G in (*.%ext%) do (
    if /i not "%%~dpG"=="%CD%\%default_backup_dir%\" copy /Y "%%G" "%CD%\%default_backup_dir%\" >nul 2>&1
)
echo [OK] Backed up *.%ext% files into "%CD%\%default_backup_dir%\".
pause
goto file_ops

:op_pattern_rename
set "find_str="
set /p find_str="Text to find in filenames: "
set "rep_str="
set /p rep_str="Replacement text (leave blank to remove): "
if "%find_str%"=="" goto file_ops
powershell -NoProfile -Command "$f='%find_str%'; $r='%rep_str%'; Get-ChildItem -File | Where-Object { $_.Name -like \"*$f*\" -and $_.Extension -notin '.bat','.ps1','.py','.js','.php','.json','.md','.html','.reg' } | ForEach-Object { Rename-Item $_.FullName ($_.Name -replace [regex]::Escape($f), $r) }; Write-Host '[OK] Pattern rename completed.'"
pause
goto file_ops

:op_change_ext_bulk
set "oldExt="
set /p oldExt="Old extension (without dot): "
set "newExt="
set /p newExt="New extension (without dot): "
if "%oldExt%"=="" goto file_ops
if "%newExt%"=="" goto file_ops
ren *.%oldExt% *.%newExt%
pause
goto file_ops

:op_change_ext_seq
set "oldExt="
set /p oldExt="Old extension (without dot): "
set "newExt="
set /p newExt="New extension (without dot): "
if "%oldExt%"=="" goto file_ops
if "%newExt%"=="" goto file_ops
setlocal enabledelayedexpansion
set count=1
for %%f in (*.%oldExt%) do (
    ren "%%f" "item!count!.%newExt%"
    set /a count+=1
)
endlocal
pause
goto file_ops

:op_convert_txt
set "conv_confirm="
set /p conv_confirm="Convert non-script files in %CD% to .txt? Type YES to continue: "
if /i not "%conv_confirm%"=="YES" (echo Operation canceled. & pause & goto file_ops)
setlocal enabledelayedexpansion
set /a conv_cnt=0
for %%F in (*.*) do (
    set "skip="
    for %%X in (.bat .ps1 .py .js .php .json .md .html .reg .log .txt) do (
        if /i "%%~xF"=="%%X" set "skip=1"
    )
    if /i "%%~nxF"==".gitignore" set "skip=1"
    if not defined skip (
        ren "%%~fF" "%%~nF.txt" 2>nul && set /a conv_cnt+=1
    )
)
echo [OK] Renamed !conv_cnt! non-script file(s) to .txt.
endlocal
pause
goto file_ops

:: ==========================================
:: 4. Windows 11 Administrative Consoles
:: ==========================================
:admin_tools
cls
echo === WINDOWS 11 ADMINISTRATIVE CONSOLES ===
echo 1. Control Panel                   8. Computer Management (compmgmt.msc)
echo 2. Windows Services (services.msc) 9. Desktop Icon Settings
echo 3. Add/Remove Programs (appwiz.cpl)10. Group Policy Editor (Pro/Ent)
echo 4. Registry Editor (regedit)       11. Network Connections (ncpa.cpl)
echo 5. Windows Terminal / CMD          12. Environment Variables Editor
echo 6. Local Users (lusrmgr/netplwiz)  13. System Properties (Advanced)
echo 7. Disk Management (diskmgmt.msc)  14. Back to Main Menu
set "adm_opt="
set /p adm_opt="Select shortcut (1-14): "
if "%adm_opt%"=="1" start control
if "%adm_opt%"=="2" start services.msc
if "%adm_opt%"=="3" start appwiz.cpl
if "%adm_opt%"=="4" start regedit
if "%adm_opt%"=="5" (where wt.exe >nul 2>&1 && start wt.exe || start "" "%comspec%")
if "%adm_opt%"=="6" (if exist "%SystemRoot%\System32\lusrmgr.msc" (start lusrmgr.msc) else (start netplwiz))
if "%adm_opt%"=="7" start diskmgmt.msc
if "%adm_opt%"=="8" start compmgmt.msc
if "%adm_opt%"=="9" start rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0
if "%adm_opt%"=="10" (if exist "%SystemRoot%\System32\gpedit.msc" (start gpedit.msc) else (echo gpedit.msc requires Pro/Enterprise edition. & pause))
if "%adm_opt%"=="11" start ncpa.cpl
if "%adm_opt%"=="12" start rundll32.exe sysdm.cpl,EditEnvironmentVariables
if "%adm_opt%"=="13" start rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3
if "%adm_opt%"=="14" goto main_menu
goto admin_tools

:: ==========================================
:: 5. Applications & System Folders
:: ==========================================
:apps_cache
cls
echo === APPLICATIONS ^& SYSTEM FOLDERS ===
echo 1. Google Chrome       7. Notepad++          13. Windows Settings
echo 2. Microsoft Edge      8. Sublime Text       14. Temp Directory
echo 3. Mozilla Firefox     9. Visual Studio Code 15. Local AppData
echo 4. Terminal (Admin)   10. Git Bash           16. Downloads
echo 5. Notepad            11. Microsoft Word     17. Back to Main Menu
echo 6. PowerShell 7+/5.1  12. Microsoft Excel
set "app_opt="
set /p app_opt="Select option (1-17): "
if "%app_opt%"=="1" start "" "chrome.exe" "https://www.google.com" 2>nul || echo Chrome not found! & pause
if "%app_opt%"=="2" start "" "msedge.exe" "https://www.google.com" 2>nul || echo Edge not found! & pause
if "%app_opt%"=="3" start "" "firefox.exe" 2>nul || echo Firefox not found! & pause
if "%app_opt%"=="4" (where wt.exe >nul 2>&1 && powershell -NoProfile -Command "Start-Process wt.exe -Verb RunAs" || powershell -NoProfile -Command "Start-Process cmd -Verb RunAs")
if "%app_opt%"=="5" start "" notepad.exe
if "%app_opt%"=="6" (where pwsh.exe >nul 2>&1 && start "" pwsh.exe || start "" powershell.exe)
if "%app_opt%"=="7" start "" "%ProgramFiles%\Notepad++\notepad++.exe" 2>nul || echo Notepad++ not found! & pause
if "%app_opt%"=="8" start "" "%ProgramFiles%\Sublime Text\sublime_text.exe" 2>nul || echo Sublime Text not found! & pause
if "%app_opt%"=="9" (where code >nul 2>&1 && start "" code || start "" "%LocalAppData%\Programs\Microsoft VS Code\Code.exe" 2>nul || start "" "%ProgramFiles%\Microsoft VS Code\Code.exe" 2>nul || echo VS Code not found! & pause)
if "%app_opt%"=="10" start "" "%ProgramFiles%\Git\git-bash.exe" 2>nul || echo Git Bash not found! & pause
if "%app_opt%"=="11" start "" winword 2>nul || echo MS Word not found! & pause
if "%app_opt%"=="12" start "" excel 2>nul || echo MS Excel not found! & pause
if "%app_opt%"=="13" start "" ms-settings:
if "%app_opt%"=="14" start "" "%TEMP%"
if "%app_opt%"=="15" start "" "%LocalAppData%"
if "%app_opt%"=="16" start "" "%USERPROFILE%\Downloads"
if "%app_opt%"=="17" goto main_menu
goto apps_cache

:: ==========================================
:: 6. System Diagnostics & Exporters
:: ==========================================
:diagnostics
cls
echo === SYSTEM DIAGNOSTICS ^& EXPORTERS ===
echo 1. Export Environment Variables to 'output.txt'
echo 2. Export Installed Software List to 'AllProgramFilesListing.txt'
echo 3. Export '%app_template_dir%' Directory Tree to 'Listing.txt'
echo 4. Open Elevated Terminal / CMD at Current Location
echo 5. Back to Main Menu
set "diag_opt="
set /p diag_opt="Select option (1-5): "
if "%diag_opt%"=="1" (set > "%CD%\output.txt" & echo Saved output.txt! & pause & goto diagnostics)
if "%diag_opt%"=="2" (
    powershell -NoProfile -Command "$paths=@('HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*','HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*','HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*'); Get-ItemProperty $paths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName,DisplayVersion,Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File -FilePath '%CD%\AllProgramFilesListing.txt' -Encoding utf8"
    echo Saved AllProgramFilesListing.txt! & pause & goto diagnostics
)
if "%diag_opt%"=="3" (
    if exist "%CD%\%app_template_dir%" (dir "%CD%\%app_template_dir%" /O /S /B > "%CD%\Listing.txt" & echo Saved Listing.txt!) else (echo '%app_template_dir%' does not exist!)
    pause & goto diagnostics
)
if "%diag_opt%"=="4" (
    set "OLDDIR=%CD%"
    where wt.exe >nul 2>&1 && (powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList '-d', '\"%OLDDIR%\"' -Verb RunAs") || (powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/K cd /d \"%OLDDIR%\"' -Verb RunAs")
    goto diagnostics
)
if "%diag_opt%"=="5" goto main_menu
goto diagnostics

:exit_program
echo Goodbye!
exit /b 0
