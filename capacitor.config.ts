import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.vegans.hello',
  appName: 'Hello Vegans',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;
