CREATE TABLE IF NOT EXISTS public.received_emails (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  virtual_email_id uuid REFERENCES public.virtual_emails(id) ON DELETE SET NULL,
  from_email text NOT NULL,
  to_email text NOT NULL,
  subject text,
  body_text text,
  body_html text,
  attachments jsonb[] DEFAULT '{}',
  headers jsonb DEFAULT '{}',
  read boolean DEFAULT false,
  created_at timestamptz DEFAULT NOW(),
  read_at timestamptz
);
