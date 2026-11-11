@echo off
chcp 65001 >nul
setlocal
title Windows 11 Registry & System Tweak Tool

:: Check for administrative rights; offer modern PowerShell UAC elevation without VBScript
net session >nul 2>&1
if %errorlevel% neq 0 (
    echo ==========================================================
    echo WARNING: HKLM registry and account tweaks require Admin rights.
    echo ==========================================================
    set "elev="
    set /p elev="Relaunch elevated as Administrator? [Y/N]: "
    if /i "%elev%"=="Y" (
        powershell -NoProfile -Command "Start-Process '%~f0' -Verb RunAs"
        exit /b 0
    )
    echo Continuing without elevation ^(HKLM tweaks will fail^)...
    pause
)

:menu
cls
echo =========================================================
echo       Windows 11 Registry and System Tweak Utility
echo =========================================================
echo.
echo [1]  Lock Folder (Rename "Private" to Control Panel CLSID)
echo [2]  Unlock Folder (Restore "Private" folder name)
echo [3]  Enable USB Write Protection (Read-Only USB drives)
echo [4]  Disable USB Write Protection (Restore write access)
echo [5]  Disable USB Storage Devices Entirely (Block access)
echo [6]  Enable USB Storage Devices
echo [7]  Speed Up Service Shutdown Timeout (2000ms)
echo [8]  Set Custom Pre-Login Security Notice Warning Message
echo [9]  Remove Pre-Login Security Notice Warning Message
echo [10] Disable Run Command Dialog (Win+R Policy)
echo [11] Enable Run Command Dialog (Win+R Policy)
echo [12] Disable AutoPlay on All Drives (Policies + Handlers)
echo [13] Enable Default AutoPlay Settings
echo [14] Create Desktop Shutdown ^& Restart Shortcuts
echo [15] Create "Show Desktop" Shortcut on Desktop
echo [16] Manage Built-in Administrator Account (Enable/Disable)
echo [17] Generate UTF-8 File Listing in Current Directory
echo [18] Disable Adobe Acrobat / Reader Auto-Update Manager
echo [19] Customize Processor Name String (Session-Only HKLM)
echo [20] Exit
echo.
echo =========================================================
set "choice="
set /p choice="Enter option number (1-20): "

if "%choice%"=="1" goto lock
if "%choice%"=="2" goto unlock
if "%choice%"=="3" goto usb_wp_en
if "%choice%"=="4" goto usb_wp_dis
if "%choice%"=="5" goto usb_stor_dis
if "%choice%"=="6" goto usb_stor_en
if "%choice%"=="7" goto speed_shutdown
if "%choice%"=="8" goto logon_msg
if "%choice%"=="9" goto logon_msg_rem
if "%choice%"=="10" goto run_dis
if "%choice%"=="11" goto run_en
if "%choice%"=="12" goto autoplay_dis
if "%choice%"=="13" goto autoplay_en
if "%choice%"=="14" goto shortcuts
if "%choice%"=="15" goto show_desktop
if "%choice%"=="16" goto enable_admin
if "%choice%"=="17" goto file_list
if "%choice%"=="18" goto adobe_dis
if "%choice%"=="19" goto spoof_cpu
if "%choice%"=="20" goto end
goto menu

:import_reg
echo Importing "%~1"...
reg.exe import "%~dp0%~1"
if %errorlevel% neq 0 (
    echo [ERROR] Registry import failed for "%~1" ^(run as Administrator for HKLM keys^).
) else (
    echo [OK] Imported "%~1" successfully!
)
pause
goto :eof

:lock
call "%~dp0lock_folder.bat"
goto menu

:unlock
call "%~dp0unlock_folder.bat"
goto menu

:usb_wp_en
call :import_reg "usb_write_protect_enable.reg"
goto menu

:usb_wp_dis
call :import_reg "usb_write_protect_disable.reg"
goto menu

:usb_stor_dis
call :import_reg "usb_storage_disable.reg"
goto menu

:usb_stor_en
call :import_reg "usb_storage_enable.reg"
goto menu

:speed_shutdown
call :import_reg "speed_up_shutdown.reg"
goto menu

:logon_msg
call :import_reg "custom_logon_message.reg"
goto menu

:logon_msg_rem
call :import_reg "remove_logon_message.reg"
goto menu

:run_dis
call :import_reg "disable_run_box.reg"
goto menu

:run_en
call :import_reg "enable_run_box.reg"
goto menu

:autoplay_dis
call :import_reg "autoplay_disable.reg"
goto menu

:autoplay_en
call :import_reg "autoplay_enable.reg"
goto menu

:shortcuts
call "%~dp0create_shutdown_shortcut.bat"
goto menu

:show_desktop
call "%~dp0show_desktop_icon.bat"
goto menu

:enable_admin
call "%~dp0enable_admin.bat"
goto menu

:file_list
call "%~dp0file_lister.bat"
goto menu

:adobe_dis
call :import_reg "disable_adobe_updater.reg"
goto menu

:spoof_cpu
call :import_reg "spoof_cpu.reg"
goto menu

:end
echo Exiting Windows 11 Tweak Tool.
exit /b 0
