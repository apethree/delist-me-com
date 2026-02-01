-- Enable extensions for scheduling and networking
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 1. Queue Table: breach_monitors
CREATE TABLE public.breach_monitors (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE, -- Text ID
  email text NOT NULL,
  status text DEFAULT 'pending', -- pending, processing, checked, error
  last_checked_at timestamptz,
  next_check_at timestamptz DEFAULT NOW(),
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

-- 2. Known Breaches (Cache of HIBP data)
CREATE TABLE public.known_breaches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE, -- e.g. "Adobe"
  title text,
  domain text,
  breach_date date,
  added_date timestamptz,
  modified_date timestamptz,
  description text,
  logo_path text,
  pwn_count bigint,
  data_classes text[],
  is_verified boolean,
  is_fabricated boolean,
  is_sensitive boolean,
  is_retired boolean,
  is_spam_list boolean,
  created_at timestamptz DEFAULT NOW()
);

-- 3. User Breaches (Link Table)
CREATE TABLE public.user_breaches (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE,
  breach_id uuid REFERENCES public.known_breaches(id) ON DELETE CASCADE,
  email text NOT NULL,
  created_at timestamptz DEFAULT NOW(),
  UNIQUE(user_id, breach_id, email)
);

-- RLS Policies
ALTER TABLE public.breach_monitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.known_breaches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_breaches ENABLE ROW LEVEL SECURITY;

-- breach_monitors policies
CREATE POLICY "Users can read own monitors" ON public.breach_monitors
  FOR SELECT USING ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Users can insert own monitors" ON public.breach_monitors
  FOR INSERT WITH CHECK ((auth.jwt() ->> 'sub') = user_id);

-- known_breaches policies (Public read, Service write)
CREATE POLICY "Authenticated users can read breaches" ON public.known_breaches
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Service role manages breaches" ON public.known_breaches
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- user_breaches policies
CREATE POLICY "Users can read own matches" ON public.user_breaches
  FOR SELECT USING ((auth.jwt() ->> 'sub') = user_id);

CREATE POLICY "Service role manages matches" ON public.user_breaches
  FOR ALL TO service_role USING (true) WITH CHECK (true);

-- Indexes
CREATE INDEX idx_breach_monitors_next_check ON public.breach_monitors(next_check_at) WHERE status = 'pending';
CREATE INDEX idx_breach_monitors_user_id ON public.breach_monitors(user_id);
CREATE INDEX idx_user_breaches_user_id ON public.user_breaches(user_id);

-- Cron Job (Example - Run manually to enable)
-- SELECT cron.schedule(
--   'check-breaches-every-minute',
--   '* * * * *',
--   $$
--   SELECT net.http_post(
--       url:='https://YOUR_PROJECT_REF.supabase.co/functions/v1/check-breaches',
--       headers:='{"Content-Type": "application/json", "Authorization": "Bearer SERVICE_ROLE_KEY"}'::jsonb
--   ) as request_id;
--   $$
-- );
