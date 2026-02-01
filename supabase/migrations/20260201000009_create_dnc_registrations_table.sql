DO $$ BEGIN
    CREATE TYPE dnc_status AS ENUM ('pending', 'registered', 'failed', 'expired');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.dnc_registrations (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  phone_number text, -- encrypted
  registration_status dnc_status DEFAULT 'pending',
  confirmation_number text,
  registered_at timestamptz,
  expires_at timestamptz,
  error_message text,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

COMMENT ON COLUMN public.dnc_registrations.phone_number IS 'Encrypted phone number registered on DNC';
