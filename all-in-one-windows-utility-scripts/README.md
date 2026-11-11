# All-in-One Windows 11 Utility & Automation Scripts

A clean, modern Windows 11 (`24H2+` / `26H1`) administration and automation toolkit combining **5-language File & System Utility Suites**, **4 self-contained Admin Master Templates**, **20 Windows 11 Registry & Batch Tweaks**, and **4 focused Windows 11 Chapters** — unified under one interactive portal ([`index.html`](./index.html)) and one clean guide.

> **Interactive Master Portal:** Open [`index.html`](./index.html) for live `/` search, filter tabs, inline **View Code** modal previews for tweaks/templates, and copyable run commands.

---

## Clean Repository Structure (37 Files)

```text
all-in-one-windows-utility-scripts/
├── index.html                        # Unified interactive portal + inline View Code modal
├── README.md                         # Single authoritative documentation & script reference
├── .gitignore                        # Ignores __pycache__, logs, temp exports, scaffolds & Private/
├── settings.json                     # Shared directory configuration for the 5 utility suites
│
├── MasterUtilitySuite.bat            # [Suite 1] Enterprise Utility Suite — CMD Batch (.bat)
├── FileUtilitySuite.ps1              # [Suite 1] Enterprise Utility Suite — PowerShell 5.1/7+ (.ps1)
├── file_utility_suite.py             # [Suite 1] Enterprise Utility Suite — Python 3.10+ (.py)
├── file_utility_suite.js             # [Suite 1] Enterprise Utility Suite — Node.js 18+ (.js)
├── file_utility_suite.php            # [Suite 1] Enterprise Utility Suite — PHP 8.2+ CLI (.php)
│
├── admin-templates/                  # [Suite 2] Self-contained Windows 11 Admin Master Templates
│   ├── master_script.bat
│   ├── master_script.ps1
│   ├── master_script.py
│   └── master_script.js
│
├── windows-tweaks/                   # [Suite 3] 13 .reg + 7 .bat Windows 11 Tweaks
│   ├── master_tweak_tool.bat         # Unified 19-tweak CLI menu (reg.exe import + UAC prompt)
│   ├── *.reg (13 files)
│   └── *.bat (6 standalone scripts)
│
└── chapters/                         # [Suite 4] 4 Windows 11 Tweaks & Security Chapters
    ├── 01_registry_tweaks.md
    ├── 02_system_tweaks.md
    ├── 03_explorer_tweaks.md
    └── 04_other_tricks.md
```

---

## Quickstart by Runtime

| Runtime | Suite 1 (File & System Suite) | Suite 2 (Admin Master Template) | Notes |
| :--- | :--- | :--- | :--- |
| **CMD Batch** | [`MasterUtilitySuite.bat`](./MasterUtilitySuite.bat) | [`admin-templates/master_script.bat`](./admin-templates/master_script.bat) | Windows 10 / 11 UTF-8 (`chcp 65001`), PowerShell `RunAs` UAC |
| **PowerShell** | [`FileUtilitySuite.ps1`](./FileUtilitySuite.ps1) | [`admin-templates/master_script.ps1`](./admin-templates/master_script.ps1) | Engine-aware PowerShell 5.1 / PowerShell 7+ (`pwsh`) |
| **Python 3** | [`file_utility_suite.py`](./file_utility_suite.py) | [`admin-templates/master_script.py`](./admin-templates/master_script.py) | Python 3.10+ standard library only |
| **Node.js** | [`file_utility_suite.js`](./file_utility_suite.js) | [`admin-templates/master_script.js`](./admin-templates/master_script.js) | Node.js 18+ LTS built-ins only |
| **PHP CLI** | [`file_utility_suite.php`](./file_utility_suite.php) | — | PHP 8.2+ CLI built-ins only |

---

## Complete Inventory: What Each Script Does & Modern OS Updates

### Suite 1 — Enterprise File & System Utility Suite (Root)

Five feature-equivalent interactive dashboards configured by [`settings.json`](./settings.json) (`default_backup_dir`, `default_web_root`, `html_template_dir`, `app_template_dir`, `php_oop_dir`):

| Script | What It Does & Windows 11 Updates Applied |
| :--- | :--- |
| [`MasterUtilitySuite.bat`](./MasterUtilitySuite.bat) | UAC-elevated CMD menu suite (`1`–`6`): creates 4 modern project scaffolds, batch-creates folders/indexed files, copies/moves/backups files, runs Pattern Filename Replace, checks Win11 admin consoles, launches apps/folders, and exports env/software/directory reports. **Modern updates:** Replaced deprecated VBScript `getadmin.vbs` with PowerShell `RunAs`, enabled `chcp 65001`, replaced hardcoded OSX blog renamer & dummy `D1..D5.txt`/`modernizr.js` clutter with clean scaffolds & pattern rename, guarded `op_convert_txt` with `YES` + protected script extensions, added Win11 Home guards (`lusrmgr.msc` -> `netplwiz`, `gpedit.msc` notice), `desk.cpl,,0`, `%LocalAppData%` replacing retired `shell:cookies`, `wt.exe`/`pwsh.exe` detection, and 64/32-bit/HKCU uninstall export. |
| [`FileUtilitySuite.ps1`](./FileUtilitySuite.ps1) | Engine-aware PowerShell (`5.1`/`7+`) edition matching all 6 utility menus with temp error logging (`%TEMP%\windows-utility-suite-errors.log`). **Modern updates:** Keeps `pwsh` 7 on relaunch via `(Get-Process -Id $PID).Path`, clean 4 starter scaffolds, Pattern Filename Replace, `YES`-guarded `.txt` converter, Home-edition MSC guards, `%LOCALAPPDATA%` replacing `shell:cookies`, and unified 64/32/HKCU uninstall export. |
| [`file_utility_suite.py`](./file_utility_suite.py) | Stdlib Python 3.10+ CLI edition with matching 6 menus and temp error log. **Modern updates:** Replaced broken `Popen("code", shell=True)` with `shutil.which()`, replaced `{i-638}` OSX loop bug with general Pattern Filename Replace, `winreg` 64/32/HKCU software exporter, Home-edition guards, `wt.exe`/`pwsh.exe` launchers, and `%LOCALAPPDATA%` directory access. |
| [`file_utility_suite.js`](./file_utility_suite.js) | Async Node.js 18+ CLI edition with zero external npm dependencies. **Modern updates:** Clean 4 scaffolds, Pattern Filename Replace, `YES`-guarded converter, `where` executable discovery, Home-edition console guards, `wt.exe`/`pwsh.exe`, `%LOCALAPPDATA%`, and 64/32/User uninstall export. |
| [`file_utility_suite.php`](./file_utility_suite.php) | Interactive PHP 8.2+ CLI edition matching all 6 utility categories. **Modern updates:** Clean 4 starter scaffolds, Pattern Filename Replace, `cmd_exists()` helper, `YES` + protected-extension converter guard, Home-edition console guards, `%LOCALAPPDATA%`, and 64/32/User software exporter. |

---

### Suite 2 — Cross-Language Windows 11 Admin Templates (`admin-templates/`)

Four identical, self-contained Windows 11 administrative starter templates (`1A`–`5A`):

* [`admin-templates/master_script.bat`](./admin-templates/master_script.bat) — UTF-8 Batch template with PowerShell `RunAs` elevation.
* [`admin-templates/master_script.ps1`](./admin-templates/master_script.ps1) — PowerShell 5.1 / 7+ engine-aware admin template.
* [`admin-templates/master_script.py`](./admin-templates/master_script.py) — Python 3.10+ `ctypes` UAC + list-safe `subprocess` template.
* [`admin-templates/master_script.js`](./admin-templates/master_script.js) — Node.js 18+ `execFile` admin template.

**Menu Capabilities (`1A`–`5A`) & Modern OS Upgrades:**
1. **`[1]` System & Info (`1A`–`1C`):** OS version/build/last-boot via `Get-CimInstance Win32_OperatingSystem`, formatted `PATH`/env dump, and System Restore Point via Windows PowerShell 5.1 `Checkpoint-Computer`.
2. **`[2]` Network Diagnostics (`2A`–`2E`):** IP/DNS/Winsock reset, latency pings (`127.0.0.1`, `1.1.1.1`, custom host), interactive UNC share mounter (no hardcoded machine shares), confirmation-guarded unmount, and dynamic `Get-NetRoute` Default Gateway diagnostics (removed hardcoded LAN/captive-portal IPs).
3. **`[3]` Maintenance & Services (`3A`–`3I`):** Print Spooler queue reset, `wuauserv` enable/disable, User/System Temp cleanup (removed retired IE `INetCookies`), CIM Windows Activation state (`Get-CimInstance SoftwareLicensingProduct`, no `slmgr.vbs` popups), and **self-contained `reg.exe` context menu installers** for `Open Admin Terminal Here` (`wt.exe`/`cmd.exe`) and `Take Ownership` (`takeown`/`icacls`) — removing missing external Windows 7 `.inf`/`.reg` dependencies.
4. **`[4]` App Launcher (`4A`):** Notepad, `wt.exe`/`cmd.exe`, Windows Settings (`ms-settings:`), `%TEMP%`, HTTPS default browser.
5. **`[5]` System Power (`5R` / `5A` / `E`):** `YES`-confirmed 30-second restart (`shutdown /r`) and built-in abort (`shutdown /a`).

---

### Suite 3 — Windows 11 Registry & Batch Tweaks (`windows-tweaks/`)

* **13 Registry Policies (`.reg`):**
  * [`usb_write_protect_enable.reg`](./windows-tweaks/usb_write_protect_enable.reg) / [`usb_write_protect_disable.reg`](./windows-tweaks/usb_write_protect_disable.reg): Sets `StorageDevicePolicies\WriteProtect` (`1` = read-only USB drives, `0` = writable).
  * [`usb_storage_disable.reg`](./windows-tweaks/usb_storage_disable.reg) / [`usb_storage_enable.reg`](./windows-tweaks/usb_storage_enable.reg): Stops (`Start=4`) or restores (`Start=3`) the `USBSTOR` driver.
  * [`speed_up_shutdown.reg`](./windows-tweaks/speed_up_shutdown.reg): Reduces `WaitToKillServiceTimeout` to `"2000"` ms (from 5000 ms).
  * [`custom_logon_message.reg`](./windows-tweaks/custom_logon_message.reg) / [`remove_logon_message.reg`](./windows-tweaks/remove_logon_message.reg): Sets or clears `Winlogon\LegalNoticeCaption` and `LegalNoticeText`.
  * [`disable_run_box.reg`](./windows-tweaks/disable_run_box.reg) / [`enable_run_box.reg`](./windows-tweaks/enable_run_box.reg): Toggles `Policies\Explorer\NoRun` (`Win+R` dialog).
  * [`autoplay_disable.reg`](./windows-tweaks/autoplay_disable.reg) / [`autoplay_enable.reg`](./windows-tweaks/autoplay_enable.reg): **Updated for Win11** — toggles both `Policies\Explorer\NoDriveTypeAutoRun` and `Explorer\AutoplayHandlers\DisableAutoplay`.
  * [`disable_adobe_updater.reg`](./windows-tweaks/disable_adobe_updater.reg): **Updated for Win11** — sets `bUpdater=0` for both unified 64-bit `Adobe Acrobat\DC\FeatureLockDown` and `Acrobat Reader\DC\FeatureLockDown`.
  * [`spoof_cpu.reg`](./windows-tweaks/spoof_cpu.reg): Session-only `ProcessorNameString` customization in volatile `HKLM\HARDWARE` (resets on reboot).
* **7 Batch Utilities (`.bat`):**
  * [`lock_folder.bat`](./windows-tweaks/lock_folder.bat) & [`unlock_folder.bat`](./windows-tweaks/unlock_folder.bat): CLSID folder locker/unlocker with `chcp 65001` UTF-8, state/collision guards, and error checking.
  * [`create_shutdown_shortcut.bat`](./windows-tweaks/create_shutdown_shortcut.bat) & [`show_desktop_icon.bat`](./windows-tweaks/show_desktop_icon.bat): **Updated** to resolve Desktop via `SpecialFolders('Desktop')` (OneDrive Known Folder Move safe) and `ExecutionPolicy Bypass`.
  * [`enable_admin.bat`](./windows-tweaks/enable_admin.bat): UAC-checked built-in Administrator enable/disable menu requiring `YES` confirmation and offering password creation.
  * [`file_lister.bat`](./windows-tweaks/file_lister.bat): UTF-8 recursive path indexer (`dir /b /s` -> `file_list.txt`) reporting entry count.
  * [`master_tweak_tool.bat`](./windows-tweaks/master_tweak_tool.bat): Interactive menu applying/reverting all 19 tweaks with PowerShell `RunAs` prompt, UTF-8, and synchronous `reg.exe import` status checks.

---

### Suite 4 — Windows 11 Tweak & Security Chapters (`chapters/`)

1. **[01. Windows 11 Registry Operations & Policies](./chapters/01_registry_tweaks.md)** — `.reg` syntax, `WaitToKillServiceTimeout`, AutoPlay + `DisableAutoplay`, and legal notice banners.
2. **[02. USB Port Protections & Storage Security](./chapters/02_system_tweaks.md)** — `StorageDevicePolicies` read-only locks & `USBSTOR` blocking.
3. **[03. Windows Explorer & Shell Customizations](./chapters/03_explorer_tweaks.md)** — CLSID folder hiding, `NoRun` policy, `SpecialFolders('Desktop')` power & Show Desktop shortcuts.
4. **[04. Special Windows 11 Utilities & Lists](./chapters/04_other_tricks.md)** — Admin activation, UTF-8 file lister, unified Acrobat/Reader updater lock, session CPU string, bookmarklet, and diagnostic Run/shortcut references.
