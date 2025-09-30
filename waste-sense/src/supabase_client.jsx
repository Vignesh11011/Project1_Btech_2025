
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://yazotywwzbkuusoyfqqp.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhem90eXd3emJrdXVzb3lmcXFwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkxNjQzOTksImV4cCI6MjA3NDc0MDM5OX0.pjKgX05B6TrVu2ZIdmEx5vTFqM8V9X5YrWoJ3Ixu3qY"
export const supabase = createClient(supabaseUrl, supabaseKey)