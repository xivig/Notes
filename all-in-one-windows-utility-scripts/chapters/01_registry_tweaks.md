# Chapter 1: Windows 11 Registry Operations & Policies

This chapter explains how to construct registry files (`.reg`) and execute system modifications on Windows 11.

---

## 1. Registry File Basics
A `.reg` file is a plain text file containing instructions to add, modify, or remove keys and values.

```ini
Windows Registry Editor Version 5.00

[HKEY_LOCAL_MACHINE\SOFTWARE\MyCustomKey]
"MyStringValue"="Hello World"
"MyDwordValue"=dword:00000001
```

---

## 2. Speeding Up Shutdown
Windows 11 defaults to a 20-second wait time before terminating non-responsive services on shutdown. Setting `WaitToKillServiceTimeout` to `2000` (REG_SZ string) reduces this to 2 seconds.

### Registry Script (`speed_up_shutdown.reg`)
```ini
Windows Registry Editor Version 5.00

; Speed up service shutdown timeout in Windows 11 (2 seconds)
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control]
"WaitToKillServiceTimeout"="2000"
```

---

## 3. Disabling AutoPlay / AutoRun
Disable AutoPlay on all drives to block USB-delivered malware vectors (such as `autorun.inf`).

### Registry Script (`autoplay_disable.reg`)
```ini
Windows Registry Editor Version 5.00

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer]
"NoDriveTypeAutoRun"=dword:000000ff

[HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Explorer\AutoplayHandlers]
"DisableAutoplay"=dword:00000001
```

---

## 4. Custom Pre-Login Notice Banner
Enterprise systems display a policy warning notice before the sign-in prompt. This is configured under Policies System keys.

### Registry Script (`custom_logon_message.reg`)
```ini
Windows Registry Editor Version 5.00

; Setup Windows 11 Custom Pre-Login Security Notice Banner
[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System]
"legalnoticecaption"="Security Policy Notice"
"legalnoticetext"="WARNING: Authorized access only. All actions on this system are logged and monitored."
```
