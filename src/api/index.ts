import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
const supabase = createClient(
  'https://ussuupuslmyqbmtenelw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzc3V1cHVzbG15cWJtdGVuZWx3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc4Nzc5NzEsImV4cCI6MjA1MzQ1Mzk3MX0.nEe-wSgm_H3CBMNdKIyx2y1SJ3ZLGZ-LCy-geC6GUl4',
)

export default supabase
