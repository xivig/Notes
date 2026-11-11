# -*- coding: utf-8 -*-
"""
Enterprise File & System Utility Suite (Modern Windows 11 Python Edition)

Compact stdlib CLI utility with centralized JSON configuration, temp logging,
modern project scaffolds, pattern batch renaming, and Windows 11 tools.
"""

from datetime import datetime
import json
import os
import shutil
import subprocess
import sys
import tempfile
import webbrowser
from typing import Dict, List, Optional

GREEN = "\033[38;2;80;250;123m"
CYAN = "\033[38;2;139;233;253m"
YELLOW = "\033[38;2;241;250;140m"
RED = "\033[38;2;255;85;85m"
RESET = "\033[0m"
os.system("")

SCRIPT_DIR = os.path.dirname(os.path.realpath(__file__))
CONFIG_FILE = os.path.join(SCRIPT_DIR, "settings.json")
LOG_FILE = os.path.join(tempfile.gettempdir(), "windows-utility-suite-errors.log")

config: Dict[str, str] = {
    "default_backup_dir": "mybackup",
    "default_web_root": "webroot",
    "html_template_dir": "htmlSiteCreation",
    "app_template_dir": "app",
    "php_oop_dir": "php_oop",
}

if os.path.exists(CONFIG_FILE):
    try:
        with open(CONFIG_FILE, "r", encoding="utf-8") as fh:
            loaded = json.load(fh)
            if isinstance(loaded, dict):
                config.update(loaded)
    except Exception:
        print(f"{YELLOW}Warning: settings.json could not be loaded; using defaults.{RESET}")

PROTECTED_EXTS = {".txt", ".bat", ".ps1", ".py", ".js", ".php", ".json", ".md", ".html", ".reg", ".log"}


def log_error(message: str, exc: Optional[Exception] = None) -> None:
    ts = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    detail = f" | Details: {exc}" if exc else ""
    try:
        with open(LOG_FILE, "a", encoding="utf-8") as log:
            log.write(f"[{ts}] ERROR: {message}{detail}\n")
    except OSError:
        pass
    print(f"\n{RED}[-] {message} (Logged to {LOG_FILE}){RESET}")


def get_input(prompt: str) -> str:
    try:
        return input(prompt).strip()
    except (KeyboardInterrupt, EOFError):
        print(f"\n{RED}Operation aborted.{RESET}")
        sys.exit(0)


def print_header(title: str) -> None:
    os.system("cls" if os.name == "nt" else "clear")
    width = 58
    print(f"{CYAN}+" + "-" * (width - 2) + "+")
    print(f"| {GREEN}{title.ljust(width - 4)}{CYAN} |")
    print("+" + "-" * (width - 2) + f"+{RESET}\n")


def _write_scaffold(base: str, dirs: List[str], files: Dict[str, str], label: str) -> None:
    try:
        for d in dirs:
            os.makedirs(os.path.join(base, d), exist_ok=True)
        for rel, body in files.items():
            target = os.path.join(base, rel)
            os.makedirs(os.path.dirname(target), exist_ok=True)
            with open(target, "w", encoding="utf-8") as fh:
                fh.write(body)
        print(f"\n{GREEN}[OK] {label} created in: {base}{RESET}")
    except OSError as err:
        log_error(f"Failed creating {label}.", err)
    get_input("Press Enter to continue...")


def web_templates_menu() -> None:
    while True:
        print_header("PROJECT SCAFFOLD GENERATORS")
        print(f"1. Modern Static Web Starter ({config['html_template_dir']})")
        print(f"2. PHP App Starter ({config['default_web_root']})")
        print(f"3. Minimal App Starter ({config['app_template_dir']})")
        print(f"4. PHP OOP Starter ({config['php_oop_dir']})")
        print("5. Back to Main Menu\n")
        c = get_input("Select a template (1-5): ")
        if c == "1":
            _write_scaffold(
                os.path.join(os.getcwd(), config["html_template_dir"]),
                ["css", "js"],
                {
                    "css/styles.css": "",
                    "js/app.js": "",
                    "index.html": '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>App</title><link rel="stylesheet" href="./css/styles.css"></head><body><h1>Ready</h1><script src="./js/app.js"></script></body></html>\n',
                },
                "Modern Web Starter",
            )
        elif c == "2":
            _write_scaffold(
                os.path.join(os.getcwd(), config["default_web_root"]),
                ["public", "src", "config"],
                {"public/index.php": "<?php declare(strict_types=1);\necho 'PHP App Ready';\n", "README.md": "# PHP App\n"},
                "PHP App Starter",
            )
        elif c == "3":
            _write_scaffold(
                os.path.join(os.getcwd(), config["app_template_dir"]),
                ["src", "assets/styles"],
                {"assets/styles/app.css": "", "index.html": ""},
                "App Starter",
            )
        elif c == "4":
            _write_scaffold(
                os.path.join(os.getcwd(), config["php_oop_dir"]),
                ["src", "tests"],
                {"index.php": "<?php declare(strict_types=1);\n", "README.md": "# PHP OOP Package\n"},
                "PHP OOP Starter",
            )
        elif c == "5":
            break


def creator_menu() -> None:
    while True:
        print_header("FILE & FOLDER CREATORS")
        print("1. Create Project Folders (Project1..ProjectN in WebProject)")
        print("2. Create Custom File (Name + Extension)")
        print("3. Batch Create Indexed Files (prefix1..N.ext)")
        print("4. Back to Main Menu\n")
        c = get_input("Select option (1-4): ")
        if c == "1":
            raw = get_input("Count [10]: ")
            n = int(raw) if raw.isdigit() and int(raw) > 0 else 10
            base = os.path.join(os.getcwd(), "WebProject")
            try:
                for i in range(1, n + 1):
                    os.makedirs(os.path.join(base, f"Project{i}"), exist_ok=True)
                print(f"\n{GREEN}[OK] Created {n} folders in {base}{RESET}")
            except OSError as err:
                log_error("Failed creating project folders.", err)
            get_input("Press Enter...")
        elif c == "2":
            name = get_input("File name: ")
            ext = get_input("Extension (without dot): ")
            if name and ext:
                with open(f"{name}.{ext}", "w", encoding="utf-8"):
                    pass
                print(f"{GREEN}[OK] Created {name}.{ext}{RESET}")
            get_input("Press Enter...")
        elif c == "3":
            pfx = get_input("Prefix [item]: ") or "item"
            ext = get_input("Extension [txt]: ") or "txt"
            raw = get_input("Count [5]: ")
            n = int(raw) if raw.isdigit() and int(raw) > 0 else 5
            for i in range(1, n + 1):
                with open(f"{pfx}{i}.{ext}", "w", encoding="utf-8"):
                    pass
            print(f"{GREEN}[OK] Created {pfx}1..{n}.{ext}{RESET}")
            get_input("Press Enter...")
        elif c == "4":
            break


def file_operations_menu() -> None:
    while True:
        print_header("ADVANCED FILE OPERATIONS")
        print("1. Copy File")
        print("2. Move *.txt Files to WebProject Folder")
        print(f"3. Recursive Extension Backup to {config['default_backup_dir']}/")
        print("4. Pattern Filename Replace (Find & Replace)")
        print("5. Bulk Extension Replace (*.old -> *.new)")
        print("6. Sequential Rename (item1.ext..itemN.ext)")
        print("7. Safe Convert Non-Script Files to .txt")
        print("8. Back to Main Menu\n")
        c = get_input("Select option (1-8): ")
        if c == "1":
            src = get_input("Source file path: ")
            dest = get_input("Destination folder: ")
            if os.path.isfile(src):
                os.makedirs(dest, exist_ok=True)
                shutil.copy(src, dest)
                print(f"{GREEN}[OK] Copied.{RESET}")
            else:
                print(f"{RED}Source not found.{RESET}")
            get_input("Press Enter...")
        elif c == "2":
            dest = os.path.join(os.getcwd(), "WebProject")
            os.makedirs(dest, exist_ok=True)
            skip = {"output.txt", "Listing.txt", "AllProgramFilesListing.txt", "file_list.txt"}
            files = [f for f in os.listdir(".") if f.endswith(".txt") and os.path.isfile(f) and f not in skip]
            for f in files:
                shutil.move(f, os.path.join(dest, f))
            print(f"{GREEN}[OK] Moved {len(files)} .txt file(s) to {dest}{RESET}")
            get_input("Press Enter...")
        elif c == "3":
            ext = get_input("Extension (without dot): ").lstrip(".")
            if not ext:
                continue
            backup = os.path.join(os.getcwd(), config["default_backup_dir"])
            os.makedirs(backup, exist_ok=True)
            cnt = 0
            for root, _, files in os.walk("."):
                if os.path.realpath(root) == os.path.realpath(backup):
                    continue
                for f in files:
                    if f.endswith(f".{ext}"):
                        shutil.copy(os.path.join(root, f), backup)
                        cnt += 1
            print(f"{GREEN}[OK] Backed up {cnt} file(s) to {backup}{RESET}")
            get_input("Press Enter...")
        elif c == "4":
            find_s = get_input("Text to find in filenames: ")
            rep_s = get_input("Replacement text: ")
            if find_s:
                cnt = 0
                for f in os.listdir("."):
                    if os.path.isfile(f) and find_s in f and os.path.splitext(f)[1].lower() not in PROTECTED_EXTS:
                        os.rename(f, f.replace(find_s, rep_s))
                        cnt += 1
                print(f"{GREEN}[OK] Renamed {cnt} file(s).{RESET}")
            get_input("Press Enter...")
        elif c == "5":
            o = get_input("Old extension: ").lstrip(".")
            n = get_input("New extension: ").lstrip(".")
            files = [f for f in os.listdir(".") if os.path.isfile(f) and f.endswith(f".{o}")]
            for f in files:
                os.rename(f, f"{os.path.splitext(f)[0]}.{n}")
            print(f"{GREEN}[OK] Updated {len(files)} file(s).{RESET}")
            get_input("Press Enter...")
        elif c == "6":
            o = get_input("Old extension: ").lstrip(".")
            n = get_input("New extension: ").lstrip(".")
            files = [f for f in os.listdir(".") if os.path.isfile(f) and f.endswith(f".{o}")]
            for idx, f in enumerate(files, 1):
                os.rename(f, f"item{idx}.{n}")
            print(f"{GREEN}[OK] Renamed {len(files)} file(s).{RESET}")
            get_input("Press Enter...")
        elif c == "7":
            if get_input("Type YES to convert non-script files in current folder to .txt: ") == "YES":
                files = [f for f in os.listdir(".") if os.path.isfile(f) and os.path.splitext(f)[1].lower() not in PROTECTED_EXTS and f != ".gitignore"]
                for f in files:
                    os.rename(f, f"{os.path.splitext(f)[0]}.txt")
                print(f"{GREEN}[OK] Converted {len(files)} file(s).{RESET}")
            get_input("Press Enter...")
        elif c == "8":
            break


def _launch_msc_guarded(msc_name: str, fallback: Optional[str] = None, notice: str = "") -> None:
    sys32 = os.path.join(os.environ.get("SystemRoot", r"C:\Windows"), "System32", msc_name)
    if os.path.exists(sys32):
        os.system(f"start {msc_name}")
    elif fallback:
        os.system(f"start {fallback}")
    else:
        print(f"{YELLOW}{notice or msc_name + ' requires Pro/Enterprise edition.'}{RESET}")
        get_input("Press Enter...")


def shortcuts_menu() -> None:
    while True:
        print_header("WINDOWS 11 ADMINISTRATIVE CONSOLES")
        print("1. Control Panel | 2. Services | 3. Installed Programs (appwiz.cpl) | 4. Regedit")
        print("5. Windows Terminal / CMD | 6. Local Users (lusrmgr/netplwiz) | 7. Disk Management")
        print("8. Computer Management | 9. Desktop Icon Settings | 10. Group Policy (Pro/Ent)")
        print("11. Network Connections | 12. Environment Variables | 13. System Properties | 14. Back\n")
        c = get_input("Select (1-14): ")
        if c == "14":
            break
        cmds = {
            "1": "start control", "2": "start services.msc", "3": "start appwiz.cpl", "4": "start regedit",
            "7": "start diskmgmt.msc", "8": "start compmgmt.msc",
            "9": "start rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0", "11": "start ncpa.cpl",
            "12": "start rundll32.exe sysdm.cpl,EditEnvironmentVariables",
            "13": "start rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3",
        }
        if c == "5":
            subprocess.Popen(["wt.exe" if shutil.which("wt.exe") else "cmd.exe"])
        elif c == "6":
            _launch_msc_guarded("lusrmgr.msc", "netplwiz")
        elif c == "10":
            _launch_msc_guarded("gpedit.msc")
        elif c in cmds:
            os.system(cmds[c])


def _first_existing(paths: List[str]) -> Optional[str]:
    return next((p for p in paths if p and os.path.exists(p)), None)


def apps_menu() -> None:
    while True:
        print_header("APPLICATIONS & SYSTEM FOLDERS")
        print("1. Chrome | 2. Edge | 3. Firefox | 4. Admin Terminal | 5. Notepad | 6. PowerShell 7+/5.1")
        print("7. Notepad++ | 8. Sublime Text | 9. VS Code | 10. Git Bash | 11. Word | 12. Excel")
        print("13. Windows Settings | 14. Temp | 15. Local AppData | 16. Downloads | 17. Back\n")
        c = get_input("Select (1-17): ")
        if c == "17":
            break
        try:
            if c == "1":
                webbrowser.open("https://www.google.com")
            elif c == "2":
                os.system("start msedge https://www.google.com")
            elif c == "3":
                os.system("start firefox")
            elif c == "4":
                term = "wt.exe" if shutil.which("wt.exe") else "cmd"
                subprocess.Popen(f'powershell -NoProfile -Command "Start-Process {term} -Verb RunAs"', shell=True)
            elif c == "5":
                subprocess.Popen(["notepad.exe"])
            elif c == "6":
                subprocess.Popen(["pwsh.exe" if shutil.which("pwsh.exe") else "powershell.exe"])
            elif c == "7":
                exe = r"C:\Program Files\Notepad++\notepad++.exe"
                subprocess.Popen([exe]) if os.path.exists(exe) else get_input(f"{RED}Notepad++ not found. Press Enter...{RESET}")
            elif c == "8":
                exe = r"C:\Program Files\Sublime Text\sublime_text.exe"
                subprocess.Popen([exe]) if os.path.exists(exe) else get_input(f"{RED}Sublime Text not found. Press Enter...{RESET}")
            elif c == "9":
                exe = shutil.which("code") or _first_existing([
                    os.path.expandvars(r"%LocalAppData%\Programs\Microsoft VS Code\Code.exe"),
                    r"C:\Program Files\Microsoft VS Code\Code.exe",
                ])
                if exe:
                    subprocess.Popen(exe, shell=exe.lower().endswith(".cmd"))
                else:
                    get_input(f"{RED}VS Code not found. Press Enter...{RESET}")
            elif c == "10":
                exe = r"C:\Program Files\Git\git-bash.exe"
                subprocess.Popen([exe]) if os.path.exists(exe) else get_input(f"{RED}Git Bash not found. Press Enter...{RESET}")
            elif c == "11":
                os.system("start winword")
            elif c == "12":
                os.system("start excel")
            elif c == "13":
                os.startfile("ms-settings:")
            elif c == "14":
                if os.environ.get("TEMP"):
                    os.startfile(os.environ["TEMP"])
            elif c == "15":
                if os.environ.get("LOCALAPPDATA"):
                    os.startfile(os.environ["LOCALAPPDATA"])
            elif c == "16":
                dl = os.path.join(os.path.expanduser("~"), "Downloads")
                if os.path.exists(dl):
                    os.startfile(dl)
        except Exception as err:
            log_error(f"Launcher failed for choice {c}", err)


def diagnostics_menu() -> None:
    while True:
        print_header("SYSTEM DIAGNOSTICS & EXPORTERS")
        print("1. Export Environment Variables to 'output.txt'")
        print("2. Export Installed Software List to 'AllProgramFilesListing.txt'")
        print(f"3. Export Directory Listing of '{config['app_template_dir']}' to 'Listing.txt'")
        print("4. Open Elevated Terminal / CMD at Current Location")
        print("5. Back to Main Menu\n")
        c = get_input("Select (1-5): ")
        if c == "5":
            break
        if c == "1":
            with open("output.txt", "w", encoding="utf-8") as fh:
                for k, v in sorted(os.environ.items()):
                    fh.write(f"{k}={v}\n")
            print(f"{GREEN}[OK] Saved output.txt{RESET}")
            get_input("Press Enter...")
        elif c == "2":
            entries: List[str] = []
            if sys.platform == "win32":
                import winreg
                for hive, access in (
                    (winreg.HKEY_LOCAL_MACHINE, winreg.KEY_READ | winreg.KEY_WOW64_64KEY),
                    (winreg.HKEY_LOCAL_MACHINE, winreg.KEY_READ | winreg.KEY_WOW64_32KEY),
                    (winreg.HKEY_CURRENT_USER, winreg.KEY_READ),
                ):
                    try:
                        with winreg.OpenKey(hive, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", 0, access) as key:
                            for idx in range(winreg.QueryInfoKey(key)[0]):
                                with winreg.OpenKey(key, winreg.EnumKey(key, idx)) as sk:
                                    try:
                                        disp = str(winreg.QueryValueEx(sk, "DisplayName")[0]).strip()
                                        ver = ""
                                        try:
                                            ver = str(winreg.QueryValueEx(sk, "DisplayVersion")[0]).strip()
                                        except OSError:
                                            pass
                                        entries.append(f"{disp} ({ver})" if ver else disp)
                                    except OSError:
                                        pass
                    except OSError:
                        pass
            entries = sorted(set(entries), key=str.lower)
            with open("AllProgramFilesListing.txt", "w", encoding="utf-8") as fh:
                fh.write("\n".join(entries))
            print(f"{GREEN}[OK] Exported {len(entries)} apps to AllProgramFilesListing.txt{RESET}")
            get_input("Press Enter...")
        elif c == "3":
            app_dir = os.path.join(os.getcwd(), config["app_template_dir"])
            if os.path.exists(app_dir):
                with open("Listing.txt", "w", encoding="utf-8") as fh:
                    for root, _, files in os.walk(app_dir):
                        for f in files:
                            fh.write(f"{os.path.join(root, f)}\n")
                print(f"{GREEN}[OK] Saved Listing.txt{RESET}")
            else:
                print(f"{RED}'{config['app_template_dir']}' folder not found.{RESET}")
            get_input("Press Enter...")
        elif c == "4":
            if shutil.which("wt.exe"):
                subprocess.Popen(f'powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList \'-d\', \'\\"{os.getcwd()}\\"\' -Verb RunAs"', shell=True)
            else:
                subprocess.Popen(f'powershell -NoProfile -Command "Start-Process cmd -ArgumentList \'/K cd /d \\"{os.getcwd()}\\"\' -Verb RunAs"', shell=True)


def main() -> None:
    while True:
        print_header("MODERN FILE & SYSTEM UTILITY SUITE (PYTHON)")
        print("  1. Web & App Project Scaffolds (4 Starters)")
        print("  2. File & Folder Creators")
        print("  3. Advanced File Operations (Copy, Move, Pattern Rename)")
        print("  4. Windows 11 Administrative Consoles")
        print("  5. Applications & System Folders")
        print("  6. System Diagnostics & Exporters")
        print("  7. Exit\n")
        opt = get_input("Select a utility category (1-7): ")
        if opt == "1":
            web_templates_menu()
        elif opt == "2":
            creator_menu()
        elif opt == "3":
            file_operations_menu()
        elif opt == "4":
            shortcuts_menu()
        elif opt == "5":
            apps_menu()
        elif opt == "6":
            diagnostics_menu()
        elif opt == "7":
            print(f"{GREEN}Goodbye!{RESET}")
            sys.exit(0)


if __name__ == "__main__":
    main()
