# Windows 11 Registry & Batch Tweaks (`windows-tweaks`)

A clean, modern Windows 11 collection of **13 standalone Registry (`.reg`) files**, **7 Batch (`.bat`) scripts**, a unified interactive CLI dashboard ([`master_tweak_tool.bat`](./master_tweak_tool.bat)), and a searchable HTML Tweak Portal ([`index.html`](./index.html)).

> **Navigation:** [Repository Home](../README.md) · [Interactive Main Portal](../index.html) · [Launch Tweak Portal UI](./index.html) · [Read Comprehensive Tweak Guide](../comprehensive-tweak-guide/README.md)

> **Administrator Warning:** Modifying `HKEY_LOCAL_MACHINE` keys (`USBSTOR`, `StorageDevicePolicies`, `Winlogon`, `FeatureLockDown`, `CentralProcessor`) or activating built-in system accounts requires elevated privileges. Right-click `.bat` files and choose **Run as Administrator**, or review `.reg` contents in [`index.html`](./index.html) before importing.

---

## Quick Launch

* **Interactive Web Tweak Portal:** Open [`index.html`](./index.html) to search, filter, preview live synced code, and open any script.
* **Unified CLI Menu:** Run [`master_tweak_tool.bat`](./master_tweak_tool.bat) as Administrator to apply or revert all 19 individual tweaks with synchronous `reg.exe import` status checks.

---

## Complete Index & Modern OS Changes (20 Scripts)

### Registry Tweaks (13 `.reg` Files)

| # | File | Target Hive / Key | What It Does & Windows 11 Update |
| :--- | :--- | :--- | :--- |
| 01 | [`usb_write_protect_enable.reg`](./usb_write_protect_enable.reg) | `HKLM\...\StorageDevicePolicies` | Sets `WriteProtect=1` to force removable USB drives into read-only mode (notes USB re-plug requirement). |
| 02 | [`usb_write_protect_disable.reg`](./usb_write_protect_disable.reg) | `HKLM\...\StorageDevicePolicies` | Sets `WriteProtect=0` to restore normal USB read/write access. |
| 03 | [`usb_storage_disable.reg`](./usb_storage_disable.reg) | `HKLM\...\Services\USBSTOR` | Sets `Start=4` to prevent the Windows USB Mass Storage driver from starting. |
| 04 | [`usb_storage_enable.reg`](./usb_storage_enable.reg) | `HKLM\...\Services\USBSTOR` | Sets `Start=3` to restore standard USB Mass Storage detection. |
| 05 | [`speed_up_shutdown.reg`](./speed_up_shutdown.reg) | `HKLM\...\Control` | Sets `WaitToKillServiceTimeout="2000"` (2s instead of default 5s) for faster clean service shutdowns. |
| 06 | [`custom_logon_message.reg`](./custom_logon_message.reg) | `HKLM\...\Winlogon` | Configures `legalnoticecaption` and `legalnoticetext` for a pre-login security policy notice banner. |
| 07 | [`remove_logon_message.reg`](./remove_logon_message.reg) | `HKLM\...\Winlogon` | Clears both pre-login notice banner strings back to normal sign-in flow. |
| 08 | [`disable_run_box.reg`](./disable_run_box.reg) | `HKCU\...\Policies\Explorer` | Sets `NoRun=1` to lock the `Win+R` Run command dialog and Start menu Run entry. |
| 09 | [`enable_run_box.reg`](./enable_run_box.reg) | `HKCU\...\Policies\Explorer` | Sets `NoRun=0` to re-enable the `Win+R` Run dialog. |
| 10 | [`autoplay_disable.reg`](./autoplay_disable.reg) | `HKCU\...\Policies\Explorer` + `AutoplayHandlers` | **Updated for Win11:** Sets both `NoDriveTypeAutoRun=0xff` AND `AutoplayHandlers\DisableAutoplay=1` so Windows Settings AutoPlay reflects the policy lock. |
| 11 | [`autoplay_enable.reg`](./autoplay_enable.reg) | `HKCU\...\Policies\Explorer` + `AutoplayHandlers` | **Updated for Win11:** Restores `NoDriveTypeAutoRun=0x91` AND `AutoplayHandlers\DisableAutoplay=0`. |
| 12 | [`disable_adobe_updater.reg`](./disable_adobe_updater.reg) | `HKLM\...\Policies\Adobe\...` | **Updated for Win11:** Sets `bUpdater=0` under both modern 64-bit unified `Adobe Acrobat\DC\FeatureLockDown` and `Acrobat Reader\DC\FeatureLockDown`. |
| 13 | [`spoof_cpu.reg`](./spoof_cpu.reg) | `HKLM\HARDWARE\...\CentralProcessor\0` | Sets a session-only custom `ProcessorNameString` (documents volatile kernel hive behavior resetting on reboot). |

### Batch Scripts (7 `.bat` Files)

| # | File | What It Does & Modern OS Update |
| :--- | :--- | :--- |
| 14 | [`lock_folder.bat`](./lock_folder.bat) | Renames a local `Private` folder with the Control Panel CLSID suffix + sets `+h +s` attributes; **updated** with `chcp 65001` UTF-8, already-locked guard, and error checking. |
| 15 | [`unlock_folder.bat`](./unlock_folder.bat) | Removes `+h +s` attributes and restores `Private`; **updated** with missing/collision checks and exit codes so failures never print false success. |
| 16 | [`create_shutdown_shortcut.bat`](./create_shutdown_shortcut.bat) | Creates `Shutdown.lnk` & `Restart.lnk` on Desktop; **updated** to use `$s.SpecialFolders('Desktop')` (OneDrive Known Folder Move safe) and `ExecutionPolicy Bypass`. |
| 17 | [`show_desktop_icon.bat`](./show_desktop_icon.bat) | Creates a `Show Desktop.lnk` Explorer shell toggle shortcut; **updated** to use `$s.SpecialFolders('Desktop')`, `chcp 65001`, and error verification. |
| 18 | [`enable_admin.bat`](./enable_admin.bat) | Enables or disables the built-in Windows Administrator account (`net user Administrator /active:yes|no`); **updated** with UAC admin check, `YES` security confirmation, and optional password prompt (`net user Administrator *`). |
| 19 | [`file_lister.bat`](./file_lister.bat) | Recursively writes all directory paths to `file_list.txt`; **updated** with `chcp 65001` UTF-8 encoding and indexed path count summary. |
| 20 | [`master_tweak_tool.bat`](./master_tweak_tool.bat) | Unified menu launching all 19 tweaks; **updated** with PowerShell UAC self-elevation prompt (no VBScript), `chcp 65001` UTF-8, and synchronous `reg.exe import` exit-code reporting. |
