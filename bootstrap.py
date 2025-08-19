# BINAYAK PANDIT

import os
import subprocess
import sys

def install_dependencies():
    print("📦 Installing dependencies...")
    try:
        subprocess.run(["pip", "install", "-r", "requirements.txt"], check=True)
        print("✅ Dependencies installed.")
    except subprocess.CalledProcessError:
        print("❌ Failed to install dependencies.")
        sys.exit(1)

def set_permissions():
    print("🔐 Setting executable permissions for scripts...")
    os.chmod("docker/entrypoint.sh", 0o755)
    print("✅ Permissions set.")

def build_docker():
    print("🐳 Building Docker container...")
    try:
        subprocess.run(["docker", "compose", "up", "--build", "-d"], check=True)
        print("✅ Docker container running.")
    except subprocess.CalledProcessError:
        print("❌ Docker build failed.")
        sys.exit(1)

def push_to_github():
    print("☁️ Uploading to GitHub...")
    try:
        subprocess.run(["git", "init"], check=True)
        subprocess.run(["git", "add", "."], check=True)
        subprocess.run(["git", "commit", "-m", "Initial commit from bootstrap"], check=True)

        remote_url = input("🌐 Enter GitHub repository URL (e.g., https://github.com/user/repo.git): ")
        subprocess.run(["git", "remote", "add", "origin", remote_url], check=True)
        subprocess.run(["git", "branch", "-M", "main"], check=True)
        subprocess.run(["git", "push", "-u", "origin", "main"], check=True)

        print("✅ Code pushed to GitHub.")
    except subprocess.CalledProcessError:
        print("❌ GitHub push failed. Check your credentials or repo URL.")
        sys.exit(1)

def main():
    print("🚀 Reconiti One-Click Bootstrap Starting...")
    install_dependencies()
    set_permissions()
    build_docker()
    
    push = input("🔄 Do you want to upload the code to GitHub? (y/n): ").strip().lower()
    if push == 'y':
        push_to_github()

if __name__ == "__main__":
    main()
