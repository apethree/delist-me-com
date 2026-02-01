DO $$ BEGIN
    CREATE TYPE sms_direction AS ENUM ('inbound', 'outbound');
    CREATE TYPE sms_status AS ENUM ('received', 'sent', 'queued', 'failed', 'delivered', 'sending');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.sms_messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  virtual_phone_id uuid REFERENCES public.virtual_phone_numbers(id) ON DELETE SET NULL,
  direction sms_direction NOT NULL,
  from_number text NOT NULL,
  to_number text NOT NULL,
  body text,
  media_urls text[],
  provider_message_sid text,
  status sms_status DEFAULT 'queued',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT NOW(),
  updated_at timestamptz DEFAULT NOW()
);
