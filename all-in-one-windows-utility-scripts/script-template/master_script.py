# -*- coding: utf-8 -*-
"""
Modern Windows 11 Utility Master Script (Python 3 Edition)

Cross-language administrative starter template using ctypes UAC elevation,
Win11 CIM diagnostics, self-contained context menu registry registration,
safe confirmation prompts, and modern temp cache cleanup.
"""

import ctypes
import datetime
import os
import platform
import shutil
import subprocess
import sys
import time
import webbrowser


def is_admin() -> bool:
    if os.name != "nt":
        return False
    try:
        return bool(ctypes.windll.shell32.IsUserAnAdmin())
    except Exception:
        return False


def elevate() -> None:
    if os.name != "nt":
        print("This administrative template targets Windows 11/10 hosts.")
        return
    if not is_admin():
        print("============================================================")
        print("          ADMINISTRATIVE PRIVILEGES REQUIRED")
        print("============================================================")
        print("Requesting UAC elevation...")
        params = " ".join(f'"{arg}"' for arg in sys.argv)
        ctypes.windll.shell32.ShellExecuteW(None, "runas", sys.executable, params, None, 1)
        sys.exit(0)


if sys.platform == "win32":
    kernel32 = ctypes.windll.kernel32
    kernel32.SetConsoleMode(kernel32.GetStdHandle(-11), 7)

CYAN = "\033[96m"
YELLOW = "\033[93m"
GREEN = "\033[92m"
RED = "\033[91m"
GRAY = "\033[90m"
RESET = "\033[0m"


def print_header(title: str) -> None:
    os.system("cls" if os.name == "nt" else "clear")
    print(f"{CYAN}===================================================================={RESET}")
    print(f"  {title}")
    print(f"{CYAN}===================================================================={RESET}")


def main_menu() -> None:
    print_header("MODERN WINDOWS 11 UTILITY MASTER SCRIPT (PYTHON)")
    print(f" {YELLOW}[1] SYSTEM & INFO TOOLS{RESET}")
    print("     1A. OS Version, Build & Current Date/Time")
    print("     1B. View System PATH & Environment Variables")
    print("     1C. Create System Restore Point")
    print(f" {YELLOW}[2] NETWORK DIAGNOSTICS & UTILITIES{RESET}")
    print("     2A. Reset Network Stack (IP, DNS Cache, Winsock)")
    print("     2B. Ping Diagnostic Test (Loopback, 1.1.1.1, Custom Host)")
    print("     2C. Mount Network Share (UNC Path Prompt)")
    print("     2D. Unmount All Mapped Network Drives (with Confirmation)")
    print("     2E. Default Gateway & Captive Portal Diagnostics")
    print(f" {YELLOW}[3] SYSTEM MAINTENANCE & SERVICES{RESET}")
    print("     3A. Clear & Restart Print Spooler")
    print("     3B. Enable & Start Windows Update Service (wuauserv)")
    print("     3C. Stop & Disable Windows Update Service (wuauserv)")
    print("     3D. Clean Modern User & System Temp Caches")
    print("     3E. Check Windows Activation Status (CIM)")
    print("     3F. Install 'Open Admin Terminal Here' Context Menu")
    print("     3G. Uninstall 'Open Admin Terminal Here' Context Menu")
    print("     3H. Install 'Take Ownership' Context Menu")
    print("     3I. Uninstall 'Take Ownership' Context Menu")
    print(f" {YELLOW}[4] APPLICATION LAUNCHER{RESET}")
    print("     4A. Quick Launch Utilities & Settings Menu")
    print(f" {YELLOW}[5] SYSTEM POWER{RESET}")
    print("     5R. Schedule System Restart (30s with Confirmation)")
    print("     5A. Abort Scheduled Restart (shutdown /a)")
    print("     E.  Exit")
    print(f"{CYAN}===================================================================={RESET}")


def get_input(prompt: str) -> str:
    try:
        return input(prompt).strip()
    except (KeyboardInterrupt, EOFError):
        return "E"


def run_cmd(cmd: list[str] | str, shell: bool = False) -> tuple[int, str, str]:
    try:
        res = subprocess.run(cmd, shell=shell, text=True, capture_output=True)
        return res.returncode, res.stdout, res.stderr
    except Exception as exc:
        return -1, "", str(exc)


def clean_folder(folder: str) -> int:
    if not folder or not os.path.isdir(folder):
        return 0
    removed = 0
    for name in os.listdir(folder):
        target = os.path.join(folder, name)
        try:
            if os.path.isfile(target) or os.path.islink(target):
                os.unlink(target)
                removed += 1
            elif os.path.isdir(target):
                shutil.rmtree(target)
                removed += 1
        except Exception:
            pass
    return removed


def reg_add(key: str, val_name: str | None, data: str) -> None:
    cmd = ["reg.exe", "add", key]
    if val_name is None:
        cmd.append("/ve")
    else:
        cmd.extend(["/v", val_name])
    cmd.extend(["/d", data, "/f"])
    run_cmd(cmd)


def reg_delete(key: str) -> None:
    run_cmd(["reg.exe", "delete", key, "/f"])


def app_launcher_menu() -> None:
    while True:
        print_header("MODERN APPLICATION LAUNCHER")
        print(" [1] Notepad | [2] Windows Terminal / CMD | [3] Windows Settings")
        print(" [4] Temp Folder | [5] HTTPS Default Browser | [6] Back")
        choice = get_input("Select (1-6): ")
        if choice == "1":
            subprocess.Popen(["notepad.exe"])
        elif choice == "2":
            term = "wt.exe" if shutil.which("wt.exe") else "cmd.exe"
            subprocess.Popen([term])
        elif choice == "3":
            os.startfile("ms-settings:")
        elif choice == "4":
            temp = os.environ.get("TEMP")
            if temp:
                os.startfile(temp)
        elif choice == "5":
            webbrowser.open("https://www.google.com")
        elif choice == "6":
            break


def run() -> None:
    elevate()
    while True:
        main_menu()
        choice = get_input("Select an option (e.g. 1A, 2B, 3E, 4A, 5R, 5A, E): ").upper()
        if choice == "E":
            print(f"{GREEN}Goodbye!{RESET}")
            time.sleep(0.5)
            break

        if choice == "1A":
            print_header("SYSTEM & CLOCK INFO")
            print(f"Host: {platform.node()} | OS: {platform.platform()}")
            print(f"Now : {datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
        elif choice == "1B":
            print_header("PATH & ENVIRONMENT VARIABLES")
            for p in os.environ.get("PATH", "").split(";"):
                if p:
                    print(" ", p)
            print()
            for k, v in sorted(os.environ.items()):
                print(f"{k} = {v}")
        elif choice == "1C":
            print_header("CREATE SYSTEM RESTORE POINT")
            rc, out, err = run_cmd([
                "powershell.exe", "-NoProfile", "-Command",
                "Checkpoint-Computer -Description 'Windows Utility Restore Point' -RestorePointType MODIFY_SETTINGS -ErrorAction Stop",
            ])
            print(f"{GREEN}[OK] Restore point created.{RESET}" if rc == 0 else f"{YELLOW}[WARNING] {err.strip() or out.strip()}{RESET}")
        elif choice == "2A":
            print_header("RESET NETWORK STACK")
            for args in (
                ["ipconfig", "/release"], ["ipconfig", "/renew"], ["ipconfig", "/flushdns"],
                ["ipconfig", "/registerdns"], ["netsh", "winsock", "reset"], ["netsh", "int", "ip", "reset"],
            ):
                run_cmd(args)
            print(f"{GREEN}[OK] Network stack reset completed.{RESET}")
        elif choice == "2B":
            print_header("PING DIAGNOSTICS")
            subprocess.run(["ping", "127.0.0.1", "-n", "3"])
            subprocess.run(["ping", "1.1.1.1", "-n", "3"])
            custom = get_input("Enter custom host/IP (Enter to skip): ")
            if custom:
                subprocess.run(["ping", custom, "-n", "4"])
        elif choice == "2C":
            print_header("MOUNT NETWORK SHARE")
            share = get_input(r"Enter UNC share (e.g. \\SERVER\ShareName): ")
            if share:
                rc, out, err = run_cmd(["net", "use", "*", share, "/persistent:yes"])
                print(out.strip() if rc == 0 else f"{RED}{err.strip()}{RESET}")
        elif choice == "2D":
            print_header("UNMOUNT ALL NETWORK DRIVES")
            if get_input("Disconnect ALL mapped drives? [Y/N]: ").upper() == "Y":
                _, out, _ = run_cmd(["net", "use", "*", "/delete", "/y"])
                print(out.strip())
        elif choice == "2E":
            print_header("GATEWAY & PORTAL DIAGNOSTICS")
            _, out, _ = run_cmd([
                "powershell.exe", "-NoProfile", "-Command",
                "Get-NetRoute -DestinationPrefix '0.0.0.0/0' -ErrorAction SilentlyContinue | Sort-Object RouteMetric | Select-Object -First 1 -ExpandProperty NextHop",
            ])
            gw = out.strip()
            if gw:
                print(f"Default Gateway: {CYAN}{gw}{RESET}")
                subprocess.run(["ping", gw, "-n", "2"])
            else:
                print(f"{YELLOW}No active IPv4 default gateway found.{RESET}")
            portal = get_input("Enter router/portal URL to open (Enter to skip): ")
            if portal:
                webbrowser.open(portal)
        elif choice == "3A":
            print_header("RESTART PRINT SPOOLER")
            run_cmd(["net", "stop", "spooler"])
            spool = os.path.join(os.environ.get("SystemRoot", r"C:\Windows"), "System32", "spool", "PRINTERS")
            cleaned = clean_folder(spool)
            run_cmd(["net", "start", "spooler"])
            print(f"{GREEN}[OK] Cleared {cleaned} queued spool item(s) and restarted spooler.{RESET}")
        elif choice == "3B":
            run_cmd(["sc", "config", "wuauserv", "start=", "auto"])
            run_cmd(["net", "start", "wuauserv"])
            print(f"{GREEN}[OK] Windows Update enabled and started.{RESET}")
        elif choice == "3C":
            run_cmd(["net", "stop", "wuauserv"])
            run_cmd(["sc", "config", "wuauserv", "start=", "disabled"])
            print(f"{GREEN}[OK] Windows Update stopped and disabled.{RESET}")
        elif choice == "3D":
            print_header("CLEAN TEMP CACHES")
            u_count = clean_folder(os.environ.get("TEMP", ""))
            s_count = clean_folder(os.path.join(os.environ.get("SystemRoot", r"C:\Windows"), "Temp"))
            print(f"{GREEN}[OK] Removed {u_count + s_count} temp entries (locked files skipped safely).{RESET}")
        elif choice == "3E":
            print_header("WINDOWS ACTIVATION STATUS (CIM)")
            ps_script = (
                "$lic = Get-CimInstance SoftwareLicensingProduct -Filter \"ApplicationID='55c92734-d682-4d71-983e-d6ec3f16059f' AND PartialProductKey IS NOT NULL\"; "
                "if ($lic) { $map = @{0='Unlicensed';1='Licensed';2='OOB Grace';3='OOT Grace';4='Non-Genuine';5='Notification';6='Extended Grace'}; "
                "$lic | ForEach-Object { \"$($_.Name) | $($_.Description) | Key:*$($_.PartialProductKey) | $($map[[int]$_.LicenseStatus])\" } }"
            )
            _, out, _ = run_cmd(["powershell.exe", "-NoProfile", "-Command", ps_script])
            print(out.strip() or "No licensing info returned.")
        elif choice == "3F":
            has_wt = shutil.which("wt.exe") is not None
            cmd_val = (
                'powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList \'-d\', \'%V\' -Verb RunAs"'
                if has_wt
                else 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList \'/s /k pushd\', \'%V\' -Verb RunAs"'
            )
            for root_k in (r"HKCR\Directory\shell\OpenAdminTerminal", r"HKCR\Directory\Background\shell\OpenAdminTerminal"):
                reg_add(root_k, None, "Open Admin Terminal Here")
                reg_add(root_k, "Icon", "cmd.exe")
                reg_add(root_k + r"\command", None, cmd_val)
            print(f"{GREEN}[OK] Context menu installed cleanly.{RESET}")
        elif choice == "3G":
            reg_delete(r"HKCR\Directory\shell\OpenAdminTerminal")
            reg_delete(r"HKCR\Directory\Background\shell\OpenAdminTerminal")
            print(f"{GREEN}[OK] Context menu removed.{RESET}")
        elif choice == "3H":
            f_cmd = r'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList \'/c takeown /f \"%1\" && icacls \"%1\" /grant Administrators:F /c\' -Verb RunAs -WindowStyle Hidden"'
            d_cmd = r'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList \'/c takeown /f \"%1\" /r /d y && icacls \"%1\" /grant Administrators:F /t /c\' -Verb RunAs -WindowStyle Hidden"'
            reg_add(r"HKCR\*\shell\TakeOwnership", None, "Take Ownership (Admin)")
            reg_add(r"HKCR\*\shell\TakeOwnership\command", None, f_cmd)
            reg_add(r"HKCR\Directory\shell\TakeOwnership", None, "Take Ownership (Admin)")
            reg_add(r"HKCR\Directory\shell\TakeOwnership\command", None, d_cmd)
            print(f"{GREEN}[OK] 'Take Ownership' context menu installed.{RESET}")
        elif choice == "3I":
            reg_delete(r"HKCR\*\shell\TakeOwnership")
            reg_delete(r"HKCR\Directory\shell\TakeOwnership")
            print(f"{GREEN}[OK] 'Take Ownership' context menu removed.{RESET}")
        elif choice == "4A":
            app_launcher_menu()
            continue
        elif choice in ("5R", "R"):
            if get_input("Type YES to confirm system reboot in 30s: ") == "YES":
                run_cmd(["shutdown", "/r", "/t", "30", "/f", "/c", "Python Master Script: Scheduled reboot."])
                print(f"{YELLOW}Reboot scheduled (use 5A or 'shutdown /a' to abort).{RESET}")
        elif choice == "5A":
            run_cmd(["shutdown", "/a"])
            print(f"{GREEN}Sent shutdown /a abort signal.{RESET}")
        else:
            print(f"{RED}Invalid selection.{RESET}")
            time.sleep(0.8)
            continue

        get_input("\nPress Enter to return to menu...")


if __name__ == "__main__":
    run()
