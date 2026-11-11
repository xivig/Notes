# Chapter 4: Special Windows 11 Utilities & Lists

This chapter details various utility scripts, registry strings, Run lists, and keyboard shortcut configurations for Windows 11.

---

## 1. Enabling Hidden Built-in Administrator Account
Windows 11 contains a built-in UAC-exempt Administrator account. Toggle it active on the command prompt running with administrative rights.

### Batch Script (`enable_admin.bat`)
```cmd
@echo off
net user Administrator /active:yes
```

---

## 2. Directory File Lister
Creates a recursive file path map of the local folder and outputs it to `file_list.txt`.

### Batch Script (`file_lister.bat`)
```cmd
@echo off
chcp 65001 >nul
dir /b /s "%~dp0" > "%~dp0file_list.txt"
```

---

## 3. Disabling Adobe Reader / Acrobat Auto-Update
Disables background Adobe Acrobat DC and Acrobat Reader DC update checks via `FeatureLockDown` policies.

### Registry Script (`disable_adobe_updater.reg`)
```ini
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Adobe\Adobe Acrobat\DC\FeatureLockDown]
"bUpdater"=dword:00000000

[HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Adobe\Acrobat Reader\DC\FeatureLockDown]
"bUpdater"=dword:00000000
```

---

## 4. Spoofing Processor Descriptions
Changes the Processor Name string returned to System Properties.

### Registry Script (`spoof_cpu.reg`)
```ini
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\HARDWARE\DESCRIPTION\System\CentralProcessor\0]
"ProcessorNameString"="Intel Core i9-14900KS @ 6.20GHz"
```

---

## 5. Password Revealer Bookmarklet
A JavaScript line that reveals password fields on any page.

### Bookmarklet Code (`password_revealer.js`)
```javascript
javascript:(function(){var el=document.getElementsByTagName('input');for(var i=0;i<el.length;i++){if(el[i].type=='password'){el[i].type='text';}}})();
```

---

## 6. Core Diagnostic Run Commands
Run these commands in the Win+R Run Dialog:

| Command | Tool |
|---|---|
| `regedit` | Registry Editor |
| `gpedit.msc` | Local Group Policy Editor |
| `services.msc` | Windows Services List |
| `msconfig` | System Configuration |
| `cmd` | Command Prompt |
| `taskmgr` | Task Manager |

---

## 7. Windows 11 Keyboard Shortcuts
| Shortcut | Action |
|---|---|
| `Win + D` | Toggle Show Desktop |
| `Win + R` | Open Run Dialog |
| `Win + E` | Open File Explorer |
| `Win + L` | Lock Session |
| `Ctrl + Shift + Esc` | Open Task Manager |
