@echo off
chcp 65001 >nul
setlocal
title Built-in Administrator Account Utility (Windows 11)
:: Safely checks UAC elevation, confirms action, and enables or disables the built-in Administrator account.

net session >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Administrative privileges are required to modify local user accounts.
    echo Right-click this file and select "Run as administrator".
    pause
    exit /b 1
)

echo ====================================================================
echo   Windows 11 Built-in Administrator Account Manager
echo ====================================================================
echo  [1] Enable built-in Administrator account (/active:yes)
echo  [2] Disable built-in Administrator account (/active:no)
echo  [3] Cancel
echo.
set /p adm_choice="Select an option (1-3): "

if "%adm_choice%"=="2" (
    net user Administrator /active:no
    echo [OK] Built-in Administrator account disabled.
    pause
    exit /b 0
)

if not "%adm_choice%"=="1" (
    echo Operation canceled.
    pause
    exit /b 0
)

echo.
echo [SECURITY WARNING] Enabling the built-in Administrator account bypasses UAC prompts.
set /p confirm="Type YES to activate built-in Administrator: "
if /i not "%confirm%"=="YES" (
    echo Operation canceled.
    pause
    exit /b 0
)

net user Administrator /active:yes || (
    echo [ERROR] Failed to activate Administrator account.
    pause
    exit /b 1
)
echo [OK] Administrator account activated!
set /p setpw="Set a password for Administrator now? Recommended [Y/N]: "
if /i "%setpw%"=="Y" (
    net user Administrator *
)
pause
exit /b 0
