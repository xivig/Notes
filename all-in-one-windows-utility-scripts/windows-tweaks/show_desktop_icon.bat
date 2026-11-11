@echo off
chcp 65001 >nul
title Create Show Desktop Shortcut (Windows 11)
:: Creates a Desktop "Show Desktop.lnk" targeting Explorer's Toggle Desktop Shell CLSID.

echo Creating "Show Desktop" Shortcut on Desktop...
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$s = New-Object -ComObject WScript.Shell; " ^
    "$d = $s.SpecialFolders('Desktop'); " ^
    "$lnk = $s.CreateShortcut((Join-Path $d 'Show Desktop.lnk')); " ^
    "$lnk.TargetPath = 'explorer.exe'; " ^
    "$lnk.Arguments = 'shell:::{3080F90D-D7AD-11D9-BD98-0000947B0257}'; " ^
    "$lnk.IconLocation = 'shell32.dll,34'; " ^
    "$lnk.Save();"

if %errorlevel% neq 0 (
    echo [ERROR] Failed to create "Show Desktop.lnk".
    pause
    exit /b 1
)

echo [OK] "Show Desktop.lnk" created successfully on your Desktop!
pause
exit /b 0
