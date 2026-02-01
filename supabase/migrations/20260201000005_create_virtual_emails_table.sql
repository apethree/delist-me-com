DO $$ BEGIN
    CREATE TYPE virtual_email_status AS ENUM ('active', 'paused', 'cancelled', 'pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.virtual_emails (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  email_address text NOT NULL UNIQUE,
  status virtual_email_status DEFAULT 'pending',
  forwarding_enabled boolean DEFAULT true,
  forwarding_email text, -- encrypted
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

COMMENT ON COLUMN public.virtual_emails.forwarding_email IS 'Encrypted forwarding email address';
