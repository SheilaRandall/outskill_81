import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if environment variables are properly configured (not placeholder values)
const isSupabaseConfigured = supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl.startsWith('https://') && 
  supabaseUrl.includes('.supabase.co') &&
  !supabaseUrl.includes('your_supabase_project_url') &&
  !supabaseAnonKey.includes('your_supabase_anon_key');

// Only create client if environment variables are properly configured
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;