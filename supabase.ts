
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.7';

// Thay thế URL và Key này bằng thông tin từ Settings -> API trong Dashboard Supabase của bạn
const supabaseUrl = 'https://wqvflletczcvhglwydyi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndxdmZsbGV0Y3pjdmhnbHd5ZHlpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjgzNTA1ODksImV4cCI6MjA4MzkyNjU4OX0.IpKOoeGvJkQPUflG_8bpI74XdWtgFTVtZc8pG9vD8q0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
