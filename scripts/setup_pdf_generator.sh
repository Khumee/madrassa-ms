#!/bin/bash
# Exit on error
set -e

echo "=== Madrassa MS: PDF Generator Setup Script ==="
echo "This script installs system-level dependencies required for on-the-fly PDF generation."
echo "Running this once on the Ubuntu server will prepare the environment."
echo ""

# Ensure pip is installed
if ! command -v pip3 &> /dev/null; then
    echo "[1/4] Installing Python 3 pip and venv..."
    sudo apt update
    sudo apt install -y python3-pip python3-venv
else
    echo "[1/4] Python 3 pip is already installed."
fi

# Install playwright python library
echo "[2/4] Installing playwright python package..."
pip3 install playwright || sudo pip3 install playwright

# Install chromium and system dependencies
echo "[3/4] Installing Playwright Chromium browser..."
python3 -m playwright install chromium

echo "[4/4] Installing system dependencies for Chromium..."
python3 -m playwright install-deps

echo ""
echo "=== Setup Completed Successfully! ==="
echo "PDF generation is now ready to be used on this system."
