@echo off
chcp 65001 >nul
title Create Desktop Power Shortcuts (Windows 11)
:: Uses WScript.Shell SpecialFolders('Desktop') so OneDrive Known Folder Move desktops resolve reliably.

echo Creating Shutdown and Restart Desktop Shortcuts...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$s = New-Object -ComObject WScript.Shell; " ^
    "$d = $s.SpecialFolders('Desktop'); " ^
    "$lnk1 = $s.CreateShortcut((Join-Path $d 'Shutdown.lnk')); " ^
    "$lnk1.TargetPath = 'shutdown.exe'; " ^
    "$lnk1.Arguments = '/s /t 0'; " ^
    "$lnk1.IconLocation = 'shell32.dll,27'; " ^
    "$lnk1.Save(); " ^
    "$lnk2 = $s.CreateShortcut((Join-Path $d 'Restart.lnk')); " ^
    "$lnk2.TargetPath = 'shutdown.exe'; " ^
    "$lnk2.Arguments = '/r /t 0'; " ^
    "$lnk2.IconLocation = 'shell32.dll,238'; " ^
    "$lnk2.Save();"

if %errorlevel% neq 0 (
    echo [ERROR] Failed to create Desktop power shortcuts.
    pause
    exit /b 1
)

echo [OK] Shutdown.lnk and Restart.lnk created on your Desktop!
pause
exit /b 0
