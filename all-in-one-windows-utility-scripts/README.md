# All-in-One Windows 11 Utility & Automation Scripts

A unified, modernized Windows 11 (`24H2+` / `26H1`) administration and automation repository combining **5-language Enterprise File & System Utility Suites**, **4 cross-runtime Windows Admin Master Script templates**, **20 Windows 11 Registry & Batch tweaks**, and a **4-chapter interactive Tweak Handbook** — all indexed under a single searchable portal.

> **Interactive Master Index:** Open [`index.html`](./index.html) in any browser for live `/` search, suite filter tabs, copyable run commands, and direct links into every script, template, tweak, and textbook chapter.

---

## Repository Map

```text
all-in-one-windows-utility-scripts/
├── index.html                        # Master Interactive Index Portal (all 4 suites)
├── README.md                         # Complete repository documentation & change log
├── .gitignore                        # Ignores __pycache__, logs, temp exports & Private/
├── settings.json                     # Shared directory configuration for Suite 1
│
├── MasterUtilitySuite.bat            # [Suite 1] Enterprise Utility Suite — CMD Batch (.bat)
├── FileUtilitySuite.ps1              # [Suite 1] Enterprise Utility Suite — PowerShell (.ps1)
├── file_utility_suite.py             # [Suite 1] Enterprise Utility Suite — Python 3 (.py)
├── file_utility_suite.js             # [Suite 1] Enterprise Utility Suite — Node.js (.js)
├── file_utility_suite.php            # [Suite 1] Enterprise Utility Suite — PHP CLI (.php)
│
├── script-template/                  # [Suite 2] Cross-language Windows 11 Admin Master Templates
│   ├── README.md
│   ├── master_script.bat
│   ├── master_script.ps1
│   ├── master_script.py
│   └── master_script.js
│
├── windows-tweaks/                   # [Suite 3] 13 .reg + 7 .bat Windows 11 Tweaks & UI
│   ├── README.md
│   ├── index.html                    # Searchable Tweak Card Grid + Code Modal Viewer
│   ├── master_tweak_tool.bat         # Unified 19-tweak CLI dashboard (reg.exe import)
│   ├── *.reg (13 files)
│   └── *.bat (6 standalone scripts)
│
└── comprehensive-tweak-guide/        # [Suite 4] 4-Chapter Windows 11 Tweaks Handbook
    ├── README.md
    ├── index.html                    # Handbook Portal
    ├── 01_registry_tweaks.md / .html
    ├── 02_system_tweaks.md / .html
    ├── 03_explorer_tweaks.md / .html
    └── 04_other_tricks.md / .html
```

---

## Quickstart by Runtime

| Runtime | Suite 1 (File & System Suite) | Suite 2 (Admin Master Template) | Minimum OS / Runtime |
| :--- | :--- | :--- | :--- |
| **CMD Batch** | [`MasterUtilitySuite.bat`](./MasterUtilitySuite.bat) | [`script-template/master_script.bat`](./script-template/master_script.bat) | Windows 10 / 11 (`chcp 65001` UTF-8) |
| **PowerShell** | [`FileUtilitySuite.ps1`](./FileUtilitySuite.ps1) | [`script-template/master_script.ps1`](./script-template/master_script.ps1) | PowerShell 5.1+ or PowerShell 7+ (`pwsh`) |
| **Python 3** | [`file_utility_suite.py`](./file_utility_suite.py) | [`script-template/master_script.py`](./script-template/master_script.py) | Python 3.10+ stdlib only |
| **Node.js** | [`file_utility_suite.js`](./file_utility_suite.js) | [`script-template/master_script.js`](./script-template/master_script.js) | Node.js 18+ LTS built-ins only |
| **PHP CLI** | [`file_utility_suite.php`](./file_utility_suite.php) | — | PHP 8.2+ CLI built-ins only |

---

## Detailed Catalog: What Every Script Does & Modern OS Updates

### Suite 1 — Enterprise File & System Utility Suite (Root)

Five feature-equivalent interactive dashboards driven by [`settings.json`](./settings.json) (`default_backup_dir`, `default_web_root`, `html_template_dir`, `app_template_dir`, `php_oop_dir`). Every script provides **6 functional menus**:
1. **Web Templates & Site Creators:** Scaffolds PHP MVC, HTML5 static site, App styling, PHP OOP, or basic `webTemplate` folder structures.
2. **File & Folder Creators:** Batch creates `WebProject/Project1..10`, custom named files, or multi-type dummy batches.
3. **Advanced File Operations:** Copies files, moves `*.txt` to `WebProject/`, recursively backs up matching extensions, batch-renames numbered files, performs bulk/sequential extension conversions, and safely converts non-script files to `.txt`.
4. **Windows Administrative Tools (13 consoles):** Opens Control Panel, `services.msc`, `appwiz.cpl`, `regedit`, Windows Terminal (`wt.exe` / `cmd.exe`), Local Users (`lusrmgr.msc` / `netplwiz`), `diskmgmt.msc`, `compmgmt.msc`, Desktop Icon Settings, Group Policy (`gpedit.msc`), `ncpa.cpl`, Environment Variables Editor, and System Properties.
5. **Applications & System Directories (19 launchers):** Launches Chrome, Edge, Firefox, Opera, elevated Terminal/CMD, Notepad, Notepad++, Sublime Text, VS Code, Phoenix Code, Word, Excel, Adobe Photoshop, Git Bash, PowerShell (`pwsh` / `powershell`), Deluge, `%TEMP%`, `%LocalAppData%`, and Downloads.
6. **System Diagnostics & Exporters:** Exports Environment Variables (`output.txt`), Installed Software (`AllProgramFilesListing.txt`), App Directory Tree (`Listing.txt`), and opens elevated Terminal/CMD at the working directory.

| Script | Modern Windows 11 Upgrades Applied |
| :--- | :--- |
| [`MasterUtilitySuite.bat`](./MasterUtilitySuite.bat) | Replaced deprecated VBScript `getadmin.vbs` elevation with native PowerShell `Start-Process -Verb RunAs`; added `chcp 65001` UTF-8; fixed `op_move_txt` to operate in `%CD%\WebProject\`; protected scripts/docs and required `YES` confirmation on bulk `.txt` rename; added Win11 Home guards on `lusrmgr.msc`/`gpedit.msc`, `desk.cpl,,0`, per-user Opera/VS Code & `%LocalAppData%` resolution (replacing retired `shell:cookies`), dynamic Photoshop lookup, `pwsh.exe`/`wt.exe` preference, and full 64/32-bit/User Uninstall inventory export. |
| [`FileUtilitySuite.ps1`](./FileUtilitySuite.ps1) | Engine-aware auto-elevation (`(Get-Process -Id $PID).Path` preserves `pwsh` 7); confirmation + script-extension guard on `Convert-AllToTxt`; Win11 Home fallback (`netplwiz`) for `lusrmgr.msc`/`gpedit.msc`; `desk.cpl,,0`; dynamic Opera/VS Code/Photoshop/`pwsh`/`wt` resolution; `%LocalAppData%` instead of retired `shell:cookies`; 64-bit + `Wow6432Node` + `HKCU` software export. |
| [`file_utility_suite.py`](./file_utility_suite.py) | Fixed `{i-638}` arithmetic bug in `rename_osx_images()` (`{i}-638`); replaced broken `Popen("code", shell=True)` with `shutil.which()`; added `YES` + repo-extension guards on `convert_all_to_txt()`; native `winreg` 64-bit/32-bit/HKCU software export; Home-edition MSC guards; `wt.exe`/`pwsh.exe`/`%LOCALAPPDATA%` + wildcard Photoshop resolver. |
| [`file_utility_suite.js`](./file_utility_suite.js) | Added `YES` + extension guard on bulk `.txt` conversion; `where` command helper + dynamic Opera/VS Code/Photoshop/`pwsh.exe`/`wt.exe` lookup; Home-edition guards on `lusrmgr.msc`/`gpedit.msc`; `%LOCALAPPDATA%` replacing `shell:cookies`; 64/32-bit + User software inventory export. |
| [`file_utility_suite.php`](./file_utility_suite.php) | Added `cmd_exists()` and `find_photoshop_exe()` helpers; `YES` + extension guard on `.txt` conversion; Home-edition guards on `lusrmgr.msc`/`gpedit.msc`; `desk.cpl,,0`; `%LOCALAPPDATA%` replacing `shell:cookies`; elevated `wt.exe` + full 64/32-bit/User software export. |

---

### Suite 2 — Cross-Language Admin Master Templates ([`script-template/`](./script-template/README.md))

Reusable Windows 11 starter frameworks sharing menu architecture `1A`–`5A`:
* [`script-template/master_script.bat`](./script-template/master_script.bat) — UTF-8 Batch template with PowerShell RunAs UAC elevation.
* [`script-template/master_script.ps1`](./script-template/master_script.ps1) — Engine-aware PowerShell 5.1 / 7+ admin template.
* [`script-template/master_script.py`](./script-template/master_script.py) — Python 3 `ctypes` UAC + argument-safe `subprocess` template.
* [`script-template/master_script.js`](./script-template/master_script.js) — Node.js async `execFile` admin template.

**Modern OS Upgrades Applied Across All 4 Templates:**
* Removed hardcoded machine-specific UNC share paths and private LAN captive-portal IP addresses; added dynamic `Get-NetRoute` default gateway diagnostics (`2E`) and safe interactive UNC prompting (`2C`).
* Replaced missing Windows 7 external `.inf` / `.reg` dependencies in `3F`–`3I` with self-contained Registry commands (`HKCR\...\OpenAdminTerminal` with `wt.exe` support & `HKCR\...\TakeOwnership` via `takeown`/`icacls`).
* Switched Windows Activation check (`3E`) to console-safe `Get-CimInstance SoftwareLicensingProduct` (no `slmgr.vbs` GUI popups), System Info (`1A`) to `Win32_OperatingSystem`, temp cleanup (`3D`) away from retired IE `INetCookies`, browser launcher to HTTPS + `ms-settings:` + `wt.exe`, and Reboot (`5R`/`5A`) to require `YES` confirmation plus a built-in `shutdown /a` abort option.

---

### Suite 3 — Windows 11 Registry & Batch Tweaks ([`windows-tweaks/`](./windows-tweaks/README.md))

Interactive Portal: **[`windows-tweaks/index.html`](./windows-tweaks/index.html)** · CLI Runner: **[`windows-tweaks/master_tweak_tool.bat`](./windows-tweaks/master_tweak_tool.bat)**

* **13 Registry Tweaks (`.reg`):** USB read-only write-protect toggle ([`usb_write_protect_enable.reg`](./windows-tweaks/usb_write_protect_enable.reg), [`usb_write_protect_disable.reg`](./windows-tweaks/usb_write_protect_disable.reg)), `USBSTOR` driver block/restore ([`usb_storage_disable.reg`](./windows-tweaks/usb_storage_disable.reg), [`usb_storage_enable.reg`](./windows-tweaks/usb_storage_enable.reg)), fast service shutdown (`2000ms` [`speed_up_shutdown.reg`](./windows-tweaks/speed_up_shutdown.reg)), pre-login notice banner ([`custom_logon_message.reg`](./windows-tweaks/custom_logon_message.reg), [`remove_logon_message.reg`](./windows-tweaks/remove_logon_message.reg)), `Win+R` Run dialog policy ([`disable_run_box.reg`](./windows-tweaks/disable_run_box.reg), [`enable_run_box.reg`](./windows-tweaks/enable_run_box.reg)), Windows 11 AutoPlay lock/restore covering both `NoDriveTypeAutoRun` & `DisableAutoplay` ([`autoplay_disable.reg`](./windows-tweaks/autoplay_disable.reg), [`autoplay_enable.reg`](./windows-tweaks/autoplay_enable.reg)), dual 64-bit Acrobat + Reader updater block ([`disable_adobe_updater.reg`](./windows-tweaks/disable_adobe_updater.reg)), and session-only CPU string customization ([`spoof_cpu.reg`](./windows-tweaks/spoof_cpu.reg)).
* **7 Batch Utilities (`.bat`):** Safe CLSID folder lock/unlock ([`lock_folder.bat`](./windows-tweaks/lock_folder.bat), [`unlock_folder.bat`](./windows-tweaks/unlock_folder.bat) with existence/collision guards), OneDrive-safe `SpecialFolders('Desktop')` shortcut creators ([`create_shutdown_shortcut.bat`](./windows-tweaks/create_shutdown_shortcut.bat), [`show_desktop_icon.bat`](./windows-tweaks/show_desktop_icon.bat)), UAC & password-safe Admin manager ([`enable_admin.bat`](./windows-tweaks/enable_admin.bat)), UTF-8 recursive lister ([`file_lister.bat`](./windows-tweaks/file_lister.bat)), and [`master_tweak_tool.bat`](./windows-tweaks/master_tweak_tool.bat) using synchronous `reg.exe import` checks and PowerShell self-elevation.

---

### Suite 4 — Comprehensive Windows 11 Tweak Guide ([`comprehensive-tweak-guide/`](./comprehensive-tweak-guide/README.md))

Interactive Portal: **[`comprehensive-tweak-guide/index.html`](./comprehensive-tweak-guide/index.html)**

* **Chapter 1:** [`01_registry_tweaks.md`](./comprehensive-tweak-guide/01_registry_tweaks.md) · [`01_registry_tweaks.html`](./comprehensive-tweak-guide/01_registry_tweaks.html) — `.reg` syntax, `WaitToKillServiceTimeout`, AutoPlay + `DisableAutoplay` policies, pre-login notices.
* **Chapter 2:** [`02_system_tweaks.md`](./comprehensive-tweak-guide/02_system_tweaks.md) · [`02_system_tweaks.html`](./comprehensive-tweak-guide/02_system_tweaks.html) — USB `StorageDevicePolicies` write protection & `USBSTOR` blocking.
* **Chapter 3:** [`03_explorer_tweaks.md`](./comprehensive-tweak-guide/03_explorer_tweaks.md) · [`03_explorer_tweaks.html`](./comprehensive-tweak-guide/03_explorer_tweaks.html) — CLSID folder locking, `NoRun` dialog policy, `SpecialFolders('Desktop')` power & Show Desktop shortcuts.
* **Chapter 4:** [`04_other_tricks.md`](./comprehensive-tweak-guide/04_other_tricks.md) · [`04_other_tricks.html`](./comprehensive-tweak-guide/04_other_tricks.html) — Admin activation, UTF-8 file lister, unified Acrobat/Reader updater block, session CPU string, bookmarklet, and diagnostic Run/shortcut tables.
