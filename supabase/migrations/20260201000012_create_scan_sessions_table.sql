DO $$ BEGIN
    CREATE TYPE scan_status AS ENUM ('pending', 'scanning', 'complete', 'failed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.scan_sessions (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  status scan_status DEFAULT 'pending',
  brokers_to_scan int DEFAULT 0,
  brokers_scanned int DEFAULT 0,
  brokers_found int DEFAULT 0,
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);
