DO $$ BEGIN
    CREATE TYPE document_status AS ENUM ('pending', 'verified', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

CREATE TABLE IF NOT EXISTS public.documents (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id text REFERENCES public.users(id) ON DELETE CASCADE NOT NULL,
  type text NOT NULL,
  file_path text NOT NULL,
  file_name text NOT NULL,
  file_size int,
  mime_type text,
  status document_status DEFAULT 'pending',
  created_at timestamptz DEFAULT NOW()
);
