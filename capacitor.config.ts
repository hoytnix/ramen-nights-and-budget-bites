import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.ramennights.game',
  appName: 'Ramen Nights & Budget Bites',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
