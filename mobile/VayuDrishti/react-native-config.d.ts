declare module 'react-native-config' {
    export interface NativeConfig {
        // HOSTNAME?: string;
        SUPABASE_URL: string;
        SUPABASE_ANON_KEY: string;
        FIREBASE_API_KEY: string;
        FIREBASE_AUTH_DOMAIN: string;
        FIREBASE_PROJECT_ID: string;
        FIREBASE_STORAGE_BUCKET: string;
        FIREBASE_MESSAGING_SENDER_ID: string;
        FIREBASE_APP_ID: string;
    }
    
    export const Config: NativeConfig
    export default Config
  }