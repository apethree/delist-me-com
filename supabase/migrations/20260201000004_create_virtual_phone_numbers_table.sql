DO $$ BEGIN
    CREATE TYPE virtual_phone_status AS ENUM ('active', 'paused', 'cancelled', 'pending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.virtual_phone_numbers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  phone_number text NOT NULL,
  provider text DEFAULT 'twilio',
  provider_sid text,
  status virtual_phone_status DEFAULT 'pending',
  is_primary boolean DEFAULT false,
  purchase_price decimal(10, 2) DEFAULT 0.00,
  monthly_cost decimal(10, 2) DEFAULT 0.00,
  forwarding_enabled boolean DEFAULT false,
  forwarding_number text, -- encrypted
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW(),
  cancelled_at timestamptz
);

COMMENT ON COLUMN public.virtual_phone_numbers.forwarding_number IS 'Encrypted forwarding number';
