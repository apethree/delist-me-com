DO $$ BEGIN
    CREATE TYPE finding_status AS ENUM ('found', 'not_found', 'error', 'scanned', 'unknown');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.broker_findings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  scan_session_id uuid REFERENCES public.scan_sessions(id) ON DELETE CASCADE,
  broker_id uuid REFERENCES public.data_brokers(id) ON DELETE SET NULL,
  status finding_status DEFAULT 'unknown',
  profile_url text,
  data_found jsonb DEFAULT '{}',
  screenshot_url text,
  confidence_score float,
  last_checked_at timestamptz,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  UNIQUE(scan_session_id, broker_id)
);
