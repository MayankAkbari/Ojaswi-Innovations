import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://frpuhealrgtnwypqrdbl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_iPJ_BdL2qu0CGhn3Csqc4w_ZfGrxtu7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
