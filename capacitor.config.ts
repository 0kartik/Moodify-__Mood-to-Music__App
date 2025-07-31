import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b1e915d37e604f52932be33895a33e80',
  appName: 'vibe-weave-tune',
  webDir: 'dist',
  server: {
    url: 'https://b1e915d3-7e60-4f52-932b-e33895a33e80.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#6B46C1',
      showSpinner: false
    }
  }
};

export default config;