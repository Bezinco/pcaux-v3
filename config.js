// Supabase configuration
const SUPABASE_URL = 'https://knceschbzidmqvosdwud.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtuY2VzY2hiemlkbXF2b3Nkd3VkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA5NTY2MTgsImV4cCI6MjA4NjUzMjYxOH0.2lZXDSMAQwo4mD5y66-2d6kd6FXMvIFBmNbBgoSx56o';

// Initialize Supabase client
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
console.log('✅ Supabase client initialized');
