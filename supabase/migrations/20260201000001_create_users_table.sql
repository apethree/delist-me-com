CREATE TABLE IF NOT EXISTS public.users (
  id text NOT NULL PRIMARY KEY,
  clerk_user_id text UNIQUE,
  email text,
  full_name text,
  phone_number text, -- encrypted
  subscription_tier int DEFAULT 0,
  stripe_customer_id text,
  onboarding_completed boolean DEFAULT false,
  dnc_registered boolean DEFAULT false,
  dnc_registered_at timestamptz,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);

COMMENT ON COLUMN public.users.clerk_user_id IS 'Clerk user ID for sync';
COMMENT ON COLUMN public.users.phone_number IS 'Encrypted user phone number';
