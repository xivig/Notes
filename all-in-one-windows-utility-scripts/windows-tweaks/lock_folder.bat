@echo off
chcp 65001 >nul
setlocal
title Lock Folder (Windows 11)
:: Renames "Private" in the script directory using Control Panel CLSID suffix + sets +h +s attributes.

set "target=%~dp0Private"
set "locked=%~dp0Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}"

if exist "%locked%\" (
    echo [INFO] Folder is already locked: "%locked%"
    pause
    exit /b 0
)

if not exist "%target%\" (
    echo Creating "Private" folder in "%~dp0"...
    mkdir "%target%" || (
        echo [ERROR] Failed to create "%target%".
        pause
        exit /b 1
    )
)

ren "%target%" "Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}" || (
    echo [ERROR] Could not rename "%target%". Close any open handles and retry.
    pause
    exit /b 1
)
attrib +h +s "%locked%"
echo [OK] Folder locked successfully!
pause
exit /b 0
