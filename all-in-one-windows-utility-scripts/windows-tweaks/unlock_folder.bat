@echo off
chcp 65001 >nul
setlocal
title Unlock Folder (Windows 11)
:: Removes hidden/system attributes and restores the CLSID-locked "Private" folder to normal visibility.

set "locked=%~dp0Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
set "target=%~dp0Private"

if not exist "%locked%\" (
    echo [INFO] Locked folder not found in "%~dp0". Nothing to unlock.
    pause
    exit /b 0
)

if exist "%target%\" (
    echo [ERROR] A normal "Private" folder already exists in "%~dp0". Move or rename it first.
    pause
    exit /b 1
)

attrib -h -s "%locked%"
ren "%locked%" "Private" || (
    echo [ERROR] Could not unlock "%locked%". Close any open handles and retry.
    pause
    exit /b 1
)
echo [OK] Folder unlocked successfully!
pause
exit /b 0
