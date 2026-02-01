DO $$ BEGIN
    CREATE TYPE broker_difficulty AS ENUM ('easy', 'medium', 'hard', 'impossible');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.data_brokers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL UNIQUE,
  domain text,
  category text,
  difficulty broker_difficulty DEFAULT 'medium',
  removal_method text,
  removal_url text,
  avg_removal_time_days int DEFAULT 14,
  requires_verification boolean DEFAULT false,
  active boolean DEFAULT true,
  scrape_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);
