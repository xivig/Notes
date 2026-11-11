#!/usr/bin/env node
/**
 * Enterprise File & System Utility Suite (Node.js CLI Edition)
 * 
 * An enterprise-grade, modular command-line utility.
 * Runs natively on Node.js with zero dependencies.
 */

const fs = require('fs');
const path = require('path');
const { exec, execSync, spawn } = require('child_process');
const readline = require('readline');

// --- Terminal Colors ---
const GREEN = '\x1b[38;2;80;250;123m';
const GRAY = '\x1b[38;2;90;90;90m';
const CYAN = '\x1b[38;2;139;233;253m';
const YELLOW = '\x1b[38;2;241;250;140m';
const RED = '\x1b[38;2;255;85;85m';
const RESET = '\x1b[0m';

const SCRIPT_DIR = __dirname;
const CONFIG_FILE = path.join(SCRIPT_DIR, 'settings.json');
const LOG_FILE = path.join(SCRIPT_DIR, 'errors.log');

// Fallback configuration
let config = {
    default_backup_dir: 'mybackup',
    default_web_root: 'webroot',
    html_template_dir: 'htmlSiteCreation',
    app_template_dir: 'app',
    php_oop_dir: 'php_oop'
};

// Load configurations
if (fs.existsSync(CONFIG_FILE)) {
    try {
        const raw = fs.readFileSync(CONFIG_FILE, 'utf8');
        const parsed = JSON.parse(raw);
        config = { ...config, ...parsed };
    } catch (err) {
        console.log(`${YELLOW}Warning: settings.json could not be loaded. Using defaults.${RESET}`);
    }
}

// Log errors
function logError(message, err) {
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const details = err ? ` | Details: ${err.message}` : '';
    const logLine = `[${timestamp}] ERROR: ${message}${details}\n`;
    try {
        fs.appendFileSync(LOG_FILE, logLine, 'utf8');
    } catch (e) {}
    console.log(`\n${RED}[- ] ${message} (Logged to errors.log)${RESET}`);
}

// Prompter helper
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, (ans) => resolve(ans.trim())));

function printHeader(title) {
    console.clear();
    const width = 58;
    console.log(`${CYAN}┌${'─'.repeat(width - 2)}┐`);
    console.log(`│ ${GREEN}${title.padEnd(width - 4)}${CYAN} │`);
    console.log(`└${'─'.repeat(width - 2)}┘\n`);
}

function showMainMenu() {
    console.clear();
    console.log(`${CYAN}┌────────────────────────────────────────────────────────┐`);
    console.log(`│ ${GREEN}       ELITE FILE & SYSTEM UTILITY SUITE v2.1 (JS)    ${CYAN} │`);
    console.log(`├────────────────────────────────────────────────────────┤`);
    console.log(`│  1. Web Templates & Site Creators                      │`);
    console.log(`│  2. File & Folder Creators                             │`);
    console.log(`│  3. Advanced File Operations                           │`);
    console.log(`│  4. Windows System Administrative Tools                │`);
    console.log(`│  5. System Applications & Cache Directories            │`);
    console.log(`│  6. System Diagnostics & Exporters                     │`);
    console.log(`│  7. Exit                                               │`);
    console.log(`${CYAN}└────────────────────────────────────────────────────────┘\n`);
}

// --- Menu 1: Web Templates ---
async function webTemplatesMenu() {
    while (true) {
        printHeader('WEB TEMPLATE GENERATOR');
        console.log(`1. PHP Web Project (${config.default_web_root})`);
        console.log(`2. HTML Site Template (${config.html_template_dir})`);
        console.log(`3. App Structure (${config.app_template_dir})`);
        console.log(`4. PHP OOP Structure (${config.php_oop_dir})`);
        console.log('5. Basic Web Template (webTemplate folder)');
        console.log('6. Back to Main Menu\n');

        const choice = await ask('Select a template (1-6): ');
        if (choice === '1') {
            try {
                const base = path.join(process.cwd(), config.default_web_root);
                const dirs = ['public/assets/css', 'public/assets/common', 'public/assets/inc', 'public/assets/js', 'private/class', 'private/config', 'private/core'];
                const files = ['public/login.php', 'public/index.php', 'public/admin.php', 'public/confirmdelete.php', 'public/view.php', 'public/test.php', 'public/regex.php', 'private/class/class.db_connect.inc.php', 'private/class/class.calendar.inc.php', 'private/class/class.event.inc.php', 'private/class/class.admin.inc.php', 'private/class/class.db-cred.inc.php', 'private/config/class.db-cred.inc.php', 'private/core/init.inc.php', 'public/assets/css/style.css', 'public/assets/css/admin.css', 'public/assets/css/ajax.css', 'public/assets/js/custom.js', 'public/assets/js/init.js', 'public/assets/js/valid-date.js', 'public/assets/common/header.inc.php', 'public/assets/common/footer.inc.php', 'public/assets/inc/process.inc.php', 'public/assets/inc/ajax.inc.php'];
                
                dirs.forEach(d => fs.mkdirSync(path.join(base, d), { recursive: true }));
                files.forEach(f => fs.writeFileSync(path.join(base, f), ''));
                console.log(`\n${GREEN}PHP Web Project created inside: ${base}${RESET}`);
            } catch (err) {
                logError('Failed creating PHP Web Project.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '2') {
            try {
                const base = path.join(process.cwd(), config.html_template_dir);
                const dirs = ['css', 'img', 'js'];
                const files = ['.htaccess', '404.html', 'humans.txt', 'index.html', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'css/style.css', 'css/normalize.css', 'js/custom.js', 'js/modernizr.js', 'js/jquery.js'];
                
                dirs.forEach(d => fs.mkdirSync(path.join(base, d), { recursive: true }));
                files.forEach(f => fs.writeFileSync(path.join(base, f), ''));
                console.log(`\n${GREEN}HTML Site created inside: ${base}${RESET}`);
            } catch (err) {
                logError('Failed creating HTML Project.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '3') {
            try {
                const base = path.join(process.cwd(), config.app_template_dir);
                const dirs = ['temp/styles', 'assets/styles', 'assets/images/icons'];
                const files = ['assets/styles/styles.css', 'temp/styles/styles.css', '.htaccess', '404.html', 'humans.txt', 'index.html', 'robots.txt', 'site.webmanifest', 'sitemap.xml'];
                
                dirs.forEach(d => fs.mkdirSync(path.join(base, d), { recursive: true }));
                files.forEach(f => fs.writeFileSync(path.join(base, f), ''));
                console.log(`\n${GREEN}App Project created inside: ${base}${RESET}`);
            } catch (err) {
                logError('Failed creating App Project.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '4') {
            try {
                const base = path.join(process.cwd(), config.php_oop_dir);
                const dirs = ['css', 'img', 'js'];
                const files = ['.htaccess', '404.html', 'humans.txt', 'index.php', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'css/style.css', 'css/normalize.css', 'js/custom.js', 'js/modernizr.js', 'js/jquery.js'];
                
                dirs.forEach(d => fs.mkdirSync(path.join(base, d), { recursive: true }));
                files.forEach(f => fs.writeFileSync(path.join(base, f), ''));
                console.log(`\n${GREEN}PHP OOP Project created inside: ${base}${RESET}`);
            } catch (err) {
                logError('Failed creating PHP OOP Project.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '5') {
            try {
                const base = path.join(process.cwd(), 'webTemplate');
                const dirs = ['css', 'img', 'js'];
                const files = ['.htaccess', '404.html', 'humans.txt', 'index.php', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'css/style.css', 'css/normalize.css', 'js/custom.js', 'js/modernizr.js', 'js/jquery.js'];
                
                dirs.forEach(d => fs.mkdirSync(path.join(base, d), { recursive: true }));
                for (let i = 1; i <= 5; i++) {
                    fs.writeFileSync(path.join(base, `D${i}.txt`), '');
                }
                files.forEach(f => fs.writeFileSync(path.join(base, f), ''));
                console.log(`\n${GREEN}Basic Web Template created inside: ${base}${RESET}`);
            } catch (err) {
                logError('Failed creating Basic Web Template.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '6') {
            break;
        } else {
            await ask(`${RED}Invalid choice. Press Enter to retry...${RESET}`);
        }
    }
}

// --- Menu 2: File & Folder Creators ---
async function creatorMenu() {
    while (true) {
        printHeader('FILE & FOLDER CREATOR');
        console.log('1. Create Project Folders (Project1 to Project10)');
        console.log('2. Create Custom File (User-defined Name & Extension)');
        console.log('3. Create Batch Dummy Files (index1-10.php, style1-3.css, etc.)');
        console.log('4. Back to Main Menu\n');

        const choice = await ask('Select an option (1-4): ');
        if (choice === '1') {
            try {
                const base = path.join(process.cwd(), 'WebProject');
                fs.mkdirSync(base, { recursive: true });
                for (let i = 1; i <= 10; i++) {
                    fs.mkdirSync(path.join(base, `Project${i}`), { recursive: true });
                }
                console.log(`\n${GREEN}10 project subfolders successfully created inside: ${base}${RESET}`);
            } catch (err) {
                logError('Failed creating WebProject folders.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '2') {
            const name = await ask('Enter file name: ');
            const ext = await ask('Enter file extension (without dot): ');
            if (name && ext) {
                try {
                    fs.writeFileSync(`${name}.${ext}`, '');
                    console.log(`\n${GREEN}File '${name}.${ext}' created successfully!${RESET}`);
                } catch (err) {
                    logError(`Failed to create custom file: ${name}.${ext}`, err);
                }
            } else {
                console.log(`${RED}Invalid inputs.${RESET}`);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '3') {
            try {
                for (let i = 1; i <= 10; i++) {
                    fs.writeFileSync(`index${i}.php`, '');
                }
                for (let i = 1; i <= 3; i++) {
                    fs.writeFileSync(`style${i}.css`, '');
                    fs.writeFileSync(`custom${i}.js`, '');
                    fs.writeFileSync(`template${i}.tpl`, '');
                }
                console.log(`\n${GREEN}Dummy files batch created successfully!{RESET}`);
            } catch (err) {
                logError('Failed to create dummy files.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '4') {
            break;
        } else {
            await ask(`${RED}Invalid choice. Press Enter to retry...${RESET}`);
        }
    }
}

// --- Menu 3: Advanced File Operations ---
async function fileOperationsMenu() {
    while (true) {
        printHeader('ADVANCED FILE OPERATIONS');
        console.log('1. Copy File');
        console.log('2. Move Text Files (*.txt) to WebProject Folder');
        console.log(`3. Search & Backup Files (Search by extension recursively to ${config.default_backup_dir}/)`);
        console.log('4. Batch Rename Loop (mac-osx-command-line-terminal-X-638.jpg -> X.jpg)');
        console.log('5. Bulk Change File Extensions (e.g. *.js -> *.php)');
        console.log('6. Bulk Change Extensions (Sequentially rename files, e.g. *.js -> index1.php)');
        console.log('7. Change All Extensions to .txt (*.* -> *.txt)');
        console.log('8. Back to Main Menu\n');

        const choice = await ask('Select an option (1-8): ');
        if (choice === '1') {
            const src = await ask('Enter source file path: ');
            const dest = await ask('Enter destination folder path: ');
            if (fs.existsSync(src)) {
                try {
                    fs.mkdirSync(dest, { recursive: true });
                    fs.copyFileSync(src, path.join(dest, path.basename(src)));
                    console.log(`\n${GREEN}File copied successfully!${RESET}`);
                } catch (err) {
                    logError('Failed to copy file.', err);
                }
            } else {
                console.log(`${RED}Source file not found!${RESET}`);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '2') {
            try {
                const dest = path.join(process.cwd(), 'WebProject');
                fs.mkdirSync(dest, { recursive: true });
                const files = fs.readdirSync('.').filter(f => f.endsWith('.txt') && fs.statSync(f).isFile());
                files.forEach(f => fs.renameSync(f, path.join(dest, f)));
                console.log(`\n${GREEN}Moved ${files.length} text files successfully!${RESET}`);
            } catch (err) {
                logError('Failed moving txt files.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '3') {
            let ext = await ask('Enter extension to backup (e.g. bat or txt): ');
            if (ext.startsWith('.')) ext = ext.substring(1);
            const dest = path.join(process.cwd(), config.default_backup_dir);
            try {
                fs.mkdirSync(dest, { recursive: true });
                let count = 0;
                function walk(dir) {
                    if (path.resolve(dir) === path.resolve(dest)) return;
                    fs.readdirSync(dir).forEach(file => {
                        const filepath = path.join(dir, file);
                        if (fs.statSync(filepath).isDirectory()) {
                            walk(filepath);
                        } else if (file.endsWith(`.${ext}`)) {
                            fs.copyFileSync(filepath, path.join(dest, file));
                            count++;
                        }
                    });
                }
                walk('.');
                console.log(`\n${GREEN}Backed up ${count} files to: ${dest}${RESET}`);
            } catch (err) {
                logError('Failed backing up files.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '4') {
            try {
                let count = 0;
                for (let i = 0; i <= 200; i++) {
                    const oldName = `mac-osx-command-line-terminal-${i}-638.jpg`;
                    if (fs.existsSync(oldName)) {
                        fs.renameSync(oldName, `${i}.jpg`);
                        count++;
                    }
                }
                console.log(`\n${GREEN}Renamed ${count} OSX templates successfully!${RESET}`);
            } catch (err) {
                logError('Failed renaming images.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '5') {
            const oldExt = await ask('Enter old extension (without dot): ');
            const newExt = await ask('Enter new extension (without dot): ');
            try {
                const files = fs.readdirSync('.').filter(f => f.endsWith(`.${oldExt}`) && fs.statSync(f).isFile());
                files.forEach(f => {
                    const base = path.basename(f, `.${oldExt}`);
                    fs.renameSync(f, `${base}.${newExt}`);
                });
                console.log(`\n${GREEN}Replaced extensions for ${files.length} files!${RESET}`);
            } catch (err) {
                logError('Bulk extension change failed.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '6') {
            const oldExt = await ask('Enter old extension (without dot): ');
            const newExt = await ask('Enter new extension (without dot): ');
            try {
                const files = fs.readdirSync('.').filter(f => f.endsWith(`.${oldExt}`) && fs.statSync(f).isFile());
                files.forEach((f, idx) => {
                    fs.renameSync(f, `index${idx + 1}.${newExt}`);
                });
                console.log(`\n${GREEN}Sequentially renamed ${files.length} files!${RESET}`);
            } catch (err) {
                logError('Sequential renaming failed.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '7') {
            if ((await ask('Convert non-script files in current folder to .txt? Type YES: ')) !== 'YES') {
                await ask(`${YELLOW}Operation canceled. Press Enter...${RESET}`);
                continue;
            }
            const protectedExts = new Set(['.txt', '.bat', '.ps1', '.py', '.js', '.php', '.json', '.md', '.html', '.reg', '.log']);
            try {
                const files = fs.readdirSync('.').filter(f => fs.statSync(f).isFile() && !protectedExts.has(path.extname(f).toLowerCase()) && f !== '.gitignore');
                files.forEach(f => {
                    const ext = path.extname(f);
                    const base = path.basename(f, ext);
                    fs.renameSync(f, `${base}.txt`);
                });
                console.log(`\n${GREEN}Renamed ${files.length} files to '.txt' (scripts/docs protected)!${RESET}`);
            } catch (err) {
                logError('Failed converting files to txt.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '8') {
            break;
        } else {
            await ask(`${RED}Invalid choice. Press Enter to retry...${RESET}`);
        }
    }
}

function commandExists(exe) {
    try {
        execSync(`where ${exe}`, { stdio: 'ignore' });
        return true;
    } catch {
        return false;
    }
}

function findPhotoshopExe() {
    const adobeDir = 'C:\\Program Files\\Adobe';
    if (!fs.existsSync(adobeDir)) return null;
    const dirs = fs.readdirSync(adobeDir).filter(d => d.startsWith('Adobe Photoshop ')).sort().reverse();
    for (const d of dirs) {
        const candidate = path.join(adobeDir, d, 'Photoshop.exe');
        if (fs.existsSync(candidate)) return candidate;
    }
    return null;
}

// --- Menu 4: Shortcuts ---
async function shortcutsMenu() {
    if (process.platform !== 'win32') {
        console.log(`${RED}Shortcut commands are only supported on Windows!${RESET}`);
        await ask('Press Enter to continue...');
        return;
    }
    while (true) {
        printHeader('WINDOWS ADMINISTRATIVE SHORTCUTS');
        console.log('1. Control Panel');
        console.log('2. Windows Services (services.msc)');
        console.log('3. Add/Remove Programs (appwiz.cpl)');
        console.log('4. Registry Editor (regedit)');
        console.log('5. Windows Terminal / Command Prompt');
        console.log('6. Local Users and Groups (lusrmgr.msc / netplwiz)');
        console.log('7. Disk Management (diskmgmt.msc)');
        console.log('8. Computer Management Console (compmgmt.msc)');
        console.log('9. Desktop Icon Settings');
        console.log('10. Group Policy Editor (gpedit.msc)');
        console.log('11. Network Connections Manager (ncpa.cpl)');
        console.log('12. Environment Variables Editor');
        console.log('13. System Properties (Advanced Tab)');
        console.log('14. Back to Main Menu\n');

        const choice = await ask('Select a shortcut (1-14): ');
        if (choice === '14') break;

        const sys32 = path.join(process.env.SystemRoot || 'C:\\Windows', 'System32');
        if (choice === '6') {
            if (fs.existsSync(path.join(sys32, 'lusrmgr.msc'))) exec('start lusrmgr.msc');
            else { console.log(`${YELLOW}lusrmgr.msc unavailable on Home edition; opening netplwiz...${RESET}`); exec('start netplwiz'); await ask('Press Enter...'); }
            continue;
        }
        if (choice === '10') {
            if (fs.existsSync(path.join(sys32, 'gpedit.msc'))) exec('start gpedit.msc');
            else { console.log(`${YELLOW}gpedit.msc is only included in Windows Pro/Enterprise editions.${RESET}`); await ask('Press Enter...'); }
            continue;
        }

        const commands = {
            '1': 'control', '2': 'services.msc', '3': 'appwiz.cpl', '4': 'regedit',
            '5': commandExists('wt.exe') ? 'wt.exe' : 'cmd',
            '7': 'diskmgmt.msc', '8': 'compmgmt.msc',
            '9': 'rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0',
            '11': 'ncpa.cpl',
            '12': 'rundll32.exe sysdm.cpl,EditEnvironmentVariables',
            '13': 'rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3'
        };

        if (commands[choice]) {
            exec(`start ${commands[choice]}`, (err) => {
                if (err) logError(`Failed to launch shortcut choice: ${choice}`, err);
            });
        } else {
            await ask(`${RED}Invalid shortcut option. Press Enter to retry...${RESET}`);
        }
    }
}

// --- Menu 5: Apps Menu ---
async function appsMenu() {
    while (true) {
        printHeader('APPLICATIONS & CACHE SYSTEM');
        console.log('1. Open Google Chrome');
        console.log('2. Open Microsoft Edge');
        console.log('3. Open Mozilla Firefox');
        console.log('4. Open Opera');
        console.log('5. Open Terminal / Command Prompt (Admin)');
        console.log('6. Open Notepad');
        console.log('7. Open Notepad++');
        console.log('8. Open Sublime Text');
        console.log('9. Open Visual Studio Code');
        console.log('10. Open Phoenix Code');
        console.log('11. Open Microsoft Word');
        console.log('12. Open Microsoft Excel');
        console.log('13. Open Adobe Photoshop');
        console.log('14. Open Git Bash');
        console.log('15. Open PowerShell (7+ or 5.1)');
        console.log('16. Open Deluge Torrent Client');
        console.log('17. Open Temp Directory');
        console.log('18. Open Local AppData Directory');
        console.log('19. Open Downloads Directory');
        console.log('20. Back to Main Menu\n');

        const choice = await ask('Select an option (1-20): ');
        if (choice === '20') break;

        try {
            if (choice === '1') {
                webbrowserOpen('https://www.google.com');
            } else if (choice === '2') {
                exec('start msedge https://www.google.com');
            } else if (choice === '3') {
                exec('start firefox');
            } else if (choice === '4') {
                const operaLocal = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Opera', 'opera.exe');
                const operaProg = 'C:\\Program Files\\Opera\\launcher.exe';
                if (fs.existsSync(operaLocal)) spawn(operaLocal, [], { detached: true, stdio: 'ignore' }).unref();
                else if (fs.existsSync(operaProg)) spawn(operaProg, [], { detached: true, stdio: 'ignore' }).unref();
                else exec('start opera');
            } else if (choice === '5') {
                const term = commandExists('wt.exe') ? 'wt.exe' : 'cmd';
                exec(`powershell -NoProfile -Command "Start-Process ${term} -Verb RunAs"`);
            } else if (choice === '6') {
                spawn('notepad.exe', [], { detached: true, stdio: 'ignore' }).unref();
            } else if (choice === '7') {
                const pathNpp = 'C:\\Program Files\\Notepad++\\notepad++.exe';
                if (fs.existsSync(pathNpp)) spawn(pathNpp, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}Notepad++ not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '8') {
                const pathSubl = 'C:\\Program Files\\Sublime Text\\sublime_text.exe';
                if (fs.existsSync(pathSubl)) spawn(pathSubl, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}Sublime Text not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '9') {
                const localCode = path.join(process.env.LOCALAPPDATA || '', 'Programs', 'Microsoft VS Code', 'Code.exe');
                const progCode = 'C:\\Program Files\\Microsoft VS Code\\Code.exe';
                if (commandExists('code')) exec('code');
                else if (fs.existsSync(localCode)) spawn(localCode, [], { detached: true, stdio: 'ignore' }).unref();
                else if (fs.existsSync(progCode)) spawn(progCode, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}VS Code not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '10') {
                const pathPhCode = path.join(process.env.LOCALAPPDATA || '', 'Phoenix Code', 'Phoenix Code.exe');
                if (fs.existsSync(pathPhCode)) spawn(pathPhCode, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}Phoenix Code not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '11') {
                exec('start winword');
            } else if (choice === '12') {
                exec('start excel');
            } else if (choice === '13') {
                const pathPs = findPhotoshopExe();
                if (pathPs) spawn(pathPs, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}Photoshop not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '14') {
                const pathGit = 'C:\\Program Files\\Git\\git-bash.exe';
                if (fs.existsSync(pathGit)) spawn(pathGit, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}Git Bash not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '15') {
                spawn(commandExists('pwsh.exe') ? 'pwsh.exe' : 'powershell.exe', [], { detached: true, stdio: 'ignore' }).unref();
            } else if (choice === '16') {
                const pathDeluge = 'C:\\Program Files\\Deluge\\deluge.exe';
                if (fs.existsSync(pathDeluge)) spawn(pathDeluge, [], { detached: true, stdio: 'ignore' }).unref();
                else console.log(`${RED}Deluge not found!${RESET}`), await ask('Press Enter...');
            } else if (choice === '17') {
                exec(`explorer "${process.env.TEMP || ''}"`);
            } else if (choice === '18') {
                exec(`explorer "${process.env.LOCALAPPDATA || ''}"`);
            } else if (choice === '19') {
                const downloads = path.join(process.env.USERPROFILE || '', 'Downloads');
                exec(`explorer "${downloads}"`);
            } else {
                await ask(`${RED}Invalid option. Press Enter to retry...${RESET}`);
            }
        } catch (err) {
            logError(`Failed launching choice ${choice}`, err);
        }
    }
}

function webbrowserOpen(url) {
    if (process.platform === 'win32') exec(`start ${url}`);
    else if (process.platform === 'darwin') exec(`open ${url}`);
    else exec(`xdg-open ${url}`);
}

// --- Menu 6: Diagnostics ---
async function diagnosticsMenu() {
    while (true) {
        printHeader('SYSTEM DIAGNOSTICS & EXPORTERS');
        console.log("1. Export Environment Variables to 'output.txt'");
        console.log("2. Export Installed Program List to 'AllProgramFilesListing.txt'");
        console.log(`3. Export Directory Listing of '${config.app_template_dir}' to 'Listing.txt'`);
        console.log('4. Open Elevated Terminal / CMD at Current Location');
        console.log('5. Back to Main Menu\n');

        const choice = await ask('Select an option (1-5): ');
        if (choice === '1') {
            try {
                const envStr = Object.entries(process.env).map(([k, v]) => `${k}=${v}`).join('\n');
                fs.writeFileSync('output.txt', envStr, 'utf8');
                console.log(`\n${GREEN}Environment variables saved to output.txt!${RESET}`);
            } catch (err) {
                logError('Failed exporting environment variables.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '2') {
            try {
                const psCmd = '$paths = @(\'HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*\',\'HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*\',\'HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*\'); Get-ItemProperty $paths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName, DisplayVersion, Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File -FilePath \'AllProgramFilesListing.txt\' -Encoding utf8';
                execSync(`powershell -NoProfile -Command "${psCmd}"`, { stdio: 'ignore' });
                console.log(`\n${GREEN}Full 64/32-bit + User software list saved to AllProgramFilesListing.txt!${RESET}`);
            } catch (err) {
                logError('Failed program list export.', err);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '3') {
            const appDir = path.join(process.cwd(), config.app_template_dir);
            if (fs.existsSync(appDir)) {
                try {
                    let listing = `--- Recursive Directory Listing of: ${appDir} ---\n`;
                    function walk(dir) {
                        fs.readdirSync(dir).forEach(file => {
                            const filepath = path.join(dir, file);
                            if (fs.statSync(filepath).isDirectory()) {
                                walk(filepath);
                            } else {
                                listing += `${filepath}\n`;
                            }
                        });
                    }
                    walk(appDir);
                    fs.writeFileSync('Listing.txt', listing, 'utf8');
                    console.log(`\n${GREEN}Directory structure of '${config.app_template_dir}' exported to Listing.txt!${RESET}`);
                } catch (err) {
                    logError('Failed app list compilation.', err);
                }
            } else {
                console.log(`${RED}'${config.app_template_dir}' folder does not exist! Please create it via the Web Templates menu.${RESET}`);
            }
            await ask('Press Enter to continue...');
        } else if (choice === '4') {
            if (commandExists('wt.exe')) {
                exec(`powershell -NoProfile -Command "Start-Process wt.exe -ArgumentList '-d', '\\"${process.cwd()}\\"' -Verb RunAs"`);
            } else {
                exec(`powershell -NoProfile -Command "Start-Process cmd -ArgumentList '/K cd /d \\"${process.cwd()}\\"' -Verb RunAs"`);
            }
        } else if (choice === '5') {
            break;
        } else {
            await ask(`${RED}Invalid choice. Press Enter to retry...${RESET}`);
        }
    }
}

// --- Main Loop ---
async function main() {
    while (true) {
        showMainMenu();
        const opt = await ask('Select a utility category (1-7): ');
        if (opt === '1') {
            await webTemplatesMenu();
        } else if (opt === '2') {
            await creatorMenu();
        } else if (opt === '3') {
            await fileOperationsMenu();
        } else if (opt === '4') {
            await shortcutsMenu();
        } else if (opt === '5') {
            await appsMenu();
        } else if (opt === '6') {
            await diagnosticsMenu();
        } else if (opt === '7') {
            console.log(`\n${GREEN}Goodbye!${RESET}`);
            rl.close();
            process.exit(0);
        } else {
            await ask(`${RED}Invalid category choice! Press Enter to continue...${RESET}`);
        }
    }
}

main().catch(err => {
    logError('Unhandled script error occurred.', err);
    process.exit(1);
});
