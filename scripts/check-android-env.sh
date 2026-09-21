#!/usr/bin/env bash
# ==============================================================================
# Environment Check: Java (JDK 17+) & Android SDK Toolchain for Kindle Fire OS
# ==============================================================================

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
BOLD='\033[1m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

echo -e "${BLUE}${BOLD}======================================================${NC}"
echo -e "${BLUE}${BOLD}  Ramen Nights & Budget Bites - Android / Fire OS Env ${NC}"
echo -e "${BLUE}${BOLD}======================================================${NC}"
echo ""

# ------------------------------------------------------------------------------
# 1. Check Java (JDK 17+)
# ------------------------------------------------------------------------------
echo -e "${BOLD}[1/4] Checking Java Development Kit (JDK 17+)...${NC}"
if command -v java >/dev/null 2>&1; then
    JAVA_VERSION_STR=$(java -version 2>&1 | awk -F '"' '/version/ {print $2}')
    # Extract major version number (e.g., "17.0.2" -> 17, "1.8.0_292" -> 8, "21" -> 21)
    JAVA_MAJOR=$(echo "$JAVA_VERSION_STR" | awk -F'.' '{if ($1 == "1") print $2; else print $1}')

    if [[ -n "$JAVA_MAJOR" && "$JAVA_MAJOR" -ge 17 ]]; then
        echo -e "  ${GREEN}✓ Java is installed:${NC} version $JAVA_VERSION_STR (Major: $JAVA_MAJOR >= 17)"
    else
        echo -e "  ${RED}✗ Java version is too old:${NC} detected $JAVA_VERSION_STR. Capacitor 7/8 and modern Android Gradle Plugin require JDK 17+."
        ERRORS=$((ERRORS + 1))
    fi
else
    echo -e "  ${RED}✗ Java is not installed or not found in PATH.${NC}"
    echo -e "    ${YELLOW}Capacitor and Gradle require JDK 17 or higher.${NC}"
    ERRORS=$((ERRORS + 1))
fi

# ------------------------------------------------------------------------------
# 2. Check Android SDK
# ------------------------------------------------------------------------------
echo ""
echo -e "${BOLD}[2/4] Checking Android SDK Configuration...${NC}"

SDK_PATH=""
if [[ -n "${ANDROID_HOME:-}" && -d "$ANDROID_HOME" ]]; then
    SDK_PATH="$ANDROID_HOME"
    echo -e "  ${GREEN}✓ ANDROID_HOME is set:${NC} $ANDROID_HOME"
elif [[ -n "${ANDROID_SDK_ROOT:-}" && -d "$ANDROID_SDK_ROOT" ]]; then
    SDK_PATH="$ANDROID_SDK_ROOT"
    echo -e "  ${GREEN}✓ ANDROID_SDK_ROOT is set:${NC} $ANDROID_SDK_ROOT"
elif [[ -d "$HOME/Android/Sdk" ]]; then
    SDK_PATH="$HOME/Android/Sdk"
    echo -e "  ${YELLOW}! Found standard SDK location:${NC} $SDK_PATH (Consider exporting ANDROID_HOME=$SDK_PATH)"
elif [[ -d "$HOME/Library/Android/sdk" ]]; then
    SDK_PATH="$HOME/Library/Android/sdk"
    echo -e "  ${YELLOW}! Found macOS SDK location:${NC} $SDK_PATH (Consider exporting ANDROID_HOME=$SDK_PATH)"
else
    echo -e "  ${RED}✗ Android SDK directory not found.${NC} Neither ANDROID_HOME nor ANDROID_SDK_ROOT are set."
    ERRORS=$((ERRORS + 1))
fi

if [[ -n "$SDK_PATH" ]]; then
    if [[ -d "$SDK_PATH/platform-tools" ]]; then
        echo -e "  ${GREEN}✓ platform-tools located${NC} (adb available at $SDK_PATH/platform-tools/adb)"
    else
        echo -e "  ${YELLOW}! platform-tools not found under $SDK_PATH.${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi

    if [[ -d "$SDK_PATH/platforms" ]]; then
        INSTALLED_PLATFORMS=$(ls -1 "$SDK_PATH/platforms" 2>/dev/null | tr '\n' ' ' || echo "none")
        echo -e "  ${GREEN}✓ Installed platforms:${NC} $INSTALLED_PLATFORMS"
    else
        echo -e "  ${YELLOW}! No android platforms found in $SDK_PATH/platforms.${NC}"
        WARNINGS=$((WARNINGS + 1))
    fi
fi

# ------------------------------------------------------------------------------
# 3. Check Gradle Wrapper
# ------------------------------------------------------------------------------
echo ""
echo -e "${BOLD}[3/4] Checking Gradle Wrapper (android/gradlew)...${NC}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
GRADLEW_PATH="$ROOT_DIR/android/gradlew"

if [[ -f "$GRADLEW_PATH" ]]; then
    if [[ -x "$GRADLEW_PATH" ]]; then
        echo -e "  ${GREEN}✓ Gradle wrapper exists and is executable:${NC} android/gradlew"
        echo -e "    (Local system Gradle installation is NOT required; gradlew self-provisions Gradle)."
    else
        echo -e "  ${YELLOW}! Gradlew exists but lacks execute permissions. Fixing...${NC}"
        chmod +x "$GRADLEW_PATH"
        echo -e "  ${GREEN}✓ Fixed execute permission on $GRADLEW_PATH${NC}"
    fi
else
    echo -e "  ${RED}✗ android/gradlew not found.${NC} Run 'npx cap add android' to initialize."
    ERRORS=$((ERRORS + 1))
fi

# ------------------------------------------------------------------------------
# 4. Check Fire OS Compatibility Configuration
# ------------------------------------------------------------------------------
echo ""
echo -e "${BOLD}[4/4] Checking Amazon Kindle Fire OS Compatibility...${NC}"
APP_BUILD_GRADLE="$ROOT_DIR/android/app/build.gradle"
VARIABLES_GRADLE="$ROOT_DIR/android/variables.gradle"

if [[ -f "$VARIABLES_GRADLE" ]]; then
    MIN_SDK=$(grep -E 'minSdkVersion\s*=' "$VARIABLES_GRADLE" | awk -F'=' '{print $2}' | tr -d ' ')
    if [[ -n "$MIN_SDK" && "$MIN_SDK" -ge 24 ]]; then
        echo -e "  ${GREEN}✓ minSdkVersion is $MIN_SDK >= 24${NC} (Supports Fire OS 6, 7, and 8+)."
    else
        echo -e "  ${RED}✗ minSdkVersion is $MIN_SDK (< 24).${NC} Fire OS requires minSdkVersion 24+ for modern Capacitor webview."
        ERRORS=$((ERRORS + 1))
    fi
fi

if [[ -f "$APP_BUILD_GRADLE" ]]; then
    if grep -q "com.google.android.gms" "$APP_BUILD_GRADLE"; then
        echo -e "  ${YELLOW}! Warning: Google Play Services dependency found in build.gradle.${NC}"
        echo -e "    Amazon Kindle Fire OS does not include Google Play Services by default."
        WARNINGS=$((WARNINGS + 1))
    else
        echo -e "  ${GREEN}✓ Zero hard Google Play Services dependencies detected.${NC} Safe for Amazon Kindle Fire OS."
    fi
fi

# ------------------------------------------------------------------------------
# Summary & Next Steps
# ------------------------------------------------------------------------------
echo ""
echo -e "${BLUE}${BOLD}======================================================${NC}"
if [[ $ERRORS -eq 0 ]]; then
    echo -e "${GREEN}${BOLD}  Environment Check Passed! ($WARNINGS warning(s))${NC}"
    echo -e "${BLUE}${BOLD}======================================================${NC}"
    echo -e "You can now assemble the APK using:"
    echo -e "  ${BOLD}pnpm run android:build${NC} or ${BOLD}bash scripts/build-android.sh${NC}"
    exit 0
else
    echo -e "${RED}${BOLD}  Environment Check Failed with $ERRORS error(s).${NC}"
    echo -e "${BLUE}${BOLD}======================================================${NC}"
    echo ""
    echo -e "${BOLD}How to configure missing requirements:${NC}"
    echo ""
    echo -e "1. ${BOLD}Install OpenJDK 17 or 21:${NC}"
    echo -e "   - Ubuntu/Debian: ${YELLOW}sudo apt-get update && sudo apt-get install -y openjdk-17-jdk${NC}"
    echo -e "   - Fedora:        ${YELLOW}sudo dnf install -y java-17-openjdk-devel${NC}"
    echo -e "   - Arch Linux:    ${YELLOW}sudo pacman -S jdk17-openjdk${NC}"
    echo -e "   - macOS:         ${YELLOW}brew install openjdk@17${NC}"
    echo ""
    echo -e "2. ${BOLD}Install Android Command Line Tools / SDK:${NC}"
    echo -e "   Download commandlinetools from https://developer.android.com/studio#command-line-tools-only"
    echo -e "   Extract and set environment variables in ~/.bashrc or ~/.zshrc:"
    echo -e "     ${YELLOW}export ANDROID_HOME=\$HOME/Android/Sdk${NC}"
    echo -e "     ${YELLOW}export PATH=\$PATH:\$ANDROID_HOME/cmdline-tools/latest/bin:\$ANDROID_HOME/platform-tools${NC}"
    echo -e "   Then install platform tools & SDK 34/35:"
    echo -e "     ${YELLOW}sdkmanager --install \"platform-tools\" \"platforms;android-34\" \"build-tools;34.0.0\"${NC}"
    echo ""
    exit 1
fi
