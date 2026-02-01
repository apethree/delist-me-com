DO $$ BEGIN
    CREATE TYPE voicemail_status AS ENUM ('new', 'listened', 'archived', 'deleted');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.voicemails (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  virtual_phone_id uuid REFERENCES public.virtual_phone_numbers(id) ON DELETE SET NULL,
  from_number text NOT NULL,
  duration_seconds int DEFAULT 0,
  recording_url text,
  storage_path text,
  transcription text,
  provider_call_sid text,
  status voicemail_status DEFAULT 'new',
  created_at timestamptz DEFAULT NOW(),
  listened_at timestamptz,
  updated_at timestamptz DEFAULT NOW()
);
