DO $$ BEGIN
    CREATE TYPE notification_status AS ENUM ('pending', 'sent', 'failed', 'read');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL, -- push, email, sms
  channel text, -- expo, sendgrid, twilio
  title text NOT NULL,
  body text,
  data jsonb DEFAULT '{}',
  status notification_status DEFAULT 'pending',
  sent_at timestamptz,
  read_at timestamptz,
  created_at timestamptz DEFAULT NOW()
);
