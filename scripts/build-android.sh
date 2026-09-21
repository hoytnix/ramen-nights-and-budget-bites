#!/usr/bin/env bash
# ==============================================================================
# Build Script: Compile Web Assets, Sync Capacitor, and Assemble Fire OS APK
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m'

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

cd "$ROOT_DIR"

echo -e "${BLUE}${BOLD}======================================================${NC}"
echo -e "${BLUE}${BOLD}  Ramen Nights & Budget Bites - APK Build Workflow    ${NC}"
echo -e "${BLUE}${BOLD}  Target: Amazon Kindle Fire OS (Capacitor Android)   ${NC}"
echo -e "${BLUE}${BOLD}======================================================${NC}"
echo ""

# ------------------------------------------------------------------------------
# 1. Environment Verification
# ------------------------------------------------------------------------------
SKIP_CHECK=false
for arg in "$@"; do
    if [[ "$arg" == "--skip-check" ]]; then
        SKIP_CHECK=true
    fi
done

if [[ "$SKIP_CHECK" == "true" ]]; then
    echo -e "${YELLOW}[Step 1/4] Skipping Host Environment Check (--skip-check passed)...${NC}"
else
    echo -e "${BOLD}[Step 1/4] Verifying Host Environment...${NC}"
    if ! bash "$SCRIPT_DIR/check-android-env.sh"; then
        echo -e "${RED}Error: Pre-requisites not satisfied. Please resolve missing tools above before building.${NC}"
        exit 1
    fi
fi

# ------------------------------------------------------------------------------
# 2. Compile Web Assets
# ------------------------------------------------------------------------------
echo ""
echo -e "${BOLD}[Step 2/4] Compiling Web Assets into dist/...${NC}"
if command -v pnpm >/dev/null 2>&1; then
    pnpm run build
else
    npm run build
fi
echo -e "${GREEN}✓ Web asset build complete.${NC}"

# ------------------------------------------------------------------------------
# 3. Capacitor Sync Android Layer
# ------------------------------------------------------------------------------
echo ""
echo -e "${BOLD}[Step 3/4] Syncing Assets & Plugins to Android layer...${NC}"
npx cap sync android
echo -e "${GREEN}✓ Capacitor sync complete.${NC}"

# ------------------------------------------------------------------------------
# 4. Assemble Debug APK via Gradle Wrapper
# ------------------------------------------------------------------------------
echo ""
echo -e "${BOLD}[Step 4/4] Assembling Debug APK with Gradle Wrapper...${NC}"
chmod +x "$ROOT_DIR/android/gradlew"

cd "$ROOT_DIR/android"
./gradlew assembleDebug

APK_OUTPUT="$ROOT_DIR/android/app/build/outputs/apk/debug/app-debug.apk"

echo ""
echo -e "${BLUE}${BOLD}======================================================${NC}"
echo -e "${GREEN}${BOLD}  Build Succeeded! Fire OS Compatible APK Generated:   ${NC}"
echo -e "${BLUE}${BOLD}======================================================${NC}"
echo -e "APK Path: ${BOLD}$APK_OUTPUT${NC}"
echo ""
echo -e "${BOLD}To Install / Sideload onto Amazon Kindle Fire Tablet:${NC}"
echo -e "1. ${YELLOW}Enable Developer Options & USB Debugging${NC} on your Fire tablet:"
echo -e "   Settings -> Device Options -> About Fire Tablet -> Tap 'Serial Number' 7 times."
echo -e "   Settings -> Device Options -> Developer Options -> Turn ON 'USB Debugging'."
echo -e "2. ${YELLOW}Install via ADB:${NC}"
echo -e "   ${BOLD}adb install -r \"$APK_OUTPUT\"${NC}"
echo -e "3. ${YELLOW}Alternative manual transfer:${NC}"
echo -e "   Copy 'app-debug.apk' to the tablet's Internal Storage or Download folder,"
echo -e "   and install using the Fire OS 'Files' or 'Docs' app."
echo ""
