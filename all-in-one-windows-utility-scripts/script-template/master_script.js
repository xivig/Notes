#!/usr/bin/env node
/**
 * Modern Windows 11 Utility Master Script (Node.js 18+ Edition)
 * Self-contained UAC administrative template with CIM diagnostics and safe prompts.
 */

const { exec, execFile, execSync, spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');
const readline = require('readline');

// 1. Check UAC Administrator Privileges (Windows)
if (process.platform === 'win32') {
    try {
        execSync('net session', { stdio: 'ignore' });
    } catch {
        console.log('Requesting UAC elevation...');
        const args = process.argv.slice(1).map((a) => `"${a}"`).join(' ');
        try {
            execSync(`powershell -NoProfile -Command "Start-Process node -ArgumentList '${args}' -Verb RunAs"`);
        } catch (err) {
            console.error('Elevation declined or failed:', err.message);
        }
        process.exit(0);
    }
}

const CYAN = '\x1b[36m';
const YELLOW = '\x1b[33m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const RESET = '\x1b[0m';

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (ans) => res(ans.trim())));

function printHeader(title) {
    console.clear();
    console.log(`${CYAN}====================================================================${RESET}`);
    console.log(`  ${title}`);
    console.log(`${CYAN}====================================================================${RESET}`);
}

function showMenu() {
    printHeader('MODERN WINDOWS 11 UTILITY MASTER SCRIPT (NODE.JS)');
    console.log(` ${YELLOW}[1] SYSTEM & INFO TOOLS${RESET}`);
    console.log('     1A. OS Version, Host & Date/Time');
    console.log('     1B. View System PATH & Environment Variables');
    console.log('     1C. Create System Restore Point');
    console.log(` ${YELLOW}[2] NETWORK DIAGNOSTICS & UTILITIES${RESET}`);
    console.log('     2A. Reset Network Stack (IP, DNS Cache, Winsock)');
    console.log('     2B. Ping Diagnostic Test (Loopback, 1.1.1.1, Custom Host)');
    console.log('     2C. Mount Network Share (UNC Path Prompt)');
    console.log('     2D. Unmount All Mapped Network Drives (with Confirmation)');
    console.log('     2E. Default Gateway & Captive Portal Diagnostics');
    console.log(` ${YELLOW}[3] SYSTEM MAINTENANCE & SERVICES${RESET}`);
    console.log('     3A. Clear & Restart Print Spooler');
    console.log('     3B. Enable & Start Windows Update Service (wuauserv)');
    console.log('     3C. Stop & Disable Windows Update Service (wuauserv)');
    console.log('     3D. Clean Modern User & System Temp Caches');
    console.log('     3E. Check Windows Activation Status (CIM)');
    console.log("     3F. Install 'Open Admin Terminal Here' Context Menu");
    console.log("     3G. Uninstall 'Open Admin Terminal Here' Context Menu");
    console.log("     3H. Install 'Take Ownership' Context Menu");
    console.log("     3I. Uninstall 'Take Ownership' Context Menu");
    console.log(` ${YELLOW}[4] APPLICATION LAUNCHER${RESET}`);
    console.log('     4A. Quick Launch Utilities & Windows Settings Menu');
    console.log(` ${YELLOW}[5] SYSTEM POWER${RESET}`);
    console.log('     5R. Schedule System Restart (30s with Confirmation)');
    console.log('     5A. Abort Scheduled Restart (shutdown /a)');
    console.log('     E.  Exit');
    console.log(`${CYAN}====================================================================${RESET}`);
}

function runExecFile(bin, args = []) {
    return new Promise((resolve) => {
        execFile(bin, args, { windowsHide: true }, (err, stdout, stderr) => {
            resolve({ code: err ? err.code || 1 : 0, stdout: stdout || '', stderr: stderr || '' });
        });
    });
}

function cleanFolder(dir) {
    if (!dir || !fs.existsSync(dir)) return 0;
    let count = 0;
    for (const entry of fs.readdirSync(dir)) {
        const target = path.join(dir, entry);
        try {
            fs.rmSync(target, { recursive: true, force: true });
            count += 1;
        } catch {
            // Skip files currently locked by active processes
        }
    }
    return count;
}

function hasWt() {
    try {
        execSync('where wt.exe', { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

async function appLauncherMenu() {
    while (true) {
        printHeader('MODERN APPLICATION LAUNCHER');
        console.log(' [1] Notepad | [2] Windows Terminal / CMD | [3] Windows Settings');
        console.log(' [4] Temp Folder | [5] HTTPS Default Browser | [6] Back');
        const c = await ask('Select (1-6): ');
        if (c === '1') spawn('notepad.exe', [], { detached: true, stdio: 'ignore' }).unref();
        else if (c === '2') spawn(hasWt() ? 'wt.exe' : 'cmd.exe', [], { detached: true, stdio: 'ignore' }).unref();
        else if (c === '3') exec('start ms-settings:');
        else if (c === '4') exec(`explorer "${process.env.TEMP || os.tmpdir()}"`);
        else if (c === '5') exec('start "" "https://www.google.com"');
        else if (c === '6') break;
    }
}

async function start() {
    while (true) {
        showMenu();
        const choice = (await ask('Select an option: ')).toUpperCase();
        if (choice === 'E') {
            console.log(`${GREEN}Goodbye!${RESET}`);
            rl.close();
            process.exit(0);
        }

        if (choice === '1A') {
            printHeader('SYSTEM & CLOCK INFO');
            console.log(`Host: ${os.hostname()} | Platform: ${os.type()} ${os.release()}`);
            console.log(`Now : ${new Date().toString()}`);
        } else if (choice === '1B') {
            printHeader('PATH & ENVIRONMENT VARIABLES');
            (process.env.PATH || '').split(';').filter(Boolean).forEach((p) => console.log(' ', p));
            console.log();
            Object.keys(process.env).sort().forEach((k) => console.log(`${k} = ${process.env[k]}`));
        } else if (choice === '1C') {
            printHeader('CREATE SYSTEM RESTORE POINT');
            const r = await runExecFile('powershell.exe', [
                '-NoProfile', '-Command',
                "Checkpoint-Computer -Description 'Windows Utility Restore Point' -RestorePointType MODIFY_SETTINGS -ErrorAction Stop",
            ]);
            console.log(r.code === 0 ? `${GREEN}[OK] Restore point created.${RESET}` : `${YELLOW}${r.stderr.trim()}${RESET}`);
        } else if (choice === '2A') {
            printHeader('RESET NETWORK STACK');
            for (const [b, a] of [
                ['ipconfig', ['/release']], ['ipconfig', ['/renew']], ['ipconfig', ['/flushdns']],
                ['ipconfig', ['/registerdns']], ['netsh', ['winsock', 'reset']], ['netsh', ['int', 'ip', 'reset']],
            ]) {
                await runExecFile(b, a);
            }
            console.log(`${GREEN}[OK] Network stack reset completed.${RESET}`);
        } else if (choice === '2B') {
            printHeader('PING DIAGNOSTICS');
            console.log((await runExecFile('ping', ['127.0.0.1', '-n', '3'])).stdout);
            console.log((await runExecFile('ping', ['1.1.1.1', '-n', '3'])).stdout);
            const host = await ask('Enter custom host/IP (Enter to skip): ');
            if (host) console.log((await runExecFile('ping', [host, '-n', '4'])).stdout);
        } else if (choice === '2C') {
            printHeader('MOUNT NETWORK SHARE');
            const share = await ask('Enter UNC share path (e.g. \\\\SERVER\\ShareName): ');
            if (share) {
                const r = await runExecFile('net', ['use', '*', share, '/persistent:yes']);
                console.log(r.code === 0 ? `${GREEN}${r.stdout.trim()}${RESET}` : `${RED}${r.stderr.trim()}${RESET}`);
            }
        } else if (choice === '2D') {
            printHeader('UNMOUNT NETWORK DRIVES');
            if ((await ask('Disconnect ALL mapped drives? [Y/N]: ')).toUpperCase() === 'Y') {
                const r = await runExecFile('net', ['use', '*', '/delete', '/y']);
                console.log(r.stdout.trim() || 'Done.');
            }
        } else if (choice === '2E') {
            printHeader('GATEWAY & PORTAL DIAGNOSTICS');
            const r = await runExecFile('powershell.exe', [
                '-NoProfile', '-Command',
                "Get-NetRoute -DestinationPrefix '0.0.0.0/0' -ErrorAction SilentlyContinue | Sort-Object RouteMetric | Select-Object -First 1 -ExpandProperty NextHop",
            ]);
            const gw = r.stdout.trim();
            if (gw) {
                console.log(`Default Gateway: ${CYAN}${gw}${RESET}`);
                console.log((await runExecFile('ping', [gw, '-n', '2'])).stdout);
            }
            const portal = await ask('Enter router/portal URL to open (Enter to skip): ');
            if (portal) exec(`start "" "${portal}"`);
        } else if (choice === '3A') {
            await runExecFile('net', ['stop', 'spooler']);
            const cleaned = cleanFolder(path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'spool', 'PRINTERS'));
            await runExecFile('net', ['start', 'spooler']);
            console.log(`${GREEN}[OK] Cleared ${cleaned} spool item(s) and restarted spooler.${RESET}`);
        } else if (choice === '3B') {
            await runExecFile('sc', ['config', 'wuauserv', 'start=', 'auto']);
            await runExecFile('net', ['start', 'wuauserv']);
            console.log(`${GREEN}[OK] Windows Update enabled and started.${RESET}`);
        } else if (choice === '3C') {
            await runExecFile('net', ['stop', 'wuauserv']);
            await runExecFile('sc', ['config', 'wuauserv', 'start=', 'disabled']);
            console.log(`${GREEN}[OK] Windows Update stopped and disabled.${RESET}`);
        } else if (choice === '3D') {
            const count = cleanFolder(process.env.TEMP) + cleanFolder(path.join(process.env.SystemRoot || 'C:\\Windows', 'Temp'));
            console.log(`${GREEN}[OK] Removed ${count} temporary entries.${RESET}`);
        } else if (choice === '3E') {
            const psCmd = '$lic = Get-CimInstance SoftwareLicensingProduct -Filter "ApplicationID=\'55c92734-d682-4d71-983e-d6ec3f16059f\' AND PartialProductKey IS NOT NULL"; if ($lic) { $map = @{0=\'Unlicensed\';1=\'Licensed\';2=\'OOB Grace\';3=\'OOT Grace\';4=\'Non-Genuine\';5=\'Notification\';6=\'Extended Grace\'}; $lic | ForEach-Object { "$($_.Name) | Key:*$($_.PartialProductKey) | $($map[[int]$_.LicenseStatus])" } }';
            const r = await runExecFile('powershell.exe', ['-NoProfile', '-Command', psCmd]);
            console.log(r.stdout.trim() || r.stderr.trim());
        } else if (choice === '3F') {
            const cmdVal = hasWt()
                ? 'powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList \'-d\', \'%V\' -Verb RunAs"'
                : 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList \'/s /k pushd\', \'%V\' -Verb RunAs"';
            for (const base of ['HKCR\\Directory\\shell\\OpenAdminTerminal', 'HKCR\\Directory\\Background\\shell\\OpenAdminTerminal']) {
                await runExecFile('reg.exe', ['add', base, '/ve', '/d', 'Open Admin Terminal Here', '/f']);
                await runExecFile('reg.exe', ['add', base, '/v', 'Icon', '/d', 'cmd.exe', '/f']);
                await runExecFile('reg.exe', ['add', `${base}\\command`, '/ve', '/d', cmdVal, '/f']);
            }
            console.log(`${GREEN}[OK] Context menu installed.${RESET}`);
        } else if (choice === '3G') {
            await runExecFile('reg.exe', ['delete', 'HKCR\\Directory\\shell\\OpenAdminTerminal', '/f']);
            await runExecFile('reg.exe', ['delete', 'HKCR\\Directory\\Background\\shell\\OpenAdminTerminal', '/f']);
            console.log(`${GREEN}[OK] Context menu removed.${RESET}`);
        } else if (choice === '3H') {
            const fCmd = 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList \'/c takeown /f \\"%1\\" && icacls \\"%1\\" /grant Administrators:F /c\' -Verb RunAs -WindowStyle Hidden"';
            const dCmd = 'powershell -NoProfile -Command "Start-Process cmd.exe -ArgumentList \'/c takeown /f \\"%1\\" /r /d y && icacls \\"%1\\" /grant Administrators:F /t /c\' -Verb RunAs -WindowStyle Hidden"';
            await runExecFile('reg.exe', ['add', 'HKCR\\*\\shell\\TakeOwnership', '/ve', '/d', 'Take Ownership (Admin)', '/f']);
            await runExecFile('reg.exe', ['add', 'HKCR\\*\\shell\\TakeOwnership\\command', '/ve', '/d', fCmd, '/f']);
            await runExecFile('reg.exe', ['add', 'HKCR\\Directory\\shell\\TakeOwnership', '/ve', '/d', 'Take Ownership (Admin)', '/f']);
            await runExecFile('reg.exe', ['add', 'HKCR\\Directory\\shell\\TakeOwnership\\command', '/ve', '/d', dCmd, '/f']);
            console.log(`${GREEN}[OK] Take Ownership context menu installed.${RESET}`);
        } else if (choice === '3I') {
            await runExecFile('reg.exe', ['delete', 'HKCR\\*\\shell\\TakeOwnership', '/f']);
            await runExecFile('reg.exe', ['delete', 'HKCR\\Directory\\shell\\TakeOwnership', '/f']);
            console.log(`${GREEN}[OK] Take Ownership context menu removed.${RESET}`);
        } else if (choice === '4A') {
            await appLauncherMenu();
            continue;
        } else if (choice === '5R' || choice === 'R') {
            if ((await ask('Type YES to confirm system restart in 30s: ')) === 'YES') {
                await runExecFile('shutdown', ['/r', '/t', '30', '/f', '/c', 'Node.js Master Script: Scheduled reboot.']);
                console.log(`${YELLOW}Reboot scheduled (run 5A or 'shutdown /a' to cancel).${RESET}`);
            }
        } else if (choice === '5A') {
            await runExecFile('shutdown', ['/a']);
            console.log(`${GREEN}Shutdown abort command sent.${RESET}`);
        } else {
            console.log(`${RED}Invalid choice.${RESET}`);
        }
        await ask('\nPress Enter to continue...');
    }
}

start().catch((err) => {
    console.error(err);
    process.exit(1);
});
