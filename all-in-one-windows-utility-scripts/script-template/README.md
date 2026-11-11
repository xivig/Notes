# Windows Utility Master Script Templates (`script-template`)

Cross-language Windows 11 administrative starter templates implementing the exact same self-contained terminal workflow in **Batch (`.bat`)**, **PowerShell (`.ps1`)**, **Python (`.py`)**, and **Node.js (`.js`)**. All 4 scripts target **Windows 11 (24H2+/26H1)** standards cleanly with **zero external `.inf`/`.reg` dependencies**.

> **Navigation:** [Repository Home](../README.md) · [Interactive Main Portal](../index.html) · [Windows Tweaks](../windows-tweaks/README.md) · [Tweak Guide](../comprehensive-tweak-guide/README.md)

---

## Script Catalog & What Each File Does

| Script | Runtime / Engine | Launch Command | What It Does & Modern OS Updates |
| :--- | :--- | :--- | :--- |
| [`master_script.bat`](./master_script.bat) | Windows 11 CMD Batch (`chcp 65001`) | `.\script-template\master_script.bat` | Self-elevates via modern PowerShell `Start-Process -Verb RunAs` (no VBScript), shows CIM OS build/uptime, resets TCP/IP & DNS stack, prompts cleanly for UNC shares & gateway portals, cleans `%TEMP%`/`Windows\Temp`, queries CIM activation state, installs/removes self-contained `Open Admin Terminal Here` & `Take Ownership` registry context menus, and guards restart with confirmation + `shutdown /a` abort. |
| [`master_script.ps1`](./master_script.ps1) | PowerShell 5.1 / 7+ | `powershell -NoProfile -ExecutionPolicy Bypass -File .\script-template\master_script.ps1` | Engine-aware auto-elevation via `(Get-Process -Id $PID).Path` (keeps `pwsh` 7 if launched in PS 7), uses `Get-CimInstance` (`Win32_OperatingSystem`, `SoftwareLicensingProduct`), `Clear-DnsClientCache`, `Get-NetRoute` gateway lookup, `Checkpoint-Computer` via `powershell.exe 5.1`, self-contained `reg.exe` context menu registration, and Windows Terminal/`ms-settings:` quick launcher. |
| [`master_script.py`](./master_script.py) | Python 3.10+ (`ctypes`, `subprocess`) | `python .\script-template\master_script.py` | Safe quoted UAC relaunch via `ctypes.windll.shell32.ShellExecuteW`, non-shell argument-list `subprocess` execution (prevents shell injection on host inputs), CIM OS & activation queries, `%TEMP%`/`SystemRoot\Temp` cleanup, self-contained context menu installers, and confirmation-guarded reboot controls. |
| [`master_script.js`](./master_script.js) | Node.js 18+ (`child_process`, `readline`) | `node .\script-template\master_script.js` | Async CLI template using `execFile` (avoids unquoted shell interpolation), PowerShell `RunAs` elevation when `net session` fails, dynamic `wt.exe` detection, `Get-NetRoute` gateway diagnostics, modern CIM activation readout, self-contained `reg.exe` context menus, and confirmation-guarded reboot/abort actions. |

---

## Shared Menu Breakdown (`1A`–`5A`)

1. **`[1]` System & Info Tools**
   * `1A` — OS caption, version, build, last boot time, and local clock (`Get-CimInstance Win32_OperatingSystem` / `os` / `platform`).
   * `1B` — Formatted System `PATH` entries and sorted environment variables.
   * `1C` — Create System Restore Point (`Checkpoint-Computer` invoked explicitly on Windows PowerShell 5.1 so it succeeds even when called from `pwsh` 7).
2. **`[2]` Network Diagnostics & Utilities**
   * `2A` — Release/renew DHCP lease, flush DNS cache (`ipconfig /flushdns` / `Clear-DnsClientCache`), register DNS, reset Winsock & IP stack.
   * `2B` — Latency ping check against `127.0.0.1`, `1.1.1.1`, and optional custom host (`-n 4`).
   * `2C` — Interactive prompt to mount any UNC network share (`net use * "\\SERVER\Share" /persistent:yes`, zero hardcoded hostnames).
   * `2D` — Confirmation-guarded unmount of mapped drives (`net use * /delete /y`).
   * `2E` — Auto-detects active IPv4 Default Gateway via `Get-NetRoute`, pings it, and optionally opens a user-entered router or captive-portal URL.
3. **`[3]` System Maintenance & Services**
   * `3A` — Stop `spooler`, clear stuck print queue files under `%SystemRoot%\System32\spool\PRINTERS`, and restart `spooler`.
   * `3B` / `3C` — Enable/start or stop/disable the Windows Update service (`wuauserv`).
   * `3D` — Modern cache cleanup on User `%TEMP%` and System `%SystemRoot%\Temp` (removed retired IE `Cookies`/`INetCookies` paths).
   * `3E` — Clean console Windows Activation readout via `Get-CimInstance SoftwareLicensingProduct` (avoids `slmgr.vbs` GUI popups).
   * `3F` / `3G` — Self-contained **Open Admin Terminal Here** (`wt.exe` or `cmd.exe`) folder & background context menu installer/uninstaller (removed missing external `.inf` dependency).
   * `3H` / `3I` — Self-contained **Take Ownership (Admin)** context menu installer/uninstaller via `reg.exe` + `takeown` / `icacls` (removed missing external `Win7 TakeOwnership` dependency).
4. **`[4]` Application Launcher**
   * `4A` — Launches Notepad, Windows Terminal (`wt.exe` fallback `cmd.exe`), Windows Settings (`ms-settings:`), `%TEMP%`, or default HTTPS browser (`https://www.google.com`).
5. **`[5]` System Power**
   * `5R` — Schedules a 30-second reboot **only after explicit `YES` confirmation**.
   * `5A` — Sends `shutdown /a` to abort a pending scheduled restart.
   * `E` — Exits cleanly.
