# -*- coding: utf-8 -*-
"""
Enterprise File & System Utility Suite (Modern Python Edition)

A high-performance command-line utility with PEP 8 design patterns,
strict type hinting, centralized JSON config loading, and error logging.
"""

import glob
import os
import sys
import json
import shutil
import subprocess
import webbrowser
from datetime import datetime
from typing import Dict, List, Any, Optional

# --- Terminal Color Setup ---
GREEN: str = "\033[38;2;80;250;123m"
GRAY: str = "\033[38;2;90;90;90m"
CYAN: str = "\033[38;2;139;233;253m"
YELLOW: str = "\033[38;2;241;250;140m"
PINK: str = "\033[38;2;255;121;198m"
RED: str = "\033[38;2;255;85;85m"
RESET: str = "\033[0m"

# Ensure colors are enabled on Windows Terminal
os.system("")

# --- Configuration & Logging ---
SCRIPT_DIR: str = os.path.dirname(os.path.realpath(__file__))
CONFIG_FILE: str = os.path.join(SCRIPT_DIR, "settings.json")
LOG_FILE: str = os.path.join(SCRIPT_DIR, "errors.log")

# Default Fallback Configs
config: Dict[str, str] = {
    "default_backup_dir": "mybackup",
    "default_web_root": "webroot",
    "html_template_dir": "htmlSiteCreation",
    "app_template_dir": "app",
    "php_oop_dir": "php_oop"
}

# Load Settings
if os.path.exists(CONFIG_FILE):
    try:
        with open(CONFIG_FILE, 'r', encoding='utf-8') as cfg:
            loaded_cfg = json.load(cfg)
            if isinstance(loaded_cfg, dict):
                config.update(loaded_cfg)
    except Exception as err:
        print(f"{YELLOW}Warning: settings.json could not be loaded. Using defaults.{RESET}")

def log_error(message: str, exc: Optional[Exception] = None) -> None:
    """Logs errors with timestamps to errors.log and prints a user warning.

    Args:
        message: The user-facing error message.
        exc: Optional exception object.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    exc_details = f" | Details: {str(exc)}" if exc else ""
    log_line = f"[{timestamp}] ERROR: {message}{exc_details}\n"
    try:
        with open(LOG_FILE, 'a', encoding='utf-8') as log:
            log.write(log_line)
    except IOError:
        pass
    print(f"\n{RED}[-] {message} (Logged to errors.log){RESET}")

# --- Helper Functions ---
def get_input(prompt: str) -> str:
    """Prompts user input, stripping trailing spaces.

    Args:
        prompt: Prompt string.
    Returns:
        Stripped string.
    """
    try:
        return input(prompt).strip()
    except (KeyboardInterrupt, EOFError):
        print(f"\n{RED}Operation aborted by user.{RESET}")
        sys.exit(0)

def print_header(title: str) -> None:
    """Prints a standard stylized terminal box header.

    Args:
        title: Title of the menu.
    """
    os.system("cls" if os.name == "nt" else "clear")
    width = 58
    print(f"{CYAN}┌{'─' * (width - 2)}┐")
    print(f"│ {GREEN}{title.ljust(width - 4)}{CYAN} │")
    print(f"└{'─' * (width - 2)}┘\n")

# --- Category 1: Web Template Creators ---
def create_php_project() -> None:
    """Generates the enterprise-grade PHP project directory hierarchy."""
    base: str = os.path.join(os.getcwd(), config["default_web_root"])
    dirs: List[str] = [
        "public/assets/css", "public/assets/common", "public/assets/inc",
        "public/assets/js", "private/class", "private/config", "private/core"
    ]
    files: List[str] = [
        "public/login.php", "public/index.php", "public/admin.php",
        "public/confirmdelete.php", "public/view.php", "public/test.php", "public/regex.php",
        "private/class/class.db_connect.inc.php", "private/class/class.calendar.inc.php",
        "private/class/class.event.inc.php", "private/class/class.admin.inc.php",
        "private/class/class.db-cred.inc.php", "private/config/class.db-cred.inc.php",
        "private/core/init.inc.php", "public/assets/css/style.css",
        "public/assets/css/admin.css", "public/assets/css/ajax.css",
        "public/assets/js/custom.js", "public/assets/js/init.js", "public/assets/js/valid-date.js",
        "public/assets/common/header.inc.php", "public/assets/common/footer.inc.php",
        "public/assets/inc/process.inc.php", "public/assets/inc/ajax.inc.php"
    ]
    try:
        for d in dirs:
            os.makedirs(os.path.join(base, d), exist_ok=True)
        for f in files:
            with open(os.path.join(base, f), 'w', encoding='utf-8') as new_file:
                new_file.write("")
        print(f"\n{GREEN}PHP Project successfully created at: {base}{RESET}")
    except OSError as err:
        log_error("Could not create PHP Project files.", err)
    get_input("Press Enter to continue...")

def create_html_project() -> None:
    """Generates the default HTML site project structure."""
    base: str = os.path.join(os.getcwd(), config["html_template_dir"])
    dirs: List[str] = ["css", "img", "js"]
    files: List[str] = [
        ".htaccess", "404.html", "humans.txt", "index.html", "robots.txt",
        "site.webmanifest", "sitemap.xml", "css/style.css", "css/normalize.css",
        "js/custom.js", "js/modernizr.js", "js/jquery.js"
    ]
    try:
        for d in dirs:
            os.makedirs(os.path.join(base, d), exist_ok=True)
        for f in files:
            with open(os.path.join(base, f), 'w', encoding='utf-8') as new_file:
                new_file.write("")
        print(f"\n{GREEN}HTML Site successfully created at: {base}{RESET}")
    except OSError as err:
        log_error("Could not create HTML Project files.", err)
    get_input("Press Enter to continue...")

def create_app_project() -> None:
    """Generates the app styling site hierarchy."""
    base: str = os.path.join(os.getcwd(), config["app_template_dir"])
    dirs: List[str] = ["temp/styles", "assets/styles", "assets/images/icons"]
    files: List[str] = [
        "assets/styles/styles.css", "temp/styles/styles.css", ".htaccess",
        "404.html", "humans.txt", "index.html", "robots.txt", "site.webmanifest", "sitemap.xml"
    ]
    try:
        for d in dirs:
            os.makedirs(os.path.join(base, d), exist_ok=True)
        for f in files:
            with open(os.path.join(base, f), 'w', encoding='utf-8') as new_file:
                new_file.write("")
        print(f"\n{GREEN}App Project successfully created at: {base}{RESET}")
    except OSError as err:
        log_error("Could not create App Project files.", err)
    get_input("Press Enter to continue...")

def create_php_oop_project() -> None:
    """Generates the PHP Object-Oriented project folders and files."""
    base: str = os.path.join(os.getcwd(), config["php_oop_dir"])
    dirs: List[str] = ["css", "img", "js"]
    files: List[str] = [
        ".htaccess", "404.html", "humans.txt", "index.php", "robots.txt",
        "site.webmanifest", "sitemap.xml", "css/style.css", "css/normalize.css",
        "js/custom.js", "js/modernizr.js", "js/jquery.js"
    ]
    try:
        for d in dirs:
            os.makedirs(os.path.join(base, d), exist_ok=True)
        for f in files:
            with open(os.path.join(base, f), 'w', encoding='utf-8') as new_file:
                new_file.write("")
        print(f"\n{GREEN}PHP OOP Project successfully created at: {base}{RESET}")
    except OSError as err:
        log_error("Could not create PHP OOP files.", err)
    get_input("Press Enter to continue...")

def create_basic_web_project() -> None:
    """Creates the webTemplate folder structure with D1-D5 text files."""
    base: str = os.path.join(os.getcwd(), "webTemplate")
    dirs: List[str] = ["css", "img", "js"]
    files: List[str] = [
        ".htaccess", "404.html", "humans.txt", "index.php", "robots.txt",
        "site.webmanifest", "sitemap.xml", "css/style.css", "css/normalize.css",
        "js/custom.js", "js/modernizr.js", "js/jquery.js"
    ]
    try:
        for d in dirs:
            os.makedirs(os.path.join(base, d), exist_ok=True)
        for i in range(1, 6):
            with open(os.path.join(base, f"D{i}.txt"), 'w', encoding='utf-8') as dummy_file:
                dummy_file.write("")
        for f in files:
            with open(os.path.join(base, f), 'w', encoding='utf-8') as target_file:
                target_file.write("")
        print(f"\n{GREEN}Basic Web Project successfully created inside: {base}{RESET}")
    except OSError as err:
        log_error("Could not create Basic Web project.", err)
    get_input("Press Enter to continue...")

def web_templates_menu() -> None:
    """Handles the menu navigation for web template creator utilities."""
    while True:
        print_header("WEB TEMPLATE GENERATOR")
        print(f"1. PHP Web Project ({config['default_web_root']})")
        print(f"2. HTML Site Template ({config['html_template_dir']})")
        print(f"3. App Structure ({config['app_template_dir']})")
        print(f"4. PHP OOP Structure ({config['php_oop_dir']})")
        print("5. Basic Web Template (webTemplate folder)")
        print("6. Back to Main Menu\n")
        
        choice: str = get_input("Select a template (1-6): ")
        if choice == "1":
            create_php_project()
        elif choice == "2":
            create_html_project()
        elif choice == "3":
            create_app_project()
        elif choice == "4":
            create_php_oop_project()
        elif choice == "5":
            create_basic_web_project()
        elif choice == "6":
            break
        else:
            get_input(f"{RED}Invalid option. Press Enter to retry...{RESET}")

# --- Category 2: File & Folder Creators ---
def create_project_folders() -> None:
    """Creates WebProject/Project1 through Project10 directories."""
    base: str = os.path.join(os.getcwd(), "WebProject")
    try:
        os.makedirs(base, exist_ok=True)
        for i in range(1, 11):
            os.makedirs(os.path.join(base, f"Project{i}"), exist_ok=True)
        print(f"\n{GREEN}10 project subfolders successfully created inside: {base}{RESET}")
    except OSError as err:
        log_error("Failed to create WebProject folders.", err)
    get_input("Press Enter to continue...")

def create_single_file() -> None:
    """Creates a custom named user-defined file extension."""
    name: str = get_input("Enter file name: ")
    ext: str = get_input("Enter file extension (without dot): ")
    if not name or not ext:
        get_input(f"{RED}File name or extension cannot be blank.{RESET}")
        return
    try:
        with open(f"{name}.{ext}", 'w', encoding='utf-8') as new_file:
            new_file.write("")
        print(f"\n{GREEN}File '{name}.{ext}' created successfully!{RESET}")
    except IOError as err:
        log_error(f"Failed to create custom file: {name}.{ext}", err)
    get_input("Press Enter to continue...")

def create_dummy_batch() -> None:
    """Creates index1-10.php, style1-3.css, and custom dummy script files."""
    try:
        for i in range(1, 11):
            with open(f"index{i}.php", 'w', encoding='utf-8') as dummy_file:
                dummy_file.write("")
        for i in range(1, 4):
            with open(f"style{i}.css", 'w', encoding='utf-8') as dummy_file: dummy_file.write("")
            with open(f"custom{i}.js", 'w', encoding='utf-8') as dummy_file: dummy_file.write("")
            with open(f"template{i}.tpl", 'w', encoding='utf-8') as dummy_file: dummy_file.write("")
        print(f"\n{GREEN}Dummy files batch created successfully!{RESET}")
    except IOError as err:
        log_error("Failed to write dummy batch files.", err)
    get_input("Press Enter to continue...")

def creator_menu() -> None:
    """Handles the menu navigation for folder and file creator utilities."""
    while True:
        print_header("FILE & FOLDER CREATOR")
        print("1. Create Project Folders (Project1 to Project10)")
        print("2. Create Custom File (User-defined Name & Extension)")
        print("3. Create Batch Dummy Files (index1-10.php, style1-3.css, etc.)")
        print("4. Back to Main Menu\n")
        
        choice: str = get_input("Select an option (1-4): ")
        if choice == "1":
            create_project_folders()
        elif choice == "2":
            create_single_file()
        elif choice == "3":
            create_dummy_batch()
        elif choice == "4":
            break
        else:
            get_input(f"{RED}Invalid option. Press Enter to retry...{RESET}")

# --- Category 3: Advanced File Operations ---
def copy_file_suite() -> None:
    """Prompts paths and runs robust copy actions."""
    src: str = get_input("Enter source file path: ")
    dest: str = get_input("Enter destination folder path: ")
    if not os.path.exists(src):
        get_input(f"{RED}Source file not found!{RESET}")
        return
    try:
        os.makedirs(dest, exist_ok=True)
        shutil.copy(src, dest)
        print(f"\n{GREEN}File copied successfully!{RESET}")
    except Exception as err:
        log_error("Failed to copy file.", err)
    get_input("Press Enter to continue...")

def move_text_files() -> None:
    """Moves all txt files in the current folder to WebProject/."""
    dest: str = os.path.join(os.getcwd(), "WebProject")
    try:
        os.makedirs(dest, exist_ok=True)
        files = [f for f in os.listdir('.') if f.endswith('.txt') and os.path.isfile(f)]
        if not files:
            print(f"\n{YELLOW}No text files found to move.{RESET}")
        else:
            for f in files:
                shutil.move(f, os.path.join(dest, f))
            print(f"\n{GREEN}Moved {len(files)} text files to '{dest}' successfully!{RESET}")
    except Exception as err:
        log_error("Failed moving text files.", err)
    get_input("Press Enter to continue...")

def search_backup_suite() -> None:
    """Recursively scans extensions and copies them to the backup directory."""
    ext: str = get_input("Enter extension to backup (e.g. bat or txt): ")
    if ext.startswith('.'): ext = ext[1:]
    backup_dir: str = os.path.join(os.getcwd(), config["default_backup_dir"])
    try:
        os.makedirs(backup_dir, exist_ok=True)
        count = 0
        for root, _, files in os.walk('.'):
            if os.path.realpath(root) == os.path.realpath(backup_dir):
                continue
            for f in files:
                if f.endswith(f".{ext}"):
                    shutil.copy(os.path.join(root, f), backup_dir)
                    count += 1
        print(f"\n{GREEN}Backed up {count} files matching '.{ext}' to: {backup_dir}{RESET}")
    except Exception as err:
        log_error("Failed during backup loop.", err)
    get_input("Press Enter to continue...")

def rename_osx_images() -> None:
    """Renames OSX setup templates sequentially (mac-osx-...-X-638.jpg -> X.jpg)."""
    try:
        count = 0
        for i in range(201):
            old_name = f"mac-osx-command-line-terminal-{i}-638.jpg"
            if os.path.exists(old_name):
                os.rename(old_name, f"{i}.jpg")
                count += 1
        print(f"\n{GREEN}Renamed {count} matching template files!{RESET}")
    except OSError as err:
        log_error("Failed renaming images.", err)
    get_input("Press Enter to continue...")

def change_extensions_bulk() -> None:
    """Changes bulk extensions matching user types (e.g. *.js -> *.php)."""
    old_ext: str = get_input("Enter old extension (without dot): ")
    new_ext: str = get_input("Enter new extension (without dot): ")
    try:
        files = [f for f in os.listdir('.') if f.endswith(f".{old_ext}") and os.path.isfile(f)]
        for f in files:
            base, _ = os.path.splitext(f)
            os.rename(f, f"{base}.{new_ext}")
        print(f"\n{GREEN}Extension replaced for {len(files)} files!{RESET}")
    except OSError as err:
        log_error("Bulk extension conversion failed.", err)
    get_input("Press Enter to continue...")

def change_extensions_sequential() -> None:
    """Renames specific files sequentially (index1.php, index2.php)."""
    old_ext: str = get_input("Enter old extension (without dot): ")
    new_ext: str = get_input("Enter new extension (without dot): ")
    try:
        files = [f for f in os.listdir('.') if f.endswith(f".{old_ext}") and os.path.isfile(f)]
        for idx, f in enumerate(files, 1):
            os.rename(f, f"index{idx}.{new_ext}")
        print(f"\n{GREEN}Sequentially renamed {len(files)} files to: indexX.{new_ext}{RESET}")
    except OSError as err:
        log_error("Sequential renaming failed.", err)
    get_input("Press Enter to continue...")

def convert_all_to_txt() -> None:
    """Converts non-script files in the current working directory to .txt extension."""
    if get_input("Convert non-script files in current folder to .txt? Type YES: ") != "YES":
        get_input(f"{YELLOW}Operation canceled. Press Enter...{RESET}")
        return
    protected_exts = {".txt", ".bat", ".ps1", ".py", ".js", ".php", ".json", ".md", ".html", ".reg", ".log"}
    try:
        files = [
            f for f in os.listdir('.')
            if os.path.isfile(f) and os.path.splitext(f)[1].lower() not in protected_exts and f != ".gitignore"
        ]
        for f in files:
            base, _ = os.path.splitext(f)
            os.rename(f, f"{base}.txt")
        print(f"\n{GREEN}Renamed {len(files)} files to '.txt' (scripts/docs protected)!{RESET}")
    except OSError as err:
        log_error("Failed renaming all files.", err)
    get_input("Press Enter to continue...")

def file_operations_menu() -> None:
    """Handles the menu navigation for advanced file operations."""
    while True:
        print_header("ADVANCED FILE OPERATIONS")
        print("1. Copy File")
        print("2. Move Text Files (*.txt) to WebProject Folder")
        print(f"3. Search & Backup Files (Search by extension recursively to {config['default_backup_dir']}/)")
        print("4. Batch Rename Loop (mac-osx-command-line-terminal-X-638.jpg -> X.jpg)")
        print("5. Bulk Change File Extensions (e.g. *.js -> *.php)")
        print("6. Bulk Change Extensions (Sequentially rename files, e.g. *.js -> index1.php)")
        print("7. Change All Extensions to .txt (*.* -> *.txt)")
        print("8. Back to Main Menu\n")
        
        choice: str = get_input("Select an option (1-8): ")
        if choice == "1":
            copy_file_suite()
        elif choice == "2":
            move_text_files()
        elif choice == "3":
            search_backup_suite()
        elif choice == "4":
            rename_osx_images()
        elif choice == "5":
            change_extensions_bulk()
        elif choice == "6":
            change_extensions_sequential()
        elif choice == "7":
            convert_all_to_txt()
        elif choice == "8":
            break
        else:
            get_input(f"{RED}Invalid option. Press Enter to retry...{RESET}")

def _launch_msc_guarded(msc_name: str, fallback_cmd: Optional[str] = None, notice: str = "") -> None:
    """Opens a Windows MSC snap-in if present in System32, or runs fallback gracefully."""
    sys32 = os.path.join(os.environ.get("SystemRoot", r"C:\Windows"), "System32", msc_name)
    if os.path.exists(sys32):
        os.system(f"start {msc_name}")
    elif fallback_cmd:
        print(f"{YELLOW}{notice}{RESET}")
        os.system(f"start {fallback_cmd}")
    else:
        print(f"{YELLOW}{notice or msc_name + ' is not available on this Windows edition.'}{RESET}")
        get_input("Press Enter to continue...")


# --- Category 4: Administrative Shortcut Launchers ---
def shortcuts_menu() -> None:
    """Launches various administrative control panels."""
    while True:
        print_header("WINDOWS ADMINISTRATIVE SHORTCUTS")
        print("1. Control Panel")
        print("2. Windows Services (services.msc)")
        print("3. Add/Remove Programs (appwiz.cpl)")
        print("4. Registry Editor (regedit)")
        print("5. Windows Terminal / Command Prompt")
        print("6. Local Users and Groups (lusrmgr.msc / netplwiz)")
        print("7. Disk Management (diskmgmt.msc)")
        print("8. Computer Management Console (compmgmt.msc)")
        print("9. Desktop Icon Settings")
        print("10. Group Policy Editor (gpedit.msc)")
        print("11. Network Connections Manager (ncpa.cpl)")
        print("12. Environment Variables Editor")
        print("13. System Properties (Advanced Tab)")
        print("14. Back to Main Menu\n")
        
        choice: str = get_input("Select a system shortcut (1-14): ")
        try:
            if choice == "1":
                os.system("start control")
            elif choice == "2":
                os.system("start services.msc")
            elif choice == "3":
                os.system("start appwiz.cpl")
            elif choice == "4":
                os.system("start regedit")
            elif choice == "5":
                subprocess.Popen("wt.exe" if shutil.which("wt.exe") else "cmd.exe")
            elif choice == "6":
                _launch_msc_guarded("lusrmgr.msc", "netplwiz", "lusrmgr.msc unavailable on Home edition; opening netplwiz...")
            elif choice == "7":
                os.system("start diskmgmt.msc")
            elif choice == "8":
                os.system("start compmgmt.msc")
            elif choice == "9":
                os.system("start rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0")
            elif choice == "10":
                _launch_msc_guarded("gpedit.msc", None, "gpedit.msc is only included in Windows Pro/Enterprise editions.")
            elif choice == "11":
                os.system("start ncpa.cpl")
            elif choice == "12":
                os.system("start rundll32.exe sysdm.cpl,EditEnvironmentVariables")
            elif choice == "13":
                os.system("start rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3")
            elif choice == "14":
                break
            else:
                get_input(f"{RED}Invalid option. Press Enter to retry...{RESET}")
        except Exception as err:
            log_error(f"Failed to open administrative panel choice: {choice}", err)

# --- Category 5: System Applications & Cache Directories ---
def _first_existing(paths: List[str]) -> Optional[str]:
    for p in paths:
        if p and os.path.exists(p):
            return p
    return None


def apps_menu() -> None:
    """Launches local system applications or file explorer directories."""
    while True:
        print_header("APPLICATIONS & CACHE SYSTEM")
        print("1. Open Google Chrome")
        print("2. Open Microsoft Edge")
        print("3. Open Mozilla Firefox")
        print("4. Open Opera")
        print("5. Open Terminal / Command Prompt (Admin)")
        print("6. Open Notepad")
        print("7. Open Notepad++")
        print("8. Open Sublime Text")
        print("9. Open Visual Studio Code")
        print("10. Open Phoenix Code")
        print("11. Open Microsoft Word")
        print("12. Open Microsoft Excel")
        print("13. Open Adobe Photoshop")
        print("14. Open Git Bash")
        print("15. Open PowerShell (7+ or 5.1)")
        print("16. Open Deluge Torrent Client")
        print("17. Open Temp Directory")
        print("18. Open Local AppData Directory")
        print("19. Open Downloads Directory")
        print("20. Back to Main Menu\n")
        
        choice: str = get_input("Select an option (1-20): ")
        try:
            if choice == "1":
                webbrowser.open("https://www.google.com")
            elif choice == "2":
                os.system("start msedge https://www.google.com")
            elif choice == "3":
                os.system("start firefox")
            elif choice == "4":
                opera = _first_existing([
                    os.path.expandvars(r"%LocalAppData%\Programs\Opera\opera.exe"),
                    r"C:\Program Files\Opera\launcher.exe",
                ])
                if opera:
                    subprocess.Popen(opera)
                else:
                    os.system("start opera")
            elif choice == "5":
                term = "wt.exe" if shutil.which("wt.exe") else "cmd"
                subprocess.Popen(f'powershell -NoProfile -Command "Start-Process {term} -Verb RunAs"', shell=True)
            elif choice == "6":
                subprocess.Popen("notepad.exe")
            elif choice == "7":
                npp = r"C:\Program Files\Notepad++\notepad++.exe"
                if os.path.exists(npp):
                    subprocess.Popen(npp)
                else:
                    print(f"{RED}Notepad++ not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "8":
                subl = r"C:\Program Files\Sublime Text\sublime_text.exe"
                if os.path.exists(subl):
                    subprocess.Popen(subl)
                else:
                    print(f"{RED}Sublime Text not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "9":
                code_bin = shutil.which("code") or _first_existing([
                    os.path.expandvars(r"%LocalAppData%\Programs\Microsoft VS Code\Code.exe"),
                    r"C:\Program Files\Microsoft VS Code\Code.exe",
                ])
                if code_bin:
                    subprocess.Popen(code_bin, shell=code_bin.lower().endswith(".cmd"))
                else:
                    print(f"{RED}VS Code not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "10":
                phoenix = os.path.expandvars(r"%LocalAppData%\Phoenix Code\Phoenix Code.exe")
                if os.path.exists(phoenix):
                    subprocess.Popen(phoenix)
                else:
                    print(f"{RED}Phoenix Code not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "11":
                os.system("start winword")
            elif choice == "12":
                os.system("start excel")
            elif choice == "13":
                ps_matches = sorted(glob.glob(r"C:\Program Files\Adobe\Adobe Photoshop *\Photoshop.exe"), reverse=True)
                if ps_matches:
                    subprocess.Popen(ps_matches[0])
                else:
                    print(f"{RED}Photoshop not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "14":
                git_bash = r"C:\Program Files\Git\git-bash.exe"
                if os.path.exists(git_bash):
                    subprocess.Popen(git_bash)
                else:
                    print(f"{RED}Git Bash not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "15":
                subprocess.Popen("pwsh.exe" if shutil.which("pwsh.exe") else "powershell.exe")
            elif choice == "16":
                deluge = r"C:\Program Files\Deluge\deluge.exe"
                if os.path.exists(deluge):
                    subprocess.Popen(deluge)
                else:
                    print(f"{RED}Deluge not found!{RESET}")
                    get_input("Press Enter to continue...")
            elif choice == "17":
                temp = os.environ.get('TEMP')
                if temp:
                    os.startfile(temp)
            elif choice == "18":
                local_app = os.environ.get('LOCALAPPDATA')
                if local_app:
                    os.startfile(local_app)
            elif choice == "19":
                downloads = os.path.join(os.path.expanduser('~'), 'Downloads')
                if os.path.exists(downloads):
                    os.startfile(downloads)
            elif choice == "20":
                break
            else:
                get_input(f"{RED}Invalid option. Press Enter to retry...{RESET}")
        except Exception as err:
            log_error(f"Error launching application/folder: {choice}", err)

# --- Category 6: System Diagnostics & Exporters ---
def export_env_variables() -> None:
    """Exports current environment settings to output.txt."""
    try:
        with open("output.txt", 'w', encoding='utf-8') as out:
            for key, val in sorted(os.environ.items()):
                out.write(f"{key}={val}\n")
        print(f"\n{GREEN}Environment variables saved to output.txt!{RESET}")
    except IOError as err:
        log_error("Could not write environment output.", err)
    get_input("Press Enter to continue...")

def export_program_list() -> None:
    """Exports installed 64-bit, 32-bit, and per-user Windows software from Registry."""
    try:
        entries: List[str] = []
        if sys.platform == "win32":
            import winreg
            targets = [
                (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", winreg.KEY_READ | winreg.KEY_WOW64_64KEY),
                (winreg.HKEY_LOCAL_MACHINE, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", winreg.KEY_READ | winreg.KEY_WOW64_32KEY),
                (winreg.HKEY_CURRENT_USER, r"SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall", winreg.KEY_READ),
            ]
            seen = set()
            for hive, subkey, access in targets:
                try:
                    with winreg.OpenKey(hive, subkey, 0, access) as key:
                        for idx in range(winreg.QueryInfoKey(key)[0]):
                            name = winreg.EnumKey(key, idx)
                            with winreg.OpenKey(key, name) as sk:
                                try:
                                    disp = str(winreg.QueryValueEx(sk, "DisplayName")[0]).strip()
                                except OSError:
                                    continue
                                ver = ""
                                try:
                                    ver = str(winreg.QueryValueEx(sk, "DisplayVersion")[0]).strip()
                                except OSError:
                                    pass
                                row = f"{disp} ({ver})" if ver else disp
                                if row not in seen:
                                    seen.add(row)
                                    entries.append(row)
                except OSError:
                    continue
        entries.sort(key=str.lower)
        with open("AllProgramFilesListing.txt", 'w', encoding='utf-8') as out:
            out.write("--- Installed Applications (64-bit / 32-bit / User) ---\n")
            out.write("\n".join(entries))
        print(f"\n{GREEN}Exported {len(entries)} installed programs to AllProgramFilesListing.txt!{RESET}")
    except OSError as err:
        log_error("Failed to export program listing.", err)
    get_input("Press Enter to continue...")

def export_dir_listing() -> None:
    """Recursively lists all files inside configured app directory and writes to Listing.txt."""
    app_dir = os.path.join(os.getcwd(), config["app_template_dir"])
    if not os.path.exists(app_dir):
        get_input(f"{RED}'{config['app_template_dir']}' folder does not exist! Please create it via the Web Templates menu.{RESET}")
        return
    try:
        with open("Listing.txt", 'w', encoding='utf-8') as out:
            out.write(f"--- Recursive Directory Listing of: {app_dir} ---\n")
            for root, _, files in os.walk(app_dir):
                for f in files:
                    out.write(f"{os.path.join(root, f)}\n")
        print(f"\n{GREEN}Directory structure of '{config['app_template_dir']}' exported to Listing.txt!{RESET}")
    except OSError as err:
        log_error("Failed compiling app directory listing.", err)
    get_input("Press Enter to continue...")

def launch_admin_cmd() -> None:
    """Opens Windows Terminal or Command Prompt elevated as Administrator."""
    try:
        if shutil.which("wt.exe"):
            subprocess.Popen(f'powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList \'-d\', \'\\"{os.getcwd()}\\"\' -Verb RunAs"', shell=True)
        else:
            subprocess.Popen(f'powershell -NoProfile -Command "Start-Process cmd -ArgumentList \'/K cd /d \\"{os.getcwd()}\\"\' -Verb RunAs"', shell=True)
    except Exception as err:
        log_error("Failed opening admin shell.", err)

def diagnostics_menu() -> None:
    """Handles the menu navigation for system diagnostic tools."""
    while True:
        print_header("SYSTEM DIAGNOSTICS & EXPORTERS")
        print("1. Export Environment Variables to 'output.txt'")
        print("2. Export Installed Program List to 'AllProgramFilesListing.txt'")
        print(f"3. Export Directory Listing of '{config['app_template_dir']}' to 'Listing.txt'")
        print("4. Open Elevated Terminal / CMD at Current Location")
        print("5. Back to Main Menu\n")
        
        choice: str = get_input("Select an option (1-5): ")
        if choice == "1":
            export_env_variables()
        elif choice == "2":
            export_program_list()
        elif choice == "3":
            export_dir_listing()
        elif choice == "4":
            launch_admin_cmd()
        elif choice == "5":
            break
        else:
            get_input(f"{RED}Invalid option. Press Enter to retry...{RESET}")

# --- Runner Loop ---
def main() -> None:
    """Main terminal loop orchestrating categories and choices."""
    while True:
        Show_MainMenu()
        opt: str = get_input("Select a utility category (1-7): ")
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
            print(f"\n{GREEN}Goodbye!{RESET}")
            sys.exit(0)
        else:
            get_input(f"{RED}Invalid choice! Press Enter to continue...{RESET}")

def Show_MainMenu() -> None:
    """Prints the centralized menu grid UI."""
    os.system("cls" if os.name == "nt" else "clear")
    print(f"{CYAN}┌────────────────────────────────────────────────────────┐")
    print(f"│ {GREEN}       ELITE FILE & SYSTEM UTILITY SUITE v2.1     {CYAN} │")
    print(f"├────────────────────────────────────────────────────────┤")
    print(f"│  1. Web Templates & Site Creators                      │")
    print(f"│  2. File & Folder Creators                             │")
    print(f"│  3. Advanced File Operations                           │")
    print(f"│  4. Windows System Administrative Tools                │")
    print(f"│  5. System Applications & Cache Directories            │")
    print(f"│  6. System Diagnostics & Exporters                     │")
    print(f"│  7. Exit                                               │")
    print(f"{CYAN}└────────────────────────────────────────────────────────┘\n")

if __name__ == "__main__":
    main()
