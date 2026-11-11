<?php
/**
 * Enterprise File & System Utility Suite (Modern Windows 11 PHP CLI Edition)
 * Zero-dependency CLI tool with centralized JSON configuration, temp logging,
 * clean project scaffolds, pattern batch rename, and Win11 admin consoles.
 */

error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

define('GREEN', "\033[38;2;80;250;123m");
define('CYAN', "\033[38;2;139;233;253m");
define('YELLOW', "\033[38;2;241;250;140m");
define('RED', "\033[38;2;255;85;85m");
define('RESET', "\033[0m");

$configFile = __DIR__ . DIRECTORY_SEPARATOR . 'settings.json';
$logFile = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'windows-utility-suite-errors.log';
$protectedExts = ['txt', 'bat', 'ps1', 'py', 'js', 'php', 'json', 'md', 'html', 'reg', 'log'];

$config = [
    'default_backup_dir' => 'mybackup',
    'default_web_root' => 'webroot',
    'html_template_dir' => 'htmlSiteCreation',
    'app_template_dir' => 'app',
    'php_oop_dir' => 'php_oop',
];

if (file_exists($configFile)) {
    $parsed = json_decode((string)file_get_contents($configFile), true);
    if (is_array($parsed)) $config = array_merge($config, $parsed);
}

function logError($message, $exception = null) {
    global $logFile;
    $details = $exception ? ' | Details: ' . $exception->getMessage() : '';
    @file_put_contents($logFile, '[' . date('Y-m-d H:i:s') . "] ERROR: {$message}{$details}\n", FILE_APPEND);
    echo "\n" . RED . "[-] {$message} (Logged to {$logFile})" . RESET . "\n";
}

function get_input($prompt) {
    echo $prompt;
    $line = fgets(STDIN);
    return $line === false ? '' : trim($line);
}

function print_header($title) {
    system(strtoupper(substr(PHP_OS, 0, 3)) === 'WIN' ? 'cls' : 'clear');
    echo CYAN . '+' . str_repeat('-', 56) . "+\n";
    echo '| ' . GREEN . str_pad($title, 54) . CYAN . " |\n";
    echo '+' . str_repeat('-', 56) . "+\n\n" . RESET;
}

function cmd_exists($exe) {
    exec('where ' . escapeshellarg($exe) . ' >nul 2>&1', $out, $rc);
    return $rc === 0;
}

function write_scaffold($base, $dirs, $files, $label) {
    foreach ($dirs as $d) @mkdir($base . DIRECTORY_SEPARATOR . $d, 0777, true);
    foreach ($files as $rel => $body) {
        $full = $base . DIRECTORY_SEPARATOR . $rel;
        @mkdir(dirname($full), 0777, true);
        @file_put_contents($full, $body);
    }
    echo "\n" . GREEN . "[OK] {$label} created in: {$base}" . RESET . "\n";
}

function web_templates_menu() {
    global $config;
    while (true) {
        print_header('PROJECT SCAFFOLD GENERATORS');
        echo "1. Modern Static Web Starter ({$config['html_template_dir']})\n";
        echo "2. PHP App Starter ({$config['default_web_root']})\n";
        echo "3. Minimal App Starter ({$config['app_template_dir']})\n";
        echo "4. PHP OOP Starter ({$config['php_oop_dir']})\n";
        echo "5. Back to Main Menu\n\n";
        $c = get_input('Select (1-5): ');
        if ($c === '5') break;
        if ($c === '1') {
            write_scaffold(getcwd() . DIRECTORY_SEPARATOR . $config['html_template_dir'], ['css', 'js'], [
                'css/styles.css' => '',
                'js/app.js' => '',
                'index.html' => "<!DOCTYPE html><html lang=\"en\"><head><meta charset=\"UTF-8\"><title>App</title><link rel=\"stylesheet\" href=\"./css/styles.css\"></head><body><h1>Ready</h1><script src=\"./js/app.js\"></script></body></html>\n",
            ], 'Modern Web Starter');
        } elseif ($c === '2') {
            write_scaffold(getcwd() . DIRECTORY_SEPARATOR . $config['default_web_root'], ['public', 'src', 'config'], [
                'public/index.php' => "<?php declare(strict_types=1);\necho 'PHP App Ready';\n",
                'README.md' => "# PHP App\n",
            ], 'PHP App Starter');
        } elseif ($c === '3') {
            write_scaffold(getcwd() . DIRECTORY_SEPARATOR . $config['app_template_dir'], ['src', 'assets/styles'], [
                'assets/styles/app.css' => '',
                'index.html' => '',
            ], 'App Starter');
        } elseif ($c === '4') {
            write_scaffold(getcwd() . DIRECTORY_SEPARATOR . $config['php_oop_dir'], ['src', 'tests'], [
                'index.php' => "<?php declare(strict_types=1);\n",
                'README.md' => "# PHP OOP Package\n",
            ], 'PHP OOP Starter');
        }
        get_input('Press Enter...');
    }
}

function folder_creator_menu() {
    while (true) {
        print_header('FILE & FOLDER CREATORS');
        echo "1. Create Project Folders (Project1..ProjectN in WebProject)\n";
        echo "2. Create Custom File | 3. Batch Indexed Files | 4. Back\n\n";
        $c = get_input('Select (1-4): ');
        if ($c === '4') break;
        if ($c === '1') {
            $n = max(1, (int)(get_input('Count [10]: ') ?: 10));
            $base = getcwd() . DIRECTORY_SEPARATOR . 'WebProject';
            for ($i = 1; $i <= $n; $i++) @mkdir($base . DIRECTORY_SEPARATOR . "Project{$i}", 0777, true);
            echo GREEN . "[OK] Created {$n} folders in {$base}" . RESET . "\n";
        } elseif ($c === '2') {
            $name = get_input('File name: '); $ext = get_input('Extension: ');
            if ($name && $ext) { @file_put_contents("{$name}.{$ext}", ''); echo GREEN . "[OK] Created {$name}.{$ext}" . RESET . "\n"; }
        } elseif ($c === '3') {
            $pfx = get_input('Prefix [item]: ') ?: 'item';
            $ext = get_input('Extension [txt]: ') ?: 'txt';
            $n = max(1, (int)(get_input('Count [5]: ') ?: 5));
            for ($i = 1; $i <= $n; $i++) @file_put_contents("{$pfx}{$i}.{$ext}", '');
            echo GREEN . "[OK] Created {$pfx}1..{$n}.{$ext}" . RESET . "\n";
        }
        get_input('Press Enter...');
    }
}

function file_operations_menu() {
    global $config, $protectedExts;
    while (true) {
        print_header('ADVANCED FILE OPERATIONS');
        echo "1. Copy File | 2. Move *.txt to WebProject/ | 3. Recursive Backup\n";
        echo "4. Pattern Filename Replace | 5. Bulk Extension Replace\n";
        echo "6. Sequential Rename | 7. Safe Convert to .txt | 8. Back\n\n";
        $c = get_input('Select (1-8): ');
        if ($c === '8') break;
        if ($c === '1') {
            $src = get_input('Source path: '); $dest = get_input('Destination folder: ');
            if (is_file($src)) { @mkdir($dest, 0777, true); @copy($src, $dest . DIRECTORY_SEPARATOR . basename($src)); echo GREEN . "[OK] Copied." . RESET . "\n"; }
            else echo RED . "Source not found." . RESET . "\n";
        } elseif ($c === '2') {
            $dest = getcwd() . DIRECTORY_SEPARATOR . 'WebProject';
            @mkdir($dest, 0777, true);
            $skip = ['output.txt', 'Listing.txt', 'AllProgramFilesListing.txt', 'file_list.txt'];
            $cnt = 0;
            foreach (glob('*.txt') as $f) {
                if (is_file($f) && !in_array($f, $skip, true)) { @rename($f, $dest . DIRECTORY_SEPARATOR . $f); $cnt++; }
            }
            echo GREEN . "[OK] Moved {$cnt} .txt file(s)." . RESET . "\n";
        } elseif ($c === '3') {
            $ext = ltrim(get_input('Extension (without dot): '), '.');
            if ($ext) {
                $dest = getcwd() . DIRECTORY_SEPARATOR . $config['default_backup_dir'];
                @mkdir($dest, 0777, true);
                $cnt = 0;
                $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator(getcwd(), FilesystemIterator::SKIP_DOTS));
                foreach ($it as $info) {
                    if ($info->isFile() && $info->getExtension() === $ext && strpos(realpath($info->getPath()), realpath($dest)) === false) {
                        @copy($info->getPathname(), $dest . DIRECTORY_SEPARATOR . $info->getFilename());
                        $cnt++;
                    }
                }
                echo GREEN . "[OK] Backed up {$cnt} file(s)." . RESET . "\n";
            }
        } elseif ($c === '4') {
            $find = get_input('Find text in filename: '); $rep = get_input('Replacement: ');
            if ($find !== '') {
                $cnt = 0;
                foreach (glob('*') as $f) {
                    $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
                    if (is_file($f) && strpos($f, $find) !== false && !in_array($ext, $protectedExts, true)) {
                        @rename($f, str_replace($find, $rep, $f));
                        $cnt++;
                    }
                }
                echo GREEN . "[OK] Renamed {$cnt} file(s)." . RESET . "\n";
            }
        } elseif ($c === '5') {
            $o = ltrim(get_input('Old ext: '), '.'); $n = ltrim(get_input('New ext: '), '.');
            $files = glob("*.{$o}");
            foreach ($files as $f) if (is_file($f)) @rename($f, pathinfo($f, PATHINFO_FILENAME) . ".{$n}");
            echo GREEN . "[OK] Updated " . count($files) . " file(s)." . RESET . "\n";
        } elseif ($c === '6') {
            $o = ltrim(get_input('Old ext: '), '.'); $n = ltrim(get_input('New ext: '), '.');
            $idx = 1;
            foreach (glob("*.{$o}") as $f) if (is_file($f)) { @rename($f, "item{$idx}.{$n}"); $idx++; }
            echo GREEN . "[OK] Renamed " . ($idx - 1) . " file(s)." . RESET . "\n";
        } elseif ($c === '7') {
            if (get_input('Type YES to convert non-script files to .txt: ') === 'YES') {
                $cnt = 0;
                foreach (glob('*') as $f) {
                    $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
                    if (is_file($f) && !in_array($ext, $protectedExts, true) && $f !== '.gitignore') {
                        @rename($f, pathinfo($f, PATHINFO_FILENAME) . '.txt');
                        $cnt++;
                    }
                }
                echo GREEN . "[OK] Converted {$cnt} file(s)." . RESET . "\n";
            }
        }
        get_input('Press Enter...');
    }
}

function shortcuts_menu() {
    while (true) {
        print_header('WINDOWS 11 ADMINISTRATIVE CONSOLES');
        echo "1. Control Panel | 2. Services | 3. appwiz.cpl | 4. Regedit | 5. Terminal/CMD\n";
        echo "6. Local Users | 7. Disk Mgmt | 8. Computer Mgmt | 9. Desktop Icons | 10. Group Policy\n";
        echo "11. Network Connections | 12. Env Vars | 13. System Properties | 14. Back\n\n";
        $c = get_input('Select (1-14): ');
        if ($c === '14') break;
        $sys32 = (getenv('SystemRoot') ?: 'C:\\Windows') . DIRECTORY_SEPARATOR . 'System32';
        if ($c === '6') @pclose(@popen('start ' . (file_exists($sys32 . '\\lusrmgr.msc') ? 'lusrmgr.msc' : 'netplwiz'), 'r'));
        elseif ($c === '10') {
            if (file_exists($sys32 . '\\gpedit.msc')) @pclose(@popen('start gpedit.msc', 'r'));
            else { echo YELLOW . "gpedit.msc requires Pro/Enterprise edition." . RESET . "\n"; get_input('Press Enter...'); }
        } else {
            $map = [
                '1' => 'control', '2' => 'services.msc', '3' => 'appwiz.cpl', '4' => 'regedit',
                '5' => cmd_exists('wt.exe') ? 'wt.exe' : 'cmd', '7' => 'diskmgmt.msc', '8' => 'compmgmt.msc',
                '9' => 'rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0', '11' => 'ncpa.cpl',
                '12' => 'rundll32.exe sysdm.cpl,EditEnvironmentVariables',
                '13' => 'rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3',
            ];
            if (isset($map[$c])) @pclose(@popen('start ' . $map[$c], 'r'));
        }
    }
}

function apps_menu() {
    while (true) {
        print_header('APPLICATIONS & SYSTEM FOLDERS');
        echo "1. Chrome | 2. Edge | 3. Firefox | 4. Admin Terminal | 5. Notepad | 6. PowerShell 7+/5.1\n";
        echo "7. Notepad++ | 8. Sublime Text | 9. VS Code | 10. Git Bash | 11. Word | 12. Excel\n";
        echo "13. Windows Settings | 14. Temp | 15. Local AppData | 16. Downloads | 17. Back\n\n";
        $c = get_input('Select (1-17): ');
        if ($c === '17') break;
        if ($c === '1') system('start "" "https://www.google.com"');
        elseif ($c === '2') system('start msedge https://www.google.com');
        elseif ($c === '3') system('start firefox');
        elseif ($c === '4') system('powershell -NoProfile -Command "Start-Process ' . (cmd_exists('wt.exe') ? 'wt.exe' : 'cmd') . ' -Verb RunAs"');
        elseif ($c === '5') @pclose(@popen('start notepad.exe', 'r'));
        elseif ($c === '6') @pclose(@popen('start ' . (cmd_exists('pwsh.exe') ? 'pwsh.exe' : 'powershell.exe'), 'r'));
        elseif ($c === '7') { $p = 'C:\\Program Files\\Notepad++\\notepad++.exe'; file_exists($p) ? @pclose(@popen("start \"\" \"{$p}\"", 'r')) : get_input('Notepad++ not found...'); }
        elseif ($c === '8') { $p = 'C:\\Program Files\\Sublime Text\\sublime_text.exe'; file_exists($p) ? @pclose(@popen("start \"\" \"{$p}\"", 'r')) : get_input('Sublime Text not found...'); }
        elseif ($c === '9') {
            $l = getenv('LOCALAPPDATA') . '\\Programs\\Microsoft VS Code\\Code.exe';
            $g = 'C:\\Program Files\\Microsoft VS Code\\Code.exe';
            if (cmd_exists('code')) system('start code');
            elseif (file_exists($l)) @pclose(@popen("start \"\" \"{$l}\"", 'r'));
            elseif (file_exists($g)) @pclose(@popen("start \"\" \"{$g}\"", 'r'));
            else get_input('VS Code not found...');
        }
        elseif ($c === '10') { $p = 'C:\\Program Files\\Git\\git-bash.exe'; file_exists($p) ? @pclose(@popen("start \"\" \"{$p}\"", 'r')) : get_input('Git Bash not found...'); }
        elseif ($c === '11') system('start winword');
        elseif ($c === '12') system('start excel');
        elseif ($c === '13') system('start ms-settings:');
        elseif ($c === '14') system('explorer "' . getenv('TEMP') . '"');
        elseif ($c === '15') system('explorer "' . getenv('LOCALAPPDATA') . '"');
        elseif ($c === '16') system('explorer "' . getenv('USERPROFILE') . '\\Downloads"');
    }
}

function diagnostics_menu() {
    global $config;
    while (true) {
        print_header('SYSTEM DIAGNOSTICS & EXPORTERS');
        echo "1. Export Env Vars -> output.txt | 2. Export Installed Apps -> AllProgramFilesListing.txt\n";
        echo "3. Export '{$config['app_template_dir']}' Tree -> Listing.txt | 4. Elevated Terminal | 5. Back\n\n";
        $c = get_input('Select (1-5): ');
        if ($c === '5') break;
        if ($c === '1') {
            $lines = [];
            foreach (getenv() as $k => $v) $lines[] = "{$k}={$v}";
            ksort($lines);
            file_put_contents('output.txt', implode("\n", $lines), LOCK_EX);
            echo GREEN . "[OK] Saved output.txt" . RESET . "\n";
        } elseif ($c === '2') {
            $psCmd = "\$paths=@('HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'); Get-ItemProperty \$paths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName,DisplayVersion,Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File AllProgramFilesListing.txt -Encoding utf8";
            exec("powershell -NoProfile -Command \"{$psCmd}\"");
            echo GREEN . "[OK] Saved AllProgramFilesListing.txt" . RESET . "\n";
        } elseif ($c === '3') {
            $appDir = getcwd() . DIRECTORY_SEPARATOR . $config['app_template_dir'];
            if (is_dir($appDir)) {
                $out = [];
                $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($appDir, FilesystemIterator::SKIP_DOTS));
                foreach ($it as $info) if ($info->isFile()) $out[] = $info->getPathname();
                file_put_contents('Listing.txt', implode("\n", $out), LOCK_EX);
                echo GREEN . "[OK] Saved Listing.txt" . RESET . "\n";
            } else echo RED . "'{$config['app_template_dir']}' folder not found." . RESET . "\n";
        } elseif ($c === '4') {
            if (cmd_exists('wt.exe')) system("powershell -NoProfile -Command \"Start-Process wt.exe -ArgumentList '-d', '\\\"" . getcwd() . "\\\"' -Verb RunAs\"");
            else system("powershell -NoProfile -Command \"Start-Process cmd -ArgumentList '/K cd /d \\\"" . getcwd() . "\\\"' -Verb RunAs\"");
            continue;
        }
        get_input('Press Enter...');
    }
}

while (true) {
    print_header('MODERN FILE & SYSTEM UTILITY SUITE (PHP)');
    echo "  1. Web & App Project Scaffolds (4 Starters)\n";
    echo "  2. File & Folder Creators\n";
    echo "  3. Advanced File Operations (Copy, Move, Pattern Rename)\n";
    echo "  4. Windows 11 Administrative Consoles\n";
    echo "  5. Applications & System Folders\n";
    echo "  6. System Diagnostics & Exporters\n";
    echo "  7. Exit\n\n";
    $opt = get_input('Select a utility category (1-7): ');
    if ($opt === '1') web_templates_menu();
    elseif ($opt === '2') folder_creator_menu();
    elseif ($opt === '3') file_operations_menu();
    elseif ($opt === '4') shortcuts_menu();
    elseif ($opt === '5') apps_menu();
    elseif ($opt === '6') diagnostics_menu();
    elseif ($opt === '7') { echo GREEN . "Goodbye!" . RESET . "\n"; exit(0); }
}
