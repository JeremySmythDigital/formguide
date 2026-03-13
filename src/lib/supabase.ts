import { createClient, SupabaseClient } from '@supabase/supabase-js';

let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
  if (!supabaseClient) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseAnonKey) {
      // Return a mock client for build/development without Supabase configured
      console.warn('Supabase not configured. Using mock client.');
      return createClient('https://placeholder.supabase.co', 'placeholder-key');
    }
    
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseClient;
}

export const supabase = new Proxy({} as SupabaseClient, {
  get(target, prop) {
    return getSupabaseClient()[prop as keyof SupabaseClient];
  }
});

// Types for database
export interface FormSession {
  id: string;
  user_id: string;
  form_name: string;
  original_file_url: string;
  parsed_fields: any;
  progress: any;
  status: 'draft' | 'in_progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export async function saveFormSession(session: Partial<FormSession>) {
  const { data, error } = await getSupabaseClient()
    .from('form_sessions')
    .upsert(session)
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getFormSession(id: string) {
  const { data, error } = await getSupabaseClient()
    .from('form_sessions')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
}

export async function getUserSessions(userId: string) {
  const { data, error } = await getSupabaseClient()
    .from('form_sessions')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false });
  
  if (error) throw error;
  return data;
}