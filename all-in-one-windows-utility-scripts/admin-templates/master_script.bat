@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion
title Modern Windows 11 Utility Master Script (Batch)

:: 1. UAC Administrative Privilege Check (PowerShell RunAs — no VBScript)
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ============================================================
    echo          ADMINISTRATIVE PRIVILEGES REQUIRED
    echo ============================================================
    echo Requesting elevation to run administrative tasks...
    powershell -NoProfile -Command "Start-Process '%~f0' -Verb RunAs"
    exit /b 0
)

:menu
cls
color 0B
echo ====================================================================
echo            MODERN WINDOWS 11 UTILITY MASTER SCRIPT (CMD)
echo ====================================================================
echo  [1] SYSTEM ^& INFO TOOLS
echo      1A. OS Version, Uptime ^& Date/Time
echo      1B. View System PATH ^& Environment Variables
echo      1C. Create System Restore Point
echo.
echo  [2] NETWORK DIAGNOSTICS ^& UTILITIES
echo      2A. Reset Network Stack (IP, DNS Cache, Winsock)
echo      2B. Ping Diagnostic Test (Loopback, 1.1.1.1, Custom Host)
echo      2C. Mount Network Share (UNC Path Prompt)
echo      2D. Unmount All Mapped Network Drives (with Confirmation)
echo      2E. Default Gateway ^& Portal Diagnostics
echo.
echo  [3] SYSTEM MAINTENANCE ^& SERVICES
echo      3A. Clear ^& Restart Print Spooler
echo      3B. Enable ^& Start Windows Update Service (wuauserv)
echo      3C. Stop ^& Disable Windows Update Service (wuauserv)
echo      3D. Clean Modern User ^& System Temp Caches
echo      3E. Check Windows Activation Status (CIM / License State)
echo      3F. Install 'Open Admin Terminal Here' Context Menu
echo      3G. Uninstall 'Open Admin Terminal Here' Context Menu
echo      3H. Install 'Take Ownership' Context Menu
echo      3I. Uninstall 'Take Ownership' Context Menu
echo.
echo  [4] APPLICATION LAUNCHER
echo      4A. Quick Launch Utilities ^& Windows Settings Menu
echo.
echo  [5] SYSTEM POWER
echo      5R. Schedule System Restart (30s with Confirmation)
echo      5A. Abort Scheduled System Restart (shutdown /a)
echo      E.  Exit
echo ====================================================================
set "opt="
set /p opt="Select an option (e.g. 1A, 2B, 3E, 4A, 5R, 5A, E): "

if /i "%opt%"=="1A" goto sys_info
if /i "%opt%"=="1B" goto sys_env
if /i "%opt%"=="1C" goto sys_restore
if /i "%opt%"=="2A" goto net_reset
if /i "%opt%"=="2B" goto net_ping
if /i "%opt%"=="2C" goto net_mount
if /i "%opt%"=="2D" goto net_unmount
if /i "%opt%"=="2E" goto net_gateway
if /i "%opt%"=="3A" goto spooler_reset
if /i "%opt%"=="3B" goto updates_start
if /i "%opt%"=="3C" goto updates_stop
if /i "%opt%"=="3D" goto clean_temp
if /i "%opt%"=="3E" goto activation_status
if /i "%opt%"=="3F" goto install_term_here
if /i "%opt%"=="3G" goto uninstall_term_here
if /i "%opt%"=="3H" goto install_take_ownership
if /i "%opt%"=="3I" goto uninstall_take_ownership
if /i "%opt%"=="4A" goto app_launcher
if /i "%opt%"=="5R" goto sys_restart
if /i "%opt%"=="R"  goto sys_restart
if /i "%opt%"=="5A" goto sys_abort
if /i "%opt%"=="E"  goto end

echo Invalid selection. Please try again.
timeout /t 2 >nul
goto menu

:: ==========================================
:: 1. SYSTEM & INFO TOOLS
:: ==========================================
:sys_info
cls
echo === OS VERSION, UPTIME ^& LOCAL TIME ===
powershell -NoProfile -Command "$os = Get-CimInstance Win32_OperatingSystem; [pscustomobject]@{ Computer=$env:COMPUTERNAME; OS=$os.Caption; Version=$os.Version; Build=$os.BuildNumber; LastBoot=$os.LastBootUpTime; Now=(Get-Date -Format 'yyyy-MM-dd HH:mm:ss zzz') } | Format-List"
pause
goto menu

:sys_env
cls
echo === SYSTEM PATH ===
for %%P in ("%PATH:;=" "%") do echo   %%~P
echo.
echo === ENVIRONMENT VARIABLES ===
set
echo.
pause
goto menu

:sys_restore
cls
echo Creating System Restore Point via Windows PowerShell...
powershell.exe -NoProfile -Command "try { Checkpoint-Computer -Description 'Windows Utility Restore Point' -RestorePointType MODIFY_SETTINGS -ErrorAction Stop; Write-Host '[OK] Restore point created successfully.' -ForegroundColor Green } catch { Write-Host '[WARNING] Restore point failed:' $_.Exception.Message -ForegroundColor Yellow }"
pause
goto menu

:: ==========================================
:: 2. NETWORK DIAGNOSTICS & UTILITIES
:: ==========================================
:net_reset
cls
echo Performing modern Windows network reset...
ipconfig /release >nul 2>&1
ipconfig /renew >nul 2>&1
ipconfig /flushdns
ipconfig /registerdns >nul 2>&1
netsh winsock reset
netsh int ip reset
echo.
echo [OK] Network stack reset completed. A reboot may be needed for Winsock changes.
pause
goto menu

:net_ping
cls
echo Running Latency Tests...
ping 127.0.0.1 -n 3
echo.
ping 1.1.1.1 -n 3
echo.
set "custom_host="
set /p custom_host="Enter hostname/IP for 4-packet test (Enter to skip): "
if not "%custom_host%"=="" ping "%custom_host%" -n 4
pause
goto menu

:net_mount
cls
set "drive_path="
set /p drive_path="Enter UNC share path (e.g. \\SERVER\ShareName): "
if "%drive_path%"=="" (
    echo [INFO] No share path entered. Canceled.
    pause
    goto menu
)
net use * "%drive_path%" /persistent:yes
pause
goto menu

:net_unmount
cls
set "confirm="
set /p confirm="Disconnect ALL mapped network drives? [Y/N]: "
if /i "%confirm%"=="Y" (
    net use * /delete /y
) else (
    echo Operation canceled.
)
pause
goto menu

:net_gateway
cls
echo Detecting active Default Gateway...
powershell -NoProfile -Command "$gw = (Get-NetRoute -DestinationPrefix '0.0.0.0/0' -ErrorAction SilentlyContinue | Sort-Object RouteMetric | Select-Object -First 1 -ExpandProperty NextHop); if ($gw) { Write-Host 'Default Gateway:' $gw -ForegroundColor Cyan; Test-Connection -ComputerName $gw -Count 2 -ErrorAction SilentlyContinue } else { Write-Host '[INFO] No active IPv4 default gateway found.' -ForegroundColor Yellow }"
set "portal_url="
set /p portal_url="Enter router/captive-portal URL to open (or Enter to skip): "
if not "%portal_url%"=="" start "" "%portal_url%"
pause
goto menu

:: ==========================================
:: 3. SYSTEM MAINTENANCE & SERVICES
:: ==========================================
:spooler_reset
cls
echo Stopping Print Spooler...
net stop spooler
echo Clearing spool queue...
del /q /f /s "%SystemRoot%\System32\spool\PRINTERS\*.*" 2>nul
echo Starting Print Spooler...
net start spooler
echo [OK] Print Spooler cleared and restarted.
pause
goto menu

:updates_start
cls
sc config wuauserv start= auto >nul
net start wuauserv
pause
goto menu

:updates_stop
cls
net stop wuauserv
sc config wuauserv start= disabled >nul
pause
goto menu

:clean_temp
cls
echo Cleaning modern temporary folders (Windows 11)...
echo [1/2] Cleaning User Temp: %TEMP%
del /s /f /q "%TEMP%\*.*" 2>nul
for /d %%x in ("%TEMP%\*") do rmdir /s /q "%%x" 2>nul
echo [2/2] Cleaning System Temp: %SystemRoot%\Temp
del /s /f /q "%SystemRoot%\Temp\*.*" 2>nul
for /d %%x in ("%SystemRoot%\Temp\*") do rmdir /s /q "%%x" 2>nul
echo [OK] Temp cleanup finished (in-use system files skipped safely).
pause
goto menu

:activation_status
cls
echo Checking Windows Activation Status via CIM...
powershell -NoProfile -Command "$lic = Get-CimInstance SoftwareLicensingProduct -Filter \"ApplicationID='55c92734-d682-4d71-983e-d6ec3f16059f' and PartialProductKey IS NOT NULL\"; if ($lic) { $map = @{0='Unlicensed';1='Licensed';2='OOB Grace';3='OOT Grace';4='Non-Genuine';5='Notification';6='Extended Grace'}; $lic | ForEach-Object { [pscustomobject]@{ Name=$_.Name; Channel=$_.Description; PartialKey=$_.PartialProductKey; Status=$map[[int]$_.LicenseStatus] } } | Format-List } else { cscript //nologo \"$env:windir\system32\slmgr.vbs\" /xpr }"
pause
goto menu

:install_term_here
cls
echo Installing 'Open Admin Terminal Here' context menu (Windows 11)...
where wt.exe >nul 2>&1
if %errorlevel%==0 (
    set "TERM_CMD=powershell -NoProfile -Command \"Start-Process wt.exe -ArgumentList '-d', '""%%V""' -Verb RunAs\""
) else (
    set "TERM_CMD=powershell -NoProfile -Command \"Start-Process cmd.exe -ArgumentList '/s /k pushd', '""%%V""' -Verb RunAs\""
)
reg.exe add "HKCR\Directory\shell\OpenAdminTerminal" /ve /d "Open Admin Terminal Here" /f >nul
reg.exe add "HKCR\Directory\shell\OpenAdminTerminal" /v "Icon" /d "cmd.exe" /f >nul
reg.exe add "HKCR\Directory\shell\OpenAdminTerminal\command" /ve /d "%TERM_CMD%" /f >nul
reg.exe add "HKCR\Directory\Background\shell\OpenAdminTerminal" /ve /d "Open Admin Terminal Here" /f >nul
reg.exe add "HKCR\Directory\Background\shell\OpenAdminTerminal" /v "Icon" /d "cmd.exe" /f >nul
reg.exe add "HKCR\Directory\Background\shell\OpenAdminTerminal\command" /ve /d "%TERM_CMD%" /f >nul
echo [OK] Context menu installed cleanly (self-contained registry keys).
pause
goto menu

:uninstall_term_here
cls
reg.exe delete "HKCR\Directory\shell\OpenAdminTerminal" /f >nul 2>&1
reg.exe delete "HKCR\Directory\Background\shell\OpenAdminTerminal" /f >nul 2>&1
echo [OK] Context menu removed.
pause
goto menu

:install_take_ownership
cls
echo Installing 'Take Ownership' context menu for files and folders...
set "TO_FILE=powershell -NoProfile -Command \"Start-Process cmd.exe -ArgumentList '/c takeown /f \"%%1\" ^&^& icacls \"%%1\" /grant Administrators:F /c' -Verb RunAs -WindowStyle Hidden\""
set "TO_DIR=powershell -NoProfile -Command \"Start-Process cmd.exe -ArgumentList '/c takeown /f \"%%1\" /r /d y ^&^& icacls \"%%1\" /grant Administrators:F /t /c' -Verb RunAs -WindowStyle Hidden\""
reg.exe add "HKCR\*\shell\TakeOwnership" /ve /d "Take Ownership (Admin)" /f >nul
reg.exe add "HKCR\*\shell\TakeOwnership" /v "NoWorkingDirectory" /d "" /f >nul
reg.exe add "HKCR\*\shell\TakeOwnership\command" /ve /d "%TO_FILE%" /f >nul
reg.exe add "HKCR\Directory\shell\TakeOwnership" /ve /d "Take Ownership (Admin)" /f >nul
reg.exe add "HKCR\Directory\shell\TakeOwnership" /v "NoWorkingDirectory" /d "" /f >nul
reg.exe add "HKCR\Directory\shell\TakeOwnership\command" /ve /d "%TO_DIR%" /f >nul
echo [OK] 'Take Ownership' context menu installed.
pause
goto menu

:uninstall_take_ownership
cls
reg.exe delete "HKCR\*\shell\TakeOwnership" /f >nul 2>&1
reg.exe delete "HKCR\Directory\shell\TakeOwnership" /f >nul 2>&1
echo [OK] 'Take Ownership' context menu removed.
pause
goto menu

:: ==========================================
:: 4. APPLICATION LAUNCHER
:: ==========================================
:app_launcher
cls
echo ==========================================
echo         MODERN APPLICATION LAUNCHER
echo ==========================================
echo  [1] Notepad
echo  [2] Windows Terminal / Command Prompt
echo  [3] Windows Settings (ms-settings:)
echo  [4] Temp Directory
echo  [5] Default Browser (HTTPS)
echo  [6] Back to Main Menu
echo ==========================================
set "app_opt="
set /p app_opt="Select an app (1-6): "
if "%app_opt%"=="1" start "" notepad.exe
if "%app_opt%"=="2" (where wt.exe >nul 2>&1 && start "" wt.exe || start "" cmd.exe)
if "%app_opt%"=="3" start "" ms-settings:
if "%app_opt%"=="4" start "" "%TEMP%"
if "%app_opt%"=="5" start "" "https://www.google.com"
if "%app_opt%"=="6" goto menu
goto app_launcher

:: ==========================================
:: 5. SYSTEM POWER
:: ==========================================
:sys_restart
cls
echo ============================================================
echo WARNING: Confirm full system restart in 30 seconds.
echo ============================================================
set "r_conf="
set /p r_conf="Type YES to schedule restart (or anything else to cancel): "
if /i not "%r_conf%"=="YES" (
    echo Restart canceled.
    pause
    goto menu
)
shutdown /r /t 30 /f /c "Windows Utility Master Script: Scheduled reboot."
echo [INFO] Scheduled in 30s. Run option 5A or 'shutdown /a' to abort.
pause
goto menu

:sys_abort
cls
shutdown /a
pause
goto menu

:end
cls
echo Goodbye!
exit /b 0
