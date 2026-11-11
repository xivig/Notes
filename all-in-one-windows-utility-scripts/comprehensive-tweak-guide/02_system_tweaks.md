# Chapter 2: USB Port Protections & Storage Security

This chapter covers methods for locking down USB storage pathways to protect Windows 11 machines against physical threats.

---

## 1. USB Write Protection (Read-Only Mode)
Prevents write operations to all mounted USB drives. Users can copy files from the USB but cannot add new files, delete existing ones, or format the drive.

### Registry Script (`usb_write_protect_enable.reg`)
```ini
Windows Registry Editor Version 5.00

; Enable USB Write Protection (Makes USB storage devices read-only)
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\StorageDevicePolicies]
"WriteProtect"=dword:00000001
```

---

## 2. Disabling USB Mass Storage completely
Forces the Windows 11 USB storage driver (`USBSTOR`) to stay stopped (Start value = 4). When any USB storage drive is inserted, Windows will ignore it entirely.

### Registry Script (`usb_storage_disable.reg`)
```ini
Windows Registry Editor Version 5.00

; Disable USB Storage Drives completely in Windows 11
[HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\USBSTOR]
"Start"=dword:00000004
```
*Note: Restore default behavior by setting the value to `3`.*
```ini
"Start"=dword:00000003
```
