#!/usr/bin/env node
/**
 * Enterprise File & System Utility Suite (Modern Windows 11 Node.js Edition)
 * Zero-dependency CLI tool with centralized JSON configuration, temp logging,
 * clean project scaffolds, pattern batch rename, and Win11 admin consoles.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');
const { exec, execSync, spawn } = require('child_process');
const readline = require('readline');

const GREEN = '\x1b[38;2;80;250;123m';
const CYAN = '\x1b[38;2;139;233;253m';
const YELLOW = '\x1b[38;2;241;250;140m';
const RED = '\x1b[38;2;255;85;85m';
const RESET = '\x1b[0m';

const CONFIG_FILE = path.join(__dirname, 'settings.json');
const LOG_FILE = path.join(os.tmpdir(), 'windows-utility-suite-errors.log');
const PROTECTED_EXTS = new Set(['.txt', '.bat', '.ps1', '.py', '.js', '.php', '.json', '.md', '.html', '.reg', '.log']);

let config = {
    default_backup_dir: 'mybackup',
    default_web_root: 'webroot',
    html_template_dir: 'htmlSiteCreation',
    app_template_dir: 'app',
    php_oop_dir: 'php_oop',
};

if (fs.existsSync(CONFIG_FILE)) {
    try {
        config = { ...config, ...JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8')) };
    } catch {
        console.log(`${YELLOW}Warning: settings.json could not be parsed; using defaults.${RESET}`);
    }
}

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, (ans) => res(ans.trim())));

function logError(message, err) {
    const ts = new Date().toISOString().replace('T', ' ').slice(0, 19);
    const detail = err ? ` | Details: ${err.message}` : '';
    try { fs.appendFileSync(LOG_FILE, `[${ts}] ERROR: ${message}${detail}\n`, 'utf8'); } catch {}
    console.log(`\n${RED}[-] ${message} (Logged to ${LOG_FILE})${RESET}`);
}

function printHeader(title) {
    console.clear();
    console.log(`${CYAN}+${'-'.repeat(56)}+`);
    console.log(`| ${GREEN}${title.padEnd(54)}${CYAN} |`);
    console.log(`+${'-'.repeat(56)}+${RESET}\n`);
}

function commandExists(exe) {
    try {
        execSync(`where ${exe}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function writeScaffold(base, dirs, files, label) {
    try {
        dirs.forEach((d) => fs.mkdirSync(path.join(base, d), { recursive: true }));
        Object.entries(files).forEach(([rel, body]) => {
            const full = path.join(base, rel);
            fs.mkdirSync(path.dirname(full), { recursive: true });
            fs.writeFileSync(full, body, 'utf8');
        });
        console.log(`\n${GREEN}[OK] ${label} created in: ${base}${RESET}`);
    } catch (err) {
        logError(`Failed creating ${label}`, err);
    }
}

async function webTemplatesMenu() {
    while (true) {
        printHeader('PROJECT SCAFFOLD GENERATORS');
        console.log(`1. Modern Static Web Starter (${config.html_template_dir})`);
        console.log(`2. PHP App Starter (${config.default_web_root})`);
        console.log(`3. Minimal App Starter (${config.app_template_dir})`);
        console.log(`4. PHP OOP Starter (${config.php_oop_dir})`);
        console.log('5. Back to Main Menu\n');
        const c = await ask('Select template (1-5): ');
        if (c === '5') break;
        if (c === '1') {
            writeScaffold(path.join(process.cwd(), config.html_template_dir), ['css', 'js'], {
                'css/styles.css': '',
                'js/app.js': '',
                'index.html': '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>App</title><link rel="stylesheet" href="./css/styles.css"></head><body><h1>Ready</h1><script src="./js/app.js"></script></body></html>\n',
            }, 'Modern Web Starter');
        } else if (c === '2') {
            writeScaffold(path.join(process.cwd(), config.default_web_root), ['public', 'src', 'config'], {
                'public/index.php': "<?php declare(strict_types=1);\necho 'PHP App Ready';\n",
                'README.md': '# PHP App\n',
            }, 'PHP App Starter');
        } else if (c === '3') {
            writeScaffold(path.join(process.cwd(), config.app_template_dir), ['src', 'assets/styles'], {
                'assets/styles/app.css': '',
                'index.html': '',
            }, 'App Starter');
        } else if (c === '4') {
            writeScaffold(path.join(process.cwd(), config.php_oop_dir), ['src', 'tests'], {
                'index.php': "<?php declare(strict_types=1);\n",
                'README.md': '# PHP OOP Package\n',
            }, 'PHP OOP Starter');
        }
        await ask('Press Enter...');
    }
}

async function creatorMenu() {
    while (true) {
        printHeader('FILE & FOLDER CREATORS');
        console.log('1. Create Project Folders (Project1..ProjectN in WebProject)');
        console.log('2. Create Custom File (Name + Extension)');
        console.log('3. Batch Create Indexed Files (prefix1..N.ext)');
        console.log('4. Back to Main Menu\n');
        const c = await ask('Select (1-4): ');
        if (c === '4') break;
        if (c === '1') {
            const raw = await ask('Count [10]: ');
            const n = parseInt(raw, 10) > 0 ? parseInt(raw, 10) : 10;
            const base = path.join(process.cwd(), 'WebProject');
            for (let i = 1; i <= n; i++) fs.mkdirSync(path.join(base, `Project${i}`), { recursive: true });
            console.log(`${GREEN}[OK] Created ${n} folders in ${base}${RESET}`);
        } else if (c === '2') {
            const name = await ask('File name: ');
            const ext = await ask('Extension (without dot): ');
            if (name && ext) { fs.writeFileSync(`${name}.${ext}`, ''); console.log(`${GREEN}[OK] Created ${name}.${ext}${RESET}`); }
        } else if (c === '3') {
            const pfx = (await ask('Prefix [item]: ')) || 'item';
            const ext = (await ask('Extension [txt]: ')) || 'txt';
            const n = parseInt(await ask('Count [5]: '), 10) || 5;
            for (let i = 1; i <= n; i++) fs.writeFileSync(`${pfx}${i}.${ext}`, '');
            console.log(`${GREEN}[OK] Created ${pfx}1..${n}.${ext}${RESET}`);
        }
        await ask('Press Enter...');
    }
}

async function fileOperationsMenu() {
    while (true) {
        printHeader('ADVANCED FILE OPERATIONS');
        console.log('1. Copy File | 2. Move *.txt to WebProject/ | 3. Recursive Backup');
        console.log('4. Pattern Filename Replace | 5. Bulk Extension Replace');
        console.log('6. Sequential Rename | 7. Safe Convert to .txt | 8. Back\n');
        const c = await ask('Select (1-8): ');
        if (c === '8') break;
        if (c === '1') {
            const src = await ask('Source path: '); const dest = await ask('Destination folder: ');
            if (fs.existsSync(src)) { fs.mkdirSync(dest, { recursive: true }); fs.copyFileSync(src, path.join(dest, path.basename(src))); console.log(`${GREEN}[OK] Copied.${RESET}`); }
            else console.log(`${RED}Source not found.${RESET}`);
        } else if (c === '2') {
            const dest = path.join(process.cwd(), 'WebProject');
            fs.mkdirSync(dest, { recursive: true });
            const skip = new Set(['output.txt', 'Listing.txt', 'AllProgramFilesListing.txt', 'file_list.txt']);
            const files = fs.readdirSync('.').filter((f) => f.endsWith('.txt') && fs.statSync(f).isFile() && !skip.has(f));
            files.forEach((f) => fs.renameSync(f, path.join(dest, f)));
            console.log(`${GREEN}[OK] Moved ${files.length} .txt file(s).${RESET}`);
        } else if (c === '3') {
            const ext = (await ask('Extension (without dot): ')).replace(/^\./, '');
            if (ext) {
                const dest = path.join(process.cwd(), config.default_backup_dir);
                fs.mkdirSync(dest, { recursive: true });
                let count = 0;
                const walk = (dir) => {
                    if (path.resolve(dir) === path.resolve(dest)) return;
                    for (const item of fs.readdirSync(dir)) {
                        const fp = path.join(dir, item);
                        if (fs.statSync(fp).isDirectory()) walk(fp);
                        else if (item.endsWith(`.${ext}`)) { fs.copyFileSync(fp, path.join(dest, item)); count++; }
                    }
                };
                walk('.');
                console.log(`${GREEN}[OK] Backed up ${count} file(s).${RESET}`);
            }
        } else if (c === '4') {
            const find = await ask('Find text in filename: '); const rep = await ask('Replacement text: ');
            if (find) {
                let cnt = 0;
                for (const f of fs.readdirSync('.')) {
                    if (fs.statSync(f).isFile() && f.includes(find) && !PROTECTED_EXTS.has(path.extname(f).toLowerCase())) {
                        fs.renameSync(f, f.split(find).join(rep)); cnt++;
                    }
                }
                console.log(`${GREEN}[OK] Renamed ${cnt} file(s).${RESET}`);
            }
        } else if (c === '5') {
            const o = (await ask('Old ext: ')).replace(/^\./, ''); const n = (await ask('New ext: ')).replace(/^\./, '');
            const files = fs.readdirSync('.').filter((f) => f.endsWith(`.${o}`) && fs.statSync(f).isFile());
            files.forEach((f) => fs.renameSync(f, `${path.basename(f, `.${o}`)}.${n}`));
            console.log(`${GREEN}[OK] Updated ${files.length} file(s).${RESET}`);
        } else if (c === '6') {
            const o = (await ask('Old ext: ')).replace(/^\./, ''); const n = (await ask('New ext: ')).replace(/^\./, '');
            const files = fs.readdirSync('.').filter((f) => f.endsWith(`.${o}`) && fs.statSync(f).isFile());
            files.forEach((f, idx) => fs.renameSync(f, `item${idx + 1}.${n}`));
            console.log(`${GREEN}[OK] Renamed ${files.length} file(s).${RESET}`);
        } else if (c === '7') {
            if ((await ask('Type YES to convert non-script files to .txt: ')) === 'YES') {
                const files = fs.readdirSync('.').filter((f) => fs.statSync(f).isFile() && !PROTECTED_EXTS.has(path.extname(f).toLowerCase()) && f !== '.gitignore');
                files.forEach((f) => fs.renameSync(f, `${path.basename(f, path.extname(f))}.txt`));
                console.log(`${GREEN}[OK] Converted ${files.length} file(s).${RESET}`);
            }
        }
        await ask('Press Enter...');
    }
}

async function shortcutsMenu() {
    while (true) {
        printHeader('WINDOWS 11 ADMINISTRATIVE CONSOLES');
        console.log('1. Control Panel | 2. Services | 3. appwiz.cpl | 4. Regedit | 5. Terminal/CMD');
        console.log('6. Local Users | 7. Disk Mgmt | 8. Computer Mgmt | 9. Desktop Icons | 10. Group Policy');
        console.log('11. Network Connections | 12. Env Vars | 13. System Properties | 14. Back\n');
        const c = await ask('Select (1-14): ');
        if (c === '14') break;
        const sys32 = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32');
        if (c === '6') exec(fs.existsSync(path.join(sys32, 'lusrmgr.msc')) ? 'start lusrmgr.msc' : 'start netplwiz');
        else if (c === '10') {
            if (fs.existsSync(path.join(sys32, 'gpedit.msc'))) exec('start gpedit.msc');
            else { console.log(`${YELLOW}gpedit.msc requires Pro/Enterprise edition.${RESET}`); await ask('Press Enter...'); }
        } else {
            const map = {
                '1': 'control', '2': 'services.msc', '3': 'appwiz.cpl', '4': 'regedit',
                '5': commandExists('wt.exe') ? 'wt.exe' : 'cmd', '7': 'diskmgmt.msc', '8': 'compmgmt.msc',
                '9': 'rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0', '11': 'ncpa.cpl',
                '12': 'rundll32.exe sysdm.cpl,EditEnvironmentVariables',
                '13': 'rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3',
            };
            if (map[c]) exec(`start ${map[c]}`);
        }
    }
}

async function appsMenu() {
    while (true) {
        printHeader('APPLICATIONS & SYSTEM FOLDERS');
        console.log('1. Chrome | 2. Edge | 3. Firefox | 4. Admin Terminal | 5. Notepad | 6. PowerShell 7+/5.1');
        console.log('7. Notepad++ | 8. Sublime Text | 9. VS Code | 10. Git Bash | 11. Word | 12. Excel');
        console.log('13. Windows Settings | 14. Temp | 15. Local AppData | 16. Downloads | 17. Back\n');
        const c = await ask('Select (1-17): ');
        if (c === '17') break;
        try {
            if (c === '1') exec('start "" "https://www.google.com"');
            else if (c === '2') exec('start msedge https://www.google.com');
            else if (c === '3') exec('start firefox');
            else if (c === '4') exec(`powershell -NoProfile -Command "Start-Process ${commandExists('wt.exe') ? 'wt.exe' : 'cmd'} -Verb RunAs"`);
            else if (c === '5') spawn('notepad.exe', [], { detached: true, stdio: 'ignore' }).unref();
            else if (c === '6') spawn(commandExists('pwsh.exe') ? 'pwsh.exe' : 'powershell.exe', [], { detached: true, stdio: 'ignore' }).unref();
            else if (c === '7') { const p = 'C:\\Program Files\\Notepad++\\notepad++.exe'; if (fs.existsSync(p)) spawn(p, [], { detached: true, stdio: 'ignore' }).unref(); else await ask('Notepad++ not found...'); }
            else if (c === '8') { const p = 'C:\\Program Files\\Sublime Text\\sublime_text.exe'; if (fs.existsSync(p)) spawn(p, [], { detached: true, stdio: 'ignore' }).unref(); else await ask('Sublime Text not found...'); }
            else if (c === '9') {
                const l = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'Code.exe');
                const g = 'C:\\Program Files\\Microsoft VS Code\\Code.exe';
                if (commandExists('code')) exec('code');
                else if (fs.existsSync(l)) spawn(l, [], { detached: true, stdio: 'ignore' }).unref();
                else if (fs.existsSync(g)) spawn(g, [], { detached: true, stdio: 'ignore' }).unref();
                else await ask('VS Code not found...');
            }
            else if (c === '10') { const p = 'C:\\Program Files\\Git\\git-bash.exe'; if (fs.existsSync(p)) spawn(p, [], { detached: true, stdio: 'ignore' }).unref(); else await ask('Git Bash not found...'); }
            else if (c === '11') exec('start winword');
            else if (c === '12') exec('start excel');
            else if (c === '13') exec('start ms-settings:');
            else if (c === '14') exec(`explorer "${process.env.TEMP || ''}"`);
            else if (c === '15') exec(`explorer "${process.env.LOCALAPPDATA || ''}"`);
            else if (c === '16') exec(`explorer "${path.join(process.env.USERPROFILE || '', 'Downloads')}"`);
        } catch (err) {
            logError(`Failed option ${c}`, err);
        }
    }
}

async function diagnosticsMenu() {
    while (true) {
        printHeader('SYSTEM DIAGNOSTICS & EXPORTERS');
        console.log("1. Export Env Vars -> output.txt | 2. Export Installed Apps -> AllProgramFilesListing.txt");
        console.log(`3. Export '${config.app_template_dir}' Tree -> Listing.txt | 4. Elevated Terminal | 5. Back\n`);
        const c = await ask('Select (1-5): ');
        if (c === '5') break;
        if (c === '1') {
            fs.writeFileSync('output.txt', Object.entries(process.env).map(([k, v]) => `${k}=${v}`).join('\n'), 'utf8');
            console.log(`${GREEN}[OK] Saved output.txt${RESET}`);
        } else if (c === '2') {
            const psCmd = '$paths=@(\'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*\',\'HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*\',\'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*\'); Get-ItemProperty $paths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName,DisplayVersion,Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File AllProgramFilesListing.txt -Encoding utf8';
            execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio: 'ignore' });
            console.log(`${GREEN}[OK] Saved AllProgramFilesListing.txt${RESET}`);
        } else if (c === '3') {
            const appDir = path.join(process.cwd(), config.app_template_dir);
            if (fs.existsSync(appDir)) {
                const out = [];
                const walk = (d) => fs.readdirSync(d).forEach((f) => { const p = path.join(d, f); fs.statSync(p).isDirectory() ? walk(p) : out.push(p); });
                walk(appDir);
                fs.writeFileSync('Listing.txt', out.join('\n'), 'utf8');
                console.log(`${GREEN}[OK] Saved Listing.txt${RESET}`);
            } else { console.log(`${RED}'${config.app_template_dir}' not found.${RESET}`); }
        } else if (c === '4') {
            if (commandExists('wt.exe')) exec(`powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList '-d', '\\"${process.cwd()}\\"' -Verb RunAs"`);
            else exec(`powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/K cd /d \\"${process.cwd()}\\"' -Verb RunAs"`);
            continue;
        }
        await ask('Press Enter...');
    }
}

async function main() {
    while (true) {
        printHeader('MODERN FILE & SYSTEM UTILITY SUITE (NODE.JS)');
        console.log('  1. Web & App Project Scaffolds (4 Starters)');
        console.log('  2. File & Folder Creators');
        console.log('  3. Advanced File Operations (Copy, Move, Pattern Rename)');
        console.log('  4. Windows 11 Administrative Consoles');
        console.log('  5. Applications & System Folders');
        console.log('  6. System Diagnostics & Exporters');
        console.log('  7. Exit\n');
        const opt = await ask('Select a utility category (1-7): ');
        if (opt === '1') await webTemplatesMenu();
        else if (opt === '2') await creatorMenu();
        else if (opt === '3') await fileOperationsMenu();
        else if (opt === '4') await shortcutsMenu();
        else if (opt === '5') await appsMenu();
        else if (opt === '6') await diagnosticsMenu();
        else if (opt === '7') { console.log(`${GREEN}Goodbye!${RESET}`); rl.close(); process.exit(0); }
    }
}

main().catch((err) => { logError('Unhandled error', err); process.exit(1); });
