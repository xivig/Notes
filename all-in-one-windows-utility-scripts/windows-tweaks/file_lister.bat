@echo off
chcp 65001 >nul
setlocal
title Directory File Lister (Windows 11 UTF-8)
:: Recursively indexes all files and folders under the script directory in UTF-8 encoding.

echo Generating recursive UTF-8 directory map...
set "outfile=%~dp0file_list.txt"
dir /b /s "%~dp0" > "%outfile%" || (
    echo [ERROR] Failed to generate directory listing.
    pause
    exit /b 1
)

for /f %%C in ('find /c /v "" ^< "%outfile%"') do set "linecount=%%C"
echo [OK] Indexed %linecount% paths into "%outfile%"!
pause
exit /b 0
