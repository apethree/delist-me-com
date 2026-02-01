CREATE TABLE IF NOT EXISTS public.identity_verifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  method text NOT NULL,
  provider text,
  verified boolean DEFAULT false,
  verification_data text, -- encrypted
  verified_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz DEFAULT NOW()
);

COMMENT ON COLUMN public.identity_verifications.verification_data IS 'Encrypted verification data';
