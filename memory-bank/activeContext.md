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
- Created automated environment validation script (`scripts/check-android-env.sh`) and unified build workflow script (`scripts/build-android.sh`).
- Updated `package.json` with `cap:sync`, `android:check`, and `android:build` commands.

## Recent State Changes
- Created `capacitor.config.ts` matching web bundle `dist`.
- Added native platform files in `android/` with `variables.gradle` configuring `minSdkVersion = 24`.
- Added `scripts/check-android-env.sh` and `scripts/build-android.sh`.
- Added Kindle Fire OS documentation to `README.md`.
