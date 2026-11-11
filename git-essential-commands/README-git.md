# git development workflow


How to use it
# Make executable
chmod +x git-script.sh

# Interactive commit
./git-script.sh

# Supply commit message directly
./git-script.sh "feat: improve dashboard UI"


My additional recommendations
For your development workflow, I would eventually build a small Git command toolkit:
- git-save — stage, commit and push interactively.
- git-sync — fetch and synchronize with the remote branch.
- git-undo — safely undo the last commit or staged changes.
- git-clean — inspect untracked files before cleaning.
- git-release — create version tags and push releases.
Important: The enhanced script stages everything with git add -A. Keep a proper .gitignore and inspect staged changes before confirming, especially to avoid committing .env, credentials, database dumps or generated files.