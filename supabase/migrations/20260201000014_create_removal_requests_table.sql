DO $$ BEGIN
    CREATE TYPE removal_status AS ENUM ('pending', 'submitted', 'in_progress', 'completed', 'failed', 'denied', 'verified');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.removal_requests (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  finding_id uuid REFERENCES public.broker_findings(id) ON DELETE SET NULL,
  broker_id uuid REFERENCES public.data_brokers(id) ON DELETE CASCADE NOT NULL,
  status removal_status DEFAULT 'pending',
  method text,
  confirmation_number text,
  submitted_at timestamptz,
  completed_at timestamptz,
  retry_count int DEFAULT 0,
  error_message text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);
