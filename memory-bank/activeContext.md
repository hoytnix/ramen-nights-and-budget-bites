# Active Context: Ramen Nights & Budget Bites

## Current Status & Focus
- Configured Capacitor 8 native Android layer targeting Amazon Kindle Fire OS.
- Initialized official architectural mandate and memory bank.
- Core game foundation is active with complete gameplay loop across web and mobile packaging.

## Active Work Stream
- Integrated `@capacitor/core`, `@capacitor/android`, and `@capacitor/cli`.
- Generated and validated `capacitor.config.ts` mapping webDir to `dist/` with HTTPS scheme for Android.
- Initialized native Android platform layer via `npx cap add android` with `android/gradlew` provisioned with executable permissions.
- Verified Amazon Kindle Fire OS compatibility (`minSdkVersion 24`, zero hard Google Play Services dependencies).
- Created automated environment validation script (`scripts/check-android-env.sh`) and unified build workflow script (`scripts/build-android.sh`) with `--skip-check` support.
- Updated package instructions for Debian 13 (`openjdk-21-jdk`).
- Updated `package.json` with `cap:sync`, `android:check`, and `android:build` commands.

## Recent State Changes
- Enhanced `scripts/check-android-env.sh` and `scripts/build-android.sh` to support Debian 13 Trixie package targets and `--skip-check` flag.
- Validated preflight failure behavior on host environments lacking Java 17+ or Android SDK.
- Updated Memory Bank and synchronized documentation.
