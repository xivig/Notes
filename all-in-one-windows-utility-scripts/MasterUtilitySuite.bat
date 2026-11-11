@echo off
chcp 65001 >nul
:: ==============================================================================
:: SYNOPSIS
::     Enterprise File & System Utility Suite (Modern Windows 11 Batch Edition)
:: DESCRIPTION
::     Menu-driven Batch utility with modern PowerShell UAC auto-elevation
::     (no VBScript), centralized JSON config, safe confirmations, and Win11 tools.
:: ==============================================================================

:: 1. Modern UAC Auto-Elevation Check (PowerShell RunAs — Windows 11 24H2+ safe)
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo Requesting administrative privileges...
    powershell -NoProfile -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b
)

:: Set working directory to the script's folder
pushd "%~dp0"

cls
color 02

:: 2. Load JSON Configurations in a single PowerShell command
set "default_backup_dir=mybackup"
set "default_web_root=webroot"
set "html_template_dir=htmlSiteCreation"
set "app_template_dir=app"
set "php_oop_dir=php_oop"

if exist "%~dp0settings.json" (
    for /f "tokens=1,2 delims==" %%a in ('powershell -Command "$j = Get-Content -Path '%~dp0settings.json' -Raw | ConvertFrom-Json; $j.psobject.properties | ForEach-Object { $_.Name + '=' + $_.Value }"') do set "%%a=%%b"
)

:main_menu
cls
echo +--------------------------------------------------------+
echo ^|        ELITE FILE ^& SYSTEM UTILITY SUITE v2.1 (CMD)    ^|
echo +--------------------------------------------------------+
echo ^|  1. Web Templates ^& Site Creators (5 Types)             ^|
echo ^|  2. File ^& Folder Creators (Batch / Custom)            ^|
echo ^|  3. Advanced File Operations (Copy, Move, Rename, etc.)  ^|
echo ^|  4. Windows System Administrative Tools (13 Tools)       ^|
echo ^|  5. System Applications ^& Cache Directories             ^|
echo ^|  6. System Diagnostics ^& Exporters                      ^|
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
echo Invalid option, please try again.
pause
goto main_menu

:: ==========================================
:: 1. Web Templates & Site Creators
:: ==========================================
:web_templates
cls
echo +--------------------------------------------------------+
echo ^| === Web Templates ^& Site Creators ===                  ^|
echo +--------------------------------------------------------+
echo.
echo 1. PHP Web Project (%default_web_root%)
echo 2. HTML Site Template (%html_template_dir%)
echo 3. App Structure (%app_template_dir%)
echo 4. PHP OOP Structure (%php_oop_dir%)
echo 5. Basic Web Template (webTemplate folder)
echo 6. Back to Main Menu
echo.
set "web_opt="
set /p web_opt="Select a template (1-6): "
if "%web_opt%"=="1" goto create_php_proj
if "%web_opt%"=="2" goto create_html_proj
if "%web_opt%"=="3" goto create_app_proj
if "%web_opt%"=="4" goto create_oop_proj
if "%web_opt%"=="5" goto create_basic_proj
if "%web_opt%"=="6" goto main_menu
echo Invalid option.
pause
goto web_templates

:create_php_proj
mkdir "%CD%\%default_web_root%\public" 2>nul
mkdir "%CD%\%default_web_root%\public\assets" 2>nul
mkdir "%CD%\%default_web_root%\public\assets\css" 2>nul
mkdir "%CD%\%default_web_root%\public\assets\common" 2>nul
mkdir "%CD%\%default_web_root%\public\assets\inc" 2>nul
mkdir "%CD%\%default_web_root%\public\assets\js" 2>nul
mkdir "%CD%\%default_web_root%\private\class" 2>nul
mkdir "%CD%\%default_web_root%\private\config" 2>nul
mkdir "%CD%\%default_web_root%\private\core" 2>nul

type NUL > "%CD%\%default_web_root%\public\login.php"
type NUL > "%CD%\%default_web_root%\public\index.php"
type NUL > "%CD%\%default_web_root%\public\admin.php"
type NUL > "%CD%\%default_web_root%\public\confirmdelete.php"
type NUL > "%CD%\%default_web_root%\public\view.php"
type NUL > "%CD%\%default_web_root%\public\test.php"
type NUL > "%CD%\%default_web_root%\public\regex.php"

type NUL > "%CD%\%default_web_root%\private\class\class.db_connect.inc.php"
type NUL > "%CD%\%default_web_root%\private\class\class.calendar.inc.php"
type NUL > "%CD%\%default_web_root%\private\class\class.event.inc.php"
type NUL > "%CD%\%default_web_root%\private\class\class.admin.inc.php"
type NUL > "%CD%\%default_web_root%\private\class\class.db-cred.inc.php"
type NUL > "%CD%\%default_web_root%\private\config\class.db-cred.inc.php"
type NUL > "%CD%\%default_web_root%\private\core\init.inc.php"

type NUL > "%CD%\%default_web_root%\public\assets\css\style.css"
type NUL > "%CD%\%default_web_root%\public\assets\css\admin.css"
type NUL > "%CD%\%default_web_root%\public\assets\css\ajax.css"

type NUL > "%CD%\%default_web_root%\public\assets\js\custom.js"
type NUL > "%CD%\%default_web_root%\public\assets\js\init.js"
type NUL > "%CD%\%default_web_root%\public\assets\js\valid-date.js"

type NUL > "%CD%\%default_web_root%\public\assets\common\header.inc.php"
type NUL > "%CD%\%default_web_root%\public\assets\common\footer.inc.php"

type NUL > "%CD%\%default_web_root%\public\assets\inc\process.inc.php"
type NUL > "%CD%\%default_web_root%\public\assets\inc\ajax.inc.php"

echo PHP Web Project structure created at "%CD%\%default_web_root%"!
pause
goto web_templates

:create_html_proj
mkdir "%html_template_dir%\css" 2>nul
mkdir "%html_template_dir%\img" 2>nul
mkdir "%html_template_dir%\js" 2>nul

type NUL > "%html_template_dir%\.htaccess"
type NUL > "%html_template_dir%\404.html"
type NUL > "%html_template_dir%\humans.txt"
type NUL > "%html_template_dir%\index.html"
type NUL > "%html_template_dir%\robots.txt"
type NUL > "%html_template_dir%\site.webmanifest"
type NUL > "%html_template_dir%\sitemap.xml"

type NUL > "%html_template_dir%\css\style.css"
type NUL > "%html_template_dir%\css\normalize.css"

type NUL > "%html_template_dir%\js\custom.js"
type NUL > "%html_template_dir%\js\modernizr.js"
type NUL > "%html_template_dir%\js\jquery.js"

echo HTML site template created in "%html_template_dir%" folder.
pause
goto web_templates

:create_app_proj
mkdir "%app_template_dir%\temp\styles" 2>nul
mkdir "%app_template_dir%\assets\styles" 2>nul
mkdir "%app_template_dir%\assets\images\icons" 2>nul

type NUL > "%app_template_dir%\assets\styles\styles.css"
type NUL > "%app_template_dir%\temp\styles\styles.css"
type NUL > "%app_template_dir%\.htaccess"
type NUL > "%app_template_dir%\404.html"
type NUL > "%app_template_dir%\humans.txt"
type NUL > "%app_template_dir%\index.html"
type NUL > "%app_template_dir%\robots.txt"
type NUL > "%app_template_dir%\site.webmanifest"
type NUL > "%app_template_dir%\sitemap.xml"

echo Site structure created in "%app_template_dir%" folder.
pause
goto web_templates

:create_oop_proj
mkdir "%php_oop_dir%\css" 2>nul
mkdir "%php_oop_dir%\img" 2>nul
mkdir "%php_oop_dir%\js" 2>nul

type NUL > "%php_oop_dir%\.htaccess"
type NUL > "%php_oop_dir%\404.html"
type NUL > "%php_oop_dir%\humans.txt"
type NUL > "%php_oop_dir%\index.php"
type NUL > "%php_oop_dir%\robots.txt"
type NUL > "%php_oop_dir%\site.webmanifest"
type NUL > "%php_oop_dir%\sitemap.xml"

type NUL > "%php_oop_dir%\css\style.css"
type NUL > "%php_oop_dir%\css\normalize.css"

type NUL > "%php_oop_dir%\js\custom.js"
type NUL > "%php_oop_dir%\js\modernizr.js"
type NUL > "%php_oop_dir%\js\jquery.js"

echo PHP OOP project structure created in "%php_oop_dir%" folder.
pause
goto web_templates

:create_basic_proj
mkdir "%CD%\webTemplate" 2>nul
mkdir "%CD%\webTemplate\css" 2>nul
mkdir "%CD%\webTemplate\img" 2>nul
mkdir "%CD%\webTemplate\js" 2>nul

for /L %%i in (1,1,5) do type nul > "%CD%\webTemplate\D%%i.txt"

type NUL > "%CD%\webTemplate\.htaccess"
type NUL > "%CD%\webTemplate\404.html"
type NUL > "%CD%\webTemplate\humans.txt"
type NUL > "%CD%\webTemplate\index.php"
type NUL > "%CD%\webTemplate\robots.txt"
type NUL > "%CD%\webTemplate\site.webmanifest"
type NUL > "%CD%\webTemplate\sitemap.xml"

type NUL > "%CD%\webTemplate\css\style.css"
type NUL > "%CD%\webTemplate\css\normalize.css"

type NUL > "%CD%\webTemplate\js\custom.js"
type NUL > "%CD%\webTemplate\js\modernizr.js"
type NUL > "%CD%\webTemplate\js\jquery.js"

echo Basic Web template created inside "%CD%\webTemplate" folder.
pause
goto web_templates

:: ==========================================
:: 2. File & Folder Creators
:: ==========================================
:creators
cls
echo +--------------------------------------------------------+
echo ^| === File ^& Folder Creators ===                         ^|
echo +--------------------------------------------------------+
echo.
echo 1. Create Project Folders (Project1 to Project10 inside WebProject)
echo 2. Create Custom File (User-defined Name ^& Extension)
echo 3. Create Batch Dummy Files (index1-10.php, style1-3.css, etc.)
echo 4. Back to Main Menu
echo.
set "create_opt="
set /p create_opt="Select an option (1-4): "
if "%create_opt%"=="1" goto create_proj_folders
if "%create_opt%"=="2" goto create_custom_file
if "%create_opt%"=="3" goto create_dummy_batch
if "%create_opt%"=="4" goto main_menu
echo Invalid option.
pause
goto creators

:create_proj_folders
if not exist "%CD%\WebProject" mkdir "%CD%\WebProject"
for /L %%A in (1,1,10) do md "%CD%\WebProject\Project%%A" 2>nul
echo 10 Project folders created inside "%CD%\WebProject"!
pause
goto creators

:create_custom_file
set "filename="
set /P filename="Please enter your file Name: "
set "extension="
set /P extension="Please enter your file extension without dot: "
if "%filename%"=="" goto creators
if "%extension%"=="" goto creators
type NUL > "%filename%.%extension%"
echo File "%filename%.%extension%" created successfully!
pause
goto creators

:create_dummy_batch
for /l %%a in (1,1,10) do type nul > "index%%a.php"
for %%A in (1,2,3) do type nul > "style%%A.css"
for %%A in (1,2,3) do type nul > "custom%%A.js"
for %%A in (1,2,3) do type nul > "template%%A.tpl"
echo Multiple dummy files created!
pause
goto creators

:: ==========================================
:: 3. Advanced File Operations
:: ==========================================
:file_ops
cls
echo +--------------------------------------------------------+
echo ^| === Advanced File Operations ===                       ^|
echo +--------------------------------------------------------+
echo.
echo 1. Copy File
echo 2. Move Text Files (*.txt) to WebProject Folder
echo 3. Search ^& Backup Files (Search by extension recursively to %default_backup_dir%/)
echo 4. Batch Rename Loop (mac-osx-command-line-terminal-X-638.jpg -> X.jpg)
echo 5. Bulk Change File Extensions (e.g. *.js -> *.php)
echo 6. Bulk Change Extensions (Sequentially rename files, e.g. *.js -> index1.php)
echo 7. Change All Extensions to .txt (*.* -> *.txt)
echo 8. Back to Main Menu
echo.
set "file_opt="
set /p file_opt="Select an option (1-8): "
if "%file_opt%"=="1" goto op_copy
if "%file_opt%"=="2" goto op_move_txt
if "%file_opt%"=="3" goto op_search_backup
if "%file_opt%"=="4" goto op_rename_osx
if "%file_opt%"=="5" goto op_change_ext_bulk
if "%file_opt%"=="6" goto op_change_ext_seq
if "%file_opt%"=="7" goto op_convert_txt
if "%file_opt%"=="8" goto main_menu
echo Invalid option.
pause
goto file_ops

:op_copy
set "src="
set /p src="Enter source file path: "
set "dest="
set /p dest="Enter destination folder path: "
if not exist "%src%" (
    echo Source file not found!
    pause
    goto file_ops
)
if not exist "%dest%" mkdir "%dest%"
copy /Y "%src%" "%dest%\"
echo File copied successfully!
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
echo Moved %moved_cnt% text file(s) to "%CD%\WebProject\"!
pause
goto file_ops

:op_search_backup
set "ext="
set /p ext="Enter file extension (e.g. bat or txt): "
if not exist "%CD%\%default_backup_dir%" mkdir "%CD%\%default_backup_dir%"
for /R %%G in (*.%ext%) do (
    if not "%%~dpG"=="%CD%\%default_backup_dir%\" (
        xcopy "%%G" "%CD%\%default_backup_dir%\" /Y /Q 2>nul
    )
)
echo Files backed up inside "%CD%\%default_backup_dir%"!
start "" "%CD%\%default_backup_dir%"
pause
goto file_ops

:op_rename_osx
FOR /L %%A IN (0,1,200) DO (
    if exist "mac-osx-command-line-terminal-%%A-638.jpg" (
        ren "mac-osx-command-line-terminal-%%A-638.jpg" "%%A.jpg"
    )
)
echo OSX images renamed successfully!
pause
goto file_ops

:op_change_ext_bulk
set "oldExt="
set /p oldExt="Enter old extension to match (without dot): "
set "newExt="
set /p newExt="Enter new extension (without dot): "
ren *.%oldExt% *.%newExt%
echo Extensions replaced!
pause
goto file_ops

:op_change_ext_seq
set "oldExt="
set /p oldExt="Enter old extension to match (without dot): "
set "newExt="
set /p newExt="Enter new extension (without dot): "
setlocal enabledelayedexpansion
set count=1
for %%f in (*.%oldExt%) do (
    ren "%%f" "index!count!.%newExt%"
    set /a count+=1
)
endlocal
echo Files sequentially renamed!
pause
goto file_ops

:op_convert_txt
set "conv_confirm="
set /p conv_confirm="Convert non-script files in %CD% to .txt? Type YES to continue: "
if /i not "%conv_confirm%"=="YES" (
    echo Operation canceled.
    pause
    goto file_ops
)
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
echo Renamed !conv_cnt! file(s) in current folder to .txt (scripts/docs protected)!
endlocal
pause
goto file_ops

:: ==========================================
:: 4. Windows System Administrative Tools
:: ==========================================
:admin_tools
cls
echo +--------------------------------------------------------+
echo ^| === Windows Administrative Shortcuts ===               ^|
echo +--------------------------------------------------------+
echo.
echo 1. Control Panel
echo 2. Windows Services (services.msc)
echo 3. Add/Remove Programs (appwiz.cpl)
echo 4. Registry Editor (regedit)
echo 5. Command Prompt (cmd.exe)
echo 6. Local Users and Groups (lusrmgr.msc)
echo 7. Disk Management (diskmgmt.msc)
echo 8. Computer Management Console (compmgmt.msc)
echo 9. Desktop Icon Settings
echo 10. Group Policy Editor (gpedit.msc)
echo 11. Network Connections Manager (ncpa.cpl)
echo 12. Environment Variables Editor
echo 13. System Properties (Advanced Tab)
echo 14. Back to Main Menu
echo.
set "adm_opt="
set /p adm_opt="Select a shortcut (1-14): "
if "%adm_opt%"=="1" start control
if "%adm_opt%"=="2" start services.msc
if "%adm_opt%"=="3" start appwiz.cpl
if "%adm_opt%"=="4" start regedit
if "%adm_opt%"=="5" (where wt.exe >nul 2>&1 && start wt.exe || start "" "%comspec%")
if "%adm_opt%"=="6" (if exist "%SystemRoot%\System32\lusrmgr.msc" (start lusrmgr.msc) else (echo lusrmgr.msc unavailable on Home edition; opening netplwiz... & start netplwiz & pause))
if "%adm_opt%"=="7" start diskmgmt.msc
if "%adm_opt%"=="8" start compmgmt.msc
if "%adm_opt%"=="9" start rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0
if "%adm_opt%"=="10" (if exist "%SystemRoot%\System32\gpedit.msc" (start gpedit.msc) else (echo gpedit.msc is only included in Windows Pro/Enterprise editions. & pause))
if "%adm_opt%"=="11" start ncpa.cpl
if "%adm_opt%"=="12" start rundll32.exe sysdm.cpl,EditEnvironmentVariables
if "%adm_opt%"=="13" start rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3
if "%adm_opt%"=="14" goto main_menu
goto admin_tools

:: ==========================================
:: 5. System Applications & Cache Directories
:: ==========================================
:apps_cache
cls
echo +--------------------------------------------------------+
echo ^| === Applications ^& Cache System ===                   ^|
echo +--------------------------------------------------------+
echo.
echo 1. Open Google Chrome
echo 2. Open Microsoft Edge
echo 3. Open Mozilla Firefox
echo 4. Open Opera
echo 5. Open Command Prompt (Admin)
echo 6. Open Notepad
echo 7. Open Notepad++
echo 8. Open Sublime Text
echo 9. Open Visual Studio Code
echo 10. Open Phoenix Code
echo 11. Open Microsoft Word
echo 12. Open Microsoft Excel
echo 13. Open Adobe Photoshop
echo 14. Open Git Bash
echo 15. Open PowerShell
echo 16. Open Deluge Torrent Client
echo 17. Open Temp Directory
echo 18. Open Local AppData Directory
echo 19. Open Downloads Directory
echo 20. Back to Main Menu
echo.
set "app_opt="
set /p app_opt="Select an option (1-20): "
if "%app_opt%"=="1" start "" "chrome.exe" "https://www.google.com" 2>nul || echo Chrome is not installed! & pause
if "%app_opt%"=="2" start "" "msedge.exe" "https://www.google.com" 2>nul || echo Edge is not installed! & pause
if "%app_opt%"=="3" start "" "firefox.exe" 2>nul || echo Firefox is not installed! & pause
if "%app_opt%"=="4" start "" "%LocalAppData%\Programs\Opera\opera.exe" 2>nul || start "" "%ProgramFiles%\Opera\launcher.exe" 2>nul || start "" "opera.exe" 2>nul || echo Opera is not installed! & pause
if "%app_opt%"=="5" (where wt.exe >nul 2>&1 && powershell -NoProfile -Command "Start-Process wt.exe -Verb RunAs" || powershell -NoProfile -Command "Start-Process cmd -Verb RunAs")
if "%app_opt%"=="6" start "" "notepad.exe"
if "%app_opt%"=="7" start "" "%ProgramFiles%\Notepad++\notepad++.exe" 2>nul || echo Notepad++ is not installed! & pause
if "%app_opt%"=="8" start "" "%ProgramFiles%\Sublime Text\sublime_text.exe" 2>nul || echo Sublime Text is not installed! & pause
if "%app_opt%"=="9" (where code >nul 2>&1 && start "" "code" || start "" "%LocalAppData%\Programs\Microsoft VS Code\Code.exe" 2>nul || start "" "%ProgramFiles%\Microsoft VS Code\Code.exe" 2>nul || echo VS Code is not installed! & pause)
if "%app_opt%"=="10" start "" "%LocalAppData%\Phoenix Code\Phoenix Code.exe" 2>nul || echo Phoenix Code is not installed! & pause
if "%app_opt%"=="11" start "" "winword" 2>nul || echo MS Word is not installed! & pause
if "%app_opt%"=="12" start "" "excel" 2>nul || echo MS Excel is not installed! & pause
if "%app_opt%"=="13" powershell -NoProfile -Command "$p = Get-ChildItem \"$env:ProgramFiles\Adobe\Adobe Photoshop *\Photoshop.exe\" -ErrorAction SilentlyContinue | Sort-Object FullName -Descending | Select-Object -First 1 -ExpandProperty FullName; if ($p) { Start-Process $p } else { Write-Host 'Adobe Photoshop is not installed!' -ForegroundColor Red; Read-Host 'Press Enter...' }"
if "%app_opt%"=="14" start "" "%ProgramFiles%\Git\git-bash.exe" 2>nul || echo Git Bash is not installed! & pause
if "%app_opt%"=="15" (where pwsh.exe >nul 2>&1 && start "" pwsh.exe || start "" powershell.exe)
if "%app_opt%"=="16" start "" "%ProgramFiles%\Deluge\deluge.exe" 2>nul || echo Deluge is not installed! & pause
if "%app_opt%"=="17" start "" "%temp%"
if "%app_opt%"=="18" start "" "%LocalAppData%"
if "%app_opt%"=="19" start "" "%userprofile%\Downloads"
if "%app_opt%"=="20" goto main_menu
goto apps_cache

:: ==========================================
:: 6. System Diagnostics & Exporters
:: ==========================================
:diagnostics
cls
echo +--------------------------------------------------------+
echo ^| === System Diagnostics ^& Exporters ===                 ^|
echo +--------------------------------------------------------+
echo.
echo 1. Export Environment Variables to 'output.txt'
echo 2. Export Installed Program List to 'AllProgramFilesListing.txt'
echo 3. Export Directory Listing of '%app_template_dir%' to 'Listing.txt'
echo 4. Open Elevated Command Prompt at Current Location
echo 5. Back to Main Menu
echo.
set "diag_opt="
set /p diag_opt="Select an option (1-5): "
if "%diag_opt%"=="1" goto diag_env
if "%diag_opt%"=="2" goto diag_programs
if "%diag_opt%"=="3" goto diag_listing
if "%diag_opt%"=="4" goto diag_elevated_cmd
if "%diag_opt%"=="5" goto main_menu
echo Invalid option.
pause
goto diagnostics

:diag_env
set > "%CD%\output.txt"
echo Environment variables saved to "%CD%\output.txt"!
pause
goto diagnostics

:diag_programs
powershell -NoProfile -Command "$paths = @('HKLM:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*','HKLM:\Software\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\*','HKCU:\Software\Microsoft\Windows\CurrentVersion\Uninstall\*'); Get-ItemProperty $paths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName, DisplayVersion, Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File -FilePath '%CD%\AllProgramFilesListing.txt' -Encoding utf8"
echo Full 64-bit/32-bit/User installed software list saved to "%CD%\AllProgramFilesListing.txt"!
pause
goto diagnostics

:diag_listing
if exist "%CD%\%app_template_dir%" (
    dir "%CD%\%app_template_dir%" /O /S /W > "%CD%\Listing.txt" 2>nul
    echo Directory structure of '%app_template_dir%' folder exported to "%CD%\Listing.txt"!
) else (
    echo '%app_template_dir%' folder does not exist! Please create it via the Web Templates menu.
)
pause
goto diagnostics

:diag_elevated_cmd
set "OLDDIR=%CD%"
where wt.exe >nul 2>&1 && (
    powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList '-d', '\"%OLDDIR%\"' -Verb RunAs"
) || (
    powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/K cd /d \"%OLDDIR%\"' -Verb RunAs"
)
goto diagnostics

:exit_program
echo Goodbye!
powershell -Command "Start-Sleep -Seconds 1" 2>nul
exit /b
