import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://whjycxkehewbntrwlsmr.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoanljeGtlaGV3Ym50cndsc21yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDkxNTIxMjYsImV4cCI6MjAyNDcyODEyNn0.EWtgTVrrJ8SEtuVgpnYvgytrXl2UPIGk1YCHKb72i60";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
