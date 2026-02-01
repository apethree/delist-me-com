CREATE TABLE IF NOT EXISTS public.user_profiles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  date_of_birth text, -- encrypted
  ssn_last_4 text, -- encrypted
  addresses jsonb[] DEFAULT '{}',
  previous_addresses jsonb[] DEFAULT '{}',
  phone_numbers jsonb[] DEFAULT '{}',
  email_addresses jsonb[] DEFAULT '{}',
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

COMMENT ON COLUMN public.user_profiles.date_of_birth IS 'Encrypted date of birth';
COMMENT ON COLUMN public.user_profiles.ssn_last_4 IS 'Encrypted last 4 digits of SSN';
