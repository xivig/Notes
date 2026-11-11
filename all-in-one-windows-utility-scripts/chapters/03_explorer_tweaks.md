# Chapter 3: Windows Explorer & Shell Customizations

This chapter details customizations to the Windows 11 desktop, Explorer settings, and shortcut shell targets.

---

## 1. Folder Locking via CLSID
Renaming a folder to append a CLSID (Control Panel UUID) hides its contents, transforming the folder icon into the Control Panel shortcut.

### Batch Script (`lock_folder.bat`)
```cmd
@echo off
ren "Private" "Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
attrib +h +s "Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
```
### Reversing Link (`unlock_folder.bat`)
```cmd
@echo off
attrib -h -s "Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}"
ren "Private.{21EC2020-3AEA-1069-A2DD-08002B30309D}" "Private"
```

---

## 2. Disabling the Run Dialog box
Hides and disables the Win+R Run Dialog box under Explorer policies.

### Registry Script (`disable_run_box.reg`)
```ini
Windows Registry Editor Version 5.00

; Disable Run command box (Win+R and Start menu Run Option) in Windows 11
[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer]
"NoRun"=dword:00000001
```

---

## 3. Power Desktop Shortcuts
Generate direct click buttons for power management using PowerShell shell scripting objects.

### Batch Script (`create_shutdown_shortcut.bat`)
```cmd
@echo off
chcp 65001 >nul
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$s = New-Object -ComObject WScript.Shell; " ^
    "$d = $s.SpecialFolders('Desktop'); " ^
    "$lnk = $s.CreateShortcut((Join-Path $d 'Shutdown.lnk')); " ^
    "$lnk.TargetPath = 'shutdown.exe'; " ^
    "$lnk.Arguments = '/s /t 0'; " ^
    "$lnk.IconLocation = 'shell32.dll,27'; " ^
    "$lnk.Save();"
```

---

## 4. Re-creating "Show Desktop" link
Quick Launch is obsolete on Windows 11, but you can create a shortcut pointing to the Explorer shell command for toggling the desktop: `shell:::{3080F90D-D7AD-11D9-BD98-0000947B0257}`.

### Batch Script (`show_desktop_icon.bat`)
```cmd
@echo off
chcp 65001 >nul
powershell -NoProfile -ExecutionPolicy Bypass -Command ^
    "$s = New-Object -ComObject WScript.Shell; " ^
    "$d = $s.SpecialFolders('Desktop'); " ^
    "$lnk = $s.CreateShortcut((Join-Path $d 'Show Desktop.lnk')); " ^
    "$lnk.TargetPath = 'explorer.exe'; " ^
    "$lnk.Arguments = 'shell:::{3080F90D-D7AD-11D9-BD98-0000947B0257}'; " ^
    "$lnk.IconLocation = 'shell32.dll,34'; " ^
    "$lnk.Save();"
```
