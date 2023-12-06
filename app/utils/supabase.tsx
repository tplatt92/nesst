import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://vvuaxyldlijfzofmvxwl.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2dWF4eWxkbGlqZnpvZm12eHdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDE2ODQ0MDgsImV4cCI6MjAxNzI2MDQwOH0.HKD4y-6oAElyJwqOTt5NW4blBNvnGEA6Kw5IcvrfG_g"
);
