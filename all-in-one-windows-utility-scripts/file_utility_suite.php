<?php
/**
 * Enterprise File & System Utility Suite (PHP CLI Edition)
 * 
 * An enterprise-grade, menu-driven PHP terminal utility.
 * Runs natively on any PHP CLI installation with zero external dependencies.
 */

// Disable warnings from printouts
error_reporting(E_ALL & ~E_NOTICE & ~E_WARNING);

// --- Terminal Colors ---
define('GREEN', "\033[38;2;80;250;123m");
define('GRAY', "\033[38;2;90;90;90m");
define('CYAN', "\033[38;2;139;233;253m");
define('YELLOW', "\033[38;2;241;250;140m");
define('RED', "\033[38;2;255;85;85m");
define('RESET', "\033[0m");

$scriptDir = __DIR__;
$configFile = $scriptDir . DIRECTORY_SEPARATOR . 'settings.json';
$logFile = $scriptDir . DIRECTORY_SEPARATOR . 'errors.log';

// Fallback configuration
$config = [
    'default_backup_dir' => 'mybackup',
    'default_web_root' => 'webroot',
    'html_template_dir' => 'htmlSiteCreation',
    'app_template_dir' => 'app',
    'php_oop_dir' => 'php_oop'
];

// Load settings
if (file_exists($configFile)) {
    try {
        $raw = file_get_contents($configFile);
        $parsed = json_decode($raw, true);
        if (is_array($parsed)) {
            $config = array_merge($config, $parsed);
        }
    } catch (Exception $e) {
        echo YELLOW . "Warning: settings.json could not be loaded. Using defaults." . RESET . "\n";
    }
}

// Logger Function
function logError($message, $exception = null) {
    global $logFile;
    $timestamp = date('Y-m-d H:i:s');
    $details = $exception ? " | Details: " . $exception->getMessage() : "";
    $logLine = "[{$timestamp}] ERROR: {$message}{$details}\n";
    @file_put_contents($logFile, $logLine, FILE_APPEND);
    echo "\n" . RED . "[-] {$message} (Logged to errors.log)" . RESET . "\n";
}

// Safe Input Reader
function get_input($prompt) {
    echo $prompt;
    $line = fgets(STDIN);
    return trim($line);
}

// Clear Terminal Screen
function clear_screen() {
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        system('cls');
    } else {
        system('clear');
    }
}

function print_header($title) {
    clear_screen();
    $width = 58;
    echo CYAN . "┌" . str_repeat("─", $width - 2) . "┐\n";
    echo "│ " . GREEN . str_pad($title, $width - 4) . CYAN . " │\n";
    echo "└" . str_repeat("─", $width - 2) . "┘\n\n" . RESET;
}

function show_main_menu() {
    clear_screen();
    echo CYAN . "┌────────────────────────────────────────────────────────┐\n";
    echo "│ " . GREEN . "       ELITE FILE & SYSTEM UTILITY SUITE v2.1 (PHP)    " . CYAN . " │\n";
    echo "├────────────────────────────────────────────────────────┤\n";
    echo "│  1. Web Templates & Site Creators                      │\n";
    echo "│  2. File & Folder Creators                             │\n";
    echo "│  3. Advanced File Operations                           │\n";
    echo "│  4. Windows System Administrative Tools                │\n";
    echo "│  5. System Applications & Cache Directories            │\n";
    echo "│  6. System Diagnostics & Exporters                     │\n";
    echo "│  7. Exit                                               │\n";
    echo "└────────────────────────────────────────────────────────┘\n\n" . RESET;
}

// --- Menu 1: Web Templates ---
function web_templates_menu() {
    global $config;
    while (true) {
        print_header("WEB TEMPLATE GENERATOR");
        echo "1. PHP Web Project ({$config['default_web_root']})\n";
        echo "2. HTML Site Template ({$config['html_template_dir']})\n";
        echo "3. App Structure ({$config['app_template_dir']})\n";
        echo "4. PHP OOP Structure ({$config['php_oop_dir']})\n";
        echo "5. Basic Web Template (webTemplate folder)\n";
        echo "6. Back to Main Menu\n\n";

        $choice = get_input("Select a template (1-6): ");
        if ($choice === '1') {
            try {
                $base = getcwd() . DIRECTORY_SEPARATOR . $config['default_web_root'];
                $dirs = ['public/assets/css', 'public/assets/common', 'public/assets/inc', 'public/assets/js', 'private/class', 'private/config', 'private/core'];
                $files = ['public/login.php', 'public/index.php', 'public/admin.php', 'public/confirmdelete.php', 'public/view.php', 'public/test.php', 'public/regex.php', 'private/class/class.db_connect.inc.php', 'private/class/class.calendar.inc.php', 'private/class/class.event.inc.php', 'private/class/class.admin.inc.php', 'private/class/class.db-cred.inc.php', 'private/config/class.db-cred.inc.php', 'private/core/init.inc.php', 'public/assets/css/style.css', 'public/assets/css/admin.css', 'public/assets/css/ajax.css', 'public/assets/js/custom.js', 'public/assets/js/init.js', 'public/assets/js/valid-date.js', 'public/assets/common/header.inc.php', 'public/assets/common/footer.inc.php', 'public/assets/inc/process.inc.php', 'public/assets/inc/ajax.inc.php'];
                
                foreach ($dirs as $d) {
                    @mkdir($base . DIRECTORY_SEPARATOR . $d, 0777, true);
                }
                foreach ($files as $f) {
                    @file_put_contents($base . DIRECTORY_SEPARATOR . $f, "");
                }
                echo "\n" . GREEN . "PHP Web Project created inside: {$base}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed creating PHP Web Project.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '2') {
            try {
                $base = getcwd() . DIRECTORY_SEPARATOR . $config['html_template_dir'];
                $dirs = ['css', 'img', 'js'];
                $files = ['.htaccess', '404.html', 'humans.txt', 'index.html', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'css/style.css', 'css/normalize.css', 'js/custom.js', 'js/modernizr.js', 'js/jquery.js'];
                
                foreach ($dirs as $d) {
                    @mkdir($base . DIRECTORY_SEPARATOR . $d, 0777, true);
                }
                foreach ($files as $f) {
                    @file_put_contents($base . DIRECTORY_SEPARATOR . $f, "");
                }
                echo "\n" . GREEN . "HTML Site created inside: {$base}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed creating HTML Project.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '3') {
            try {
                $base = getcwd() . DIRECTORY_SEPARATOR . $config['app_template_dir'];
                $dirs = ['temp/styles', 'assets/styles', 'assets/images/icons'];
                $files = ['assets/styles/styles.css', 'temp/styles/styles.css', '.htaccess', '404.html', 'humans.txt', 'index.html', 'robots.txt', 'site.webmanifest', 'sitemap.xml'];
                
                foreach ($dirs as $d) {
                    @mkdir($base . DIRECTORY_SEPARATOR . $d, 0777, true);
                }
                foreach ($files as $f) {
                    @file_put_contents($base . DIRECTORY_SEPARATOR . $f, "");
                }
                echo "\n" . GREEN . "App Project created inside: {$base}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed creating App Project.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '4') {
            try {
                $base = getcwd() . DIRECTORY_SEPARATOR . $config['php_oop_dir'];
                $dirs = ['css', 'img', 'js'];
                $files = ['.htaccess', '404.html', 'humans.txt', 'index.php', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'css/style.css', 'css/normalize.css', 'js/custom.js', 'js/modernizr.js', 'js/jquery.js'];
                
                foreach ($dirs as $d) {
                    @mkdir($base . DIRECTORY_SEPARATOR . $d, 0777, true);
                }
                foreach ($files as $f) {
                    @file_put_contents($base . DIRECTORY_SEPARATOR . $f, "");
                }
                echo "\n" . GREEN . "PHP OOP Project created inside: {$base}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed creating PHP OOP Project.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '5') {
            try {
                $base = getcwd() . DIRECTORY_SEPARATOR . 'webTemplate';
                $dirs = ['css', 'img', 'js'];
                $files = ['.htaccess', '404.html', 'humans.txt', 'index.php', 'robots.txt', 'site.webmanifest', 'sitemap.xml', 'css/style.css', 'css/normalize.css', 'js/custom.js', 'js/modernizr.js', 'js/jquery.js'];
                
                foreach ($dirs as $d) {
                    @mkdir($base . DIRECTORY_SEPARATOR . $d, 0777, true);
                }
                for ($i = 1; $i <= 5; $i++) {
                    @file_put_contents($base . DIRECTORY_SEPARATOR . "D{$i}.txt", "");
                }
                foreach ($files as $f) {
                    @file_put_contents($base . DIRECTORY_SEPARATOR . $f, "");
                }
                echo "\n" . GREEN . "Basic Web Template created inside: {$base}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed creating Basic Web Template.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '6') {
            break;
        } else {
            get_input(RED . "Invalid choice. Press Enter to retry..." . RESET);
        }
    }
}

// --- Menu 2: File & Folder Creators ---
function folder_creator_menu() {
    while (true) {
        print_header("FILE & FOLDER CREATOR");
        echo "1. Create Project Folders (Project1 to Project10)\n";
        echo "2. Create Custom File (User-defined Name & Extension)\n";
        echo "3. Create Batch Dummy Files (index1-10.php, style1-3.css, etc.)\n";
        echo "4. Back to Main Menu\n\n";

        $choice = get_input("Select an option (1-4): ");
        if ($choice === '1') {
            try {
                $base = getcwd() . DIRECTORY_SEPARATOR . 'WebProject';
                @mkdir($base, 0777, true);
                for ($i = 1; $i <= 10; $i++) {
                    @mkdir($base . DIRECTORY_SEPARATOR . "Project{$i}", 0777, true);
                }
                echo "\n" . GREEN . "10 project subfolders successfully created inside: {$base}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed creating WebProject folders.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '2') {
            $name = get_input("Enter file name: ");
            $ext = get_input("Enter file extension (without dot): ");
            if ($name && $ext) {
                try {
                    @file_put_contents("{$name}.{$ext}", "");
                    echo "\n" . GREEN . "File '{$name}.{$ext}' created successfully!" . RESET . "\n";
                } catch (Exception $e) {
                    logError("Failed to create custom file.", $e);
                }
            } else {
                echo RED . "Invalid inputs." . RESET . "\n";
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '3') {
            try {
                for ($i = 1; $i <= 10; $i++) {
                    @file_put_contents("index{$i}.php", "");
                }
                for ($i = 1; $i <= 3; $i++) {
                    @file_put_contents("style{$i}.css", "");
                    @file_put_contents("custom{$i}.js", "");
                    @file_put_contents("template{$i}.tpl", "");
                }
                echo "\n" . GREEN . "Dummy files batch created successfully!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed to create dummy files.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '4') {
            break;
        } else {
            get_input(RED . "Invalid choice. Press Enter to retry..." . RESET);
        }
    }
}

// --- Menu 3: Advanced File Operations ---
function file_operations_menu() {
    global $config;
    while (true) {
        print_header("ADVANCED FILE OPERATIONS");
        echo "1. Copy File\n";
        echo "2. Move Text Files (*.txt) to WebProject Folder\n";
        echo "3. Search & Backup Files (Search by extension recursively to {$config['default_backup_dir']}/)\n";
        echo "4. Batch Rename Loop (mac-osx-command-line-terminal-X-638.jpg -> X.jpg)\n";
        echo "5. Bulk Change File Extensions (e.g. *.js -> *.php)\n";
        echo "6. Bulk Change Extensions (Sequentially rename files, e.g. *.js -> index1.php)\n";
        echo "7. Change All Extensions to .txt (*.* -> *.txt)\n";
        echo "8. Back to Main Menu\n\n";

        $choice = get_input("Select an option (1-8): ");
        if ($choice === '1') {
            $src = get_input("Enter source file path: ");
            $dest = get_input("Enter destination folder path: ");
            if (file_exists($src)) {
                try {
                    @mkdir($dest, 0777, true);
                    @copy($src, $dest . DIRECTORY_SEPARATOR . basename($src));
                    echo "\n" . GREEN . "File copied successfully!" . RESET . "\n";
                } catch (Exception $e) {
                    logError("Failed to copy file.", $e);
                }
            } else {
                echo RED . "Source file not found!" . RESET . "\n";
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '2') {
            try {
                $dest = getcwd() . DIRECTORY_SEPARATOR . 'WebProject';
                @mkdir($dest, 0777, true);
                $files = glob("*.txt");
                $movedCount = 0;
                foreach ($files as $f) {
                    if (is_file($f)) {
                        @rename($f, $dest . DIRECTORY_SEPARATOR . $f);
                        $movedCount++;
                    }
                }
                echo "\n" . GREEN . "Moved {$movedCount} text files successfully!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed moving txt files.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '3') {
            $ext = get_input("Enter extension to backup (e.g. bat or txt): ");
            if (strpos($ext, '.') === 0) $ext = substr($ext, 1);
            $dest = getcwd() . DIRECTORY_SEPARATOR . $config['default_backup_dir'];
            try {
                @mkdir($dest, 0777, true);
                $directory = new RecursiveDirectoryIterator(getcwd());
                $iterator = new RecursiveIteratorIterator($directory);
                $count = 0;
                foreach ($iterator as $info) {
                    if ($info->isFile() && $info->getExtension() === $ext) {
                        if (strpos(realpath($info->getPath()), realpath($dest)) === false) {
                            @copy($info->getPathname(), $dest . DIRECTORY_SEPARATOR . $info->getFilename());
                            $count++;
                        }
                    }
                }
                echo "\n" . GREEN . "Backed up {$count} files to: {$dest}" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed backing up files.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '4') {
            try {
                $count = 0;
                for ($i = 0; $i <= 200; $i++) {
                    $oldName = "mac-osx-command-line-terminal-{$i}-638.jpg";
                    if (file_exists($oldName)) {
                        @rename($oldName, "{$i}.jpg");
                        $count++;
                    }
                }
                echo "\n" . GREEN . "Renamed {$count} OSX templates successfully!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed renaming images.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '5') {
            $oldExt = get_input("Enter old extension (without dot): ");
            $newExt = get_input("Enter new extension (without dot): ");
            try {
                $files = glob("*.{$oldExt}");
                $count = 0;
                foreach ($files as $f) {
                    if (is_file($f)) {
                        $base = pathinfo($f, PATHINFO_FILENAME);
                        @rename($f, "{$base}.{$newExt}");
                        $count++;
                    }
                }
                echo "\n" . GREEN . "Replaced extensions for {$count} files!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Bulk extension change failed.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '6') {
            $oldExt = get_input("Enter old extension (without dot): ");
            $newExt = get_input("Enter new extension (without dot): ");
            try {
                $files = glob("*.{$oldExt}");
                $idx = 1;
                foreach ($files as $f) {
                    if (is_file($f)) {
                        @rename($f, "index{$idx}.{$newExt}");
                        $idx++;
                    }
                }
                $count = $idx - 1;
                echo "\n" . GREEN . "Sequentially renamed {$count} files!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Sequential renaming failed.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '7') {
            if (get_input("Convert non-script files in current folder to .txt? Type YES: ") !== 'YES') {
                get_input(YELLOW . "Operation canceled. Press Enter..." . RESET);
                continue;
            }
            $protectedExts = ['txt', 'bat', 'ps1', 'py', 'js', 'php', 'json', 'md', 'html', 'reg', 'log'];
            try {
                $files = glob("*");
                $count = 0;
                foreach ($files as $f) {
                    $ext = strtolower(pathinfo($f, PATHINFO_EXTENSION));
                    if (is_file($f) && !in_array($ext, $protectedExts, true) && $f !== '.gitignore') {
                        $base = pathinfo($f, PATHINFO_FILENAME);
                        @rename($f, "{$base}.txt");
                        $count++;
                    }
                }
                echo "\n" . GREEN . "Renamed {$count} files to '.txt' (scripts/docs protected)!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed converting files to txt.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '8') {
            break;
        } else {
            get_input(RED . "Invalid choice. Press Enter to retry..." . RESET);
        }
    }
}

function cmd_exists($exe) {
    exec("where " . escapeshellarg($exe) . " >nul 2>&1", $out, $rc);
    return $rc === 0;
}

function find_photoshop_exe() {
    $matches = glob('C:\\Program Files\\Adobe\\Adobe Photoshop *\\Photoshop.exe');
    if (empty($matches)) return null;
    rsort($matches);
    return $matches[0];
}

// --- Menu 4: Shortcuts ---
function shortcuts_menu() {
    if (strtoupper(substr(PHP_OS, 0, 3)) !== 'WIN') {
        echo RED . "Shortcut commands are only supported on Windows!" . RESET . "\n";
        get_input("Press Enter to continue...");
        return;
    }
    while (true) {
        print_header("WINDOWS ADMINISTRATIVE SHORTCUTS");
        echo "1. Control Panel\n";
        echo "2. Windows Services (services.msc)\n";
        echo "3. Add/Remove Programs (appwiz.cpl)\n";
        echo "4. Registry Editor (regedit)\n";
        echo "5. Windows Terminal / Command Prompt\n";
        echo "6. Local Users and Groups (lusrmgr.msc / netplwiz)\n";
        echo "7. Disk Management (diskmgmt.msc)\n";
        echo "8. Computer Management Console (compmgmt.msc)\n";
        echo "9. Desktop Icon Settings\n";
        echo "10. Group Policy Editor (gpedit.msc)\n";
        echo "11. Network Connections Manager (ncpa.cpl)\n";
        echo "12. Environment Variables Editor\n";
        echo "13. System Properties (Advanced Tab)\n";
        echo "14. Back to Main Menu\n\n";

        $choice = get_input("Select a shortcut (1-14): ");
        if ($choice === '14') break;

        $sys32 = (getenv('SystemRoot') ?: 'C:\\Windows') . DIRECTORY_SEPARATOR . 'System32';
        if ($choice === '6') {
            if (file_exists($sys32 . '\\lusrmgr.msc')) @pclose(@popen("start lusrmgr.msc", "r"));
            else { echo YELLOW . "lusrmgr.msc unavailable on Home edition; opening netplwiz..." . RESET . "\n"; @pclose(@popen("start netplwiz", "r")); get_input("Press Enter..."); }
            continue;
        }
        if ($choice === '10') {
            if (file_exists($sys32 . '\\gpedit.msc')) @pclose(@popen("start gpedit.msc", "r"));
            else { echo YELLOW . "gpedit.msc is only included in Windows Pro/Enterprise editions." . RESET . "\n"; get_input("Press Enter..."); }
            continue;
        }

        $commands = [
            '1' => 'control', '2' => 'services.msc', '3' => 'appwiz.cpl', '4' => 'regedit',
            '5' => cmd_exists('wt.exe') ? 'wt.exe' : 'cmd',
            '7' => 'diskmgmt.msc', '8' => 'compmgmt.msc',
            '9' => 'rundll32.exe shell32.dll,Control_RunDLL desk.cpl,,0',
            '11' => 'ncpa.cpl',
            '12' => 'rundll32.exe sysdm.cpl,EditEnvironmentVariables',
            '13' => 'rundll32.exe shell32.dll,Control_RunDLL sysdm.cpl,,3'
        ];

        if (isset($commands[$choice])) {
            @pclose(@popen("start " . $commands[$choice], "r"));
        } else {
            get_input(RED . "Invalid shortcut option. Press Enter to retry..." . RESET);
        }
    }
}

// --- Menu 5: Apps Menu ---
function apps_menu() {
    while (true) {
        print_header("APPLICATIONS & CACHE SYSTEM");
        echo "1. Open Google Chrome\n";
        echo "2. Open Microsoft Edge\n";
        echo "3. Open Mozilla Firefox\n";
        echo "4. Open Opera\n";
        echo "5. Open Terminal / Command Prompt (Admin)\n";
        echo "6. Open Notepad\n";
        echo "7. Open Notepad++\n";
        echo "8. Open Sublime Text\n";
        echo "9. Open Visual Studio Code\n";
        echo "10. Open Phoenix Code\n";
        echo "11. Open Microsoft Word\n";
        echo "12. Open Microsoft Excel\n";
        echo "13. Open Adobe Photoshop\n";
        echo "14. Open Git Bash\n";
        echo "15. Open PowerShell (7+ or 5.1)\n";
        echo "16. Open Deluge Torrent Client\n";
        echo "17. Open Temp Directory\n";
        echo "18. Open Local AppData Directory\n";
        echo "19. Open Downloads Directory\n";
        echo "20. Back to Main Menu\n\n";

        $choice = get_input("Select an option (1-20): ");
        if ($choice === '20') break;

        try {
            if ($choice === '1') {
                if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') system("start https://www.google.com");
                else system("xdg-open https://www.google.com");
            } elseif ($choice === '2') {
                system("start msedge https://www.google.com");
            } elseif ($choice === '3') {
                system("start firefox");
            } elseif ($choice === '4') {
                $operaLocal = getenv('LOCALAPPDATA') . "\\Programs\\Opera\\opera.exe";
                $operaProg = "C:\\Program Files\\Opera\\launcher.exe";
                if (file_exists($operaLocal)) @pclose(@popen("start \"\" \"{$operaLocal}\"", "r"));
                elseif (file_exists($operaProg)) @pclose(@popen("start \"\" \"{$operaProg}\"", "r"));
                else system("start opera");
            } elseif ($choice === '5') {
                $term = cmd_exists('wt.exe') ? 'wt.exe' : 'cmd';
                system("powershell -NoProfile -Command \"Start-Process {$term} -Verb RunAs\"");
            } elseif ($choice === '6') {
                @pclose(@popen("start notepad.exe", "r"));
            } elseif ($choice === '7') {
                $pathNpp = "C:\\Program Files\\Notepad++\\notepad++.exe";
                if (file_exists($pathNpp)) @pclose(@popen("start \"\" \"{$pathNpp}\"", "r"));
                else { echo RED . "Notepad++ not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '8') {
                $pathSubl = "C:\\Program Files\\Sublime Text\\sublime_text.exe";
                if (file_exists($pathSubl)) @pclose(@popen("start \"\" \"{$pathSubl}\"", "r"));
                else { echo RED . "Sublime Text not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '9') {
                $localCode = getenv('LOCALAPPDATA') . "\\Programs\\Microsoft VS Code\\Code.exe";
                $progCode = "C:\\Program Files\\Microsoft VS Code\\Code.exe";
                if (cmd_exists('code')) system("start code");
                elseif (file_exists($localCode)) @pclose(@popen("start \"\" \"{$localCode}\"", "r"));
                elseif (file_exists($progCode)) @pclose(@popen("start \"\" \"{$progCode}\"", "r"));
                else { echo RED . "VS Code not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '10') {
                $pathPhCode = getenv('LOCALAPPDATA') . "\\Phoenix Code\\Phoenix Code.exe";
                if (file_exists($pathPhCode)) @pclose(@popen("start \"\" \"{$pathPhCode}\"", "r"));
                else { echo RED . "Phoenix Code not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '11') {
                system("start winword");
            } elseif ($choice === '12') {
                system("start excel");
            } elseif ($choice === '13') {
                $pathPs = find_photoshop_exe();
                if ($pathPs) @pclose(@popen("start \"\" \"{$pathPs}\"", "r"));
                else { echo RED . "Photoshop not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '14') {
                $pathGit = "C:\\Program Files\\Git\\git-bash.exe";
                if (file_exists($pathGit)) @pclose(@popen("start \"\" \"{$pathGit}\"", "r"));
                else { echo RED . "Git Bash not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '15') {
                $psBin = cmd_exists('pwsh.exe') ? 'pwsh.exe' : 'powershell.exe';
                @pclose(@popen("start {$psBin}", "r"));
            } elseif ($choice === '16') {
                $pathDeluge = "C:\\Program Files\\Deluge\\deluge.exe";
                if (file_exists($pathDeluge)) @pclose(@popen("start \"\" \"{$pathDeluge}\"", "r"));
                else { echo RED . "Deluge not found!" . RESET . "\n"; get_input("Press Enter..."); }
            } elseif ($choice === '17') {
                system("explorer \"" . getenv('TEMP') . "\"");
            } elseif ($choice === '18') {
                system("explorer \"" . getenv('LOCALAPPDATA') . "\"");
            } elseif ($choice === '19') {
                $downloads = getenv('USERPROFILE') . "\\Downloads";
                system("explorer \"{$downloads}\"");
            } else {
                get_input(RED . "Invalid option. Press Enter to retry..." . RESET);
            }
        } catch (Exception $e) {
            logError("Failed launching choice {$choice}", $e);
        }
    }
}

// --- Menu 6: Diagnostics ---
function diagnostics_menu() {
    global $config;
    while (true) {
        print_header("SYSTEM DIAGNOSTICS & EXPORTERS");
        echo "1. Export Environment Variables to 'output.txt'\n";
        echo "2. Export Installed Program List to 'AllProgramFilesListing.txt'\n";
        echo "3. Export Directory Listing of '{$config['app_template_dir']}' to 'Listing.txt'\n";
        echo "4. Open Elevated Terminal / CMD at Current Location\n";
        echo "5. Back to Main Menu\n\n";

        $choice = get_input("Select an option (1-5): ");
        if ($choice === '1') {
            try {
                $envStr = "";
                foreach ($_ENV as $k => $v) {
                    $envStr .= "{$k}={$v}\n";
                }
                if (empty($envStr)) {
                    foreach (getenv() as $k => $v) {
                        $envStr .= "{$k}={$v}\n";
                    }
                }
                file_put_contents("output.txt", $envStr, LOCK_EX);
                echo "\n" . GREEN . "Environment variables saved to output.txt!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed exporting environment variables.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '2') {
            try {
                $psCmd = "\$paths = @('HKLM:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKLM:\\Software\\Wow6432Node\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*','HKCU:\\Software\\Microsoft\\Windows\\CurrentVersion\\Uninstall\\*'); Get-ItemProperty \$paths -ErrorAction SilentlyContinue | Where-Object DisplayName | Select-Object DisplayName, DisplayVersion, Publisher | Sort-Object DisplayName -Unique | Format-Table -AutoSize | Out-String -Width 240 | Out-File -FilePath 'AllProgramFilesListing.txt' -Encoding utf8";
                exec("powershell -NoProfile -Command \"{$psCmd}\"");
                echo "\n" . GREEN . "Full 64/32-bit + User software list saved to AllProgramFilesListing.txt!" . RESET . "\n";
            } catch (Exception $e) {
                logError("Failed program list export.", $e);
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '3') {
            $appDir = getcwd() . DIRECTORY_SEPARATOR . $config['app_template_dir'];
            if (file_exists($appDir)) {
                try {
                    $listing = "--- Recursive Directory Listing of: {$appDir} ---\n";
                    $directory = new RecursiveDirectoryIterator($appDir);
                    $iterator = new RecursiveIteratorIterator($directory);
                    foreach ($iterator as $info) {
                        if ($info->isFile()) {
                            $listing .= $info->getPathname() . "\n";
                        }
                    }
                    file_put_contents('Listing.txt', $listing, LOCK_EX);
                    echo "\n" . GREEN . "Directory structure of '{$config['app_template_dir']}' exported to Listing.txt!" . RESET . "\n";
                } catch (Exception $e) {
                    logError("Failed app list compilation.", $e);
                }
            } else {
                echo RED . "'{$config['app_template_dir']}' folder does not exist! Please create it via the Web Templates menu." . RESET . "\n";
            }
            get_input("Press Enter to continue...");
        } elseif ($choice === '4') {
            if (cmd_exists('wt.exe')) {
                system("powershell -NoProfile -Command \"Start-Process wt.exe -ArgumentList '-d', '\\\"" . getcwd() . "\\\"' -Verb RunAs\"");
            } else {
                system("powershell -NoProfile -Command \"Start-Process cmd -ArgumentList '/K cd /d \\\"" . getcwd() . "\\\"' -Verb RunAs\"");
            }
        } elseif ($choice === '5') {
            break;
        } else {
            get_input(RED . "Invalid choice. Press Enter to retry..." . RESET);
        }
    }
}

// --- Main Loop ---
while (true) {
    show_main_menu();
    $opt = get_input("Select a utility category (1-7): ");
    if ($opt === '1') {
        web_templates_menu();
    } elseif ($opt === '2') {
        folder_creator_menu();
    } elseif ($opt === '3') {
        file_operations_menu();
    } elseif ($opt === '4') {
        shortcuts_menu();
    } elseif ($opt === '5') {
        apps_menu();
    } elseif ($opt === '6') {
        diagnostics_menu();
    } elseif ($opt === '7') {
        echo "\n" . GREEN . "Goodbye!" . RESET . "\n";
        exit(0);
    } else {
        get_input(RED . "Invalid category choice! Press Enter to continue..." . RESET);
    }
}
