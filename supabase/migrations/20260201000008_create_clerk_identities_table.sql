CREATE TABLE IF NOT EXISTS public.clerk_identities (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  clerk_identity_id text NOT NULL,
  provider text NOT NULL, -- google, apple, etc
  provider_user_id text,
  email text,
  phone_number text,
  verified boolean DEFAULT false,
  is_primary boolean DEFAULT false,
  metadata jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  UNIQUE(user_id, clerk_identity_id)
);
